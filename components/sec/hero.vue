<script setup lang="ts">

import {Icon} from "@iconify/vue";

const typeService = ref(1)
</script>

<template>
  <section class="min-vh-100 position-relative">
    <div class="position-absolute w-100 h-100 bg-custom">
    </div>
    <div class="container min-vh-100 py-5" style="z-index: 10;">
      <div class="row g-2 min-vh-100 align-items-center">
        <div class="col-xl-7 col-lg-9">
          <div class="card bg-light bg-opacity-75 card-body border-0" style="backdrop-filter: blur(4px)">
            <fontend-func-xe-ghep />
          </div>
        </div>
        <div class="col-xl-5 col-lg-3">
          <fontend-func-fake-order />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.btn-check:checked + .btn {
  color: white !important;
}

.bg-custom {
  background: black;
  background-image: url('/img/banner.png');
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