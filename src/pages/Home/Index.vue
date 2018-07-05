<template>
  <div>
    <div class="top"></div>
    <div class="bottom"></div>
    <div class="main" id="main">
      <div class="header">
        <ul>
          <li v-for="(menu, idx) in menus" :key="idx" @click="changeTab(idx)">
            <a href="#" :class="{active: menu.active}">{{menu.name}}</a>
          </li>
        </ul>
      </div>
      <div class="box">
        <div class="pic"></div>
        <p class="name">mr.zheng</p>
        <indroduce v-if="menus[0].active"></indroduce>
        <Talent v-if="menus[1].active"></Talent>
        <dynamic :dynamic="dynamic" v-if="menus[2].active"></dynamic>
        <contact :data="contact" v-if="menus[3].active"></contact>
      </div>
    </div>
  </div>
</template>
<script>
import Indroduce from './Indroduce.vue'
import Dynamic from './Dynamic.vue'
import Contact from './Contact.vue'
import Talent from './Talent.vue'

export default {
  components: {
    // Chart: EChart
    Indroduce,
    Dynamic,
    Contact,
    Talent
  },
  mounted() {},
  computed: {
    menus() {
      return this.$store.state.menus || []
    },
    dynamic() {
      return this.$store.state.dynamic
    },
    contact() {
      return this.$store.state.contact
    },
    talent() {
      return this.$store.state.talent
    }
  },
  methods: {
    changeTab(idx) {
      const activeItem = this.menus.find((cv) => cv.active === true)
      this.$set(activeItem, 'active', false)
      this.$nextTick(() => {
        this.menus[idx].active = true
      })
    },
    handleClick() {
      // 点击某个语言可以查看详情
      this.$Message.warning('暂未完成,即将可以查看详情了哦')
    },
    browserEchart() {}
  }
}
</script>

