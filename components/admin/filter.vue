<script setup lang="ts">
import {Icon} from "@iconify/vue"
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {onMounted} from "vue";
import {CityService} from "~/service/city";

const startDate = new Date();
const endDate = new Date(new Date().setDate(startDate.getDate() + 7));

interface ICity {
  id: string
  name: string
  status: boolean
  list?: []
}

interface objSave {
  diemDon: ICity[],
  diemDen: ICity[],
  soGhe?: number,
  ngayDi?: string,
  ngayVe?: string,
  hoTen:string,
  soDienThoai:string,
  giaChuyenDi:number,
}

const objSave = reactive<objSave>({
  diemDon: [],
  diemDen: [],
  hoTen:"",
  soDienThoai:"",
  giaChuyenDi:0
})
const listCities = ref([])
const date = ref([startDate, endDate])
onMounted(async () => {
  //@ts-ignore
  listCities.value = await new CityService().getList()
  listCities.value = listCities.value.filter((item: ICity) => item.status == true)
})
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
    }
  } else {
    objSave.diemDen = obj
    console.log(obj.map((item: ICity) => item.name).join('-'))
  }
}

</script>

<template>
  <div class="d-lg-none d-flex">
    <button class="btn ms-auto btn-outline-dark btn-sm py-2" type="button" data-bs-toggle="offcanvas"
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
          <div class="row">
            <div class="col-lg-3">
              <input type="text" class="form-control py-2" placeholder="Nhập từ khóa">
            </div>
            <div class="col-lg-3">
              <UiDropdow :data="listCities" @select="onSelectDon">
                <small>Điểm đón</small>
              </UiDropdow>
            </div>
            <div class="col-lg-3">
              <UiDropdow :data="listCities" @select="onSelectDen">
                <small>Điểm trả</small>
              </UiDropdow>
            </div>
            <div class="col-lg-3">
              <VueDatePicker class="h-100" auto-apply v-model="date" range/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>