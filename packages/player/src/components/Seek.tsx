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
  const cursorRef = useRef(null)
  const chaptersRef = useRef([])
  const seeks = useRef([])
  const filled = useRef(null)
  const [scaleX, setScaleX] = useState({
    scale: 0,
    index: -1
  })
  const isDragging = useRef<boolean>(false)

  const seeking = (clientX: number) => {
    const { left, width } = seekRef.current.getBoundingClientRect()

    const updateTime = (clientX - left) / width * core.duration()
    const currentTime = Math.min(Math.max(0, updateTime), core.duration())

    core.emit(Events.CURRENTTIME, currentTime)
    
    return currentTime
  }

  const currentTrack = () => {
    const trackTime = chaptersRef.current.find(chapter => Math.floor(core.currentTime()) >= chapter.startTime && Math.floor(core.currentTime()) <= chapter.endTime)
    const trackIndex = chaptersRef.current.indexOf(trackTime)

    if (trackIndex < 0) {
      return {
        startTime: 0,
        endTime: 0,
        index: -1
      }
    }

    return {
      startTime: trackTime.startTime,
      endTime: trackTime.endTime,
      index: trackIndex
    }
  }

  const updateFilled = (currentTime: number) => {
    const { startTime, endTime, index } = currentTrack()

    const segment = Math.abs(endTime) - startTime
    const startX = currentTime - startTime
    const scale = Math.min(startX / segment, 1)

    filled.current = {
      scale,
      index
    }

    setScaleX(prevState => ({
      ...prevState,
      scale: filled.current.scale,
      index: filled.current.index
    }))
  }

  const getTotalSeconds = (time: string) => {
    const timeArray = time.split(':').map((value) => parseInt(value, 10))
    let hours = 0, minutes = 0, seconds = 0
  
    if(timeArray.length === 3) {
      [hours, minutes, seconds] = timeArray
    } else if(timeArray.length === 2) {
      [minutes, seconds] = timeArray
    } else if(timeArray.length === 1) {
      [seconds] = timeArray
    }
    const totalSeconds = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
  
    return totalSeconds
  }
  
  const getSeeks = () => {
    return chaptersRef.current.map((chapter) => {
      const { startTime, endTime } = chapter

      return (Math.abs(endTime) - startTime) / core.duration() * 100
    })
  }

  const onPointerDown = (event: PointerEvent) => {
    const { currentTarget, pointerId, clientX } = event
    
    if (currentTarget instanceof HTMLElement) {
      currentTarget.setPointerCapture(pointerId)
    }

    isDragging.current = true

    const currentTime = seeking(clientX)
    core.emit(Events.CURRENTTIME, currentTime)
    
    updateFilled(currentTime)
  }

  const onPointerMove = (event: PointerEvent) => {
    if (!isDragging.current) return

    const { clientX } = event
    const currentTime = seeking(clientX)
    updateFilled(currentTime)
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

  const onTimeupdate = () => {
    if (!isDragging.current) {
      const currentTime = core.currentTime()

      updateFilled(currentTime)
    }
  }

  useEffect(() => {
    configs.chapters.map((chapter) => {
      chaptersRef.current.push({
        ...chapter,
        startTime: getTotalSeconds(chapter.startTime),
        endTime: getTotalSeconds(chapter.endTime),
      })
    })

    core.on(Events.TIMEUPDATE, onTimeupdate)
  }, [])

  useEffect(() => {
    setRendered(true)
    seeks.current = getSeeks()
  }, [])

  return (rendered && 
    <div class={`Momogoyo__Progress ${ecss.Progress}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div class={`Momogoyo__Film ${ecss.Film}`}>
        <div class={`Momogoyo__Film-figure ${ecss.Figure}`}>
          <img class={`Momogoyo__Film-thumbnail`} src="" alt="" width="138"/>
          <span class={`Momogoyo__Film-time`}></span>
        </div>
        <div class={`Momogoyo__Film-desc`}></div>
      </div>

      <div 
        class={`Momogoyo__Seeks ${ecss.Seeks}`}
        ref={seekRef}
      >
        {seeks.current.map((seek: number, index: number) => (
          <div 
            class={`Momogoyo__Seek ${ecss.Seek}`}
            data-index={index}
            style={{
              width: `${seek}%`
            }}
          >
            <div class={`Momogoyo__Track`}>
              <div 
                class={`Momogoyo__Filled ${ecss.Filled}`}
                ref={filledRef}
                style={{
                  transform: scaleX.index === index ? `scaleX(${scaleX.scale})` : scaleX.index >= index ? 1 : 0,
                }}
              ></div>
              <div class={`Momogoyo__Buffered ${ecss.Buffered}`}></div>
            </div>
            <div
              class={`Momogoyo__Cursor ${ecss.Cursor}`}
              ref={cursorRef}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ecss = {
  Progress: css`
    display: flex;
    gap: 2px;
    width: 100%;
    height: 2px;
    z-index: 2;
    cursor: pointer;
    padding: 24px 0;
    box-sizing: unset;
  `,

  Film: css``,

  Figure: css``,

  Seeks: css`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 2px;
  `,

  Seek: css`
    position: relative;
    height: 100%;
    background-color: var(--primary100);
  `,

  Buffered: css``,

  Cursor: css``,

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

