<template>
  <div id="app">
    <Contacts />
  </div>
</template>

<script>
import Contacts from './components/Contacts.vue'

export default {
  name: 'App',
  data() {
    return {
      message: '',
      baseURL: '',
    }
  },
  components: {
    Contacts,
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
