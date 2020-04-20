<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";

import { itemListenerMixin } from "@/common/mixin";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommentd
} from "@/network/detail.js";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0
    };
  },
  mixins: [itemListenerMixin],
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid;
    // 根据iid请求详情页数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // 获取顶部的图片轮播
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 创建店铺信息对象
      this.shop = new Shop(data.shopInfo);
      // 保存商品详情数据
      this.detailInfo = data.detailInfo;
      // 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 取到评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 获取推荐商品的数据
    getRecommentd().then(res => {
      this.recommends = res.data.list;
    });
  },
  mounted() {},
  updated() {},
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();

      // 获取各个高度
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);

      console.log(this.themeTopYs);
    },
    titleClick(index) {
      // console.log(index);

      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentScroll(position) {
      const positionY = -position.y;
      // 将positionY和主题中的值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addToCart() {
      console.log("添加购物车");
      // 1.获取购物车需要的信息（标题，描述，价格，图片）
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;

      // 2.将商品加入到购物车
      // this.$store.commit("addCart", product);
      this.$store.dispatch("addCart", product).then(res => {
        console.log(this.$toast);
        this.$toast.show(res, 1500);
      });
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  background-color: #fff;
  z-index: 10;
  height: 100vh;
}
.content {
  height: calc(100% - 93px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
