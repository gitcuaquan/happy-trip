<script setup lang="ts">
import {PageService} from "~/service/page";
import {Param} from "~/service/types/filter";
import {Icon} from "@iconify/vue"
import {UploadService} from "~/service/upload";
import VPagination from "@hennge/vue3-pagination";

const filter = reactive({
  params: new Param({
    page: 1,
    limit: 12,
    field: "id,slug,created_at,status,thumbnail,title"
  }),
  body: {}
})
const listPage = ref({})
onMounted(async () => {
  getPage()
})

async function getPage() {
  try {
    listPage.value = await new PageService().getList(filter)
  } catch (e) {
    console.log(e)
  }
}

async function deletePage(item: any) {
  await new UploadService().delete(item.thumbnail)
  try {
    await new PageService().delete(item.id)
    useNuxtApp().$toast.success("Xóa bài viết thành công")
    await getPage()
  } catch (e) {
    console.log(e)
    useNuxtApp().$toast.error("Xóa bài viết thất bại")
  }
}
function updateHandler(page:number){

}
</script>

<template>
  <div class="row mt-3">
    <div class="col-12 text-end">
      <nuxt-link to="/admin/quan-ly/blog/action" class="btn btn-primary text-light">Tạo Mới</nuxt-link>
    </div>
    <div class="col-12">
      <div class="card border-0 shadow-sm p-3">
        <template v-if="listPage?.data?.length">
          <table class="table align-middle">
            <thead>
            <tr>
              <th scope="col">Ảnh đại diện</th>
              <th scope="col">Tiêu đề bài viêt</th>
              <th scope="col">Ngày tạo</th>
              <th scope="col">Trạng thái</th>
              <th scope="col" class="text-end">Hành động</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in listPage?.data">
              <td>
                <img :src="item.thumbnail" style="width: 30px" alt="">
              </td>
              <td>
                {{ item.title }}
              </td>
              <td>
                {{ item.created_at }}
              </td>
              <td>
              <span class="badge bg-success" v-if="item.status">
                  Đang hoạt động
              </span>
                <span class="badge bg-danger" v-else>
                 Đã ẩn
              </span>
              </td>
              <td class="text-end">
                <button @click="deletePage(item)" class="btn btn-sm p-1 border-0 btn-outline-danger">
                  <Icon icon="mdi:delete-outline" class="fs-4"/>
                </button>
                <nuxt-link :to="`/admin/quan-ly/blog/action?edit=${item.id}`" class="btn btn-sm p-1 border-0 btn-outline-dark">
                  <Icon icon="mdi:edit-box-outline" class="fs-4"/>
                </nuxt-link>
              </td>
            </tr>
            </tbody>
          </table>
        </template>
        <div v-else>
            <div class="card border-0 text-center p-5">
                Không có dữ liệu
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
  </div>

</template>

<style scoped>

</style>