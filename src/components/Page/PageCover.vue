<template>
  <div class="page-cover" @mousemove="handleMouseMove" @mouseleave="handleMouseUp">
    <div class="page-cover__bg">
      <slot></slot>
    </div>
    <transition name="right-move">
      <div class="page-cover__fg" :style="{width}">
        <div class="page-cover__persist" :style="{width: persistWidth}">
          <slot name="shadow"></slot>
        </div>
      </div>
    </transition>
    <div class="drag-scroll" @mousedown="handleMouseDown" @mouseup="handleMouseUp" :style="{ left, top}">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMouseDown: false,
      initOffsetLeft: 0,
      initOffsetTop: 0,
      left: '50vw',
      top: 0,
      fullWidth: '',
      width: '50vw',
      persistWidth: ''
    }
  },
  mounted() {
    this.fullWidth = this.$el.clientWidth
    window.onresize = this.handleResize
    this.persistWidth = `${this.$el.clientWidth}px`
  },
  watch: {
    left(newVal) {
      this.width = newVal
    }
  },
  methods: {
    handleResize() {
      this.fullWidth = document.querySelector('.page-cover').clientWidth
      this.persistWidth = `${this.$el.clientWidth}px`
    },
    handleMouseDown(e) {
      this.isMouseDown = true
      if ((e.offsetX && e.offsetY) || e.offsetX === 0 || e.offsetY === 0) {
        this.initOffsetLeft = e.offsetX
        this.initOffsetTop = e.offsetY
      } else {
        this.initOffsetLeft = e.pageX - e.target.offsetLeft
        this.initOffsetTop = e.pageY - e.target.offsetTop
      }
    },
    handleMouseUp() {
      this.isMouseDown = false
    },
    handleMouseMove(e) {
      if (this.isMouseDown) {
        let mouseX = e.pageX - this.initOffsetLeft
        let mouseY = e.pageY - this.initOffsetTop

        if (mouseY !== 0) {
          mouseY = 0
        }

        if (mouseX < 0) {
          mouseX = 0
        }
        if (mouseX > this.fullWidth - 20) {
          mouseX = this.fullWidth - 20
        }

        this.left = `${mouseX / this.fullWidth * 100}%`
        this.top = `${mouseY / this.fullWidth * 100}%`
      }
    }
  }
}
</script>

<style>
</style>
