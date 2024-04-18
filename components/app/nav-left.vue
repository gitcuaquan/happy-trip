<script setup lang="ts">
import {Icon} from "@iconify/vue";

interface IItemMenu {
  name: string,
  icon?: string,
  to?: string,
  role?: "ADMIN" | "USER"
  group?: IItemMenu[]
}


const listMenu = ref<IItemMenu[]>([
  {
    name: "Trang chủ",
    icon: "mdi:home-outline",
    to: "/admin"
  },
  {
    name: "Đơn hàng",
    icon: "mdi:settings-outline",
    to: "",
    group: [
      {
        name: "Chưa có tài xế",
        to:"/admin/order"
      },
      {
        name: "Kí gửi",
      },
      {
        name: "Đã nhận"
      }
    ]
  },
  {
    name: "Quản lý",
    icon: "mdi:storefront-outline",
    group: [
      {name: "Khách hàng"},
      {name: "Bảng giá"}
    ]
  },
  {
    name: "Cài đặt tỉnh thành",
    icon: "mdi:user-outline",
  },
  {
    name: "Bài viết",
    icon: "mdi:user-outline",
  }
])

</script>

<template>
  <nav class="navbar p-0 m-0 navbar-expand-lg ">
    <div class="offcanvas offcanvas-start" tabindex="-1" id="app-nav" aria-labelledby="app-navLabel">
      <div class="offcanvas-body p-md-3 pt-md-1 border-end bg-light flex-column vh-100">
        <div class="d-flex w-100 d-flex bg-light sticky-top pt-1 pt-md-0  px-md-0 ">
          <img src="/img/logohpt.png" class="w-100 mx-auto d-none d-md-block" alt="logo">
          <div class="d-flex d-md-none px-2 border-bottom w-100">
            <div>Menu</div>
            <button class="btn-close ms-auto" data-bs-dismiss="offcanvas"></button>
          </div>
        </div>
        <div class="p-md-2 p-0 h-100 w-100">
          <template v-for="(menu,index) in listMenu">
            <div class="d-flex mb-2 item-menu position-relative align-items-center">
              <div role="button" class="d-flex align-items-center gap-1">
                <Icon :icon="menu.icon!"/>
                <div>
                  <small>{{ menu.name }}</small>
                </div>
              </div>
              <button v-if="menu.group" type="button" data-bs-toggle="collapse" :data-bs-target="`#collap-${index}`"
                      class="btn stretched-link d-flex align-items-center p-1  ms-auto border-0">
                <Icon icon="mdi:keyboard-arrow-down"/>
              </button>
              <nuxt-link :to="menu.to" v-if="menu.to" class="stretched-link"></nuxt-link>
            </div>
            <ul role="list" v-if="menu.group" class="mb-0 list-unstyled collapse show" :id="`collap-${index}`">
              <template v-for="(item,subIdx) in menu.group">
                <li class="position-relative">
                  {{ item.name }}
                  <nuxt-link :to="item.to" class="stretched-link" v-if="item.to"/>
                </li>
              </template>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@media (min-width: 768px) {
  .navbar {
    width: 280px;
    z-index: 5;
  }
}

.item-menu {
  opacity: 0.8;
  padding: .25rem;
  transition: .3s;
}

.item-menu:hover {
  background: #000000;
  border-radius: .25rem;
  color: #ffffff !important;
  opacity: 1;
}

li {
  font-size: 0.875rem;
  transition: .3s;
  opacity: 0.8;
  padding: .25rem;
  margin-left: .2rem;
  cursor: pointer;
  position: relative;
  padding-left: 1.5rem;
}

li:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 6px;
  transform: translateY(-50%);
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #cccccc;
}

li:before {
  content: "";
  position: absolute;
  background: #e0e0e0;
  width: 1px;
  height: 100%;
  left: 9px;
  top: 0;
}

li:hover {
  border-radius: .25rem;
  opacity: 1;
  color: #ffffff !important;
  background: #000000;
}
</style>