import * as types from '../mutation-types'
import axios from '../../config/axios'

export default {
  namespaced: true,
  state: {
    user: {
      token: '',
      id: '',
      name: ''
    }
  },
  getters: {},
  actions: {
    async requestLogin({ commit }, { username, password, afterCallBack }) {
      if (!username || !password) {
        return commit(types.SHOW_MESSAGE, { data: { msg: '缺少用户名或者密码' } }, { root: true })
      }
      const res = await axios.post('/auth/login', { username, password })
      if (res.success) {
        await commit(types.REQUEST_AUTH_LOGIN, { data: res.data })
        afterCallBack()
      } else {
        commit(types.SHOW_MESSAGE, { data: res }, { root: true })
      }
    }
  },
  mutations: {
    [types.REQUEST_AUTH_LOGIN](state, payload) {
      const user = payload.data
      window.sessionStorage.setItem('token', user.token)
      window.sessionStorage.setItem('id', user.id)
      window.sessionStorage.setItem('name', user.name)
      state.user = user
    }
  }
}
