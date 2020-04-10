<template>
  <div>
    <div class="goods clear-fix">
      <goods-list-item v-for="item in goods" :goods-item="item" />
    </div>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.goods {
}
</style>
