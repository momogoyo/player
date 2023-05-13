import Player from '@momogoyo/player'

const element = document.getElementById('player') as HTMLElement
const configs = {
  src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  title: '내 플레이어',
  autoplay: false
}

const player = Player(element, configs)

player.on('rendered', () => {
  console.log('rendered!!', player)
})

player.on('play', () => {
    console.log('play')
})