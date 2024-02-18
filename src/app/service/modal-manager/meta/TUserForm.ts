import { TSharedDelegateProps, TSharedModalDelegateProps } from './TShared'

enum PromptI18nKeysEnum {
  yes = 'yes',
  no = 'no',
  cancel = 'cancel'
}

type TPromptI18nKeys = keyof typeof PromptI18nKeysEnum
type TPromptDelegateProps = TSharedDelegateProps<TPromptI18nKeys> & TSharedModalDelegateProps<'userForm'>
export type { TPromptI18nKeys, TPromptDelegateProps }
