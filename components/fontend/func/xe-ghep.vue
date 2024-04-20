<script setup lang="ts">
import {onMounted} from "vue";
import {CityService} from "~/service/city";
import {Icon} from "@iconify/vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {Service} from "~/service/service";
import {IBooking, OrderService} from "~/service/order";

const listCities = ref([])
const service = ref()
const date = ref("")

interface objPreview {
  id_service?: string,
  full_name?: string,
  phone?: string,
  price_guest?: number,
  note?: string,
  departure_city?: string,
  departure_dictrict?: string,
  destination_city?: string,
  destination_dictrict?: string,
  date_of_destination?: string,
  date_of_return?: string,
}

const objPreview = reactive<objPreview>({
  full_name: "",
  phone: ""
})
const tamtinh = ref(0)
const objTemp = ref()

const DiemDon = computed(() => {
  var value = "Điểm đón"
  if (objPreview.departure_city && objPreview.departure_dictrict) {
    value = objPreview.departure_city.concat("-").concat(objPreview.departure_dictrict)
  }
  return value
})
const DiemDen = computed(() => {
  var value = "Điểm đến"
  if (objPreview.destination_city && objPreview.destination_dictrict) {
    value = objPreview.destination_city.concat("-").concat(objPreview.destination_dictrict)
  }
  return value
})

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
  objPreview.id_service = service.value.data[0].id
})

watch(() => [objPreview.id_service, objPreview.destination_dictrict, objPreview.departure_dictrict], () => {
  onPreview()
})

async function onPreview() {
  try {
    const res = await new OrderService().preview(objPreview)
    objTemp.value = res
    const prices = res.service.prices
    const item = prices.find((item: any) => item.departure.city == objPreview.departure_city
        && item.departure.district == objPreview.departure_dictrict
        && item.destination.city == objPreview.destination_city
        && item.destination.district == objPreview.destination_dictrict
    )
    tamtinh.value = item
  } catch (e) {
    console.log(e)
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
    objPreview.departure_city = obj[0].name
    objPreview.departure_dictrict = obj[1].name
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
    objPreview.destination_city = obj[0].name
    objPreview.destination_dictrict = obj[1].name
  }
}

async function createOrder() {
  try {
    // const orderSave: IBooking = {
    //   customer: {
    //     full_name: objPreview.full_name,
    //     phone: objPreview.phone
    //   },
    //   departure: {
    //     city: objPreview.departure_city,
    //     district: objPreview.departure_dictrict,
    //     country_code: "VN",
    //     country_name: "Việt Nam",
    //   },
    //   date_of_destination: objPreview.date_of_destination && new Date(objPreview.date_of_destination).getTime(),
    //   date_of_return: objPreview.date_of_return && new Date(objPreview.date_of_return).getTime(),
    //   destination: {
    //     city: objPreview.destination_city,
    //     district: objPreview.destination_dictrict,
    //     country_code: "VN",
    //     country_name: "Việt Nam",
    //   },
    //   id_service: objPreview.id_service,
    //   quantity: 1,
    //
    // }

    const res = await new OrderService().createOrder(objPreview)
  } catch (e) {
    console.log(e)
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
      <input type="text" placeholder="Chi tiết điểm đón" class="form-control mt-2">
    </div>
    <!--  Điếm đến  -->
    <div class="col-lg-6">
      <div>
        <UiDropdow :data="listCities" @select="onSelectDen">
          {{ DiemDen }}
        </UiDropdow>
      </div>
      <input type="text" placeholder="Chi tiết điểm trả" class="form-control mt-2">
    </div>
    <!--  Số lượng ghế  -->
    <div class="col-lg-4">
      <template v-if="service?.data">
        <select v-model="objPreview.id_service" class="form-control">
          <option :value="item.id" v-for="item in service.data">
            {{ item.name }}
          </option>
        </select>
      </template>
    </div>
    <!--  Thời gian khởi hành  -->
    <div class="col-lg-4">
      <VueDatePicker placeholder="Chọn ngày đi" auto-apply v-model="objPreview.date_of_destination"></VueDatePicker>
    </div>
    <div class="col-lg-4">
      <VueDatePicker placeholder="Chọn ngày về" auto-apply v-model="objPreview.date_of_return"></VueDatePicker>
    </div>
    <div class="col-lg-6">
      <div class="input-group border rounded">
        <span class="input-group-text bg-light border-0" id="basic-addon1"><Icon icon="mdi:user-tie"
                                                                                 class="fs-5"/></span>
        <input type="text" v-model="objPreview.full_name" class="form-control bg-light border-0"
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
      <div class="d-flex bg-light align-items-center p-2 border rounded gap-2">
        <Icon icon="mingcute:bill-2-line" class="fs-5"/>
        Giá chuyển đi: <b>
        {{ Money(tamtinh?.price_guest | 0) }}</b>
      </div>
    </div>
  </div>
  <div class="text-center my-4">
    <button @click="createOrder" class="btn btn-primary text-light">
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
</template>

<style scoped>
.btn-check:checked + .btn {
  color: white !important;
}
</style>