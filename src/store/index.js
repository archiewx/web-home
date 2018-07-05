import Vue from 'vue'
import Vuex from 'vuex'
import { REQUEST_ERROR } from './mutation-types'
import index from './modules/index'
import editconfig from './modules/editconfig'
import edit from './modules/edit'
import detail from './modules/detail'
import commentsConfig from './modules/comments-config'
import login from './modules/login'

Vue.use(Vuex)

export default function createStore() {
  const store = new Vuex.Store({
    state: {
      err: {}
    },
    modules: {
      index,
      editconfig,
      edit,
      detail,
      commentsConfig,
      login
    },
    actions: {
      showError({ commit }, payload) {
        commit(REQUEST_ERROR, { data: payload.data })
      }
    },
    getters: {
      getErrors: (state) => state.err
    },
    mutations: {
      [REQUEST_ERROR](state, { data }) {
        state.err = data
      }
    }
  })
  if (module.hot) {
    module.hot.accept(
      [
        './modules/index.js',
        './modules/edit.js',
        './modules/editconfig.js',
        './modules/detail.js',
        './modules/login.js',
        './modules/comments-config.js'
      ],
      () => {
        const indexDefault = require('./modules/index').default
        const editconfigDefault = require('./modules/editconfig').default
        const editDefault = require('./modules/edit').default
        const detailDefault = require('./modules/detail').default
        const commentsConfigDefault = require('./modules/comments-config').default
        const loginDefault = require('./modules/login').default
        store.hotUpdate({
          modules: {
            index: indexDefault,
            editconfig: editconfigDefault,
            edit: editDefault,
            detail: detailDefault,
            commentsConfig: commentsConfigDefault,
            login: loginDefault
          }
        })
      }
    )
  }
  return store
}
