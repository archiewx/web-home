import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './styles/app.scss'
import createApp from './app'
import hotjar from './config/hotjar'
import routerGuards from './config/router'
import mixins from './config/mixins'

Vue.use(mavonEditor)
Vue.use(hotjar)

Vue.mixin(mixins)

const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

routerGuards(router)

router.onReady(() => {
  app.$mount('#app')
})
