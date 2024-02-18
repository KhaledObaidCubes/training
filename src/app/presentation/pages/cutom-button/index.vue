<template>
  <app-page-content>
    <h1>Welcome to boilerplate</h1>
    <custom-btn accent="warning"></custom-btn>
    <custom-btn accent="primary" size="small"></custom-btn>
    <custom-btn accent="danger" size="xSmall">Hello</custom-btn>
    <custom-btn size="xSmall" variant="outline">Xsmall outline primary</custom-btn>
    <custom-btn accent="info" size="large" variant="subtle" @click="sayHello()">large subtle info</custom-btn>
  </app-page-content>
</template>
<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
const CustomBtn = defineAsyncComponent(() => import('../../components/cutom-btn/custom-btn.vue'))

const sayHello = () => console.log('Hi!')
</script>
