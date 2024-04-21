<script setup lang="ts">


import {convertToSlug} from "~/utils";
import {PageService} from "~/service/page";

definePageMeta({
  middleware: ['auth'],
  title: 'Thêm bài viết'
})
useHead({
  title: "Thêm bài viết"
})
const img = ref('/img/no-image.png')
const objSave = reactive({
  title: "",
  slug: "",
  status: true,
  content: "",
  thumbnail: "",
})

watch(() => objSave.title, (value: string) => {
  objSave.slug = convertToSlug(value);
})

function readFile(e: Event) {
  if (!e.target.files || !e.target.files[0]) return;
  const FR = new FileReader();
  FR.addEventListener("load", function (evt) {
    objSave.thumbnail = evt.target.result
  });
  FR.readAsDataURL(e.target.files[0]);

}

async function savePage() {
  try {
    await new PageService().createPage(objSave)
  } catch (e) {
    console.log(e)
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
      <button @click=" savePage() " class="btn-primary btn text-light">
        Lưu bài viết
      </button>
    </div>
  </div>

</template>

<style scoped>

</style>