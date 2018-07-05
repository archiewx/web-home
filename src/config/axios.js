import axios from 'axios'

const isProd = process.env.NODE_ENV === 'production'

function request() {
  const instance = axios.create({
    baseURL: !isProd ? 'http://rap2api.taobao.org/app/mock/16336' : 'http://sys.luoyangfu.cn'
  })
  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (err) => Promise.reject(err)
  )
  instance.interceptors.response.use(
    (response) => {
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
