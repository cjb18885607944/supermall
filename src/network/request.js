import axios from 'axios'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: "http://106.54.54.237:8000/api/h8",
    timeout: 5000
  })

  // 2.拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err)
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    // console.log(err);
    this.banners = res.data.banner.list;
    this.recommends = res.data.recommend.list;
  })

  // 发送请求
  return instance(config)

}