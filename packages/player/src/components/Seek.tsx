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
  const bufferedRef = useRef([])
  const seeks = useRef([])
  const [chapterThumbX, setChapterThumbX] = useState(0)
  const [chapterThumbTitleX, setChapterThumbTitleX] = useState(0)
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

  const currentTrack = (currentTime: number) => {
    const track = chaptersRef.current.find(chapter => (
      Math.floor(currentTime) >= chapter.startTime && Math.floor(currentTime) <= chapter.endTime
    ))
    let index = chaptersRef.current.indexOf(track)
  
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
  
    bufferedRef.current = [] // 버퍼링 상태 배열 초기화
  
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
  
          bufferedRef.current.push({
            scale,
            index: currentStartTrack.index
          })
        } 
        // 버퍼링 범위가 여러 트랙에 걸쳐 있는 경우
        else {
          // 시작 트랙의 scale을 계산합니다
          const startSegment = Math.abs(currentStartTrack.endTime - currentStartTrack.startTime)
          const startScale = Math.min((currentStartTrack.endTime - start) / startSegment, 1)
  
          bufferedRef.current.push({
            scale: startScale,
            index: currentStartTrack.index
          })
  
          // 끝 트랙의 scale을 계산합니다
          const endSegment = Math.abs(currentEndTrack.endTime - currentEndTrack.startTime)
          const endScale = Math.min((end - currentEndTrack.startTime) / endSegment, 1)
  
          bufferedRef.current.push({
            scale: endScale,
            index: currentEndTrack.index
          })
  
          // 시작 트랙과 끝 트랙 사이의 모든 트랙에 대해 scale을 1로 설정합니다
          for (let j = currentStartTrack.index + 1; j < currentEndTrack.index; j++) {
            bufferedRef.current.push({
              scale: 1,
              index: j
            })
          }
        }
      }
    }
  }

  const handleThumb = (currentTime: number) => {
    if(!isDragging.current) return

    const { width } = seekRef.current.getBoundingClientRect()
    const positionX = currentTime / core.duration()
    const minSpace = 24 / width
    const minWidth = (69 / width) + minSpace
    const maxSpace = 48 / width
    const maxWidth = (138 / width) + maxSpace

    const newChapterThumbX = Math.min(
      Math.max((positionX - minWidth) * 100, 0),
      Math.max((1 - maxWidth) * 100, 0)
    )
  
    setChapterThumbX(newChapterThumbX)
  }

  const handleThumbTitle = (currentTime: number) => {
    if(!isDragging.current) return

    const { width } = seekRef.current.getBoundingClientRect()

    const thumbPosX = currentTime / core.duration()
    const minSpace = 24 / width
    const minWidth = (88.5 / width) + minSpace
    const maxSpace = 48 / width
    const maxWidth = (177 / width) + maxSpace

    const newChapterThumbX = Math.min(
      Math.max((thumbPosX - minWidth) * 100, 0),
      Math.max((1 - maxWidth) * 100, 0)
    )
  
    setChapterThumbTitleX(newChapterThumbX)
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
    handleThumb(currentTime)
    handleThumbTitle(currentTime)
  }

  const onPointerMove = (event: PointerEvent) => {
    if (!isDragging.current) return

    const { clientX } = event
    const currentTime = seeking(clientX)
    
    updateFilled(currentTime)
    handleThumb(currentTime)
    handleThumbTitle(currentTime)
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
      // updateBuffered(bufferedTime)
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

    console.log()

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
      {isDragging.current && 
        <div class={`Momogoyo__Chapter ${ecss.Chapter}`}>
          <div 
            class={`Momogoyo__Chapter-thumbnail ${ecss.ChapterThumbnail}`}
            style={{
              left : `calc(${chapterThumbX}% + 24px)`
            }}>
              <img 
                class={`Momogoyo__Chapter-image ${ecss.ChapterImage}`}
                src={chaptersRef.current[scaleX.index].thumbnail} 
                alt="" 
                width="138"
              />
              <span class={`Momogoyo__Chapter-time ${ecss.ChapterTime}`}></span>
          </div>
          <div
            class={`Momogoyo__Chapter-title ${ecss.ChapterTitle}`}
            style={{
              left : `calc(${chapterThumbTitleX}% + 24px)`
            }}>
            {chaptersRef.current[scaleX.index].desc}
          </div>
        </div>
      }

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
                class={`Momogoyo__Buffered ${ecss.Buffered}`}
                style={{
                  transform: (
                    bufferedRef.current.find(b => b.index === index) 
                    ? `scaleX(${bufferedRef.current.find(b => b.index === index).scale})` 
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
    width: 100%;
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

  Chapter: css`
    /* position: relative; */
    pointer-events: none;
    transition: opacity .24s;
  `,

  ChapterThumbnail: css`
    position: absolute;
    bottom: 56px;
    width: 138px;
    height: 80px;
    margin-bottom: 8px;
    margin: 0 auto;
  `,

  ChapterImage: css`
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 100%, rgba(0, 0, 0, 0.15) 100%);
  `,
  
  ChapterTime: css`
    position: absolute;
    bottom: 7px;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 1;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #FFFFFF;
  `,

  ChapterTitle: css`
    position: absolute;
    bottom: 30px;
    width: 177px;
    display: block;
    font-weight: 500;
    font-size: 12px;
    text-align: center;
    line-height: 18px;
    color: var(--text-01);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,

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

