<template>
  <div class="edit">
    <div class="post-tips"
      v-if="!ignore">
      <div class="post-tips__wrapper">
        <upload tips="Upload a Md's File For Creating、Write In Browser Or Just Paste The Here!"
          :before-upload="handleBeforeUpload"></upload>
        <div class="btn btn-warning"
          @click="ignore = true">Ignore</div>
      </div>
    </div>
    <div class="post-title">
      <input type="text"
        placeholder="input a title"
        v-model="postTitle">
    </div>
    <div class="post-content">
      <mavon-editor style="width: 100%; height: 100%; z-index: 2;"
        class="v-note-wrapper markdown-body"
        ref="mdEditor"
        v-model="post"
        v-bind="editProps"
        @save="handleEditSave"
        @change="handleEditChange"
        @imgAdd="handleImgAdd"
        @imgDel="handleImgDelete"></mavon-editor>
    </div>
    <div class="post-footer top-border">
      <div class="btn btn-cancel"
        @click="handleBack">Back</div>
      <div class="btn btn-primary"
        @click="ignore = false">Upload Text</div>
      <div class="btn btn-primary"
        @click="handleCreatePost">Create a Post</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import matter from 'gray-matter'
import axios from '../../config/axios'
import Upload from '../../components/Upload/Upload.vue'

const postCate = {
  js: 'https://cdn-cos.luoyangfu.com/2018-07-30/cate/JavaScript-logo.png',
  array: 'https://cdn-cos.luoyangfu.com/2018-07-31/cate/JavaScript-Array-logo.png',
  webpack: 'https://cdn-cos.luoyangfu.com/2018-07-30/cate/webpack-logo.png'
}

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
      localEditConfig: {
        externalLink: {}
      },
      ignore: true,
      sourceMdFile: '',
      isDraft: false,
      mediaUrl: '',
      description: '描述为空'
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
      const matterOb = matter(md)
      if (Object.keys(matterOb.data).length) {
        this.handleMdFileContent(matterOb)
      }
      this.html = html
    },
    handleImgAdd(filename, file) {
      this.uploadFile(file).then((imageUrl) => {
        this.$refs.mdEditor.$img2Url(filename, imageUrl)
      })
    },
    handleImgDelete() {},
    handleCategories(cates) {
      this.categories = cates.map((c) => ({ cateName: c.name, cateImg: c.img }))
    },
    handleMdFileContent(matterOb) {
      const data = matterOb.data
      this.handleCategories(data.categories)
      this.$nextTick(() => {
        this.postTitle = data.title
        this.mediaUrl = data.mediaUrl || ''
        this.description = data.description
        this.post = matterOb.content
      })
    },
    handleBeforeUpload(file) {
      this.sourceMdFile = file
      const render = new FileReader()
      render.readAsText(file)
      render.onload = () => {
        const matterOb = matter(render.result)
        this.handleMdFileContent(matterOb)
        this.ignore = true
      }
      return false
    },
    uploadFile(file, type = 'image') {
      const form = new FormData()
      form.append('file', file)
      form.append('dir', type)
      return axios.post('/util/upload', form).then((res) => {
        const url = res.data.customUrl || res.data.url
        return url
      })
    },
    imageFilter(file) {
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
        const cateFlag =
          this.postTitle.indexOf('array') !== -1
            ? 'array'
            : this.postTitle.indexOf('webpack') !== -1 ? 'webpack' : 'js'
        return this.$store.dispatch('edit/createPost', {
          post: {
            title: this.postTitle,
            html: this.html,
            md: this.post,
            isDraft: this.isDraft,
            categories: this.categories,
            mediaUrl: this.mediaUrl,
            desciption: this.description
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
