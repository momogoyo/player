import Player from '@momogoyo/player'

const element = document.getElementById('player')
const configs = {
  src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  title: '내 플레이어'
}

Player(element, configs)