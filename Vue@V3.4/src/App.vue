<script setup lang="ts">
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <hy-form :model="model" @submit="submit">
        <hy-input v-model="model.user" label="用户" field="user" :required="true" />
        <hy-input v-model="model.password" label="密码" field="password" :required="true" />
        <hy-input v-model="model.other.tip" label="提示" field="other.tip" :required="true" />
        <a-button html-type="submit">Submit</a-button>
      </hy-form>

      <nav>
        <a-space>
          <a-button type="primary">Primary</a-button>
        </a-space>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <RouterView />

</template>

<style>
html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>
