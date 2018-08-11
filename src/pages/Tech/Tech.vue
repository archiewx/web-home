/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-08-09 15:54:18
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2018-08-09 16:13:16
 */
<template>
  <div class="tech">
    <div class="tech-menu">
      <ul>
        <li>
          <router-link to="/tech/regex">正则表达式</router-link>
        </li>
        <li>
          <router-link to="/tech/mini-code">微代码</router-link>
        </li>
        <li>
          <router-link to="/tech/lib">非公开cdn</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Tech'
}
</script>

<style>
</style>
