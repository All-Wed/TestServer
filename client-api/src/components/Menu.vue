<template>
  <div>
    <ul>  
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/mail">Mail</router-link>
      <router-link class="link" to="/contacts">Contacts</router-link>
    </ul>  
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="css" scoped>
.link {
  margin: 5px;
}
</style>