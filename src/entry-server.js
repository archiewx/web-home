import createApp from './app'

const isDev = process.env.NODE_ENV !== 'production'

// 每次调用时候重复渲染
export default (context) =>
  new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    const s = isDev && Date.now()
    const { url } = context
    const { fullPath } = router.resolve(url).route
    if (fullPath !== url) {
      // eslint-disable-next-line
      return reject({ url: fullPath })
    }
    // 设置服务器端 router 的位置
    router.push(url)
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 没有匹配到路由
      if (!matchedComponents.length) {
        // eslint-disable-next-line
        return reject({ code: 404 })
      }
      Promise.all(
        matchedComponents.map(({ asyncData }) => {
          if (asyncData) {
            return asyncData({ store, route: router.currentRoute })
          }
        })
      )
        .then(() => {
          isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
          context.state = store.state
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
