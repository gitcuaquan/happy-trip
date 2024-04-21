<script setup lang="ts">
import {IBooking, OrderService} from "~/service/order";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {CityService} from "~/service/city";
import {Service} from "~/service/service";

definePageMeta({
  middleware: ['auth'],
  title: 'Chi tiết đơn hàng'
})
useHead({
  title: 'Chi tiết đơn hàng'
})

const loading = ref(true)
const service = ref()
const listCities = ref([])
const quanhuyenDon = ref([])
const quanhuyenDen = ref([])
const route = useRoute()
const order = ref()


onMounted(async () => {
  loading.value = true;
  order.value = await new OrderService().detail(route.params.id) as IBooking
  listCities.value = await new CityService().getList()
  listCities.value = listCities.value.filter((item) => item.status == true)
  var thanhphodon = listCities.value.find((item) => item.name == order.value.destination.city)
  var thanhphoden = listCities.value.find((item) => item.name == order.value.departure.city)
  quanhuyenDen.value = await new CityService().getDeatail(thanhphoden.id)
  quanhuyenDon.value = await new CityService().getDeatail(thanhphodon.id)
  service.value = await new Service().getList()
  loading.value = false
})


</script>

<template>
  <div class="row" v-if="!loading">
    <div class="col-lg-8">
      <div class="card border-0 shadow-sm mt-3">
        <div class="card-header">
          <h6>Thông tin khách hàng</h6>
        </div>
        <div class="card-body" v-if="order">
          <div class="row g-2">
            <div class="col-lg-4">
              <div class="form-floating ">
                <input :disabled="route.query.preview" type="text" v-model="(order as IBooking).customer.full_name" class="form-control"
                       id="floatingInput" placeholder=" ">
                <label for="floatingInput">Họ và Tên</label>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-floating ">
                <input :disabled="route.query.preview" type="text" v-model="(order as IBooking).customer.phone" class="form-control" id="floatingInput"
                       placeholder=" ">
                <label for="floatingInput">Số điện thoại</label>
              </div>
            </div>
            <div class="col-lg-4">
              <VueDatePicker :disabled="route.query.preview" auto-apply v-model="order.date_of_destination">
                <template
                    #dp-input="{ value, onInput, onEnter, onTab, onClear, onBlur, onKeypress, onPaste, isMenuOpen }">
                  <div class="form-floating ">
                    <input :disabled="route.query.preview" type="text" readonly :value="value" class="form-control" id="floatingInput" placeholder=" ">
                    <label for="floatingInput">Ngày khởi hành</label>
                  </div>
                </template>
              </VueDatePicker>
            </div>
            <div class="col-lg-6">
              <div class="form-floating">
                <select :disabled="route.query.preview" class="form-select" v-model="order.departure.city" id="floatingSelect"
                        aria-label="Floating label select example">
                  <option :value="item.name" v-for="item in listCities" value="1">
                    {{ item.name }}
                  </option>
                </select>
                <label for="floatingSelect">Thành phố điểm đón</label>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-floating">
                <select :disabled="route.query.preview" class="form-select" v-model="order.destination.city" id="floatingSelect"
                        aria-label="Floating label select example">
                  <option :value="item.name" v-for="item in listCities" value="1">
                    {{ item.name }}
                  </option>
                </select>
                <label for="floatingSelect">Thành phố điểm đến</label>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-floating">
                <select :disabled="route.query.preview" class="form-select" id="floatingSelect" v-model="order.destination.district"
                        aria-label="Floating label select example">
                  <option v-for="item in quanhuyenDon.districts" :value="item.name">
                    {{ item.name }}
                  </option>
                </select>
                <label for="floatingSelect">Quận/Huyện điểm đón</label>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-floating">
                <select :disabled="route.query.preview" class="form-select" id="floatingSelect" v-model="order.departure.district"
                        aria-label="Floating label select example">
                  <option v-for="item in quanhuyenDen.districts" :value="item.name">
                    {{ item.name }}
                  </option>
                </select>
                <label for="floatingSelect">Quận/Huyện điểm đến</label>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-floating ">
                <input :disabled="route.query.preview" type="text" v-model="(order as IBooking).destination.address_1" class="form-control"
                       id="floatingInput" placeholder=" ">
                <label for="floatingInput">Chi tiết điểm đón</label>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-floating ">
                <input :disabled="route.query.preview" type="text" v-model="(order as IBooking).departure.address_1" class="form-control"
                       id="floatingInput" placeholder=" ">
                <label for="floatingInput">Chi tiết điểm trả</label>
              </div>
            </div>
            <div class="col-12">
              <div class="form-floating">
                <textarea  :disabled="route.query.preview" class="form-control" placeholder=" " v-model="order.note" id="floatingTextarea2"></textarea>
                <label for="floatingTextarea2">Ghi chú của khách</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="card mt-3 border-0 shadow-sm">
        <div class="card-header">
          <h6 class="m-0">Thông tin dịch vụ</h6>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-12" v-if="service">
              <div class="form-floating ">
                <select :disabled="route.query.preview" v-model="order.service.service_name" class="form-control">
                  <option :value="item.service_name" v-for="item in service.data">
                    {{ item.name }}
                  </option>
                </select>
                <label for="floatingInput">Dịch vụ</label>
              </div>
            </div>
            <div class="col-12">
              <div class="form-floating ">
                <input :disabled="route.query.preview" type="text" v-model="(order as IBooking).price_guest" class="form-control" id="floatingInput"
                       placeholder=" ">
                <label for="floatingInput">Tiền thu khách</label>
              </div>
            </div>
            <div class="col-12">
              <div class="form-floating ">
                <input :disabled="route.query.preview" type="text" v-model="(order as IBooking).price" class="form-control" id="floatingInput"
                       placeholder=" ">
                <label for="floatingInput">Giá tài xế</label>
              </div>
            </div>
            <div class="col-12">
              <div class="form-floating ">
                <input :disabled="route.query.preview" type="text" v-model="(order as IBooking).price_system" class="form-control" id="floatingInput"
                       placeholder=" ">
                <label for="floatingInput">Phí</label>
              </div>
            </div>
            <div class="col-12">
              <div class="form-floating ">
                <input :disabled="route.query.preview" type="text" v-model="(order as IBooking).net_profit" class="form-control" id="floatingInput"
                       placeholder=" ">
                <label for="floatingInput">Hoa hồng</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-end mt-3">
      <nuxt-link to="/admin/order/ki-gui" class="btn-dark btn">
        Quay lại
      </nuxt-link>
    </div>
  </div>
  <div class="row" v-else>
    <div class="col-12">
     <div class="card p-3 py-5 d-flex justify-content-center align-items-center flex-column gap-2">
       <div class="spinner-border text-primary" role="status">
         <span class="visually-hidden">Loading...</span>
       </div>
          <h6 class="text-center">
            Đang tải ...
          </h6>
     </div>
    </div>
  </div>
</template>

<style scoped>

</style>