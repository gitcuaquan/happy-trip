<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  title: 'Trang chủ'
})
useHead({
  title: "Trang chủ"
})

</script>

<template>
  <div class="row">
    <div class="col-12">
      <h1>Trang chủ</h1>
    </div>
  </div>
</template>

<style scoped>

</style>