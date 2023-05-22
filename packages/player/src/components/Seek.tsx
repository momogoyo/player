import { h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { css } from '@emotion/css'

import { Events } from '@/core/constants'

import type Core from '@/core'
import type { ConfigsType } from '@/configs/types'

type SeekProps = {
  core: Core
  configs: ConfigsType
}

const Seek = ({
  core,
  configs
}: SeekProps) => {
  const [rendered, setRendered] = useState(false)
  const seekRef = useRef(null)
  const filledRef = useRef(null)
  const chaptersRef = useRef([])
  const seeks = useRef([])
  const [scaleX, setScaleX] = useState(0)
  const isDragging = useRef<boolean>(false)

  const onPointerDown = (event: PointerEvent) => {
    const { currentTarget, pointerId, clientX } = event
    
    if (currentTarget instanceof HTMLElement) {
      currentTarget.setPointerCapture(pointerId)
    }
    
    seeking(clientX)    
    isDragging.current = true
  }

  const onPointerMove = (event: PointerEvent) => {
    if (!isDragging.current) return

    const { clientX } = event
    
    seeking(clientX)
  }

  const onPointerUp = (event: PointerEvent) => {
    const { currentTarget, pointerId, clientX } = event
    
    if (currentTarget instanceof HTMLElement) {
      currentTarget.releasePointerCapture(pointerId)
    }

    const updateTime = seeking(clientX)
    isDragging.current = false

    core.emit(Events.UPDATETIME, updateTime)
  }

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

  const seeking = (clientX: number) => {
    const { left, width } = seekRef.current.getBoundingClientRect()

    const updateTime = (clientX - left) / width * core.duration()
    const currentTime = Math.min(Math.max(0, updateTime), core.duration())
    
    setScaleX(currentTime / core.duration())

    core.emit(Events.CURRENTTIME, currentTime)
    
    return currentTime
  }

  const updateFilled = (currentTime: number) => {
    setScaleX(currentTime / core.duration() * 100)
  }

  useEffect(() => {
    configs.chapters.map((chapter) => {
      chaptersRef.current.push({
        startTime: getTotalseconds(chapter.startTime),
        endTime: getTotalseconds(chapter.endTime)
      })
    })

    core.on(Events.TIMEUPDATE, updateFilled)

    seeks.current = getSeeks()
  }, [])

  useEffect(() => {
    setRendered(true)
  }, [])

  return (
    <div
      class={`Momogoyo__Seek ${ecss.Seek}`}
      ref={seekRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {rendered && seeks.current.map((seek: number, index: number) => (
        <div
          class={`Momogoyo__Chapter ${ecss.Chapter}`}
          key={index}
          style={{
            width: `${seek}%`
          }}
        >
          <div 
            class={`Momogoyo__Filled ${ecss.Filled}`}
            ref={filledRef}
            style={{
              transform: `scaleX(${scaleX})`
            }}
          ></div>
        </div>
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
    cursor: pointer;
  `,
  
  Chapter: css`
    position: relative;
    height: 100%;
    background-color: var(--primary100);
  `,

  Filled: css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--primary);
    transform: scaleX(0);
    transform-origin: 0 0 0;
    z-index: 3;
  `
}

export default Seek

