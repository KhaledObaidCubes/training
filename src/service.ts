//@ts-nocheck
const services = require.context(
  // Look for files in the current directory
  '.',
  //  look in subdirectories
  true,
  // Only include .ts files
  /\.(service|repo)\.ts$/
)

import { serviceMap as cubesServiceMap } from 'cubes-app'

const serviceMap = {
  ...cubesServiceMap,
  //todo: add your application service keys/config here
  //MyService: { key: 'MyService', config: {} },
  UserFormService: { key: 'UserFormService', config: {} },
  CalculatorService: { key: 'CalculatorService', config: {} }
}
const repositoryMap = {
  //todo: add your application repository keys/config here
  //MyRepository: { key: 'MyRepository', config: {} },
  UserFormRepository: { key: 'UserFormRepository', config: {} }
}
type TrainingServiceMap = typeof serviceMap
export { services, serviceMap, repositoryMap }
export type { TrainingServiceMap }
