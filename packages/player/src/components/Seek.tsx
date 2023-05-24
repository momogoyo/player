import { h } from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
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
  const currentTrack = useRef({
    startTime: 0,
    endTime: 0,
    index: 0
  })
  const [scaleX, setScaleX] = useState([])
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

  const seeking = (clientX: number) => {
    const { left, width } = seekRef.current.getBoundingClientRect()

    const updateTime = (clientX - left) / width * core.duration()
    const currentTime = Math.min(Math.max(0, updateTime), core.duration())
    
    // setScaleX({
    //   scale: currentTime / core.duration()
    // })

    core.emit(Events.CURRENTTIME, currentTime)
    
    return currentTime
  }

  
  const updateFilled = (currentTime: number) => {
    const trackTime = chaptersRef.current.find(chapter => Math.floor(core.currentTime()) >= chapter.startTime && Math.floor(core.currentTime()) <= chapter.endTime)
    const trackIndex = chaptersRef.current.indexOf(trackTime)

    currentTrack.current = {
      startTime: trackTime.startTime,
      endTime: trackTime.endTime,
      index: trackIndex
    }

    const { startTime, endTime, index } = currentTrack.current
    const segment = Math.abs(endTime) - startTime
    const startX = currentTime - startTime
    const scale = Math.min(startX / segment, 1)
    const filled = index < currentTrack.current.index ? 1 : index > currentTrack.current.index ? 0 : scale
    const fillValues = []

    for (let i = 0; i < chaptersRef.current.length; i++) {
      if (i === index) {
        fillValues[i] = filled
      } else if (index > i) {
        fillValues[i] = 1
      } else if (!fillValues[i]) {
        fillValues[i] = 0
      }
    }

    setScaleX(fillValues)
  }

  useEffect(() => {
    configs.chapters.map((chapter) => {
      chaptersRef.current.push({
        ...chapter,
        startTime: getTotalSeconds(chapter.startTime),
        endTime: getTotalSeconds(chapter.endTime),
      })
    })

    // setScaleX(new Array(chaptersRef.current.length).fill(0))
    core.on(Events.TIMEUPDATE, updateFilled)
  }, [])

  useEffect(() => {
    setRendered(true)
    seeks.current = getSeeks()
  }, [])

  return (rendered && 
    <div class={`Momogoyo__Progress ${ecss.Progress}`}>
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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
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
                  transform: `scaleX(${scaleX[index] || 0})`
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

