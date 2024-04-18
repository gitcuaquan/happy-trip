<script setup lang="ts">
import {Icon} from "@iconify/vue"
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import {Pagination, Param} from "~/service/types/filter";
import {IBooking, OrderService} from "~/service/order";
import {formatDate} from "~/utils";

definePageMeta({
  middleware: ['auth'],
  title: 'Đơn hàng chưa có tài xế'
})
useHead({
  title: 'Đơn hàng chưa có tài xế'
})
const page = ref(1)

const filter = reactive({
  param: new Param(),
  body: {}
})

interface ListOrder {
  pagination: Pagination,
  data: IBooking[]
}

const listOrder = ref<ListOrder>()
onMounted(() => {
  getListOrderAsync()
})

const updateHandler = (page: number) => {
  getListOrderAsync()
}
async function getListOrderAsync() {
  try {
    listOrder.value = await new OrderService().listOder(filter) as ListOrder
  } catch (e) {
    console.log(e)
  }
}


</script>

<template>
  <div class="row">
    <div class="col-12">
      <admin-filter/>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-12 overflow-auto position-relative"   style="max-height: 75vh">
      <div class="card p-3 border-0 shadow-sm ">
        <table v-if="listOrder?.data" class="table">
          <thead>
          <tr>
            <th scope="col">Mã chuyến</th>
            <th scope="col">Dịch vụ</th>
            <th scope="col">Điểm đón</th>
            <th scope="col">Điểm trả</th>
            <th scope="col">Ngày đi</th>
            <th scope="col">Cước thu</th>
            <th scope="col">T.xế nhận</th>
            <th scope="col">Ghi chú</th>
            <th scope="col" class="text-center">Hành động</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="order in listOrder.data">
            <th scope="row">{{ order.short_id }}</th>
            <td>{{ order.service.service_name }}</td>
            <td>
              {{ order.departure.city.concat("-").concat(order.departure.district) }}
            </td>
            <td>{{ order.destination.city.concat("-").concat(order.destination.district) }}</td>
            <td>{{ formatDate(order?.date_of_destination) }}</td>
            <td>{{Money(order.price_guest)}}</td>
            <td>{{Money(order.price)}}</td>
            <td>
              <span class="badge bg-primary">Không có ghi chú</span>
            </td>
            <td class="text-center">
              <button title="Nhận chuyến" class="btn btn-sm btn-outline-success">
                <Icon icon="mdi:car-2-plus" class="fs-6"/>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-if="listOrder?.pagination?.total_page " class="sticky-bottom">
    <v-pagination
        v-model="filter.param.page"
        :pages="listOrder?.pagination?.total_page "
        class="mt-3"
        :range-size="1"
        active-color="#DCEDFF"
        @update:modelValue="updateHandler"
    />
  </div>
</template>

<style scoped>
table * {
  font-size: 12px;
}
</style>