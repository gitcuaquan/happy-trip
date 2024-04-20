<script setup lang="ts">
import {Icon} from "@iconify/vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {onMounted} from "vue";
import {CityService} from "~/service/city";
import {FilterType} from "~/service/types/filter";

const startDate = new Date();
const endDate = new Date(new Date().setDate(startDate.getDate() + 30));

const emits = defineEmits(['change'])

interface ICity {
  id: string
  name: string
  status: boolean
  list?: []
}

const timeOut = ref()
const objectFilter = reactive<FilterType>({
  have_partner:false
})

interface objSave {
  diemDon: ICity[],
  diemDen: ICity[],
  soGhe?: number,
  ngayDi?: string,
  ngayVe?: string,
  hoTen: string,
  soDienThoai: string,
  giaChuyenDi: number,
}

watch(() => objectFilter.keyword, () => {
  clearTimeout(timeOut.value)
  timeOut.value = setTimeout(() => {
    emits('change', objectFilter)
  }, 1000)
})
watch(() => [objectFilter.city_diemdon, objectFilter.city_diemden, objectFilter.from_date_of_destination, objectFilter.to_date_of_destination], () => {
  emits('change', objectFilter)
})

const objSave = reactive<objSave>({
  diemDon: [],
  diemDen: [],
  hoTen: "",
  soDienThoai: "",
  giaChuyenDi: 0
})
const listCities = ref([])
const date = ref([startDate, endDate])
onMounted(async () => {
  //@ts-ignore
  listCities.value = await new CityService().getList()
  listCities.value = listCities.value.filter((item: ICity) => item.status == true)
})
watch(() => date.value, () => {
  const [startDate, endDate] = date.value
  objectFilter.from_date_of_destination = startDate
  objectFilter.to_date_of_destination = endDate

}, {deep: true})

async function onSelectDon(obj: ICity[]) {
  if (obj.length == 1) {
    // @ts-ignore
    const item: ICity = listCities.value.find((item: ICity) => item.id == obj[0].id)
    if (!item?.list) {
      const res = await new CityService().getDeatail(obj[0].id)
      objectFilter.city_diemdon = obj[0].name
      // @ts-ignore
      item.list = res.districts.filter((district: ICity) => district.status == true)
    }
  } else {
    objSave.diemDon = obj
    console.log(obj.map((item: ICity) => item.name).join('-'))
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
      objectFilter.city_diemden = obj[0].name
    }
  } else {
    objSave.diemDen = obj
    console.log(obj.map((item: ICity) => item.name).join('-'))
  }
}

</script>

<template>
  <div class="d-lg-none d-flex">
    <button class="btn ms-auto mt-4 btn-dark btn-sm p-1" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight">
      <Icon icon="mdi:filter-cog" class="fs-4"/>
    </button>
  </div>
  <nav class="navbar mt-lg-2 navbar-expand-lg p-0 bg-light">
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">Bộ lọc</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="card w-100 shadow-sm border-0 p-lg-3">
          <div class="row g-2">
            <div class="col-lg-3">
              <input type="text" v-model="objectFilter.keyword" class="form-control h-100" placeholder="Nhập từ khóa">
            </div>
            <div class="col-lg-3">
              <UiDropdow :selectonly="true" :data="listCities" @select="onSelectDon">
                <small>{{ objectFilter.city_diemdon || 'Điểm đón' }}</small>
                <button @click.self="objectFilter.city_diemdon = ''" class="btn ms-auto btn-sm btn-outline-dark border">
                  Hủy
                </button>
              </UiDropdow>
            </div>
            <div class="col-lg-3">
              <UiDropdow :selectonly="true" :data="listCities" @select="onSelectDen">
                <small>{{ objectFilter.city_diemden || 'Điểm đến' }}</small>
                <button @click.self="objectFilter.city_diemden = ''" class="btn ms-auto btn-sm btn-outline-dark border">
                  Hủy
                </button>
              </UiDropdow>
            </div>
            <div class="col-lg-3">
              <VueDatePicker  auto-apply v-model="date"  range>
                <template #dp-input="{ value, onInput, onEnter, onTab, onClear, onBlur, onKeypress, onPaste, isMenuOpen }">
                  <input type="text" readonly class="form-control" style="height: 45px" :value="value" />
                </template>
              </VueDatePicker>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>