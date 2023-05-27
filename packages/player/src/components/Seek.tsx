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
  const bufferedRef = useRef(null)
  const cursorRef = useRef(null)
  const chaptersRef = useRef([])
  const seeks = useRef([])
  const [scaleX, setScaleX] = useState({
    scale: 0,
    index: -1
  })
  const bufferedState = useRef([])
  const isDragging = useRef<boolean>(false)

  const seeking = (clientX: number) => {
    const { left, width } = seekRef.current.getBoundingClientRect()

    const updateTime = (clientX - left) / width * core.duration()
    const currentTime = Math.min(Math.max(0, updateTime), core.duration())

    core.emit(Events.CURRENTTIME, currentTime)
    
    return currentTime
  }

  const currentTrack = (currentTime: number) => {
    const track = chaptersRef.current.find(chapter => (
      Math.floor(currentTime) >= chapter.startTime && Math.floor(currentTime) <= chapter.endTime
    ))
    let index = chaptersRef.current.indexOf(track)
  
    if (index < 0 && currentTime < chaptersRef.current[0].startTime) {
      currentTime = chaptersRef.current[0].startTime
      index = 0
    }
  
    if (index < 0) {
      return {
        startTime: 0,
        endTime: 0,
        index: -1
      }
    }
  
    return {
      startTime: track.startTime,
      endTime: track.endTime,
      index: index
    }
  }
  
  const updateFilled = (currentTime: number) => {
    const { startTime, endTime, index } = currentTrack(currentTime)
    const segment = Math.abs(endTime) - startTime
    const startX = currentTime - startTime
    const scale = Math.min(startX / segment, 1)

    setScaleX({ 
      scale,
      index
    })
  }

  const updateBuffered = (bufferedTime: TimeRanges) => {
    const { width } = seekRef.current.getBoundingClientRect()
    const buffered = bufferedTime
    const inc = width / core.duration()
  
    bufferedState.current = [] // 버퍼링 상태 배열 초기화
  
    if (buffered.length) {
      for (let i = 0; i < buffered.length; i++) {
        const start = buffered.start(i) * inc
        const end = buffered.end(i) * inc
  
        let currentStartTrack = currentTrack(start)
        let currentEndTrack = currentTrack(end)
  
        // 버퍼링 범위가 하나의 트랙에 모두 포함되어 있는 경우
        if (currentStartTrack.index === currentEndTrack.index) {
          const segment = Math.abs(currentStartTrack.endTime - currentStartTrack.startTime)
          const scale = Math.min((end - start) / segment, 1)
  
          bufferedState.current.push({
            scale,
            index: currentStartTrack.index
          })
        } 
        // 버퍼링 범위가 여러 트랙에 걸쳐 있는 경우
        else {
          // 시작 트랙의 scale을 계산합니다
          const startSegment = Math.abs(currentStartTrack.endTime - currentStartTrack.startTime)
          const startScale = Math.min((currentStartTrack.endTime - start) / startSegment, 1)
  
          bufferedState.current.push({
            scale: startScale,
            index: currentStartTrack.index
          })
  
          // 끝 트랙의 scale을 계산합니다
          const endSegment = Math.abs(currentEndTrack.endTime - currentEndTrack.startTime)
          const endScale = Math.min((end - currentEndTrack.startTime) / endSegment, 1)
  
          bufferedState.current.push({
            scale: endScale,
            index: currentEndTrack.index
          })
  
          // 시작 트랙과 끝 트랙 사이의 모든 트랙에 대해 scale을 1로 설정합니다
          for (let j = currentStartTrack.index + 1; j < currentEndTrack.index; j++) {
            bufferedState.current.push({
              scale: 1,
              index: j
            })
          }
        }
      }
    }
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
      const bufferedTime = core.buffered()

      updateFilled(currentTime)
      updateBuffered(bufferedTime)
    }
  }

  useEffect(() => {
    configs.chapters.forEach((chapter) => {
      chaptersRef.current.push({
        ...chapter,
        startTime: getTotalSeconds(chapter.startTime),
        endTime: getTotalSeconds(chapter.endTime),
      })
    })

    const getSeeks = () => {
      return chaptersRef.current.map((chapter) => {
        const { startTime, endTime } = chapter
  
        return (Math.abs(endTime) - startTime) / core.duration() * 100
      })
    }
    
    seeks.current = getSeeks()
  }, [])

  useEffect(() => {
    core.on(Events.TIMEUPDATE, onTimeupdate)
  }, [])

  useEffect(() => {
    setRendered(true)
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
                  transform: scaleX.index === index ? `scaleX(${scaleX.scale})` : scaleX.index >= index ? `scaleX(1)` : `scaleX(0)`,
                }}
              ></div>
              <div
                ref={bufferedRef}
                class={`Momogoyo__Buffered ${ecss.Buffered}`}
                style={{
                  transform: (
                    bufferedState.current.find(b => b.index === index) 
                    ? `scaleX(${bufferedState.current.find(b => b.index === index).scale})` 
                    : `scaleX(0)`
                  )
                }}
              ></div>
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
    margin: 0 24px;
    transform: translateY(24px);
  `,

  Film: css``,

  Figure: css``,

  Seeks: css`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 2px;
    margin: 0 12px;
  `,

  Seek: css`
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
  `,

  Buffered: css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--secondary200);
    opacity: 0.6;
    transform: scaleX(0);
    transform-origin: 0 0 0;
    z-index: 2;
  `,

  Cursor: css``
}

export default Seek

