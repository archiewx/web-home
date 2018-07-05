<template>
  <div class="detail">
    <div class="detail-main dog-fs-px-16 markdown-body" v-html="detail.html"></div>
    <div class="detail-operate dog-fs-px-12">
      <b><a v-if="disqus.isCount" href="#disqus_thread">去评论</a></b>
    </div>
    <div class="detail-title dog-fs-px-14">标题: {{detail.title}}</div>
    <div class="detail-desc dog-fs-px-12">介绍: {{detail.description}}</div>
    <div class="detail-extra dog-fs-px-12">
      <span class="detail-extra--views">
        <i class="iconfont icon-browse"></i>({{detail.views}})</span>
      <span class="detail-extra--last-update">最后更新时间:
        <b>{{detail.updateTime}}</b>
      </span>
    </div>
    <div class="detail-comments">
      <disqus></disqus>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Disqus from '../../components/Disqus.vue'

export default {
  async asyncData({ store, route }) {
    await store.dispatch('commentsConfig/requestDisqus')
    await store.dispatch('detail/requestDetail', { id: route.params.id })
  },
  components: {
    Disqus
  },
  computed: {
    ...mapGetters({
      detail: 'detail/getDetail',
      disqus: 'commentsConfig/getDisqus'
    })
  },
  mounted() {
    document.title = this.detail.title
  },
  data() {
    return {}
  }
}
</script>

<style>
</style>
