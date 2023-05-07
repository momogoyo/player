import Core from '@/core'

const element = document.createElement('div')
element.className = 'player'

const core = new Core(element, {
  src: '',
  autoplay: false
})

export default core

console.log('core: ', core)