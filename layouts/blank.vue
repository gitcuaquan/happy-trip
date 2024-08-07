<script setup lang="ts">

</script>

<template>
  <fontend-header />
  <div>
    <slot />
  </div>
  <fontend-footer />
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 999999999999">
    <a target="_blank" href="https://zalo.me/0972970000" class="mx-1">
      <img width="35" src="/img/icon-zalo.svg" alt="">
    </a>
    <a target="_blank" href="https://www.facebook.com/share/saJiXTEkoVHMig49/?mibextid=LQQJ4d" class="mx-1">
      <img width="30" src="/img/icon-mess.svg" alt="">
    </a>
    <a target="_blank" href="tel:0972970000" class="mx-1">
      <img width="30" src="/img/phone-call-icon.svg" alt="">
    </a>
  </div>
</template>

<style scoped></style>