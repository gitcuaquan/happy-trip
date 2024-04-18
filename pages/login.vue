<template>
  <section>
    <div class="container vh-100">
      <div class="row h-100 align-items-center">
        <div class="col-lg-5">
          <div class="card border-0 shadow-sm py-5 p-3">
            <h1 class="mb-3 text-center">
              Đăng nhập
            </h1>
            <form class="needs-validation" @submit="onSubmit" autocomplete="off">
              <div class="form-floating mb-3">
                <input v-model="user.phone" required type="text" min="8" max="11"
                       class="form-control rounded-pill px-4 form-control-sm" id="floatingInput"
                       placeholder="name@example.com">
                <label for="floatingInput" class="bg-transparent ms-2">Số điện thoại</label>
              </div>
              <div class="form-floating ">
                <input v-model="user.password" min="6" required :type="`${showPass ?'text' : 'password'}`"
                       class="form-control rounded-pill px-4 form-control-sm" id="floatingInput"
                       placeholder=" ">
                <label for="floatingInput" class="bg-transparent ms-2">Mật khẩu</label>
                <button type="button"
                        @click="showPass = !showPass"
                        class="btn btn-sm btn-outline-light text-dark fs-5 border-0 position-absolute top-50 translate-middle-y me-3 end-0">
                  <Icon :icon="`${showPass ?'mdi:eye-lock' :'mdi:eye'}`"/>
                </button>
              </div>
              <button class="btn mt-3 rounded-pill w-100 btn-outline-primary">
                Đăng nhập
                <Icon icon="material-symbols:login" class="fs-4"/>
              </button>
              <div class="d-flex justify-content-center mt-3">
                <a href="#" class="link-secondary">Đăng ký mới</a>
                <div class="vr mx-3"></div>
                <a href="#" class="link-secondary">Quên mật khẩu</a>
              </div>
            </form>
          </div>
        </div>
        <div class="col-lg-7">

        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import {Icon} from '@iconify/vue';
import {definePageMeta} from "#imports";
import {AuthService} from "~/service/auth";

useHead({
  title: 'Đăng nhập',
})
definePageMeta({
  layout: "noauth"
})
const showPass = ref(false);


const user = reactive({
  phone: "",
  password: ""
})

async function onSubmit(e: Event) {
  e.preventDefault()
  try {
    await new AuthService().login(user)
    useRouter().push('/admin')
  } catch (e) {
    useNuxtApp().$toast.error('Thất bại thông tin không đúng');
    console.log(e)
  }
}


</script>

<style scoped>
.bg-cutom {
  background: rgb(9, 9, 121);
  background: radial-gradient(circle, rgba(9, 9, 121, 1) 0%, rgba(1, 132, 172, 1) 36%, rgba(2, 0, 36, 1) 60%, rgba(0, 212, 255, 1) 100%);
}
</style>