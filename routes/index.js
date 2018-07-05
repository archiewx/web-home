/**
 *  creator: zheng
 *  date: 2017/9/18
 *  email: zhenglfsir@gmail.com
 */
const Vue = require('vue')
const ssr = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')
const VueEcharts = require('vue-echarts')
module.exports = function(app) {
  app.use('*', function(req, res) {
    const renderer = ssr.createRenderer({})
    const vm = new Vue({
      data: {},
      methods: {
        changeTab(idx) {
          const activeItem = this.menus.find((cv) => cv.active === true)
          this.$set(activeItem, 'active', false)
          this.$nextTick(() => {
            this.menus[idx].active = true
          })
        },
        handleClick(ev) {
          // 点击某个语言可以查看详情
          this.$Message.warning('暂未完成,即将可以查看详情了哦')
        }
      },
      template: fs.readFileSync(path.resolve(__dirname, '../view/index.html'), 'utf-8')
    })
    renderer.renderToString(vm, (err, html) => {
      return res.end(html)
    })
  })
}
