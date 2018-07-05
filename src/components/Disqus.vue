<template>
  <div class="app-disque" @click="handleClickMask">
    <div class="app-disque__close" v-if="false" @click="handleCloseQisque">
      <icon type="close"></icon>
    </div>
    <div class="app-disque__box">
      <div id="disqus_thread"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      disqus: 'commentsConfig/getDisqus'
    })
  },
  mounted() {
    const disqus_config = function disqusConfig() {
      this.page.url = PAGE_URL // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = PAGE_IDENTIFIER // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    }
    const d = document,
      s = d.createElement('script')
    s.src = `${this.disqus.url}/embed.js`
    s.setAttribute('data-timestamp', +new Date())
    ;(d.head || d.body).appendChild(s)
    if (this.disqus.isCount) {
      const countDom = d.createElement('script')
      countDom.id = 'dsq-count-scr'
      countDom.async = 'async'
      countDom.src = `${this.disqus.url}/count.js`
      d.body.appendChild(countDom)
    }
  },
  methods: {
    handleClickMask(e) {
      const target = e.target
      if (target.className === 'app-disque') {
        this.$emit('click')
      }
    },
    handleCloseQisque() {
      this.$emit('click')
    }
  }
}
</script>
