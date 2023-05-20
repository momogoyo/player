import Player from '@momogoyo/player'

const element = document.getElementById('player') as HTMLElement
const configs = {
  src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  title: '내 플레이어',
  autoplay: false,
  controls: true,
  fullscreenTarget: element,
  chapters: [
    {
      'desc': '나는 쭉 방과 집이 동의어인 상태로 살아왔다',
      'thumbnail': 'https://d2j6uvfek9vas1.cloudfront.net/objetBook/series01/1-1.jpg',
      'startTime': '00:00',
      'endTime': '03:00'
    },
    {
      'desc': '친구의 추천으로 ASMR 영상을 보며 잠을 청하기 시작했다',
      'thumbnail': 'https://d2j6uvfek9vas1.cloudfront.net/objetBook/series01/1-2.jpg',
      'startTime': '03:00',
      'endTime': '04:30'
    },
    {
      'desc': '가파도라는 섬의 레지던시에 상주 작가로 초청한다고 했다',
      'thumbnail': 'https://d2j6uvfek9vas1.cloudfront.net/objetBook/series01/1-3.jpg',
      'startTime': '04:30',
      'endTime': '06:00'
    },
    {
      'desc': '운진항에 도착했을 때 나는 설레는 마음이었다',
      'thumbnail': 'https://d2j6uvfek9vas1.cloudfront.net/objetBook/series01/1-4.jpg',
      'startTime': '06:00',
      'endTime': '09:00'
    }
  ]
}

const player = Player(element, configs)

player.on('rendered', () => {
  console.log('rendered!!', player)
})