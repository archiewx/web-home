import axios from 'axios'
import NProgress from 'nprogress'

const isProd = process.env.NODE_ENV === 'production'
const isClient = !!this.document

function request() {
  if (isClient) {
    // 客户端操作
    NProgress.configure({
      minimum: 0.1,
      easing: 'ease',
      speed: 500
    })
  }

  const instance = axios.create({
    baseURL: !isProd ? 'http://rap2api.taobao.org/app/mock/16336' : 'https://sys.luoyangfu.com'
  })
  instance.interceptors.request.use(
    (config) => {
      if (isClient) {
        NProgress.start()
        const token = window.sessionStorage.token
        config.headers = config.headers || {}
        if (token) {
          config.headers.Authorization = 'bearer ' + token
        }
      }
      return config
    },
    (err) => Promise.reject(err)
  )
  instance.interceptors.response.use(
    (response) => {
      isClient && NProgress.done()
      if (response) {
        return response.data
      }
      return {}
    },
    (err) => Promise.reject(err)
  )
  return instance
}

export default request()
