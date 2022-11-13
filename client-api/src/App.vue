<template>
  <div id="app">
    <img alt="Vue logo" src="./static/logo.png" />
    <FirstPage />
  </div>
</template>

<script>
import FirstPage from './components/FirstPage.vue'

export default {
  name: 'App',
  components: {
    FirstPage,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
