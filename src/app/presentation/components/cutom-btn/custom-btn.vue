<template>
  <button type="button" class="btn" :class="[accentClass, sizeClass]">
    <slot>button</slot>
  </button>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import { props as customBtn } from './custom-btn'

const props = defineProps(customBtn)
const { accent, size, variant } = toRefs(props)

const accentClass = computed(() => {
  return variant.value == 'outline' ? `btn-outline-${accent?.value}` : variant.value == 'subtle' ? `btn-subtle-${accent?.value}` : `btn-${accent?.value}`
})

const sizeClass = computed(() => {
  return size?.value === 'large' ? 'btn-lg' : size?.value === 'small' ? 'btn-sm' : size?.value === 'xSmall' ? 'btn-xs' : ''
})

/*
normal = btn-warning
subtle = btn-subtle-warning
outline = btn-outline-warning
*/
</script>
