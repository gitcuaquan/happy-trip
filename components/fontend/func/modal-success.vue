<template>
  <div class="modal" style="z-index: 9999999" id="myModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-body">
          <h5 class="text-center text-success">Đặt chuyến đi thành công !</h5>
          <div class="ratio ratio-1x1">
            <img src="/img/Th-nh-c-ng.png" alt="">
          </div>
          <div class="text-center">
            <button data-bs-dismiss="modal" class="btn btn-lg  btn-success fs-6 text-decoration-none">
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


const myModal = ref();

const emit = defineEmits(["hide"]);



onMounted(() => {
  initModal();
});

function initModal() {
  myModal.value = new Modal("#myModal", {
    keyboard: false,
    backdrop: "static",
  });
  myModal.value.show();
}
</script>

<style></style>
