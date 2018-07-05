<template>
  <ul class="list-link clear">
    <li v-for="item in orgs" :key="item.url" :title="item.type">
      <a :href="item.url" target="_blank">
        <i :class="['iconfont', `icon-${item.icon}`, 'dog-fs-px-30']"></i>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    orgs: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
</style>
