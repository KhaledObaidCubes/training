import { NOOP } from 'cubes'
import { PropType } from 'vue'

const sharedUiProps = { isVisible: Boolean, isBusy: Boolean, isDisabled: Boolean }
const sharedDrawerProps = { isStatic: Boolean, isDrawer: Boolean, isCentered: Boolean }

const sharedProps = {
  type: String,
  ...sharedUiProps,
  ...sharedDrawerProps,
  yes: {
    type: Function as PropType<() => any>,
    default() {
      return NOOP
    }
  },
  no: {
    type: Function as PropType<() => any>,
    default() {
      return NOOP
    }
  },
  cancel: {
    type: Function as PropType<() => any>,
    default() {
      return NOOP
    }
  }
}

const sharedDefaultProps = () => ({
  isBusy: false,
  isDisabled: false,
  isStatic: false,
  isDrawer: false,
  isCentered: true,
  noCloseButton: true
})

type TSharedDefaultProps = Partial<ReturnType<typeof sharedDefaultProps>>
type TSharedProps = typeof sharedProps
export { sharedProps, sharedUiProps, sharedDefaultProps }
export type { TSharedProps, TSharedDefaultProps }
//ToDo: move to somewhere more generic ?
