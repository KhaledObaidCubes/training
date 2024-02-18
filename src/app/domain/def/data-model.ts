import { Base, uid } from 'cubes'
import { IDataModel } from '../meta/i-data-model'

export class DataModel extends Base<IDataModel, 'id'> implements IDataModel {
  id!: string
  maker!: string
  model!: string
  price!: number
  electricCar!: boolean
  year!: number
  deserialize({ id = uid(), maker = '', model = '', price = 0, electricCar = false, year = 0, ...rest }: Partial<IDataModel> = {}): void {
    super.deserialize(rest)
    this.id = id
    this.maker = maker
    this.model = model
    this.price = price
    this.electricCar = electricCar
    this.year = year
  }
}
