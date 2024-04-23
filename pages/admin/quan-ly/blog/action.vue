<script setup lang="ts">


import {convertToSlug} from "~/utils";
import {PageService} from "~/service/page";
import {UploadService} from "~/service/upload";

definePageMeta({
  middleware: ['auth'],
  title: 'Thêm bài viết'
})
useHead({
  title: "Thêm bài viết"
})
const img = ref('/img/no-image.png')
var objSave = ref({
  title: "",
  slug: "",
  status: true,
  content: "",
  thumbnail: "",
})
const file = ref<File>()
const route = useRoute()
const oldObj = ref()

watch(() => objSave.value.title, (value: string) => {
  objSave.value.slug = convertToSlug(value);
})

const editMode = computed(() => Boolean(route.query.edit))
onMounted(async () => {
  if (editMode.value) {
    objSave.value = await new PageService().getDetail(route.query.edit as string)
    oldObj.value = JSON.parse(JSON.stringify(objSave.value))
  }
})

function readFile(e: Event) {
  if (!e.target.files || !e.target.files[0]) return;
  const FR = new FileReader();
  FR.addEventListener("load", function (evt) {
    objSave.value.thumbnail = evt.target.result
  });
  file.value = e.target.files[0]
  FR.readAsDataURL(e.target.files[0]);
}

async function savePage() {
  if (!editMode.value) {
    try {
      if (file.value) {
        const res = await new UploadService().upload(file.value)
        objSave.value.thumbnail = res[0]
      }
      await new PageService().createPage(objSave.value)
      useNuxtApp().$toast.success("Thêm bài viết thành công")
      useRouter().push('/admin/quan-ly/blog')
    } catch (e) {
      console.log(e)
      useNuxtApp().$toast.error("Thêm bài viết thất bại")
    }
  } else {
    try {
      if (file.value) {
        const res = await new UploadService().upload(file.value)
        await new UploadService().delete(oldObj.value.thumbnail)
        objSave.value.thumbnail = res[0]
      }
      await new PageService().update(objSave.value)
      useNuxtApp().$toast.success("Cập nhật bài viết thành công")
      useRouter().push('/admin/quan-ly/blog')
    } catch (e) {
      useNuxtApp().$toast.error("Cập nhật bài viết thất bại")
      console.log(e)
    }
  }

}
</script>

<template>
  <div class="row">
    <div class="col-lg-9">
      <div class="card p-3 shadow-sm mt-3 border-0">
        <div class="form-floating mb-3">
          <input v-model="objSave.title" type="text" class="form-control" id="floatingInput"
                 placeholder="name@example.com">
          <label for="floatingInput">Tiêu đề bài viết</label>
        </div>
        <div class="mb-3">
          <AdminEditor v-model="objSave.content"/>
        </div>
      </div>
    </div>
    <div class="col-lg-3 ">
      <div class="card mt-3 border-0 p-3 shadow-sm">
        <h6>Ảnh đại diện bài viết</h6>
        <div class="mb-3">
          <input class="form-control" @change="readFile" accept="image/*" type="file" id="formFile">
        </div>
        <div v-if="objSave.thumbnail">
          <img :src="objSave.thumbnail" class="w-100 object-fit-contain" alt="">
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-12 text-end">
      <button @click="savePage()" class="btn-primary btn text-light">
        Lưu bài viết
      </button>
    </div>
  </div>

</template>

<style scoped>

</style>