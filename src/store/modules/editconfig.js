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
      if (res) {
        return commit(types.REQUEST_EDIT_CONFIG, { data: res.data })
      }
      commit(types.SHOW_MESSAGE, { data: res }, { root: true })
    }
  },
  mutations: {
    [types.REQUEST_EDIT_CONFIG](state, { data }) {
      state.md = data.md
    }
  }
}
