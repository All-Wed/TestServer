<template>
  <div>
    <h1>Contacts page</h1>
    <Adress />
  </div>
</template>

<script>
import Adress from '@/components/Adress.vue'
export default {
  name: 'Contacts',
  components: { Adress }
}
</script>