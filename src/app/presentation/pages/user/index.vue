<template>
  <app-page-content>
    <h1>user page</h1>
    <UserForm :dataModel="x.dc" :validateObject="validateObject" @sendEntries="checkUserInfo($event)" @rollback="rollbackModel()" />
    <v-button @click="GetUserFromService">getMSG from Service</v-button>
  </app-page-content>
</template>
<script lang="ts" setup>
import type { IUserFormService } from '@/app/service/meta/i-user-form-service'
import { serviceMap } from '@/service'
import { IoC, uid } from 'cubes'
import { ref } from 'vue'
import UserForm from '../../components/user-email-component.vue'
import { UserFormModel } from '@/app/domain/def/user-form.model'

const x = IoC.DI().resolve<IUserFormService>(serviceMap.UserFormService.key)

const validateObject = ref({})
const checkUserInfo = ($event: UserFormModel) => {
  const isValidUser = x.entriesValidation($event.userName, $event.email)
  validateObject.value = isValidUser
}

const rollbackModel = () => {
  x.rollBackDataController()
}

const GetUserFromService = async () => {
  try {
    const a = await x.getUser()
    console.log(uid(), a)
    x.createUser(a)
  } catch (error) {}
}
</script>
