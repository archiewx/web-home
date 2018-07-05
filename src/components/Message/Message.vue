<template>
  <transition name="bar-fade">
    <div class="block-bar dog-fs-px-14">
      <div :class="{'block-bar__wrapper': true, [`block-bar--${type}`]: true}">
        {{message}}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: '出错了'
    },
    type: {
      type: String,
      default: 'error'
    }
  }
}
</script>

<style>
</style>
