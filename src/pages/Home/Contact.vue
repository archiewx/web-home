<template>
  <div class="content" style="width: 50%; margin: 16px auto;">
    <tag class="content-tag" type="border" v-for="(item, idx) in data" :key="idx">
      <icon :type="item.type"></icon>
      <span v-if="item.way">{{item.name}}({{item.way}})</span>
      <span v-else>
        <a :href="item.url" target="_blank">{{item.name}}</a>
      </span>
    </tag>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  props: {
    data: Array
  }
}
</script>

<style>

</style>
