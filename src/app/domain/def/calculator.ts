import { Base } from 'cubes'
import { type ICalculator } from '../meta/i-calculator'
class Calculator extends Base<ICalculator, 'calcResult'> implements ICalculator {
  calculationHistory!: string[]
  leftSide!: string
  rightSide!: string
  calcResult!: string
  operandSympole!: string
  deserialize({ leftSide = '', rightSide = '', calcResult = '', operandSympole = '', calculationHistory = ['0'], ...rest }: Partial<ICalculator> = {}): void {
    super.deserialize(rest)
    this.calculationHistory = calculationHistory
    this.leftSide = leftSide
    this.rightSide = rightSide
    this.calcResult = calcResult
    this.operandSympole = operandSympole
  }
}

export { Calculator }
