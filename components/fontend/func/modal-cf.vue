<template>
  <div class="modal" style="z-index: 9999999" id="myModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-body p-4 text-center">
          <h5 class="mb-3">Nhập OTP</h5>
          <p>
            Chúng tôi đã gửi OTP về số điện thoại bạn đặt của bạn vui lòng nhập
            vào đây
          </p>
          <input
            type="text"
            class="form-control mb-3"
            placeholder="Nhập vào OTP"
          />
        </div>
        <div class="modal-footer flex-nowrap p-0">
          <button
            type="button"
            @click="emit('hide')"
            data-bs-dismiss="modal"
            class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end"
          >
            <strong>Đóng</strong>
          </button>
          <button
            type="button"
            @click="emit('hide')"
            class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0"
            data-bs-dismiss="modal"
          >
            Xác nhận
          </button>
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
