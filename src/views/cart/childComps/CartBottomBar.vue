<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-btn" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate">去结算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.filter(item => !item.checked).length;
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach(item => (item.checked = true));
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #cfcfcf;
  position: relative;
  bottom: 40px;
  display: flex;
  line-height: 40px;
}
.check-content {
  display: flex;
  width: 100px;
}
.check-btn {
  width: 20px;
  height: 20px;
  margin: 10px;
  line-height: 20px;
}
.price {
  margin-left: 15px;
  flex: 1;
}
.calculate {
  width: 100px;
  background-color: var(--color-tint);
  text-align: center;
  color: #fff;
}
</style>
