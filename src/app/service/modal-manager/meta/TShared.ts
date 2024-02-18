import { TModalMap } from './TModal'
import { TPartialUIState } from 'cubes'
import { TUIConfig } from 'cubes'

enum SharedI18nKeysEnum {
  title = 'title',
  body = 'body'
}
type TSharedI18nKeys = keyof typeof SharedI18nKeysEnum
type TSharedModalDelegateProps<T extends keyof TModalMap> = { type: T; isDrawer?: boolean }
type TSharedDelegateProps<T> = TPartialUIState<Partial<TUIConfig<TSharedI18nKeys | T>>>

export type { TSharedModalDelegateProps, TSharedI18nKeys }
export { TSharedDelegateProps }
