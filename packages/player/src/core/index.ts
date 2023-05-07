type ConfigType = {
  src: string,
  autoplay: boolean
}

class Player {
  constructor(
    public element: HTMLElement,
    public configs: ConfigType
  ) {
    this.initialize()
  }

  initialize () {
    console.log(this.element)
    console.log(this.configs)
  }
}

export default Player