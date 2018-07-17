import axios from 'axios'
import NProgress from 'nprogress'

const isProd = process.env.NODE_ENV === 'production'
const isClient = !!this.document

function request() {
  let headers = {}
  if (isClient) {
    // 客户端操作
    NProgress.configure({
      minimum: 0.1,
      easing: 'ease',
      speed: 500
    })
    const token = window ? window.sessionStorage.token : ''
    if (token) {
      headers.Authorization = 'bearer ' + token
    }
  }

  const instance = axios.create({
    baseURL: !isProd ? 'http://rap2api.taobao.org/app/mock/16336' : 'https://sys.luoyangfu.com',
    headers
  })
  instance.interceptors.request.use(
    (config) => {
      isClient && NProgress.start()
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
