import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { css } from '@emotion/css'
import Icon from '@/components/Icon'

import type Core from '@/core'
import { Events } from '@/core/constants'
import { debounce } from '@momogoyo/shared'

type ActionsProps = {
  core: Core
}

const Actions = ({
  core
}: ActionsProps) => {
  const [play, setPlay] = useState(!core.paused)
  const [autoplay, setAutoplay] = useState(core.configs.autoplay)
  const [muted, setMuted] = useState(!core.configs.muted)
  const [loop, setLoop] = useState(core.configs.loop)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const format = (time: number) => {
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

      console.log(Math.min(Math.max(core.currentTime, 0), duration))
    }
  }, [])

  useEffect(() => {
    if (autoplay) {
      const newMutedState = !muted
      setMuted(newMutedState)
      core.muted = true

      setPlay(true)
      core.play()
    }

    core.on(Events.TIMEUPDATE, onTimeUpdate)

    return (() => {
      core.off(Events.TIMEUPDATE, onTimeUpdate)
    })
  }, [])

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
      
      <div class={`Momogoyo__Status ${ecss.Status}`}>
        <button type="button" class={`Momogoyo__Volume ${ecss.Volume} ${ecss.Button}`}>
          <Icon.volumeOn />
        </button>
        <div class={`Momogoyo__RunningTime ${ecss.RunningTime}`}>
          <span class={`Momogoyo__CurrentTime`}>{ format(currentTime) }</span>
          <span class={`Momogoyo__TotalTime ${ecss.TotalTime}`}>{ format(duration) }</span>
        </div>
      </div>

      <div class={`Momogoyo__Settings ${ecss.Settings}`}>
        <button type="button" class={`Momogoyo__Caption ${ecss.Caption} ${ecss.Button}`}>
          <Icon.caption />
        </button>
        <button type="button" class={`Momogoyo__Pip ${ecss.Pip} ${ecss.Button}`}>
          <Icon.pip />
        </button>
        <button type="button" class={`Momogoyo__Fullscreen ${ecss.Fullscreen} ${ecss.Button}`}>
          <Icon.expand />
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

  Status: css`
    display: flex;
    align-items: center;
    margin-right: auto;
  `,
  
  Volume: css``,
  
  RunningTime: css`
    display: flex;
    align-items: center;
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
  
  Caption: css``,
  
  Pip: css``,
  
  Fullscreen: css``,
  
  Setting: css``
}

export default Actions