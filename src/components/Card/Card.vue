<template>
  <div :class="{card: true, 'card--hover': hover,
   'card--border': bordered, 'dog-fs-px-14': true}">
    <div class="card__title dog-fs-px-16">
      <slot name="title">
        {{lessTitle}}
      </slot>
      <div class="card__title card__title-extra clear">
        <slot name="title-extra">
          <span class="time dog-fs-px-12">{{titleExtra}}</span>
        </slot>
      </div>
    </div>
    <div class="card__media" :style="bg"></div>
    <div class="card__body">
      <slot name="body">
        {{description}}
      </slot>
    </div>
    <div class="card__footer">
      <div class="card__footer--left">
        <slot name="card-footer-left">
          左下角
        </slot>
      </div>
      <div class="card__footer--right">
        <slot name="card-footer-right">
          右下角
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hover: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    mediaUrl: {
      type: String,
      default: ''
    },
    titleExtra: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  computed: {
    lessTitle() {
      return this.title.length < 20 ? this.title : this.title.slice(0, 20) + '...'
    },
    bg() {
      if (this.mediaUrl) {
        return { backgroundImage: `url(${this.mediaUrl})` }
      }
      return {}
    }
  }
}
</script>

<style>
</style>
