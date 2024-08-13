<template>
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
            <button @click="()=>{
              myModal.hide();
              emit('hide');
            }" class="btn btn-success">
              Đã hiểu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { Modal } from "bootstrap";

const myModal = ref()

const emit = defineEmits(["hide"])

onMounted(() => {
  initModal()
})

function initModal() {
  myModal.value = new Modal('#myModal', {
    keyboard: false,
    backdrop: "static"
  })
  myModal.value.show()
}

</script>

<style></style>