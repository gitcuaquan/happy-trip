<script setup lang="ts">
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const model = defineModel()
</script>

<template>
  <client-only>
    <QuillEditor toolbar="full"
                 contentType="html"
                 v-model:content="model" theme="snow"/>
  </client-only>
</template>

<style>
.ql-editor {
  min-height: 250px !important;
  max-height: 500px;
}
</style>