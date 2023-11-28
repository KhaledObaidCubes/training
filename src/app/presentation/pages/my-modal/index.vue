<template>
  <app-page-content>
    <v-modal v-model="isVisible" :static="true">
      <template #header>
        <h3>Insert User Info.</h3>
      </template>
      <template #body>
        <h1>user page</h1>
        <UserForm :dataModel="x.dc" :validateObject="validateObject" @sendEntries="checkUserInfo($event)" @rollback="rollbackModel()" />
      </template>
      <template #footer>
        <h4>User info form Modal</h4>
      </template>
    </v-modal>
    <v-button @click="isVisible = true">show Modal</v-button>
  </app-page-content>
</template>
<script lang="ts" setup>
import type { IUserFormService } from '@/app/service/meta/i-user-form-service'
import { serviceMap } from '@/service'
import { IoC } from 'cubes'
import { IModalManager, TModalMap } from 'cubes-ui'
import { ref } from 'vue'
import UserForm from '../../components/user-email-component.vue'
import { UserFormModel } from '@/app/domain/def/user-form.model'

const x = IoC.DI().resolve<IUserFormService>(serviceMap.UserFormService.key),
  modalManager = IoC.DI().resolve<IModalManager<TModalMap>>(serviceMap.ModalManager.key)
const isVisible = ref(true)
const validateObject = ref({})
const checkUserInfo = ($event: UserFormModel) => {
  const isValidUser = x.entriesValidation($event.userName, $event.email)
  validateObject.value = isValidUser
}

const rollbackModel = () => {
  x.rollBackDataController()
}
const confirm = () => {
  console.log('OK!')
}
</script>
