import type { ICubesInjectable } from 'cubes'
import { DataController } from 'cubes-ui'
import type { ICalculator } from '@/app/domain/meta/i-calculator'
import { Calculator } from '@/app/domain/def/calculator'

interface ICalculatorService extends ICubesInjectable {
  isInputANum(input: string): boolean
  isRightSide(Operand: string): boolean
  isRHSFilled(RightSideOfEquation: string): boolean
  getResult(left: string, right: string, operand: string): string | number
  leftZeroSlicer(leftHandSide: string, insertedValue: string): string
  backspace(leftSideOfEquation: string, rightSideOfEquation: string, operand: string): string[]
  historyLog(logs: any): void
  calculate(input: string): void
  dc: DataController<Calculator>
}
export type { ICalculatorService }
