import { TDefaultUserFormDelegateProps } from '../def/userForm'
type TModalMap = {
  newUser: TDefaultUserFormDelegateProps
}

type TModal<T, S extends keyof T> = {
  type: S
} & Partial<T[S]>
export type { TModal, TModalMap }
