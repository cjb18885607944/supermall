import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //  1.查找购物车是否存在该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 判断oldProduct
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('已添加到购物车！+1')
      } else {
        payload.count = 1
        // context.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('已添加到购物车！new')
      }
    })
  }
}