import { ICalculatorService } from '../meta/i-calculator-service'
import { serviceMap } from '@/service'
import { Service } from 'cubes'
import { DataController } from 'cubes-ui'
import { IoCLevelsEnum } from '@/control'
import { Calculator } from '@/app/domain/def/calculator'
//arrya of calculator rows of buttons
@Service(IoCLevelsEnum.DEV_2, serviceMap.CalculatorService.key)
class CalculatorService implements ICalculatorService {
  public readonly id: string = serviceMap.CalculatorService.key
  public dc = new DataController(Calculator, { leftSide: '', rightSide: '', calcResult: '0', operandSympole: '', calculationHistory: ['0'] })

  //this function will be called on every button clciked as a start point
  //and it will return the buttons type wither it is number(true) or an operand(false)
  //since the 'parseInt' method for the num 0 or the string "0" will allways return false
  //it was handled once it was entered as an input
  isInputANum = (input: string): boolean => (input == '0' ? true : !!parseInt(input))

  //in this functionif operand exist it will return true(add the input to the right side),
  //otherwise false(Add the input to left side)
  isRightSide = (Operand: string): boolean => !!Operand.length

  //this function will return (true) if the right-hand side of the equation filled (need to calculate the result and empty the right-hand side)
  //else return (false) if its empty and continue add input to the right-hand side
  isRHSFilled = (RightSideOfEquation: string): boolean => !!String(RightSideOfEquation).length

  //this finction will return the result (calculation result based on the operand)
  getResult = (leftSideOfEquation: string, rightSideOfEquation: string, operand: string): string | number => {
    let leftSidde = parseInt(leftSideOfEquation)
    let rightSide = parseInt(rightSideOfEquation)
    switch (operand) {
      case '+':
        return leftSidde + rightSide
      case '-':
        return leftSidde - rightSide
      case '÷':
        return leftSidde / rightSide
      case 'x':
        return leftSidde * rightSide
      case '%':
        return leftSidde % rightSide
      case 'C':
        return 'reset'
      case '=':
        return leftSidde
      default:
        return 'INVALID OPERATION'
    }
  }

  //this function will remove the "0" from where its prefexed on the left-hand side
  leftZeroSlicer = (leftHandSide: string, insertedValue: string): string => {
    if (leftHandSide == '0') leftHandSide = leftHandSide.slice(1)
    return leftHandSide + insertedValue
  }

  //this function will do the back space functionallity will delete the last input from the entier equation
  backspace = (leftSideOfEquation: string, rightSideOfEquation: string, operand: string): string[] => {
    if (String(rightSideOfEquation).length) {
      rightSideOfEquation = String(rightSideOfEquation).slice(0, -1)
    } else if (operand != '') {
      operand = ''
    } else if (String(leftSideOfEquation).length == 1) {
      leftSideOfEquation = '0'
    } else {
      leftSideOfEquation = String(leftSideOfEquation).slice(0, -1)
    }
    return [leftSideOfEquation, rightSideOfEquation, operand]
  }

  //this function will log all equations history that was stored
  historyLog = (logs: any): void => {
    var msg = ''

    for (let itm in logs.value) {
      msg = msg.concat(logs.value[itm] + '//')
    }
  }

  calculate = (input: string): void => {
    console.log(input)

    //the first two if statements are handle the special C and ⇦ chars
    if (input == 'C') {
      // this.dc.model.calcResult = '0'
      // this.dc.model.leftSide = ''
      // this.dc.model.rightSide = ''
      // this.dc.model.operandSympole = ''
      this.dc.model.deserialize({ leftSide: '0', rightSide: '', calcResult: '0', operandSympole: '', calculationHistory: ['0'] })
      //reset all variables and wait for the new input( C special charachter)
    } else if (input == '⇦') {
      //remove last input from the equation (⇦ special charachter)
      ;[this.dc.model.leftSide, this.dc.model.rightSide, this.dc.model.operandSympole] = this.backspace(this.dc.model.leftSide, this.dc.model.rightSide, this.dc.model.operandSympole)
    } else if (this.isInputANum(input)) {
      //chose the side where need to concat the input
      this.isRightSide(this.dc.model.operandSympole) ? (this.dc.model.rightSide = this.dc.model.rightSide + input) : (this.dc.model.leftSide = this.leftZeroSlicer(this.dc.model.leftSide, input))
    } else {
      //if all equation sides are completeed calculate and get the result
      //store equation in history and then empty the right hand side
      if (this.isRHSFilled(this.dc.model.rightSide)) {
        this.dc.model.calculationHistory.push(`${this.dc.model.leftSide} ${this.dc.model.operandSympole} ${this.dc.model.rightSide}`)
        this.dc.model.leftSide = String(this.getResult(this.dc.model.leftSide, this.dc.model.rightSide, this.dc.model.operandSympole))
        this.dc.model.rightSide = ''
        console.log(`${this.dc.model.leftSide}---- ${this.dc.model.rightSide}---${this.dc.model.operandSympole}`)
      }
      //if the operand was = don't assigne it to operand variable
      input != '=' ? (this.dc.model.operandSympole = input) : (this.dc.model.operandSympole = '')
    }
    //if the operand was = update the display value
    this.dc.model.operandSympole == '='
      ? (this.dc.model.calcResult = `${this.dc.model.leftSide}`)
      : (this.dc.model.calcResult = `${this.dc.model.leftSide} ${this.dc.model.operandSympole} ${this.dc.model.rightSide}`)
    //this.historyLog(this.dc.model.calculationHistory)[(this.dc.model.leftSide, this.dc.model.rightSide, this.dc.model.operandSympole)]
  }
  dispose(): void {
    throw new Error('Method not implemented.')
  }
}
export default CalculatorService
