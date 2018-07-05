<template>
  <div class="upload" :style="{backgroundImage: `url(${image})`}" @click="handleClick">
    <div class="upload_inner" v-if="!image">
      <div class="upload_inner--icon">
        <i class="iconfont icon-upload"></i>
      </div>
      <div class="upload_inner--tips gm-fs-15">{{tips}}</div>
    </div>
    <input class="upload_input" type="file" :multiple="multiple" @change="handleChange">
  </div>
</template>

<script>
export default {
  props: {
    tips: {
      type: String,
      default: '小提示'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: 'gunma-merchant'
    },
    name: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    field: {
      type: String
    },
    beforeUpload: {
      type: Function
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      this.$forceUpdate()
    },
    handleChange(e) {
      const data = new FormData()
      const file = e.target.files[0]
      if (!file) {
        return
      }
      data.append('image_name', this.name || `${this.prefix}/${file.name}`)
      data.append('image_file', file)
      // 回调前可以修改data
      const isUpload = this.beforeUpload(file, data)
      if (!isUpload) {
        return false
      }
      this.createXhr(data)
        .then((res) => {
          this.$emit('success', this.field, res.result)
        })
        .catch((err) => {
          this.$emit('error', this.field, err)
        })
    },
    createXhr(data) {
      // 创建原生的xhr
      const xhr = new XMLHttpRequest()
      xhr.withCredentials = false
      const xhrPromse = new Promise((resolve, reject) => {
        xhr.addEventListener('readystatechange', () => {
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText))
          }
        })
        xhr.addEventListener('error', (err) => {
          reject(err)
        })
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            // eslint-disable-next-line
            const percent = Math.fround(event.loaded / event.total * 100)
            this.$emit('progress', percent)
          }
        })
      })
      xhr.open('POST', this.url)
      xhr.send(data)
      return xhrPromse
    }
  }
}
</script>

<style>
</style>
