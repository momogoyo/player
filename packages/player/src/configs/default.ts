import type { 
  ChapterType,
  ConfigsType
} from '@/configs/types'

const chapter = {
  desc: '',
  thumbnail: '',
  startTime: '',
  endTime: ''
} as ChapterType

const defaultConfigs = {
  src: '',
  title: '',
  subtitle: '',
  author: '',
  controls: true,
  autoplay: false,
  muted: false,
  loop: false,
  chapters: [chapter]
} as ConfigsType

export {
  chapter,
  defaultConfigs
}

export default {
  chapter,
  defaultConfigs
}