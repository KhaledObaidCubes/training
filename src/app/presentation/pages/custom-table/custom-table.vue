<template>
  <div>
    <div v-if="isBusy" class="d-flex justify-content-center mb-3">
      <v-spinner accent="primary" size="md" />
    </div>
    <table v-else class="table">
      <thead>
        <tr class="bg-muted">
          <th v-for="(_value, key, index) in pageData[0]" :key="index" class="align-middle">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, indx) in pageData" :key="indx">
          <td v-for="(value, _key, index) in row" :key="index" class="align-middle">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="d-flex justify-content-center mb-3">
    <button class="btn btn-primary" :class="{ disabled: offset == 0 || isBusy }" @click="offset != 0 && !isBusy ? (offset -= 1) : ''">back</button>
    <h2 class="ml-4">{{ offset + 1 }}</h2>
    <button class="btn btn-primary ml-4" :class="{ disabled: isLastPage || isBusy }" @click="!isLastPage && !isBusy ? (offset += 1) : ''">next</button>
  </div>
</template>

<script setup lang="ts">
import { IoC } from 'cubes'
import { ref, watch } from 'vue'
import { serviceMap } from '@/service'
import type { ICustomTableService } from '../../../service/meta/i-custom-table.service'
import { IDataModel } from '@/app/domain/meta/i-data-model'
const isBusy = ref(false)
const dataService = IoC.DI().resolve<ICustomTableService>(serviceMap.CustomTableService.key) as ICustomTableService
const offset = ref(0)
const limit = ref(5)

const isLastPage = ref<boolean | undefined>(false)
const pageData = ref<IDataModel | IDataModel[]>([])
/***
 * @param offset : page index
 */

watch(
  () => offset.value,
  async to => {
    isBusy.value = true
    try {
      const result = await dataService.getAsync({ offset: to, limit: limit.value, delay: 500 })
      pageData.value = result.data
      isLastPage.value = result.pagination?.isLastPage
      isBusy.value = false
    } catch (error) {
      console.log(error)
    }
  },
  { immediate: true }
)
</script>
