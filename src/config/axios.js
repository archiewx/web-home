import axios from 'axios'
import createStore from '../store'

const isProd = process.env.NODE_ENV === 'production'
const store = createStore()

function request() {
  const instance = axios.create({
    baseURL: !isProd ? 'http://rap2api.taobao.org/app/mock/16336' : 'https://sys.luoyangfu.com'
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
        if (!response.data.success) {
          store.commit('REQUEST_ERROR', { data: response.data }, { root: true })
        }
        return response.data
      }
      return {}
    },
    (err) => Promise.reject(err)
  )
  return instance
}

export default request()
