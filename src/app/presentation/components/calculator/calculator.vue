<template>
  <div class="calculator-background">
    <div class="conatiner display-container">
      <p class="last-equation">
        {{ $props.calculatorObject.dc.model.calculationHistory[$props.calculatorObject.dc.model.calculationHistory.length - 1] }}
      </p>
    </div>
    <div class="conatiner display-container">
      <h3 class="display-area">{{ $props.calculatorObject.dc.model.calcResult }}</h3>
    </div>

    <RowBtns v-for="row in rows" :key="row" :buttons="row" @action="$props.calculatorObject.calculate($event)" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onUpdated } from 'vue'
import RowBtns from './row-buttons.vue'
const props = defineProps(['calculatorObject'])
import { row0, row1, row2, row3, row4 } from './buttons-config'
//arrya of calculator rows of buttons
let rows = [row0, row1, row2, row3, row4]
onUpdated(() => {
  console.log(props.calculatorObject.dc.model.calculationHistory)
})
</script>

<style scoped>
.calculator-background {
  background-color: #1a1d24;
  height: 450px;
  width: 240px;
  border: none;
  border-radius: 20px;
  display: flexbox;
}
.display-area {
  width: 280px;
  text-align: right;
  color: rgb(239, 233, 233);
  margin: 30px 10px 0 0;
  padding: 0 0 10px 0;
  font-size: 34px;
}
.display-container {
  font-family: Arial, Helvetica, sans-serif;
  padding: 30px 0 0 0;
  display: flex;
}
.conatiner {
  width: 100%;
}
.last-equation {
  width: 100%;
  color: rgb(239, 233, 233);
  text-align: right;
  height: 20px;
  margin-right: 10px;
}
</style>
