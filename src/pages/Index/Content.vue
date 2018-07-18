<template>
  <div class="page-content">
    <div :class="wrapperClass({'section-links': true})">
      <div class="static-lines dog-fs-px-14">
        It's me!
        <p>name: {{me.name}}</p>
        <p>from: {{me.from}}</p>
        <p>profession: {{me.profession}}</p>
        <p>description: {{me.description}} </p>
      </div>
      <div class="org-links">
        <list-link :orgs="me.orgList"></list-link>
      </div>
      <div class="other-websites">
        <web-sites></web-sites>
      </div>
    </div>
    <div class="page-content--center">
      <div :class="wrapperClass({ 'show-photo': true, 'back__our': true})"></div>
    </div>
    <div :class="wrapperClass({ 'dynamic-links': true })">
      <dynamic-link></dynamic-link>
    </div>
    <div :class="wrapperClass({ 'create-post': true})">
      <span @click="handleToEdit">
        <i class="iconfont icon-edit"></i>
      </span>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapGetters } from 'vuex'
import ListLink from './ListLink.vue'
import DynamicLink from './DynamicLink.vue'
import WebSites from './WebSites.vue'

export default {
  props: {
    shadow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ListLink,
    DynamicLink,
    WebSites
  },
  computed: {
    ...mapGetters({
      me: 'index/getMe'
    })
  },
  mounted() {},
  data() {
    return {
      debounce
    }
  },
  methods: {
    wrapperClass(classes) {
      if (this.shadow) {
        return { ...classes, shadow: true }
      }
      return classes
    },
    encoding(chinese) {
      return encodeURIComponent(chinese)
    },
    handleSyncScroll(e) {
      const debounceFunc = debounce(() => {
        const top = e.target.scrollTop
        const domList = this.$parent.$el.querySelectorAll('.dynamic-links')
        domList.forEach((dom) => {
          if (dom === e.target) {
            return
          }
          dom.scrollTop = top
        })
      }, 300)
      debounceFunc()
    },
    handleToEdit() {
      this.$router.push('/edit')
    }
  }
}
</script>

<style>
</style>
