<template>
  <div class="container">
    <button v-for="btn in buttons" :key="btn" class="calc-btn" :class="`${btn.type}-btn`" :disabled="btn.disabled" @click="dispatcher('action', btn.value)">
      {{ btn.value }}
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps(['buttons'])
const dispatcher = defineEmits(['action'])
</script>

<style scoped>
.container {
  width: 100%;
}
.calc-btn {
  background-color: #1a1d24;
  color: #ededed;
  width: 24%;
  height: 40px;
  border: none;
  font-size: 16px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.calc-btn:hover:enabled {
  background-color: #a2a2a2;
  color: #41474d;
}

.operand-btn {
  background-color: #14171e;
  color: #1cc26a;
}
.equal-btn {
  background-color: #1cc26a;
  color: #ededed;
  border-radius: 5px;
}
</style>
