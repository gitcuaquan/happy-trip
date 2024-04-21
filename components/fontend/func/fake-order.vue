<script setup lang="ts">

const firtName = ["Lý", 'Trần', "Dương", "Lâm", "Cao", "Phùng", "Dương", "Hồ", "Nguyễn", "Võ", "Hoàng", "Vũ", "Tạ", "Lê", "Phan", "Bùi", "Đỗ", "Đinh"]
const LastName = ["Quân", "Sơn", "Điệp", "Đạt", "Nga", "Linh", "Trang", "Mai", "Thuận", "Ly", "Thanh", "Ánh", "An", "Long", "Dương", "Thiện"]
const firstNumber = ["039", "038", "037", "036", "035", "034", "033", "032", "098", "088", "085", "083"]

const data = ref([])
const top = ref(100)

function rederDataFake(length = 10) {
  const data = []
  for (let i = 0; i < length; i++) {
    data.push({
      name: `${firtName[Math.round(Math.random() * firtName.length - 1)] || 'Nguyễn'} xxxx ${LastName[Math.round(Math.random() * LastName.length - 1)] || 'Long'}`
      ,
      phone: `${firstNumber[Math.round(Math.random() * firstNumber.length - 1)] || '032'} XXXX XXXX ${Math.round(Math.random() * (9999 - 1000 + 1) + 1000)} `
    })
  }
  return data
}

onMounted(() => {
  data.value = rederDataFake(100)
  setInterval(() => {
    if(top.value <= -500) top.value = 0
    top.value = top.value + -1
  },100)
})
</script>

<template>
  <div style="z-index: 9;">
    <div class="card border-0 p-3 bg-dark bg-opacity-10 shadow-sm"
         style="backdrop-filter: blur(10px);pointer-events: none">
      <div class="overflow-auto  position-relative" id="style-1" style="height: 400px">
        <ul class="list-unstyled m-0" id="list-customer" :style="`top: ${top}%`">
          <li v-for="item in data" class="mb-3 text-light"
              style="font-size: 14px">
            <small> Khách hàng <b class="text-danger">{{ item.name }}</b> ({{ item.phone }}) đã đặt xe thành
              công</small>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
#style-1::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

#style-1::-webkit-scrollbar {
  width: 0;
  background-color: #F5F5F5;
}

#style-1::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #555;
}

#list-customer {
  position: absolute;
  width: 100%;
  top: 100%;
  transition: all 0.2s;
}

</style>