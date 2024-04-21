<script setup lang="ts">
import {PageService} from "~/service/page";

definePageMeta({
  layout: "blank"
})
const route = useRoute()
const page = ref()
onMounted(async ()=>{
  page.value = await new PageService().getDetail(route.params.id)
  console.log(page.value)
})
</script>

<template>
  <div class="container" v-if="page">
    <h1 class="my-5 text-center">
      {{page.title}}
    </h1>
    <div v-html="page.content">

    </div>
    <div class="text-center my-3">
      <nuxt-link to="/page">Quay lại</nuxt-link>
    </div>
  </div>
</template>

<style scoped>

</style>