import { DataModel } from '@/app/domain/def/data-model'
import { Pagination, clientFactory } from 'cubes-ui'
import type { TEndPoint, TResult } from 'cubes-ui'
import { randomInRangeInclusive } from 'cubes'

const { baseURL, api } = window['configure']().network['shared']
const config = { baseURL: `${baseURL}${api}` }
const makers = ['TOYOTA', 'MAZDA', 'VOLKSWAGEN', 'Audi', 'LEXUS', 'Mercedes']
const model = ['Corolla', 'Zoom', 'e-bora', 'Q4', 'CT200h', 'E200']

const isElectricCar = () => !!Math.floor(Math.random() * 2)
const randomArrayItem = (): { maker: string; model: string } => {
  const indxRandom = Math.floor(Math.random() * makers.length)
  const item = { maker: makers[indxRandom], model: model[indxRandom] }
  return item
}
const pagenationInfo = new Pagination({ totalCount: 27 })

const DB = [].prefillRandNums(pagenationInfo.totalCount).map((_item, _idx) => {
  const item = randomArrayItem()
  return new DataModel({
    id: `${_idx + 1}`,
    maker: item.maker,
    model: item.model,
    price: randomInRangeInclusive(10000, 20000),
    electricCar: isElectricCar(),
    year: randomInRangeInclusive(2010, 2024)
  })
})
const server = {
  samaher: (query: any) => {
    console.log(query.query.offset)
    query.query.offset == Math.floor(pagenationInfo.totalCount / query.query.limit) ? (pagenationInfo.isLastPage = true) : (pagenationInfo.isLastPage = false)
    return new Promise<TResult<DataModel>>(resolve =>
      setTimeout(
        () =>
          resolve({
            data: DB.slice(query.query.offset * query.query.limit, query.query.limit + query.query.offset * query.query.limit),
            pagination: pagenationInfo
          }),
        1000
      )
    )
  }
}

const customTable = () =>
  clientFactory(
    true,
    DataModel,
    config,
    {
      samaher: { verb: 'get', template: '/api/{1}' } as TEndPoint
    },
    undefined,
    undefined,
    false,
    false,
    server
  )

const clientMap = { customTable }
type CustomTableClient = typeof clientMap

export { customTable }
export type { CustomTableClient }
