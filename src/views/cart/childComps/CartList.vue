<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item" />
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  data() {
    return {
      cartList: []
    };
  },
  created() {
    this.cartList.push(...this.$store.state.cartList);
  },
  activated() {
    //
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
