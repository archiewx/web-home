<template>
  <div class="edit">
    <div class="post-tips" v-if="!ignore">
      <div class="post-tips__wrapper">
        <upload tips="Upload a Md's File For Creating、Write In Browser Or Just Paste The Here!" :before-upload="handleBeforeUpload"></upload>
        <div class="btn btn-warning" @click="ignore = true">Ignore</div>
      </div>
    </div>
    <div class="post-title">
      <input type="text" placeholder="输入标题" v-model="postTitle">
    </div>
    <div class="post-content">
      <mavon-editor style="width: 100%; height: 100%; z-index: 2;" class="v-note-wrapper markdown-body" ref="mdEditor" v-model="post" v-bind="editProps" @save="handleEditSave" @change="handleEditChange" @imgAdd="handleImgAdd" @imgDel="handleImgDelete"></mavon-editor>
    </div>
    <div class="post-footer top-border">
      <div class="btn btn-cancel" @click="handleBack">Back</div>
      <div class="btn btn-primary" @click="handleCreatePost">Create a Post</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import dayjs from 'dayjs'
import Upload from '../../components/Upload/Upload.vue'

export default {
  async asyncData({ store }) {
    await store.dispatch('editconfig/requestEditConfig')
  },
  components: {
    Upload
  },
  data() {
    return {
      post: '',
      html: '',
      postTitle: '',
      localEditConfig: {},
      ignore: false,
      baseUrl: 'http://p73z44sze.bkt.clouddn.com/',
      sourceMdFile: '',
      isDraft: false
    }
  },
  computed: {
    ...mapGetters({
      remoteEditConfig: 'editconfig/getMd'
    }),
    editProps() {
      return {
        imageFilter: this.imageFilter,
        ...this.localEditConfig,
        ...this.remoteEditConfig
      }
    }
  },
  methods: {
    handleEditSave() {
      this.isDraft = true
    },
    handleEditChange(md, html) {
      this.html = html
    },
    handleImgAdd(filename, file) {
      this.uploadFile(file).then((imageUrl) => {
        this.$refs.mdEditor.$img2Url(filename, imageUrl)
      })
    },
    handleImgDelete() {},
    handleBeforeUpload(file) {
      this.sourceMdFile = file
      const render = new FileReader()
      render.readAsText(file)
      render.onload = () => {
        const mdIt = this.$refs.mdEditor.markdownIt
        console.log(mdIt.render(render.result))
        this.post = render.result
        this.postTitle = render.result.split('\n')[0]
        this.ignore = true
      }
      return false
    },
    uploadFile(file, type = 'image') {
      const form = new FormData()
      form.append('file', file)
      form.append('bucket', 'develop')
      const date = dayjs().format('YYYY-MM-DD')
      form.append('prefix', `home/${type}/${date}`)
      form.append('region', 'z0')
      return axios
        .post('https://util.wangxdog.cn/qiniu/upload', form)
        .then((res) => res.data)
        .then((res) => {
          const url = this.baseUrl + res.data.key
          return url
        })
    },
    imageFilter(file) {
      // 这里处理直接上传复制或者上传图片
      /**
       * 图片上传home/image/date/filename.ext
       * md文件备案home/home/md/date/title.md
       */
      if (!this.post) {
        return true
      }
      this.uploadFile(file).then((imageUrl) => {
        const regex = new RegExp(`\\!\\[?.+\\]\\(.+${file.name}\\)`, 'g')
        const post = this.post
        if (post) {
          this.post = post.replace(regex, `![${imageUrl}](${imageUrl})`)
        }
      })
      return false
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleCreatePost() {
      this.isDraft = false
      const self = this
      if (this.post && this.postTitle) {
        return this.$store.dispatch('edit/createPost', {
          post: {
            title: this.postTitle,
            html: this.html,
            md: this.post,
            isDraft: this.isDraft,
            mediaUrl: 'http://voidcanvas.com/wp-content/uploads/2014/01/JavaScript-logo.png'
          },
          successCallback() {
            self.$router.go(-1)
          }
        })
      }
    }
  }
}
</script>

<style>
</style>
