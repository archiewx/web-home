<template>
  <div class="dynamic-list">
    <card :bordered="false"
      v-for="post in posts"
      :key="post.id"
      :media-url="post.mediaUrl || post.cates[0].cateImg"
      :description="post.description"
      :title="post.title"
      :title-extra="post.updateTime">
      <div slot="card-footer-left"
        class="blog-card__footer-left">
        <span class="left-opts--item">
          <i class="iconfont icon-browse"></i>
          <span>({{post.views}})</span>
        </span>
        <!-- <span class="left-opts--item">
          <i class="iconfont icon-comment"></i>
          <span>(999+)</span>
        </span> -->
      </div>
      <div slot="card-footer-right"
        class="blog-card__footer-right">
        <div class="btn">
          <router-link :to="`/detail/${post.id}`">访问</router-link>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '../../components/Card/Card.vue'

export default {
  components: {
    Card
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    ...mapGetters({
      posts: 'index/getPosts'
    })
  },
  mounted() {}
}
</script>

<style>
</style>
