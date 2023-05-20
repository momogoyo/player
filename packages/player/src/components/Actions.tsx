import { h } from 'preact'
import { useEffect, useState, useRef } from 'preact/hooks'
import { css } from '@emotion/css'
import Icon from '@/components/Icon'

import type Core from '@/core'
import { Events } from '@/core/constants'

type ActionsProps = {
  core: Core
}

const Actions = ({
  core
}: ActionsProps) => {
  const [play, setPlay] = useState(!core.paused)
  const [autoplay, setAutoplay] = useState(core.configs.autoplay)
  const [muted, setMuted] = useState(!core.configs.muted)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const volumeRef = useRef<HTMLInputElement>(null)

  const onTimeUpdate = (current: number) => {
    setCurrentTime(Math.floor(current))
  }

  const onClick = () => {
    const newPlayState = !play
    setPlay(newPlayState)

    if (newPlayState) {
      core.play()
    } else {
      core.pause()
    }
  }

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen)
    core.fullscreen(fullscreen)
  }

  const toggleMuted = () => {
    setMuted(!muted)
    core.muted(muted)
  }

  const updateVolumn = (event: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const volume = (event.target as HTMLInputElement).value
    volumeRef.current.value = volume
    volumeRef.current.style.backgroundSize = `${volume}% 100%`
    
    core.volume(Number(volume) / 100)
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)

    const formattedHours = hours.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = seconds.toString().padStart(2, '0')

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  }

  useEffect(() => {
    const videoElement = core.mediaElement

    if (videoElement) {
      setDuration(videoElement.duration)
    }
  }, [])

  useEffect(() => {
    if (autoplay) {
      const newMutedState = !muted
      setMuted(newMutedState)
      core.muted(true)

      setPlay(true)
      core.play()
    }

    core.on(Events.TIMEUPDATE, onTimeUpdate)
    volumeRef.current.addEventListener('input', updateVolumn)

    return (() => {
      core.off(Events.TIMEUPDATE, onTimeUpdate)
    })
  }, [])

  return (
    <div class={`Momogoyo__Actions ${ecss.Actions}`}>
      <div class={`Momogoyo__Playback ${ecss.Playback}`}>
        <button type="button" class={`Momogoyo__Prev ${ecss.Button}`}>
          <Icon.prev />
        </button>
        <button type="button" class={`${ecss.Button}`} onClick={onClick}>
          {
            play ? <Icon.pause /> : <Icon.play />
          }
        </button> 
        <button type="button" class={`Momogoyo__Next ${ecss.Button}`}>
          <Icon.next />
        </button>
      </div>
      
      <div class={`Momogoyo__RunningTime ${ecss.RunningTime}`}>
        <span class={`Momogoyo__CurrentTime`}>{formatTime(currentTime)}</span>
        <span class={`Momogoyo__TotalTime ${ecss.TotalTime}`}>{formatTime(duration)}</span>
      </div>

      <div class={`Momogoyo__Settings ${ecss.Settings}`}>
        <div class={`Momogoyo__Volume ${ecss.Volume}`}>
          <input ref={volumeRef} class={`Momogoyo__Volumebar ${ecss.Volumebar}`} id="volume" type="range" min="0" max="100" step="1" />
          <button type="button" class={`Momogoyo__Muted ${ecss.Muted} ${ecss.Button}`} onClick={toggleMuted}>
            {
              muted ? <Icon.volumeOn /> : <Icon.volumeOff /> 
            }
          </button>
        </div>
        <button type="button" class={`Momogoyo__Caption ${ecss.Caption} ${ecss.Button}`}>
          <Icon.caption />
        </button>
        <button type="button" class={`Momogoyo__Pip ${ecss.Pip} ${ecss.Button}`}>
          <Icon.pip />
        </button>
        <button type="button" class={`Momogoyo__Fullscreen ${ecss.Fullscreen} ${ecss.Button}`} onClick={toggleFullscreen}>
          {
            fullscreen ? <Icon.collapse /> : <Icon.expand /> 
          }
        </button>
        <button type="button" class={`Momogoyo__Setting ${ecss.Setting} ${ecss.Button}`}>
          <Icon.setting />
        </button>
      </div>
    </div>
  )
}

const ecss = {
  Actions: css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    z-index: 2;
  `,

  Playback: css`
    display: flex;
    align-items: center;
  `,

  Button: css`
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
  
  RunningTime: css`
    display: flex;
    align-items: center;
    margin-right: auto;
    font-weight: 400;
    font-size: 109%;
    line-height: 47px;
    margin-left: 10px;
  `,

  CurrentTime: css`
    white-space: nowrap;
  `,

  TotalTime: css`
    white-space: nowrap;
    &:before {
      content: '/';
      padding: 0 6%;
    }
  `,

  Settings: css`
    display: flex;
    align-items: center;
  `,

  Volume: css`
    display: flex;
    align-items: center;

    &:hover .Momogoyo__Volumebar {
      opacity: 1;
      pointer-events: initial;
    }
  `,

  Volumebar: css`
    opacity: 0.000001;
    pointer-events: none;
    transition: opacity 0.2s ease;

    width: 100px;
    height: 4px;
    background-color: var(--primary100);
    background-image: linear-gradient(var(--primary), var(--primary));
    background-size: 50% 100%;
    background-repeat: no-repeat;    
    -webkit-appearance: none;
    cursor: pointer;
    outline: none;
    margin: 0 5px;

    &::-webkit-slider-runnable-track {
      box-shadow: none;
      border: none;
      background: transparent;
      -webkit-appearance: none;
    }

    &::-webkit-slider-thumb {
      width: 4px;
      height: 12px;
      margin-top: 1px;
      border: 0;
      background: #fff;
      box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.1);
      -webkit-appearance: none;
    }
  `,

  Muted: css`

  `,
  
  Caption: css``,
  
  Pip: css``,
  
  Fullscreen: css``,
  
  Setting: css``
}

export default Actions