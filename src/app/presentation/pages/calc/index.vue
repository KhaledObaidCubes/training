<template>
  <Calculator :calculatorObject="x" />
</template>

<script lang="ts" setup>
import { IoC } from 'cubes'
import { serviceMap } from '@/service'
import { ICalculatorService } from '@/app/service/meta/i-calculator-service'
import Calculator from '@app/presentation/components/calculator/calculator.vue'
const x = IoC.DI().resolve<ICalculatorService>(serviceMap.CalculatorService.key)
</script>
