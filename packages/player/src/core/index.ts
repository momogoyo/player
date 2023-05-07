import type { ConfigsType } from '@/configs/types'

class Player {
  constructor(
    public element: HTMLElement,
    public configs: ConfigsType
  ) {
    this.initialize()
  }

  initialize () {
    console.log(this.element)
    console.log(this.configs)
  }
}

export default Player