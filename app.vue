<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
<script setup lang="ts">
const isMobile = ref(false)
provide('isMobile', isMobile)

onMounted(() => {

  isMobile.value = window.innerWidth < 768
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768
  })
})
</script>

<style>
.dp__action_row {
  justify-content: center !important;
}
</style>