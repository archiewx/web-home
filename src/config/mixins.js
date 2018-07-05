export default {
  data() {
    return {
      token: window.sessionStorage.getItem('token')
    }
  },
  beforeMount() {
    const { asyncData } = this.$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log('router update')
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      })
        .then(next)
        .catch(next)
    } else {
      next()
    }
  },
  mounted() {
    // 这里使用mixin来控制权限
    if (this.$route.meta.private && !this.token) {
      this.$store.dispatch('showError', { data: { msg: '请先去授权(仅仅个人学习所用)' } })
      this.$router.push('/login')
    }
  }
}
