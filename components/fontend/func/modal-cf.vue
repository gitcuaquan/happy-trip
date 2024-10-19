<template>
  <div class="modal" style="z-index: 9999999" id="myModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <form class="modal-content" @submit.prevent="onSubmit">
        <div class="modal-body p-4 text-center">
          <h5 class="mb-3">Nhập OTP</h5>
          <p>
            Chúng tôi đã gửi OTP về <b>zalo</b> hoặc <b>sms</b> số điện thoại của bạn vui lòng nhập
            vào đây
          </p>
          <input type="text" required v-model="otp" class="form-control mb-3" maxlength="6" placeholder="Nhập vào OTP" />
          <p v-if="err" class="text-danger">
            OTP không chính xác vui lòng kiểm tra lại
          </p>
        </div>
        <div class="modal-footer flex-nowrap p-0">
          <button type="button" @click="emit('hide')" data-bs-dismiss="modal"
            class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end">
            <strong>Đóng</strong>
          </button>
          <button type="submit" target="form"
            class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0">
            Xác nhận
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Modal } from "bootstrap";
import { OrderService } from "~/service/order";

const myModal = ref();

const emit = defineEmits(["hide", "success"]);

const err = ref(false);
const otp = ref("")
const orderService = new OrderService()

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

async function onSubmit() {
  err.value = false
  try {
    const res = await orderService.confirmOTP(otp.value)
    emit('success')
  } catch (e) {
    console.log(e)
    err.value = true
  }
}
</script>

<style></style>
