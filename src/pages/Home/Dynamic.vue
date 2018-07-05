<template>
  <div class="content">
    <timeline class="content-tl">
      <timeline-item v-for="(item, idx) in dynamic" :key="idx">
        <p>{{item.time}}</p>
        <p>在 {{item.address}}, {{item.event}}</p>
      </timeline-item>
    </timeline>
  </div>
</template>

<script>
export default {
  name: 'Dynamic',
  props: {
    dynamic: Array
  }
}
</script>

<style>

</style>
