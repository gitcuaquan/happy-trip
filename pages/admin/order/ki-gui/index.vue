<script setup lang="ts">
import {Icon} from "@iconify/vue"
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import {FilterType, Pagination, Param} from "~/service/types/filter";
import {IBooking, OrderService} from "~/service/order";
import {formatDate} from "~/utils";

definePageMeta({
  middleware: ['auth'],
  title: 'Đơn hàng kí gửi'
})
useHead({
  title: 'Đơn hàng kí gửi'
})
const loading = ref(true)
const isMobile = inject('isMobile')

const filter = reactive({
  param: new Param(),
  body: new FilterType()
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
  const user = useCookie('user')
  filter.body.partner_creator_id = user.value?.id
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

function setColor(name: string){
  if(name == 'Chờ tài xế') return 'primary'
  if(name == 'Pending') return 'info'
  return 'dark'
}

</script>

<template>
  <div class="row">
    <div class="col-12">
      <admin-filter @change="onChange"/>
    </div>
  </div>
  <template v-if="!loading">
    <div class="row mt-3" v-if="!isMobile">
      <div class="col-12 overflow-auto py-3 position-relative">
        <div class="card p-3  border-0 shadow-sm ">
          <table v-if="listOrder?.data?.length" class="table align-middle">
            <thead>
            <tr>
              <th scope="col">Mã chuyến</th>
              <th scope="col">Ngày đi</th>
              <th scope="col">Khách hàng</th>
              <th scope="col">Dịch vụ</th>
              <th scope="col">Điểm trả</th>
              <th scope="col">Điểm đón</th>
              <th scope="col">Cước thu</th>
              <th scope="col">T.xế nhận</th>
              <th scope="col">Hoa hồng</th>
              <th scope="col">Trạng thái</th>
              <th scope="col" class="text-center">Hành động</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="order in listOrder.data">
              <th scope="row">{{ order.short_id }}</th>
              <td>{{ formatDate(order?.date_of_destination) }}</td>
              <td>
                {{ order.customer.full_name }}
                <p class="m-0 fst-italic">{{ order.customer.phone }}</p>
              </td>
              <td>{{ order.service.name }}</td>
              <td>{{ order.destination.city.concat("-").concat(order.destination.district) }}</td>
              <td>
                {{ order.departure.city.concat("-").concat(order.departure.district) }}
              </td>
              <td>{{ Money(order.price_guest || 0) }}</td>
              <td>{{ Money(order.price || 0) }}</td>
              <td>{{ Money(order.price_system || 0) }}</td>
              <td>
                <span :class="`badge  bg-${setColor(order.status_name)}`"> {{
                    order.status_name == 'Pending' ? 'Đang tiến hành ' : order.status_name
                  }}</span>
              </td>
              <td class="text-center">
                <div class="dropdown">
                  <button class="btn btn-outline-secondary p-1" type="button" data-bs-toggle="dropdown"
                          aria-expanded="false">
                    <Icon icon="mdi:settings-outline" class="fs-5"/>
                  </button>
                  <ul class="dropdown-menu">
                    <li><nuxt-link class="dropdown-item" :to="`/admin/order/ki-gui/${order.id}?preview=true`">Xem chi tiết</nuxt-link></li>
                    <li v-if="order.status_type == 0"><a class="dropdown-item" href="#">Chỉnh sửa</a></li>
                    <li v-if="order.status_type == 0"><a class="dropdown-item text-danger" href="#">Hủy chuyến</a></li>
                  </ul>
                </div>
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
            <span :class="`badge  bg-${setColor(order.status_name)}`"> {{
                order.status_name == 'Pending' ? 'Đang tiến hành ' : order.status_name
              }}</span>
            <small class="badge border text-dark">{{ order.service.service_name }}</small>
          </div>
          <div class="d-flex flex-column">
            <button class="btn text-white btn-primary btn-sm">
              <small>Hủy chuyến</small>
            </button>
            <small class="badge border  mt-1 text-dark">{{ order.short_id }}</small>
          </div>
        </div>
        <div class="d-flex flex-column gap-2">
          <div class="d-flex align-items-center  gap-1">
            <Icon icon="raphael:customer" class="fs-3"/>
            <small>{{ order.customer.full_name }} (<b>{{ order.customer.phone ?? 'không cung cấp' }}</b>)</small>
          </div>
          <div class="d-flex align-items-center  gap-1">
            <Icon icon="mdi:map-marker-radius" class="fs-3" style="color:#0a5ae6;"/>
            <small>{{ order.departure.city.concat("-").concat(order.departure.district) }}</small>
          </div>
          <div class="d-flex align-items-center gap-1">
            <Icon icon="mdi:map-check-outline" class="fs-3 text-success"/>
            <small>{{ order.destination.city.concat("-").concat(order.destination.district) }}</small>
          </div>
          <div class="d-flex border-top pt-2 gap-2">
            <div class="d-flex align-items-start flex-column  gap-1">
              <b class="text-nowrap">Cước thu</b>
              <small>{{ Money(order.price_guest) }}</small>
            </div>
            <div class="d-flex ms-auto align-items-start flex-column  gap-1">
              <b class="text-nowrap">Tài xế nhận</b>
              <small>{{ Money(order.price) }}</small>
            </div>
            <div class="d-flex ms-auto align-items-start flex-column  gap-1">
              <b class="text-nowrap">Hoa hồng</b>
              <small>{{ Money(order.net_profit) }}</small>
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