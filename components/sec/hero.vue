<script setup lang="ts">

import { Modal } from "bootstrap";

const myModal = ref()

interface IDB {
  banner?: string[];
  index_banner?: string
}

onMounted(() => {
  initModal()
})

const image = ref("/img/banner.png")

const DB = ref<IDB>({})
getDb(() => {
  image.value = DB.value.index_banner || "/img/banner.png"
})

async function getDb(callback: () => void) {
  const data = await $fetch('/api/json')
  if (data) {
    DB.value = data
    callback()
  }
}

onMounted(() => {
  initModal()
})

function initModal() {
  myModal.value = new Modal('#myModal', {
    keyboard: false,
    backdrop: "static"
  })
}


const show = ref(true)

function hideModal() {
  myModal.value.hide()
  show.value = true
}
</script>

<template>
  <section class="min-vh-100 position-relative">
    <div class="position-absolute w-100 h-100 bg-custom" :style="`background-image:url('${image}')`">
    </div>
    <div class="container min-vh-100 py-5" style="z-index: 10;">
      <div class="row mb-4">
        <div class="col-12" style="position: relative;z-index: 99">
          <h1 class="text-white text-uppercase text-center">
            Dịch Vụ Xe Ghép, Xe Tiện Toàn Chuyến Hà Nội - Hải Phòng - Quảng Ninh Giá Rẻ, An Toàn, Uy Tín
          </h1>
        </div>
      </div>
      <div class="row g-2 align-items-center">
        <div class="col-xl-7 col-lg-9" style="position: relative;z-index: 99">
          <div v-if="show" class="card bg-light bg-opacity-75 card-body border-0" style="backdrop-filter: blur(4px)">
            <fontend-func-xe-ghep @success="() => { myModal.show(); show = false }" />
          </div>
        </div>
        <div class="col-xl-5 col-lg-3">
          <fontend-func-fake-order />
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center mt-5" style="position: relative;z-index: 99">
          <a href="tel:+84 0972970000" class="btn btn-lg btn-light">
            Liên Hệ Tư Vẫn Ngay
          </a>
        </div>
      </div>
    </div>
  </section>
  <div class="modal" style="z-index: 9999999;" id="myModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-body">
          <h5 class="text-center text-success">Thông báo</h5>
          <div class="ratio ratio-1x1">
            <img src="https://i.ibb.co/9TsfdxX/Th-nh-c-ng.png" alt="">
          </div>
          <p class="text-center">Đặt xe thành công, tài xế sẽ liên lạc với quý khách trong thời gian sớm nhất</p>
          <div class="text-center">
            <button @click="hideModal" class="btn btn-success">
              Đã hiểu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-check:checked+.btn {
  color: white !important;
}

.bg-custom {
  background: black;
  transition: 0.4s;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  backdrop-filter: blur(2px);
}

.bg-custom:after {
  content: "";
  position: absolute;
  bottom: -39px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;
  border-top: 40px solid #000000;
  z-index: -1;
}
</style>