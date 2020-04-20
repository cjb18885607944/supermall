import {
  debounce
} from './utils'

export const itemListenerMixin = {
  mounted() {
    console.log('我是混入里的内容')
  }
}