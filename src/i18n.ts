//@ts-nocheck

import { i18nMap as cubesAppI18nMap } from 'cubes-app'
import { i18nMap as cubesUiI18nMap } from 'cubes-ui'
import type { Ti18n as TCubesAppI18n } from 'cubes-app'
import type { Ti18n as TCubesUII18n } from 'cubes-ui'
const i18nFiles = require.context('.', true, /\.i18n.ts$/)
export { i18nFiles }

const i18nMapApp = {
  //todo: fill up your i18nmaps here..
  translation: 'translation'
}

export const i18nMap = {
  ...cubesUiI18nMap,
  ...cubesAppI18nMap,
  ...i18nMapApp
}

export type Ti18n = typeof i18nMapApp & TCubesAppI18n & TCubesUII18n
