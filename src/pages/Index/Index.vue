<template>
  <div class="index">
    <page-cover>
      <div class="page-content">
        <index-content></index-content>
      </div>
      <div slot="shadow" class="page-content page-content__shadow">
        <index-content shadow></index-content>
      </div>
    </page-cover>
  </div>
</template>

<script>
import PageCover from '../../components/Page/PageCover.vue'
import IndexContent from './Content.vue'
// import indexModule from '../../store/modules/index'

// let registered = false

export default {
  async asyncData({ store }) {
    const { index } = store.state
    if (!index.me.name) {
      await store.dispatch('index/requestMe')
    }
    if (!index.posts.length) {
      await store.dispatch('index/requestPosts', { pageSize: 10, page: 1 })
    }
  },
  components: {
    PageCover,
    IndexContent
  },
  methods: {
  },
  created() {},
  destroyed() {
    // if (registered) {
    //   this.$store.unregisterModule('index')
    // }
  },
  mounted() {}
}
</script>

<style>
</style>
