<script setup lang="ts">
import {UploadService} from "~/service/upload";

interface IDB {
  banner?: string[];
  index_banner?: string
}

const image = ref("/img/banner.png")

const DB = ref<IDB>({})
getDb(() => {
  image.value = DB.value.index_banner || "/img/banner.png"
})

async function getDb(callback?: () => void) {
  const data = await $fetch('/api/json')
  if (data) {
    DB.value = data
    if (callback) callback()
  }
}

async function saveDB(data: any, callback?: () => void) {
  await useFetch('/api/json', {
    method: "POST",
    body: data
  })
}

async function onChanged(event: Event) {
  try {
    const res = await new UploadService().upload(event.target.files[0])
    await new UploadService().delete(image.value)
    DB.value.index_banner = res[0]
    saveDB(DB.value, () => getDb(()=>{
      image.value = DB.value.index_banner || "/img/banner.png"
    }))
    useNuxtApp().$toast.success('Thay đổi thành công')
  } catch (e) {
      useNuxtApp().$toast.error('Thay đổi thất bại')
  }
}
</script>

<template>
  <div class="card border-0 mt-3 shadow-sm">
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-lg-5">
          <h5 class="ms-3">Ảnh trang chủ</h5>
          <label class="btn ms-3 mb-3 btn-sm btn-outline-dark">
            Thay ảnh
            <input type="file" @change="onChanged" accept="image/*" class="d-none">
          </label>
          <ol>
            <li>
              Chủ ý ảnh tiêu chuẩn có ratio 16:9 (1920 x 1080)
            </li>
            <li>
              Ảnh nên có phần dưới màu đen để không bị lộ mũi tên
            </li>
          </ol>

        </div>
        <div class="col-lg-7">
          <div class="ratio ratio-21x9">
            <img :src="image" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>