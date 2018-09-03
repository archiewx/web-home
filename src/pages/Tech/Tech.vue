/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-08-09 15:54:18
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2018-08-28 20:28:10
 */
<template>
  <div class="zf-tech">
    <div class="zf-tech-wrapped">
      <div class="zf-top-box">
        <search-input @change="handleSearchChange"></search-input>
      </div>
      <div class="zf-tech-menu">
        <ul class="zf-tech-menu__wrapped">
          <li :class="menuItemClass('/tech/regex')">
            <router-link to="/tech/regex">正则表达式</router-link>
          </li>
          <li :class="menuItemClass('/tech/mini-code')">
            <router-link to="/tech/mini-code">微代码</router-link>
          </li>
          <li :class="menuItemClass('/tech/lib')">
            <router-link to="/tech/lib">非公开cdn</router-link>
          </li>
        </ul>
      </div>
      <div class="zf-main-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from '../../components/Search/SearchInput'

export default {
  name: 'Tech',
  components: {
    SearchInput
  },
  computed: {
    path() {
      return this.$route.path
    }
  },
  methods: {
    handleSearchChange(val) {},

    menuItemClass(path) {
      return {
        'zf-tech-menu__wrapped--li': true,
        'zf-tech-menu__wrapped--li--active': this.path === path
      }
    }
  }
}
</script>

<style>
</style>
