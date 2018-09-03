<template>
  <div class="zf-search-box">
    <input
      :type="type"
      v-model="searchVal"
      :placeholder="placeholder"
      class="zf-search-box__input"
      @keyup.enter="handleEnter"
    />
    <div class="zf-search-box__icon">
      <i class="iconfont icon-search"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: 'Search'
    },
    value: String
  },
  data() {
    return {
      searchVal: ''
    }
  },
  watch: {
    value(newVal) {
      this.searchVal = newVal
    },
    searchVal(newVal) {
      this.$emit('input', newVal)
      this.$emit('change', newVal)
    }
  },
  methods: {
    handleEnter() {
      this.$emit('change', this.searchVal)
    }
  }
}
</script>

<style>
</style>
