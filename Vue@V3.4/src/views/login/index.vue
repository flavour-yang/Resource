<template>
  <login-page />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginPage from './components/login-page.vue'

export default defineComponent({
  name: 'Login',
  components: { LoginPage }
})
</script>