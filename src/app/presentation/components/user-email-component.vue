<template>
  <v-card>
    <v-async v-model="asyncModel" :promise="promise">
      <template #busy>
        <div class="d-flex justify-content-center loader-overlay">
          <div class="m-auto">
            <v-spinner accent="danger" size="sm" />
          </div>
        </div>
      </template>
      <template #ready="{ result: { success, fail } }"
        >{{ tTranslation.label.pageName }}
        <div v-if="success" class="text-success">
          <v-input
            v-model.trim="$props.dataModel.model.userName"
            @update:modelValue="formEntries.userNameError = ValidationStateEnum.unset"
            :label="tTranslation.label.name"
            :placeholder="tTranslation.placeholder.name"
            :validation-messages="[userErrorMsg]"
            required
            :state="$props.validateObject.userSatus"
          />
          <v-input
            v-model="$props.dataModel.model.email"
            @update:modelValue="formEntries.emailError = ValidationStateEnum.unset"
            :label="tTranslation.label.mail"
            :placeholder="tTranslation.placeholder.mail"
            :validation-messages="[emailErrorMsg]"
            required
            :state="$props.validateObject.emailStatus"
          />
          <div class="d-flex justify-content-end">
            <v-button :disabled="!$props.dataModel.isDirty.value" class="mr-1" @click="emitsDispatch('rollback'), $props.dataModel.rollback()">{{ tTranslation.label.cancel }}</v-button>
            <v-button :disabled="!$props.dataModel.isDirty.value" @click="emitsDispatch('sendEntries', $props.dataModel.model)">{{ tTranslation.label.save }}</v-button>
          </div>
        </div>
        <div v-if="fail" class="text-danger">
          <!-- <v-empty figure="error" title="something went wrong"></v-empty> -->
          <v-button @click="asyncModel = true">retry</v-button>
        </div>
      </template>
    </v-async>
  </v-card>
</template>
<script lang="ts" setup>
import { ref, defineProps, onUpdated, toRef, Ref, defineEmits } from 'vue'
import { IAppService, useTranslation, ValidationStateEnum } from 'cubes-ui'
import { serviceMap } from '@/service'
import { Ti18n, i18nMap } from '@/i18n'
import { IoC, mockPromise_200 } from 'cubes'
import { TExampletTranslation } from '@/app/i18n'
const emitsDispatch = defineEmits(['sendEntries', 'rollback'])
const props = defineProps(['dataModel', 'validateObject'])

const asyncModel = ref(false)
const promise = () => () => mockPromise_200(1000, 'khaled')
const appService = IoC.DI().resolve<IAppService>(serviceMap.AppService.key)

const tTranslation = toRef(useTranslation<Ti18n>(appService, [i18nMap['translation']]), 'tTranslation') as unknown as Ref<TExampletTranslation>

const userErrorMsg = ref(tTranslation.value.error.name)
const emailErrorMsg = ref(tTranslation.value.error.mail)
const formEntries = ref({
  emailError: ValidationStateEnum.unset,
  userNameError: ValidationStateEnum.unset
})

onUpdated(() => {
  props.validateObject.userSatus === ValidationStateEnum.valid ? (userErrorMsg.value = '') : (userErrorMsg.value = tTranslation.value.error.name)
  props.validateObject.emailStatus === ValidationStateEnum.valid ? (emailErrorMsg.value = '') : (emailErrorMsg.value = tTranslation.value.error.mail)
  if (props.validateObject.isValid) {
    props.dataModel.commit()
    props.dataModel.model.deserialize({ userName: '', email: '' })
    asyncModel.value = true
    appService.success(tTranslation.value.success.successMsg as any, undefined, 'e')
  }
})
</script>
