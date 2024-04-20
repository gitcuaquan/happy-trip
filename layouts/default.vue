<script setup lang="ts">

</script>

<template>
  <div class="vw-100 vh-100 d-flex">
    <AppNavLeft/>
    <AppMain>
      <template #header>
        <AppHeader/>
      </template>
      <slot/>
    </AppMain>
  </div>
</template>

<style scoped>

</style>