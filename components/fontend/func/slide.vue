<script setup lang="ts">

const  listImage = ref([
    "https://i.pinimg.com/originals/63/45/08/6345088e1d1a622a2c0996122a187ee0.jpg",
    "https://i.pinimg.com/originals/07/21/1b/07211b078ab5e9f537a3daeccef72279.jpg",
    "https://i.pinimg.com/originals/f4/91/be/f491be409b7f2101b73bc44d84eca03f.jpg"
])
</script>

<template>
  <section class="container my-5">
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div data-bs-interval="2000" :class="`carousel-item ratio ratio-16x9 ${index == 0 && 'active'}`" v-for="(img , index) in listImage">
          <img :src="img" class="d-block w-100 object-fit-cover" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
</template>

<style scoped>

</style>