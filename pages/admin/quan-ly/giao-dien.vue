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
  <div class="row">
    <div class="col-12">
      <div class="card border-0 mt-3 shadow-sm">
        <div class="card-header">
          Quản lý banner
        </div>
        <div class="card-body">
          <div class="row align-items-center row-cols-5 row-cols-2">
            <div class="col">
              <label class="btn btn-sm btn-outline-dark mt-2 w-100">
                Thêm Banner
                <input type="file" @change="addBanner" class="d-none">
              </label>
            </div>
            <div class="col" v-for="image in listImage">
             <div class="card p-2">
               <div class="ratio ratio-16x9">
                 <img class="w-100" :src="image" alt="">
               </div>
               <div class="d-flex gap-3  mt-2">
                 <label class="btn btn-sm btn-outline-dark w-100">
                   Thay Banner
                   <input type="file" @change="(e)=>onChanged(e,image)" class="d-none">
                 </label>
                 <button @click="deleteBaner(image)" class="btn text-nowrap btn-sm btn-outline-danger">
                   Xóa banner
                 </button>
               </div>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>