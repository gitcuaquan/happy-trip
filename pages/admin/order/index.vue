<script setup lang="ts">
import {Icon} from "@iconify/vue"
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import {FilterType, Pagination, Param} from "~/service/types/filter";
import {IBooking, OrderService} from "~/service/order";
import {formatDate} from "~/utils";

definePageMeta({
  middleware: ['auth'],
  title: 'Đơn hàng chưa có tài xế'
})
useHead({
  title: 'Đơn hàng chưa có tài xế'
})
const loading = ref(true)
const isMobile = inject('isMobile')

const filter = reactive({
  param: new Param(),
  body: new FilterType({have_partner: false})
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
  loading.value = true
  try {
    listOrder.value = await new OrderService().listOder(filter) as ListOrder
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

function onChange(obj: FilterType) {
  filter.body = obj
  getListOrderAsync()
}


</script>

<template>
  <div class="row">
    <div class="col-12">
      <admin-filter @change="onChange"/>
    </div>
  </div>
  <template v-if="!loading">
    <div v-if="!isMobile" class="row mt-3">
      <div class="col-12 overflow-auto py-3 position-relative">
        <div class="card p-3  border-0 shadow-sm ">
          <table v-if="listOrder?.data?.length" class="table">
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
              <td>{{ Money(order.price_guest) }}</td>
              <td>{{ Money(order.price) }}</td>
              <td>
                <div style="max-width: 200px;overflow: hidden">
                    {{order.note || 'Không có ghi chú'}}
                </div>
              </td>
              <td class="text-center">
                <button title="Nhận chuyến" class="btn btn-sm btn-outline-success">
                  <Icon icon="mdi:car-2-plus" class="fs-6"/>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
          <div v-else class="card p-4 border-0  text-center">
            Không có dữ liệu
          </div>
        </div>
      </div>
    </div>
    <template v-else>
      <div v-for="order in listOrder.data" class="card p-2 border-0 my-2 shadow-sm">
        <div class="d-flex align-items-start justify-content-between">
          <div class="d-flex  flex-column gap-1">
            <small class="badge border text-dark">{{ order.service.service_name }}</small>
            <small class="badge bg-info text-dark bg-opacity-10 border border-info">19-02-2024 11:42</small>
          </div>
          <div class="d-flex flex-column">
            <button class="btn text-white btn-primary btn-sm">
              <small> Nhận chuyến</small>
            </button>
            <small class="badge border  mt-1 text-dark">{{ order.short_id }}</small>
          </div>
        </div>
        <div class="d-flex flex-column gap-2">
          <div class="d-flex align-items-center  gap-1">
            <Icon icon="mdi:map-marker-radius" class="fs-3"/>
            <small>{{ order.departure.city.concat("-").concat(order.departure.district) }}</small>
          </div>
          <div class="d-flex align-items-center gap-1">
            <Icon icon="mdi:map-check-outline" class="fs-3 text-success"/>
            <small>{{ order.destination.city.concat("-").concat(order.destination.district) }}</small>
          </div>

          <textarea class="form-control" rows="2" :value="order.note || 'Không có ghi chú'" disabled>

          </textarea>
         <div class="d-flex">
           <div class="d-flex align-items-start flex-column  gap-1">
             <b class="text-nowrap">Cước thu</b>
             <small>{{ Money(order.price_guest) }}</small>
           </div>
           <div class="d-flex ms-auto align-items-start flex-column  gap-1">
             <b class="text-nowrap">Tài xế nhận</b>
             <small>{{ Money(order.price) }}</small>
           </div>
         </div>
        </div>
      </div>
    </template>
    <div v-if="listOrder?.pagination?.total_page " class="text-end">
      <v-pagination
          v-model="filter.param.page"
          :pages="listOrder?.pagination?.total_page "
          :range-size="1"
          class=" p-2 shadow-sm mb-2 d-inline-flex "
          active-color="#DCEDFF"
          @update:modelValue="updateHandler"
      />
    </div>
  </template>
  <div v-else
       class="card p-5 border-0 bg-secondary bg-opacity-50 justify-content-center align-items-center   w-100 d-flex">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <h6 class="my-3">
      Đang tải
    </h6>
  </div>
</template>

<style scoped>
table * {
  font-size: 12px;
}
</style>