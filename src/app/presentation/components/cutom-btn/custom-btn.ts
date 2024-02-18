import { PropType } from 'vue'

//supported accents
type TAccent = 'primary' | 'secondary' | 'warning' | 'danger' | 'success' | 'info' | 'light' | 'dark'
type TSize = 'large' | 'small' | 'xSmall' | 'default'
type TVariant = 'outline' | 'subtle' | 'default'

const props = {
  accent: {
    type: String as PropType<TAccent>,
    default: 'primary'
  },
  size: {
    type: String as PropType<TSize>,
    default: 'default'
  },
  variant: {
    type: String as PropType<TVariant>,
    default: 'default'
  }
}
/*
name
accent
size
outline
subtle
*/
export { props }
