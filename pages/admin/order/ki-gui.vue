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


</script>

<template>
  <div class="row">
    <div class="col-12">
      <admin-filter @change="onChange"/>
    </div>
  </div>
  <template v-if="!loading">
    <div class="row mt-3">
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
              <td>{{ order.service.service_name }}</td>
              <td>{{ order.destination.city.concat("-").concat(order.destination.district) }}</td>
              <td>
                {{ order.departure.city.concat("-").concat(order.departure.district) }}
              </td>
              <td>{{ Money(order.price_guest) }}</td>
              <td>{{ Money(order.price) }}</td>
              <td>{{ Money(order.price_system) }}</td>
              <td>
                <span class="badge bg-primary"> {{ order.status_name }}</span>
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