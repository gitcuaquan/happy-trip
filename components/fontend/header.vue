<script setup lang="ts">

import {Icon} from "@iconify/vue";
</script>

<template>
  <header class="sticky-top">
    <div class="bg-light border-bottom">
      <div class="container d-flex justify-content-center justify-content-lg-end gap-2 py-1">
        <small class="d-flex justify-content-center justify-content-lg-start align-items-center gap-2">
          <Icon icon="ic:baseline-email" class="fs-5"/>
          HAPPYTRIPEXPRESS@GMAIL.COM
        </small>
        <div class="vr d-lg-block d-none"></div>
        <small class="d-lg-flex d-none justify-content-center justify-content-lg-start align-items-center gap-2">
          <Icon icon="mdi:phone" class="fs-6"/>
          HOTLINE : 0972 97 0000
        </small>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container">
        <nuxt-link to="/">
          <img src="/img/logohpt.png" class="logo-header" />
        </nuxt-link>
        <button class="btn btn-sm navbar-toggler px-2 border-0" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent">
          <Icon icon="mdi:menu" class="fs-4"/>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav gap-lg-5 ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <nuxt-link to="/" class="nav-link fw-bold fs-6">Đặt Xe</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="page" class="nav-link fw-bold fs-6">Chính sách</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/#ghep-xe" class="nav-link fw-bold fs-6">Dịch vụ</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/#gioi-thieu" class="nav-link fw-bold fs-6">Giới thiệu</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/#lien-he" class="nav-link fw-bold fs-6">Liên hệ</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.logo-header{
  width:200px;
}
@media (min-width:768px){
  .logo-header{
    width:250px;
  }
}
.nav-item {
  position: relative;
  transition: 0.3s;
}

.nav-item:hover:after {
  width: 100%;
}

.nav-item:after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 0;
  height: 2px;
  transition: 0.3s;
  background: var(--bs-primary);
}
</style>