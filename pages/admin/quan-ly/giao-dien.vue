<script setup lang="ts">
import {UploadService} from "~/service/upload";

const listImage = ref([])
getBanner()

async function onChanged(event: Event, img: string) {
  try {
    const res = await new UploadService().upload(event.target.files[0])
    const index = listImage.value.findIndex(item => item == img)
    if (index != -1) {
      await new UploadService().delete(listImage.value[index])
      listImage.value[index] = res[0]
    }
    const {data} = await useFetch('/api/json', {
      method: "POST",
      body: {banner: listImage.value}
    })
    getBanner()
    useNuxtApp().$toast.success('Cập nhật banner thành công')
  } catch (e) {
    console.log(e)
    useNuxtApp().$toast.error('Cập nhật banner thất bại')
  }
}

async function addBanner(event: Event) {
  try {
    const res = await new UploadService().upload(event.target.files[0])
    listImage.value.push(res[0])
    const {data} = await useFetch('/api/json', {
      method: "POST",
      body: {banner: listImage.value}
    })
    getBanner()
    useNuxtApp().$toast.success('Thêm banner thành công')
  }catch (e) {
    useNuxtApp().$toast.error('Thêm banner thất bại')
    console.log(e)
  }
}
async function deleteBaner(img:string){
  try {
    const index = listImage.value.findIndex(item => item == img)
    await new UploadService().delete(listImage.value[index])
    listImage.value.splice(index, 1)
    const {data} = await useFetch('/api/json', {
      method: "POST",
      body: {banner: listImage.value}
    })
    getBanner()
    useNuxtApp().$toast.success('Xóa banner thành công')
  }catch (e) {
    useNuxtApp().$toast.error('Xóa banner thất bại')
    console.log(e)
  }
}

async function getBanner() {
  const data = await $fetch('/api/json')
  console.log(data)
  if (data) {
    listImage.value = data.banner
  }
}

</script>

<template>
  <div class="row g-3">
    <div class="col-12">
      <admin-manager-banner />
    </div>
    <div class="col-12">
      <admin-manager-hero />
    </div>
  </div>
</template>

<style scoped>

</style>