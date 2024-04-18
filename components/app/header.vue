<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {AuthService} from "~/service/auth";

const route = useRoute()

</script>

<template>
  <header class="w-100 p-2 bg-light align-items-center shadow-sm gap-2 d-flex start-0">
    <button type="button" data-bs-toggle="offcanvas" data-bs-target="#app-nav" class="btn-sm d-lg-none d-flex p-1 btn">
      <Icon icon="mdi:menu"/>
    </button>
    <div class="fw-semibold ps-3 text-primary">
      {{ route.meta.title ?? "Trang không xác định" }}
    </div>
    <div class="position-relative ms-auto">
      <button class="btn btn-sm  border-0 btn-light ms-auto">
        <Icon icon="mdi:notifications-none" class="fs-6"/>
      </button>
    </div>
    <div class="dropdown">
      <button type="button" data-bs-toggle="dropdown" class="btn btn-sm border-0 btn-light me-2">
        <Icon icon="tdesign:user-setting" class="fs-6"/>
      </button>
      <ul class="dropdown-menu border-0 shadow-sm">
        <li>
          <a @click="AuthService.logout()" class="dropdown-item d-flex gap-2 align-items-center" href="#">
            <Icon icon="mdi:logout" /> <small>Đăng xuất</small>
          </a>
        </li>

      </ul>
    </div>
  </header>
</template>

<style scoped>

</style>