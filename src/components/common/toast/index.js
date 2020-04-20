import Toast from './Toast.vue'

const obj = {}

obj.install = function (Vue) {
  // console.log('执行了toast安装函数', Vue)

  // 1.创建组件构造器
  const toastConstrutor = Vue.extend(Toast)

  // 2.new方式，通过组件构造器，创建出一个组件对象
  const toast = new toastConstrutor()

  // 3.将组件对象，手动挂在到某个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj