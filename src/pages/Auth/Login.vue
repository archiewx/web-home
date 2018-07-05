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
        <form class="form">
          <div class="form-item">
            <label class="form-item__label">用户名</label>
            <div class="form-item__wrapper">
              <input type="text" class="form-item__input" v-model="form.username">
            </div>
          </div>
          <div class="form-item">
            <label class="form-item__label">密码</label>
            <div class="form-item__wrapper">
              <input type="text" class="form-item__input" v-model="form.password">
            </div>
          </div>
          <div class="btn btn-primary login-btn" @click="handleLogin">授 权</div>
          <router-link class="login-back dog-fs-px-12" to="/">返回&gt;&gt;</router-link>
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
  methods: {
    handleLogin() {
      this.$store.dispatch('login/requestLogin', {
        ...this.form,
        afterCallBack: () => {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style>
</style>
