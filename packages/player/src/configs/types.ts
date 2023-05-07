type ChapterType = {
  desc?: string
  thumbnail?: string
  startTime: string
  endTime: string
}

type ConfigsType = {
  src: string
  title?: string
  subtitle?: string
  author?: string
  controls?: boolean
  autoplay?: boolean
  mute?: boolean
  loop?: boolean
  chapters?: ChapterType[]
}

export {
  ChapterType,
  ConfigsType,
}