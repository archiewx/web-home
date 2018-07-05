<template>
  <ul class="website-list dog-fs-px-14 clear">
    <li v-for="web in list" :key="web.id">
      <router-link :to="web.href">
        {{web.name}}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 'source',
          name: '关于',
          href: '/home'
        },
        {
          id: 'resume',
          name: '简历',
          href: '/resume'
        }
      ]
    }
  }
}
</script>

<style>
</style>
