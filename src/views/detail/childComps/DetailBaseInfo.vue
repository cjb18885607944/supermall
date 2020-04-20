<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="title-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.base-info {
  padding: 20px 10px 0px 10px;
}
.info-title {
  color: #333;
  font-size: 24px;
}
.title-price {
  margin-top: 20px;
}
.n-price {
  font-size: 28px;
  color: var(--color-high-text);
}
.o-price {
  font-size: 16px;
  color: #999;
  text-decoration: line-through;
  margin: 0 10px;
}
.discount {
  background-color: var(--color-tint);
  color: #fff;
  padding: 7px;
  border-radius: 20px;
  vertical-align: top;
}
.info-service {
  padding: 30px 0;
  display: flex;
  border-bottom: 1px solid #ccc;
}
.info-service-item {
  flex: 1;
}
.info-service-item img {
  height: 20px;
  vertical-align: bottom;
  margin-right: 5px;
}
</style>
