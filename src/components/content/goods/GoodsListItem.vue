<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" @load="loadImg" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    loadImg() {
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      console.log("跳转");
      this.$router.push("/detail/" + this.goodsItem.iid);
    }
  }
};
</script>

<style scoped>
.goods-item {
  width: 50%;
  float: left;
  padding: 5px 10px;
}
.goods-item img {
  width: 100%;
  border-radius: 8px;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 5px 0;
}
.goods-info span {
  display: block;
  width: 50%;
  float: left;
  position: relative;
}
.price {
  color: var(--color-tint);
  text-align: right;
}
.collect {
  padding-left: 23px;
}
.collect::before {
  content: "";
  position: absolute;
  height: 16px;
  width: 16px;
  left: 5px;
  color: red;
  background: url(".../../../../../assets/img/common/collect.svg");
  background-size: 16px 16px;
}
</style>
