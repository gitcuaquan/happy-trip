<script setup lang="ts">
import {onMounted} from "vue";
import {CityService} from "~/service/city";
import {Icon} from "@iconify/vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {Service} from "~/service/service";
import {IBooking, OrderService} from "~/service/order";
import {convertDate} from "~/utils";
import obj from "svgo/lib/svgo/css-select-adapter";

const listCities = ref([])
const service = ref()

interface IOrder {
  service_name?: string,
  address_from_name?: string,
  address_to_name?: string,
  date_go?: string,
  date_back?: string,
  fullname?: string,
  phone?: string,
  note?: string,
  from_address?: string,
  from_province?: string,
  to_province?: string,
  to_address?: string,
}

const objPreview = reactive<IOrder>({})
const loading = ref(false)
const tamtinh = ref(0)
const objTemp = ref()

const DiemDon = computed(() => {
  var value = "Điểm đón"
  if (objPreview.from_province && objPreview.from_address) {
    value = objPreview.from_province.concat("-").concat(objPreview.from_address)
  }
  return value
})
const DiemDen = computed(() => {
  var value = "Điểm đến"
  if (objPreview.to_province && objPreview.to_address) {
    value = objPreview.to_province.concat("-").concat(objPreview.to_address)
  }
  return value
})
const time = ref()

interface ICity {
  id: string
  name: string
  status: boolean
  list?: []
}

onMounted(async () => {
  //@ts-ignore
  listCities.value = await new CityService().getList()
  listCities.value = listCities.value.filter((item: ICity) => item.status == true)
  service.value = await new Service().getList()
  objPreview.service_name = service.value.data[0].name
})

watch(() => objPreview.phone, () => {
  clearTimeout(time.value)
  time.value = setTimeout(async () => {
    await onPreview()
  }, 1000)
})
watch(() => [objPreview.service_name, objPreview.date_go, objPreview.date_back, objPreview.from_province, objPreview.to_province], () => {
  if (objPreview.date_go) {
    onPreview()
  }
})

async function onPreview() {
  loading.value = true
  try {
    const res = await new OrderService().preview(objPreview)
    objTemp.value = res
    const prices = res.service.prices
    const item = prices.find((item: any) => item.departure.city == objPreview.from_province
        && item.departure.district == objPreview.from_address
        && item.destination.city == objPreview.to_province
        && item.destination.district == objPreview.to_address
    )
    tamtinh.value = item
  } catch (e) {
    useNuxtApp().$toast.error(`<small>${e.data}</small>`, {
      dangerouslyHTMLString: true,
      "theme": "colored",
    });
  } finally {
    loading.value = false
  }
}

async function onSelectDon(obj: ICity[]) {
  if (obj.length == 1) {
    // @ts-ignore
    const item: ICity = listCities.value.find((item: ICity) => item.id == obj[0].id)
    if (!item?.list) {
      const res = await new CityService().getDeatail(obj[0].id)
      // @ts-ignore
      item.list = res.districts.filter((district: ICity) => district.status == true)
    }
  } else {
    objPreview.from_province = obj[0].name
    objPreview.from_address = obj[1].name
  }
}

async function onSelectDen(obj: any) {
  if (obj.length == 1) {
    // @ts-ignore
    const item: ICity = listCities.value.find((item: ICity) => item.id == obj[0].id)
    if (!item?.list) {
      const res = await new CityService().getDeatail(obj[0].id)
      // @ts-ignore
      item.list = res.districts.filter((district: ICity) => district.status == true)
    }
  } else {
    objPreview.to_province = obj[0].name
    objPreview.to_address = obj[1].name
  }
}

async function createOrder() {
  try {
    objPreview.date_go = convertDate(objPreview.date_go)
    objPreview.date_back = convertDate(objPreview.date_back)
    const res = await new OrderService().createOrder(objPreview)
    useNuxtApp().$toast.success(`<small>Đặt xe thành công</small>`, {
      dangerouslyHTMLString: true,
      "theme": "colored",
    });
  } catch (e) {
    useNuxtApp().$toast.error(`<small>${e.data}</small>`, {
      dangerouslyHTMLString: true,
      "theme": "colored",
    });
  }
}
</script>

<template>
  <div class="row g-2 mt-3">
    <div class="col-lg-6">
      <div>
        <UiDropdow :data="listCities" @select="onSelectDon">
          <small>{{ DiemDon }}</small>
        </UiDropdow>
      </div>
      <input type="text" v-model="objPreview.address_from_name" placeholder="Chi tiết điểm đón"
             class="form-control mt-2">
    </div>
    <!--  Điếm đến  -->
    <div class="col-lg-6">
      <div>
        <UiDropdow :data="listCities" @select="onSelectDen">
          {{ DiemDen }}
        </UiDropdow>
      </div>
      <input type="text" v-model="objPreview.address_to_name" placeholder="Chi tiết điểm trả"
             class="form-control mt-2">
    </div>
    <!--  Số lượng ghế  -->
    <div class="col-lg-4">
      <template v-if="service?.data">
        <select v-model="objPreview.service_name" class="form-control">
          <option :value="item.service_name" v-for="item in service.data">
            {{ item.name }}
          </option>
        </select>
      </template>
    </div>
    <!--  Thời gian khởi hành  -->
    <div class="col-lg-4">
      <VueDatePicker placeholder="Chọn ngày đi" auto-apply :min-date="new Date()"
                     v-model="objPreview.date_go"></VueDatePicker>
    </div>
    <div class="col-lg-4">
      <VueDatePicker placeholder="Chọn ngày về" auto-apply :min-date="new Date()"
                     v-model="objPreview.date_back"></VueDatePicker>
    </div>
    <div class="col-lg-6">
      <div class="input-group border rounded">
        <span class="input-group-text bg-light border-0" id="basic-addon1"><Icon icon="mdi:user-tie"
                                                                                 class="fs-5"/></span>
        <input type="text" v-model="objPreview.fullname" class="form-control bg-light border-0"
               placeholder="Họ và Tên">
      </div>
    </div>
    <div class="col-lg-6">
      <div class="input-group border rounded">
        <span class="input-group-text bg-light border-0" id="basic-addon1">
          <Icon icon="mdi:cellphone" class="fs-5"/></span>
        <input type="text" v-model="objPreview.phone" class="form-control bg-light border-0" inputmode="numeric"
               placeholder="Số điện thoại">
      </div>
    </div>
    <div class="col-12">
      <input type="text" v-model="objPreview.note" class="form-control" placeholder="Ghi chú cho tài xế">
    </div>
    <div class="col-12">
      <div class="d-flex bg-light align-items-center p-2 border rounded gap-2">
        <Icon icon="mingcute:bill-2-line" class="fs-5"/>
        Giá chuyển đi:
        <b v-if="!loading">{{ Money(tamtinh?.price_guest | 0) }}</b>
        <p v-else class="card-text placeholder-glow  m-0">
          <span class="placeholder col-8 p-2" style="width: 100px"></span>
        </p>
      </div>
    </div>
  </div>
  <div class="text-center my-4">
    <button @click="createOrder" :disabled="loading" class="btn btn-primary text-light">
      <Icon icon="entypo:paper-plane"/>
      Đặt xe ngay
      <div v-if="loading" class="spinner-border spinner-border-sm text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </button>
  </div>
  <div class="alert alert-info d-flex gap-1 align-items-center" role="alert">
    <div>
      <Icon icon="mdi:information-variant-circle" class="fs-4"/>
    </div>
    Đối với các điểm xa trung tâm sẽ báo phí ngay trước khi khởi hành
  </div>
</template>

<style scoped>
.btn-check:checked + .btn {
  color: white !important;
}
</style>