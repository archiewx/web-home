<template>
  <div id="app" :class="{[`${theme}-theme`]: true}">
    <message v-if="showMessage" :message="error.msg || error.message"></message>
    <router-view></router-view>
    <div class="app-side__btn" v-if="isNormal" @click="handleClick">&lt;</div>
    <icon
      class="app-side__media--icon"
      v-if="isNormal"
      type="chatbubbles"
      @click.native="handleClick"
    ></icon>
    <transition name="fade">
      <disqus v-if="visible && isNormal" @click="handleClickMask"></disqus>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Disqus from "./components/Disqus.vue";
import Message from "./components/Message/Message.vue";

export default {
  components: {
    Disqus,
    Message
  },
  mounted() {
    this.sideBtn = document.querySelector(".app-side__btn");
    document.title = this.$route.meta.title;
  },
  data() {
    return {
      visible: false,
      sideBtn: null,
      theme: "blur",
      showMessage: false
    };
  },
  watch: {
    $route(to) {
      document.title = to.meta.title;
    },
    error: {
      handler() {
        if (this.error && (this.error.msg || this.error.message)) {
          this.showMessage = true;
          this.timer = setTimeout(() => {
            this.showMessage = false;
          }, 2500);
        }
      },
      immediate: true
    }
  },
  computed: {
    isNormal() {
      return this.theme === "normal";
    },
    ...mapGetters({
      error: "getErrors"
    })
  },
  methods: {
    handleClick() {
      this.visible = true;
      this.sideBtn.textContent = "<";
    },
    handleClickMask() {
      this.visible = false;
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    this.timer = null;
  }
};
</script>

<style scoped>
</style>

