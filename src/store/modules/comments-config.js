import * as types from '../mutation-types'
import axios from '../../config/axios'

export default {
  namespaced: true,
  state: {
    disqus: {
      url: 'https://wangxdog.disqus.com',
      isCount: false
    }
  },
  getters: {
    getDisqus: (state) => state.disqus
  },
  actions: {
    async requestDisqus({ commit }) {
      const res = await axios.get('/config/comments/disqus')
      if (res.success) {
        return commit(types.REQUEST_DISQUS_CONFIG, { data: res.data })
      }
      commit(types.SHOW_MESSAGE, { data: res }, { root: true })
    }
  },
  mutations: {
    [types.REQUEST_DISQUS_CONFIG](state, { data }) {
      state.disqus = data
    }
  }
}
