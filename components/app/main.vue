<script setup lang="ts">

</script>

<template>
  <main class="container-fluid px-0">
    <slot name="header" ></slot>
    <div class="px-3 overflow-auto">
      <slot/>
    </div>
  </main>
</template>

<style scoped>

</style>