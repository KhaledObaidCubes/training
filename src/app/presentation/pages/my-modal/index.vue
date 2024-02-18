<template>
  <div class="mt-3">
    <v-button @click="openModal">open Prompt</v-button>
  </div>
</template>
<script lang="ts" setup>
//import type { IUserFormService } from '@/app/service/meta/i-user-form-service'
import { serviceMap } from '@/service'
import { IoC, merge } from 'cubes'
import { toRefs } from 'vue'
import { IModalManager } from 'cubes-ui'
import { TModal, TModalMap } from '@/app/service/modal-manager/meta/TModal'
import { props as formProps, defaultUserFormDelegateProps } from '@app/service/modal-manager/def/userForm'

//const x = IoC.DI().resolve<IUserFormService>(serviceMap.UserFormService.key)
const modalManager = IoC.DI().resolve<IModalManager<TModalMap>>(serviceMap.ModalManager.key)
const props = defineProps(formProps)
const { isStatic, userName: defaultUserName } = toRefs(props)

console.log('<<>><<<>>><<<>>>', defaultUserName.value)

// const checkUserInfo = ($event: UserFormModel) => {
//   const isValidUser = x.entriesValidation($event.userName, $event.email)
//   validateObject.value = isValidUser
// }

const openModal = async () => {
  const config = merge(true, defaultUserFormDelegateProps(), {
    userName: 'userName',
    noCloseButton: false,
    email: 'userEmail',
    yesButton: { accent: 'success', size: 'sm', title: 'Save' },
    cancelButton: { accent: 'danger', size: 'sm', title: 'Cancel' }
  }) as TModal<TModalMap, 'newUser'>

  modalManager.open(config).then(({ next, type, props, args }) => {
    console.log('>>>>>>', type)
    console.log('>>>>>>', props)
    console.log('>>>>>>', args)

    console.log('-------->', next)
    next()
    //console.log(userName.value)
  })
}
</script>
