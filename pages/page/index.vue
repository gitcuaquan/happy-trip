<script setup lang="ts">
import {PageService} from "~/service/page";
import {Param} from "~/service/types/filter";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
definePageMeta({
  layout: "blank"
})
useHead({
  title: "Danh sách bài viết"
})
const filter = reactive({
  params: new Param({
    page:1,
    limit:12,
    field:"id,slug,name,thumbnail,title"
  }),
  body: {}
})
const listPage = ref({})
onMounted(async ()=>{
  listPage.value = await new PageService().getList(filter)
})
function updateHandler(page:number){

}
</script>

<template>
  <h1 class="text-center my-4">Danh sách bài viết</h1>
  <div class="container">
    <div v-if="listPage" class="row g-3 mb-5 row-cols-lg-4 row-cols-md-2 row-cols-1">
      <div class="col" v-for="item in listPage.data">
        <div class="card">
          <div class="ratio ratio-1x1">
            <img :src="item?.thumbnail"
                 class="card-img-top object-fit-cover" alt="...">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{item.title}}</h5>
            <nuxt-link :to="`/page/${item.id}`" class="btn btn-primary text-light">Đọc ngay</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div v-if="listPage?.pagination?.total_page " class="text-end">
      <v-pagination
          v-model="filter.params.page"
          :pages="listPage?.pagination?.total_page "
          :range-size="1"
          class=" p-2 shadow-sm mb-2 d-inline-flex "
          active-color="#DCEDFF"
          @update:modelValue="updateHandler"
      />
    </div>
  </div>

</template>

<style scoped>

</style>