import axios from 'config/axios'
import * as types from '../mutation-types'

export default {
  namespaced: true,
  state: () => ({
    me: {},
    posts: [],
    total: 0
  }),
  getters: {
    getMe: (state) => state.me,
    getPosts: (state) => state.posts
  },
  actions: {
    async requestMe({ commit }) {
      const res = await axios.get('/blog/me')
      if (res.success) {
        return commit(types.REQUEST_ME, { data: res.data })
      }
      // commit(types.REQUEST_ERROR, { data: res }, { root: true })
    },
    async requestPosts({ commit }, { pageSize, page }) {
      const res = await axios.get('/blog/posts', { params: { pageSize, page } })
      if (res.success) {
        return commit(types.REQUEST_POST_LIST, { data: res.data })
      }
      commit(types.REQUEST_ERROR, { data: res }, { root: true })
    }
  },
  mutations: {
    [types.REQUEST_ME](state, { data }) {
      state.me = data
    },
    [types.REQUEST_POST_LIST](state, { data }) {
      state.posts = data.posts
      state.total = data.totalPage
    }
  }
}
