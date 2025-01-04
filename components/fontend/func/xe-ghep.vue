<script setup lang="ts">
import { onMounted } from "vue";
import { CityService } from "~/service/city";
import { Icon } from "@iconify/vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { Service } from "~/service/service";
import { OrderService } from "~/service/order";
import { convertDate } from "~/utils";
import { da, vi } from "date-fns/locale";
const listCities = ref([]);
const service = ref();

interface IOrder {
  service_name?: string;
  address_from_name?: string;
  address_to_name?: string;
  date_go?: string;
  date_back?: string;
  fullname?: string;
  phone?: string;
  note?: string;
  from_address?: string;
  from_province?: string;
  to_province?: string;
  to_address?: string;
}

const error = ref("");
const minM = ref(0);
const minH = ref(0);

var objPreview = reactive<IOrder>({
  date_go: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
});
const loading = ref(false);
const tamtinh = ref(0);
const objTemp = ref();

const DiemDon = computed(() => {
  var value = "Điểm đón";
  if (objPreview.from_province && objPreview.from_address) {
    value = objPreview.from_province
      .concat("-")
      .concat(objPreview.from_address);
  }
  return value;
});
const DiemDen = computed(() => {
  var value = "Điểm đến";
  if (objPreview.to_province && objPreview.to_address) {
    value = objPreview.to_province.concat("-").concat(objPreview.to_address);
  }
  return value;
});
const time = ref();
const is_check = ref(true);
const route = useRoute();
const timeTmp = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
});
const dateTmp = ref(
  new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()
);

const emits = defineEmits(["success"]);

interface ICity {
  id: string;
  name: string;
  status: boolean;
  list?: [];
}

const handleInternal = (date: any) => {
  const _date = new Date(date);
  const _thisDate = new Date();
  if (_date.getDate() == _thisDate.getDate()) {
    minH.value = _thisDate.getHours();
    minM.value = _thisDate.getMinutes() + 10;
  } else {
    minH.value = 0;
    minM.value = 0;
  }
};

onMounted(() => {
  const date = new Date();
  minH.value = date.getHours();
  minM.value = date.getMinutes() + 10;
  //@ts-ignore
  new CityService().getList((data: any) => {
    listCities.value = data.filter((item: ICity) => item.status == true);
    acceptCity();
  });

  new Service().getList((data: any) => {
    service.value = {
      data: data.data.filter(
        (item: any) =>
          item.id != "66947d1e17482239472ba726" &&
          item.id != "66947d4c17482239472bb61d"
      ),
      pagination: data.pagination,
    };
    objPreview.service_name = service.value.data[0].name;
    acceptService();
  });
});

watch(
  () => [dateTmp.value, timeTmp.value],
  (value) => {
    const [date, time] = value;
    const _date = new Date(dateTmp.value);
    console.log("🚀 ~ watch ~ _date:", _date);
    console.log("🚀 ~ watch ~ obj. _date.getDay():", _date.getDate());
    const obj = {
      day: _date.getDate(),
      month: _date.getMonth(),
      year: _date.getFullYear(),
      hours: time.hours,
      minutes: time.minutes,
    };
    //@ts-ignore
    objPreview.date_go = new Date(
      obj.year,
      obj.month,
      obj.day,
      obj.hours,
      obj.minutes
    );
  }
);

watch(
  () => objPreview.phone,
  () => {
    if (is_check.value) {
      clearTimeout(time.value);
      time.value = setTimeout(async () => {
        await onPreview();
      }, 1000);
    }
  }
);
watch(
  () => objPreview,
  () => {
    checkObj();
  },
  { deep: true }
);

watch(
  () => [
    objPreview.service_name,
    objPreview.date_go,
    objPreview.date_back,
    objPreview.from_province,
    objPreview.to_province,
  ],
  () => {
    if (objPreview.date_go && is_check.value) {
      onPreview();
    }
  }
);

function acceptCity() {
  if (route.path == "/xe-ghep-vung-tau-can-tho-ho-chi-minh") {
    const city = [
      "66c0658f4c700e0b97ebcc15",
      "66c0659c4c700e0b97ebcc16",
      "66de1e434c50db19d40c1791",
    ];
    listCities.value = listCities.value.filter((item: ICity) =>
      city.includes(item.id)
    );
  }
  if (route.path == "/xe-ghep-ha-noi-hai-phong-quang-ninh") {
    const city = [
      "66835c278c528833772548f0",
      "668360538c528833772548f6",
      "668362e08c528833772548fd",
    ];
    listCities.value = listCities.value.filter((item: ICity) =>
      city.includes(item.id)
    );
  }
}
function acceptService() {
  const rejectService: string[] = [
    "66947d4c17482239472bb61d",
    "66947d1e17482239472ba726",
  ];
  if (route.path == "/xe-ghep-vung-tau-can-tho-ho-chi-minh") {
    service.value.data = service.value.data.filter(
      (item: any) => !rejectService.includes(item.id)
    );
    objPreview.service_name = service.value.data[0].name;
  }
}

async function onPreview() {
  if (!checkObj()) return;
  loading.value = true;
  try {
    const res = await new OrderService().preview(objPreview);
    objTemp.value = res;
    tamtinh.value = res.price_guest;
  } catch (e) {
    useNuxtApp().$toast.error(`<small>${e.data}</small>`, {
      dangerouslyHTMLString: true,
      theme: "colored",
    });
    tamtinh.value = 0;
  } finally {
    loading.value = false;
  }
}

async function onSelectDon(obj: ICity[]) {
  if (obj.length == 1) {
    // @ts-ignore
    const item: ICity = listCities.value.find(
      (item: ICity) => item.id == obj[0].id
    );
    if (!item?.list) {
      const res = await new CityService().getDeatail(obj[0].id);
      // @ts-ignore
      item.list = res.districts.filter(
        (district: ICity) => district.status == true
      );
    }
  } else {
    objPreview.from_province = obj[0].name;
    objPreview.from_address = obj[1].name;
  }
}

async function onSelectDen(obj: any) {
  if (obj.length == 1) {
    // @ts-ignore
    const item: ICity = listCities.value.find(
      (item: ICity) => item.id == obj[0].id
    );
    if (!item?.list) {
      const res = await new CityService().getDeatail(obj[0].id);
      // @ts-ignore
      item.list = res.districts.filter(
        (district: ICity) => district.status == true
      );
    }
  } else {
    objPreview.to_province = obj[0].name;
    objPreview.to_address = obj[1].name;
  }
}

function checkObj() {
  if (is_check.value == false) return;
  var status = true;
  error.value = "";
  if (!objPreview.from_province) {
    status = false;
    error.value = "Vui lòng chọn thành phố đón";
    return status;
  }
  if (!objPreview.to_province) {
    status = false;
    error.value = "Vui lòng chọn thành phố đến";
    return status;
  }
  if (!objPreview.date_go) {
    status = false;
    error.value = "Vui lòng chọn ngày khởi hành";
    return status;
  }
  if (!objPreview.phone) {
    status = false;
    error.value = "Vui lòng nhập số điện thoại";
    return status;
  }
  if (
    objPreview.phone.toString().length <= 9 &&
    objPreview.phone.toString().length < 10
  ) {
    status = false;
    error.value = "Số điện thoại không chính xác, vui lòng kiểm tra lại";
    return status;
  }
  return status;
}

async function createOrder() {
  if (checkObj()) {
    if (!objPreview.fullname) {
      error.value = "Vui lòng nhập họ tên";
      return;
    }
    try {
      objPreview.date_go = convertDate(objPreview.date_go);
      objPreview.date_back = convertDate(objPreview.date_back);
      const res = await new OrderService().createOrder(objPreview);
      is_check.value = false;
      rest();
      tamtinh.value = 0;
      emits("success");
    } catch (e) {
      useNuxtApp().$toast.error(`<small>${e.data}</small>`, {
        dangerouslyHTMLString: true,
        theme: "colored",
      });
    } finally {
      error.value = "";
    }
  }
}

function rest() {
  objPreview.date_go = "";
  objPreview.date_back = "";
  objPreview.phone = "";
  objPreview.fullname = "";
  objPreview.from_province = "";
  objPreview.to_province = "";
  objPreview.address_to_name = "";
  objPreview.address_from_name = "";
  objPreview.note = "";
  error.value = "";
  tamtinh.value = 0;
}

function formatDateLocal(time?: any) {
  if (!time) return "";
  const [date, _time] = time.split(",");
  const [M, D, Y] = date.split("/");
  return [[D, M, Y].join("/"), _time].join(",");
}
</script>

<template>
  <div class="row g-2 mt-3">
    <div class="col-12">
      <div class="alert alert-danger" role="alert">
       Vì hệ thống gặp một số vấn đề về kỹ thuật nên chúng tôi tạm thời tắt chức năng đặt xe trực tuyến.
       Chân thành xin lỗi quý khách hàng về sự bất tiện này.
      </div>
    </div>
    <div class="col-lg-6">
      <div>
        <UiDropdow
          :select="objPreview.to_province"
          :data="listCities"
          @select="onSelectDon"
        >
          <small>{{ DiemDon }}</small>
        </UiDropdow>
      </div>
      <input
        type="text"
        v-model="objPreview.address_from_name"
        placeholder="Chi tiết điểm đón"
        class="form-control mt-2"
      />
    </div>
    <!--  Điếm đến  -->
    <div class="col-lg-6">
      <div>
        <UiDropdow
          :select="objPreview.from_province"
          :data="listCities"
          @select="onSelectDen"
        >
          {{ DiemDen }}
        </UiDropdow>
      </div>
      <input
        type="text"
        v-model="objPreview.address_to_name"
        placeholder="Chi tiết điểm đến"
        class="form-control mt-2"
      />
    </div>
    <!--  Số lượng ghế  -->
    <div class="col-lg-6">
      <template v-if="service?.data">
        <select v-model="objPreview.service_name" class="form-control">
          <template v-for="item in service.data">
            <option
              :value="item.name"
              v-if="
                item.id != '66947d4c17482239472bb61d' &&
                item.id != '66947d1e17482239472ba726'
              "
            >
              {{ item.name }}
            </option>
          </template>
        </select>
      </template>
    </div>
    <!--  Thời gian khởi hành  -->
    <div class="col-lg-6">
      <div class="d-flex gap-2">
        <VueDatePicker
          @internal-model-change="handleInternal"
          required
          :enable-time-picker="false"
          :format-locale="vi"
          placeholder=" Chọn ngày, giờ khởi hành"
          selectText="Xác nhận"
          cancelText="Hủy"
          :min-date="new Date()"
          v-model="dateTmp"
        >
        </VueDatePicker>
        <VueDatePicker
          style="width: 200px"
          time-picker
          v-model="timeTmp"
          :min-time="{ hours: minH, minutes: minM }"
          selectText="Xác nhận"
          cancelText="Hủy"
        />
      </div>
    </div>
    <div class="col-lg-6">
      <div class="input-group border rounded">
        <span
          class="input-group-text bg-light pe-0 ps-2 border-0"
          id="basic-addon1"
        >
          <Icon icon="mdi:user-tie" class="fs-5" />
        </span>
        <input
          type="text"
          v-model="objPreview.fullname"
          class="form-control bg-light border-0"
          placeholder="Họ và Tên"
        />
      </div>
    </div>
    <div class="col-lg-6">
      <div class="input-group border rounded">
        <span
          class="input-group-text bg-light pe-0 ps-2 border-0"
          id="basic-addon1"
        >
          <Icon icon="mdi:cellphone" class="fs-5" />
        </span>
        <input
          type="text"
          v-model="objPreview.phone"
          class="form-control bg-light border-0"
          inputmode="numeric"
          placeholder="Số điện thoại"
        />
      </div>
    </div>
    <div class="col-12">
      <input
        type="text"
        v-model="objPreview.note"
        class="form-control"
        placeholder="Ghi chú cho tài xế"
      />
    </div>
    <div class="col-12">
      <div class="d-flex bg-light align-items-center p-2 border rounded gap-2">
        <Icon icon="mingcute:bill-2-line" class="fs-5" />
        Giá chuyến đi:
        <b v-if="!loading">{{ Money(tamtinh || 0) }}</b>
        <p v-else class="card-text placeholder-glow m-0">
          <span class="placeholder col-8 p-2" style="width: 100px"></span>
        </p>
      </div>
    </div>
  </div>
  <div
    v-if="error && is_check"
    class="p-3 border-danger border bg-danger bg-opacity-10 rounded mt-2"
  >
    {{ error }}
  </div>
  <div class="text-center my-2">
    <button
      @click="createOrder"
      disabled="true" 
      class="btn btn-primary text-light"
    >
      <Icon icon="entypo:paper-plane" />
      Đặt xe ngay
      <div
        v-if="loading"
        class="spinner-border spinner-border-sm text-light"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </button>
  </div>
  <div class="alert alert-info d-flex gap-1 align-items-center" role="alert">
    <div>
      <Icon icon="mdi:information-variant-circle" class="fs-4" />
    </div>
    Giá trọn gói đi cao tốc. Xe 5 chỗ, 7 chỗ, bán tải đời mới đón trả tận nơi
  </div>
</template>

<style scoped>
.btn-check:checked + .btn {
  color: white !important;
}
</style>
