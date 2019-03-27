import axios from 'config/axios'
import * as types from '../mutation-types'

export default {
  namespaced: true,
  state: () => ({}),
  getters: {},
  actions: {
    async createPost({ commit }, payload) {
      const res = await axios.post('/blog/post', payload.post)
      if (res) {
        payload.successCallback()
        return commit({
          type: types.REQUEST_CREATE_POST
        })
      }
      commit(types.SHOW_MESSAGE, { data: res }, { root: true })
    }
  },
  mutations: {
    [types.REQUEST_CREATE_POST](state, payload) {}
  }
}
