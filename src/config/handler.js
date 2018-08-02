export default (Vue) => {
  Vue.config.errorHandler = (err, vm, info) => {
    console.error('[LYF]',err, vm, info)
  }
  Vue.config.warnHandler = (msg, vm, trace) => {
    console.warn('[LYF]', msg, vm, trace)
  }
}
