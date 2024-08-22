<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="(item, index) in titles" :key="index">{{ item }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
  name: 'Breadcrumb',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const matchTitle = () => router.currentRoute.value.matched.map(m => m.meta.title)
    const titles = ref(matchTitle())
    watch(route, () => {
      titles.value = matchTitle()
    })
    return {
      titles
    }
  }
};

</script>

<style lang='less'></style>