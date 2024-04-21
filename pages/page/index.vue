<script setup lang="ts">
import {PageService} from "~/service/page";
import {Param} from "~/service/types/filter";

definePageMeta({
  layout: "blank"
})
const filter = reactive({
  params: new Param({
    page:1,
    limit:12,
    field:"id,slug,name"
  }),
  body: {}
})
const listPage = ref({})
onMounted(async ()=>{
  listPage.value = await new PageService().getList(filter)
})
</script>

<template>
  <h1 class="text-center my-4">Danh sách bài viết</h1>
  <div class="container">
    <div v-if="listPage" class="row g-3 mb-5 row-cols-lg-4 row-cols-md-2 row-cols-1">
      <div class="col" v-for="item in listPage.data">
        <div class="card">
          <div class="ratio ratio-1x1">
            <img src="https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg"
                 class="card-img-top object-fit-cover" alt="...">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{item.title}}</h5>
            <nuxt-link :to="`/page/${item.id}`" class="btn btn-primary text-light">Đọc ngay</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>