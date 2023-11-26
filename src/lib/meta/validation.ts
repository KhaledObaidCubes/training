enum ValidationStateEnum {
  unset = '',
  valid = 'valid',
  invalid = 'invalid'
}

type TValidationState = keyof typeof ValidationStateEnum

export { ValidationStateEnum }
export type { TValidationState }
