<template>
  <div class="dog-fs-px-16 login">
    <div class="login-wrapper">
      <div class="form-container">
        <div class="form-title">
          <b>登录</b>
          <span class="form-title--extra">
            <small class="dog-fs-px-12">(仅有自己使用，勿用)</small>
          </span>
        </div>
        <form class="form" @keydown.enter="handleLogin">
          <div class="form-item">
            <label class="form-item__label">用户名</label>
            <div class="form-item__wrapper">
              <input type="text" class="form-item__input" v-model="form.username">
            </div>
          </div>
          <div class="form-item">
            <label class="form-item__label">密码</label>
            <div class="form-item__wrapper">
              <input type="password" class="form-item__input" v-model="form.password">
            </div>
          </div>

          <div class="btn btn-primary login-btn" @click="handleLogin">授 权</div>
          <router-link class="login-back dog-fs-px-12" to="/">返回&gt;&gt;</router-link>
          <div class="form-bottom">
            <!-- <div id="fb-root">
              <div class="fb-login-button" data-max-rows="1" data-size="medium" data-button-type="continue_with" data-show-faces="true" data-auto-logout-link="true" data-use-continue-as="true"></div>
            </div> -->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  mounted() {},
  methods: {
    async handleLogin() {
      const self = this
      await this.$store.dispatch('login/requestLogin', {
        ...this.form,
        afterCallBack() {
          const redirect = self.$route.query.redirect
          self.$router.replace({ path: redirect })
        }
      })
    },
    loginFackBook() {
      window.FB.login((response) => {
        console.log(response)
      })
    },
    checkState() {
      window.FB.getLoginStatus(function(response) {
        console.log(response)
      })
    },
    testAPI() {
      console.log('Welcome!  Fetching your information.... ')
      window.FB.api('/me', function(response) {
        console.log(response)
        console.log('Successful login for: ' + response.name)
      })
    }
  }
}
</script>

<style>
</style>
