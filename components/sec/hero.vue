<script setup lang="ts">
interface IDB {
  banner?: string[];
  index_banner?: string;
}

const image = ref("");

const DB = ref<IDB>({});
getDb(() => {
  image.value = DB.value.index_banner || "";
});

async function getDb(callback: () => void) {
  const data = await $fetch("/api/json");
  if (data) {
    DB.value = data;
    callback();
  }
}
const showModal = ref(false);
const showSuccess = ref(false);

function onHiden() {
  showModal.value = false;
  showSuccess.value = true;
}
</script>

<template>
  <section class="min-vh-100 position-relative">
    <div class="position-absolute w-100 h-100 bg-custom" :style="`background-image:url('${image}')`"></div>
    <div class="container min-vh-100 py-5" style="z-index: 10">
      <div class="row mb-4">
        <div class="col-12" style="position: relative; z-index: 99">
          <h1 class="text-white text-uppercase text-center">
            <slot>
              Dịch Vụ Xe Ghép, Xe Tiện Chuyến Hà Nội - Hải Phòng - Quảng Ninh
              Giá Rẻ, An Toàn, Uy Tín
            </slot>
          </h1>
        </div>
      </div>
      <div class="row g-2 align-items-center">
        <div class="col-xl-7 col-lg-9" style="position: relative; z-index: 99">
          <div class="card bg-light bg-opacity-75 card-body border-0" style="backdrop-filter: blur(4px)">
            <fontend-func-xe-ghep v-if="!showModal" @success="() => {
                showModal = true;
              }
              " />
          </div>
        </div>
        <div class="col-xl-5 col-lg-3">
          <fontend-func-fake-order />
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center mt-5" style="position: relative; z-index: 10">
          <a href="tel:+84 0972970000" class="btn btn-lg btn-light">
            Liên Hệ Tư Vấn Ngay
          </a>
        </div>
      </div>
    </div>

    <client-only>
      <fontend-func-modal-cf v-if="showModal" @success="onHiden" @hide="() => {
          showModal = false;
        }
        " />
      <fontend-func-modal-success v-if="showSuccess" @hide="() => (showSuccess = false)" />
      <!-- <fontend-func-modal-cf /> -->
    </client-only>
  </section>
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
