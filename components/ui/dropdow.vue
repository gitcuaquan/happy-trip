<script setup lang="ts">

import {Icon} from "@iconify/vue";


const props = defineProps(['data', 'selectonly', "select"])
const emits = defineEmits(['select'])

function onSelect(id: string, index?: number | string) {
  const valueReturn: { id: string, name: string }[] = []
  const item = props.data.find((item: { id: string, name: string }) => item.id == id)
  item && valueReturn.push(item)
  if (index != undefined) {
    console.log(index)
    valueReturn.push(item.list[index])
    hide()
  }
  emits('select', valueReturn)
}

function hide() {
  const menu = document.querySelectorAll('.dropdown-menu')
  Array.from(menu).map(item => item.classList.remove('show'))
}


</script>

<template>
  <div id="dropdown-cs" class="dropdown h-100">
    <button class="btn ps-2 border h-100 w-100 d-inline-flex justify-content-start align-items-center gap-1 btn-light "
            data-bs-auto-close="outside" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <Icon icon="mdi:map-marker-radius"/>
      <slot>
        Điểm đón
      </slot>
    </button>
    <ul class="dropdown-menu border-0 shadow-sm overflow-auto w-100" style="max-height: 400px">
      <template v-for="(item,index) in props.data">
        <li v-if="props.select != item.name">
          <a role="button" data-bs-toggle="collapse" @click="onSelect(item.id)" :data-bs-target="`#collapse-${item.id}`"
             class="dropdown-item d-flex justify-content-between align-items-center">
            {{ item.name }}
            <Icon icon="mdi:menu-down" v-if="!selectonly"/>
          </a>
          <div v-if="!selectonly" class="collapse" :id="`collapse-${item.id}`">
            <ul class="list-group  border-0 ps-4 m-0" v-if="item.list">
              <template v-for="(sub,subIndex) in item.list">
                <li v-if="sub.status" role="button" @click="onSelect(item.id,subIndex)"
                    class="list-group-item  border-0 list-group-item-action">
                  {{ sub.name }}
                </li>
              </template>
            </ul>
            <div class="text-center" v-else>
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>

</style>