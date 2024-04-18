<script setup lang="ts">
import {onMounted} from "vue";
import {CityService} from "~/service/city";
import {Icon} from "@iconify/vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const listCities = ref([])
const date = ref("")
const isBao1Chieu = ref(true)

const dataDemo = ref([
  {
    id: "ssdajbda",
    name: "Thái nguyên",
    status: true,
  },
  {
    id: "kjhagsdhahsjkdha",
    name: "Hà Nội",
    status: true,
    list: [
      {
        name: "Tây hồ",
        status: true,
      },
      {
        name: "Tây hồ 3",
        status: true,
      },
      {
        name: "Tây hồ 4",
        status: true,
      }
    ]
  },
  {
    id: "lkjahsdahsdkl7568",
    name: "Hà Nội 2",
    status: true,
    list: [
      {
        name: "Tây hồ",
        status: true,
      },
      {
        name: "Tây hồ 3",
        status: true,
      },
      {
        name: "Tây hồ 4",
        status: false,
      }
    ]
  }
])

onMounted(async () => {
  //@ts-ignore
  // listCities.value = await new CityService().getList()
})

</script>

<template>
  <TransitionGroup tag="div" name="fade" class="row g-2 mt-3">

    <!--    Điểm đón-->
    <div class="col-lg-6">
      <UiDropdow :data="dataDemo"/>
    </div>
    <!--  Điếm đến  -->
    <div class="col-lg-6">
      <UiDropdow :data="dataDemo">
        Điểm đến
      </UiDropdow>
    </div>
    <!--  Số lượng ghế  -->
    <div class="col-lg-6">
      <div class="btn-group w-100 bg-light" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check " name="soghe" id="soghe1" autocomplete="off" checked>
        <label class="btn btn-outline-secondary border" for="soghe1">
          Xe 5 chỗ
        </label>
        <input type="radio" class="btn-check " name="soghe" id="soghe2" autocomplete="off">
        <label class="btn btn-outline-secondary border" for="soghe2">
          Xe 7 chỗ
        </label>
        <input type="radio" class="btn-check " name="soghe" id="soghe3" autocomplete="off">
        <label class="btn btn-outline-secondary border" for="soghe3">
          Xe Bán tải
        </label>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="btn-group w-100 bg-light" role="group" aria-label="Basic radio toggle button group">
        <input v-model="isBao1Chieu" :value="true" type="radio" class="btn-check " name="chieudi" id="chieudi1"
               autocomplete="off" checked>
        <label class="btn btn-outline-secondary border" for="chieudi1">
          Bao 1 chiều
        </label>
        <input v-model="isBao1Chieu" :value="false" type="radio" class="btn-check " name="chieudi" id="chieudi2"
               autocomplete="off">
        <label class="btn btn-outline-secondary border" for="chieudi2">
          Bao 2 chiều
        </label>
      </div>
    </div>
    <!--  Thời gian khởi hành  -->
    <div :class="`col-lg-${isBao1Chieu ? '12' :'6'}`">
      <VueDatePicker placeholder="Chọn ngày đi" auto-apply v-model="date"></VueDatePicker>
    </div>
    <div v-if="!isBao1Chieu" class="col-lg-6">
      <VueDatePicker placeholder="Chọn ngày về" auto-apply v-model="date"></VueDatePicker>
    </div>
    <div class="col-lg-6">
      <div class="input-group border rounded">
        <span class="input-group-text bg-light border-0" id="basic-addon1"><Icon icon="mdi:user-tie"
                                                                                 class="fs-5"/></span>
        <input type="text" class="form-control bg-light border-0" placeholder="Họ và Tên">
      </div>
    </div>
    <div class="col-lg-6">
      <div class="input-group border rounded">
        <span class="input-group-text bg-light border-0" id="basic-addon1">
          <Icon icon="mdi:cellphone" class="fs-5"/></span>
        <input type="text" class="form-control bg-light border-0" inputmode="numeric" placeholder="Số điện thoại">
      </div>
    </div>
    <div class="col-12">
      <div class="d-flex bg-light align-items-center p-2 border rounded gap-2">
        <Icon icon="mingcute:bill-2-line" class="fs-5"/>
        Giá chuyển đi: <b>{{ Money(9823) }}</b>
      </div>
    </div>

    <div class="text-center my-4">
      <button class="btn btn-primary text-light">
        <Icon icon="entypo:paper-plane"/>
        Đặt xe ngay
      </button>
    </div>
    <div class="alert alert-info d-flex gap-1 align-items-center" role="alert">
      <div>
        <Icon icon="mdi:information-variant-circle" class="fs-4"/>
      </div>
      Đối với các điểm xa trung tâm sẽ báo phí ngay trước khi khởi hành
    </div>

  </TransitionGroup>
</template>

<style scoped>
.btn-check:checked + .btn {
  color: white !important;
}

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

/* 2. declare enter from and leave to state */
.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>