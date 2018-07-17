import axios from 'config/axios'
import * as types from '../mutation-types'

export default {
  namespaced: true,
  state: () => ({
    md: {}
  }),
  getters: {
    getMd: (state) => state.md
  },
  actions: {
    async requestEditConfig({ commit }) {
      const res = await axios.get('/config/editor')
      if (res.success) {
        return commit(types.REQUEST_EIDT_CONFIG, { data: res.data })
      }
      commit(types.REQUEST_ERROR, { data: res }, { root: true })
    }
  },
  mutations: {
    [types.REQUEST_EIDT_CONFIG](state, { data }) {
      state.md = data.md
    }
  }
}
