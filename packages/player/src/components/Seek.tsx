import { h } from 'preact'
import { css } from '@emotion/css'

import type Core from '@/core'
import type { ConfigsType } from '@/configs/types'
import { useEffect, useRef, useState } from 'preact/hooks'

type SeekProps = {
  core: Core
  configs: ConfigsType
}

const Seek = ({
  core,
  configs
}: SeekProps) => {
  const [rendered, setRendered] = useState(false)
  const chaptersRef = useRef([])
  const seekRef = useRef([])

  const getTotalseconds = (time: string) => {
    const timeArray = time.split(':').map((value) => parseInt(value, 10))
    const [hours = 0, minutes = 0, seconds = 0] = [...timeArray, ...Array(3).fill(0)].slice(0, 3)
    const totalSeconds = hours * 3600 + minutes * 60 + seconds

    return totalSeconds
  }

  const getSeeks = () => {
    return chaptersRef.current.map((chapter) => {
      const { startTime, endTime } = chapter

      return (endTime - startTime) / core.duration() * 100
    })
  }

  useEffect(() => {
    configs.chapters.map((chapter) => {
      chaptersRef.current.push({
        startTime: getTotalseconds(chapter.startTime),
        endTime: getTotalseconds(chapter.endTime)
      })
    })

    seekRef.current = getSeeks()
  }, [])

  useEffect(() => {
    setRendered(true)
  }, [])

  return (
    <div class={`Momogoyo__Seek ${ecss.Seek}`}>
      {rendered && seekRef.current.map((seek: number, index: number) => (
        <div
          class={`Momogoyo__Chapter ${ecss.Chapter}`}
          key={index}
          style={{ width: `${seek}%` }}
        ></div>
      ))}
    </div>
  )
}

const ecss = {
  Seek: css`
    display: flex;
    gap: 2px;
    width: 100%;
    height: 2px;
    z-index: 2;
  `,
  
  Chapter: css`
    height: 100%;
    background-color: var(--primary100);
  `
}

export default Seek

