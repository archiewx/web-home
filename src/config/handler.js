export default (Vue) => {
  Vue.config.errorHandler = (err, vm, info) => {
    console.log(err, vm, info)
  }
  Vue.config.warnHandler = (msg, vm, trace) => {}
}
