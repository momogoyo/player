import Player from '@momogoyo/player'

const element = document.getElementById('player') as HTMLElement
const configs = {
  // src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  src: 'http://127.0.0.1:8080/video.mp4',
  title: '사진과 시',
  autoplay: false,
  controls: true,
  fullscreenTarget: element,
  chapters: [
    {
      'desc': '이것은 이제는 세상에 없는 한 장 사진에 대한 사연이다',
      'thumbnail': 'https://d2j6uvfek9vas1.cloudfront.net/objetBook/series04/1-1.jpg',
      'startTime': '00:00',
      'endTime': '01:18'
    },
    {
      'desc': '사내는 잊었고 그러므로 나는 읽지 못했다',
      'thumbnail': 'https://d2j6uvfek9vas1.cloudfront.net/objetBook/series04/1-2.jpg',
      'startTime': '01:18',
      'endTime': '03:26'
    },
    {
      'desc': '행복이란 참 난데없는 것이지',
      'thumbnail': 'https://d2j6uvfek9vas1.cloudfront.net/objetBook/series04/1-3.jpg',
      'startTime': '03:26',
      'endTime': '04:05'
    },
    {
      'desc': '다음은 뻔하지 영화는 끝나기 마련이고',
      'thumbnail': 'https://d2j6uvfek9vas1.cloudfront.net/objetBook/series04/1-4.jpg',
      'startTime': '04:05',
      'endTime': '06:00'
    }
  ]
}

const player = Player(element, configs)

player.on('rendered', () => {
  console.log('rendered!!', player)
})