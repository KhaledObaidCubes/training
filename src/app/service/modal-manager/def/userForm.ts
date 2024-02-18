import { PropType, Ref, ref } from 'vue'
import { sharedDefaultProps, sharedProps } from './shared'
import { TOptional } from 'cubes'
import { TPromptDelegateProps } from '../meta/TUserForm'

const { type, ...shared } = sharedProps

const props = {
  noCloseButton: Boolean,
  isStatic: Boolean,
  userName: Object as PropType<Ref<string>>,
  email: Object as PropType<Ref<string>>,
  userInputPlaceholder: String,
  emialInputPlaceholder: String,
  label: String,
  lines: { type: String, default: '3' },
  multiline: Boolean,
  maxlength: String,
  i18n: {
    type: Object as PropType<TPromptDelegateProps['i18n']>,
    default() {
      return {}
    }
  },
  ...shared
}

const defaultUserFormDelegateProps = () => ({
  type: 'newUser',
  ...sharedDefaultProps(),
  i18n: { body: 'Body', cancel: 'cancel', no: 'no', yes: 'yes', title: 'User Info' },
  //
  userName: ref('khal'),
  email: ref('khle@hg.net'),
  yesButton: { accent: 'primary', title: 'SAVE' },
  cancelButton: { accent: 'secondary', title: 'CANCEL' },
  userInputPlaceholder: 'insert user name',
  label: 'user form'
})
export { props, defaultUserFormDelegateProps }
type TPromptProps = typeof props
type TDefaultUserFormDelegateProps = Pick<ReturnType<typeof defaultUserFormDelegateProps>, 'userName'> & TOptional<{ i18n: Partial<TPromptDelegateProps['i18n']> }> & { userName: Ref<string> }
export type { TPromptProps, TDefaultUserFormDelegateProps as TDefaultUserFormDelegateProps }
