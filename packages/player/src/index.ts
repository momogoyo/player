import { assign } from '@momogoyo/shared'
import { defaultConfigs } from '@/configs/default'
import '@/styles/common'
import Core from '@/core'

import type { ConfigsType } from './configs/types'

function Player (
  element: HTMLElement,
  configs: ConfigsType
) {
  const core = new Core(element, assign(defaultConfigs, configs))

  return core
}

export default Player