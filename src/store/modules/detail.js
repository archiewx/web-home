import axios from '../../config/axios'
import * as types from '../mutation-types'

export default {
  namespaced: true,
  state: {
    data: {}
  },
  getters: {
    getDetail: (state) => state.data
  },
  actions: {
    async requestDetail({ commit }, { id }) {
      const res = await axios.get(`/blog/post/${id}`)
      if (res.success) {
        return commit(types.REQUEST_POST_DETAIL, res.data)
      }
      // commit(types.REQUEST_ERROR, { data: res }, { root: true })
    }
  },
  mutations: {
    [types.REQUEST_POST_DETAIL](state, data) {
      state.data = data
    }
  }
}
