<template>
  <v-modal v-model="isvisible" :no-close-button="false" :static="false" :centered="true" @dismiss="">
    <template #header>
      <h4>{{ tTranslation.label.pageName }}</h4>
    </template>
    <!-- <template #close-btn>
      <v-button @click="" class="btn btn-subtle-light" type="button">
        <v-icon name="times" fixed-width />
      </v-button>
    </template> -->
    <template #body>
      <v-async v-model="asyncModel" :promise="promise">
        <template #busy>
          <div class="d-flex justify-content-center loader-overlay">
            <div class="m-auto">
              <v-spinner accent="danger" size="sm" />
            </div>
          </div>
        </template>
        <template #ready="{ result: { success, fail } }">
          <div v-if="success">
            <v-input
              v-model.trim="tempVal"
              @update:modelValue="formEntries.userNameError = ValidationStateEnum.unset"
              :label="tTranslation.label.name"
              :placeholder="tTranslation.placeholder.name"
              :validation-messages="[userErrorMsg]"
              required
              :state="formEntries.userNameError"
            />
            <v-input
              v-model="tempVal"
              @update:modelValue="formEntries.emailError = ValidationStateEnum.unset"
              :label="tTranslation.label.mail"
              :placeholder="tTranslation.placeholder.mail"
              :validation-messages="[emailErrorMsg]"
              required
              :state="formEntries.emailError"
            />
          </div>
          <div v-if="fail" class="text-danger">
            <v-button @click="asyncModel = true">retry</v-button>
          </div>
        </template>
      </v-async>
    </template>
    <template #footer>
      <div class="d-flex justify-content-end">
        <v-button class="mr-1" @click="">{{ tTranslation.label.cancel }}</v-button>
        <v-button @click="">{{ tTranslation.label.save }}</v-button>
      </div>
    </template>
  </v-modal>
</template>
<script lang="ts" setup>
import { ref, onUpdated, toRef, Ref, defineEmits } from 'vue'
import { IAppService, useTranslation, ValidationStateEnum } from 'cubes-ui'
//import { props as formProps, defaultUserFormDelegateProps } from '../def/userForm'
import { serviceMap } from '@/service'
import { Ti18n, i18nMap } from '@/i18n'
import { IoC, mockPromise_200 } from 'cubes'
import { TExampletTranslation } from '@/app/i18n'
//import { TModalMap } from '../meta/TModal'
const emitsDispatch = defineEmits(['sendEntries', 'rollback'])
const isvisible = ref(true)
const tempVal = ref('KHLED')

const asyncModel = ref(false)
const promise = () => () => mockPromise_200(1000, 'khaled')
const appService = IoC.DI().resolve<IAppService>(serviceMap.AppService.key)
// const modalManager = IoC.DI().resolve<IModalManager<TModalMap>>(serviceMap.ModalManager.key)
const tTranslation = toRef(useTranslation<Ti18n>(appService, [i18nMap['translation']]), 'tTranslation') as unknown as Ref<TExampletTranslation>

const userErrorMsg = ref(tTranslation.value.error.name)
const emailErrorMsg = ref(tTranslation.value.error.mail)
const formEntries = ref({
  emailError: ValidationStateEnum.unset,
  userNameError: ValidationStateEnum.unset
})

onUpdated(() => {
  // props.validateObject.userSatus === ValidationStateEnum.valid ? (userErrorMsg.value = '') : (userErrorMsg.value = tTranslation.value.error.name)
  // props.validateObject.emailStatus === ValidationStateEnum.valid ? (emailErrorMsg.value = '') : (emailErrorMsg.value = tTranslation.value.error.mail)
  // if (props.validateObject.isValid) {
  //   props.dataModel.commit()
  //   props.dataModel.model.deserialize({ userName: '', email: '' })
  //   asyncModel.value = true
  //   appService.success(tTranslation.value.success.successMsg as any, undefined, 'e')
  // }
})
</script>
