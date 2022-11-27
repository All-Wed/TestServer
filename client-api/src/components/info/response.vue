<template>
  <div>
    <p>Error: {{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Response',
  props: {
    message: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/style'

p
  color: red
</style>
