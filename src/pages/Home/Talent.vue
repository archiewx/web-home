<template>
  <div class="content">
    <span>ssr不支持</span>
  </div>
</template>
<script>

import { Polar } from 'vue-chartjs'

export default {
  name: 'Talent',
  components: {
  },
  methods: {},
  computed: {
    talent() {
      return this.$store.state.talent
    }
  }
}
</script>

<style>

</style>
