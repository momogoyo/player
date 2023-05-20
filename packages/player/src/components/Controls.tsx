import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { css } from '@emotion/css'
import Icon from '@/components/Icon'

import Seek from '@/components/Seek'

import type Core from '@/core'

type ControlsProps = {
  core: Core
}

const Controls = ({
  core
}: ControlsProps) => {
  const [play, setPlay] = useState(!core.paused) // 정지가 아닌 상태 -> 재생상태
  const [autoplay, setAutoplay] = useState(core.configs.autoplay)
  const [muted, setMuted] = useState(!core.configs.muted)
  const [loop, setLoop] = useState(core.configs.loop)

  useEffect(() => {
    if (autoplay) {
      const newMutedState = !muted
      setMuted(newMutedState)
      core.muted = true

      setPlay(true)
      core.play()
    }
  }, [])

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
    <div class={`Momogoyo__Control ${ecss.Seek}`}>
      <div class={`Momogoyo__Panel ${ecss.Panel}`}>
        <div class={`Momogoyo__Playback ${ecss.Playback}`}>
          <button type="button" class={`Momogoyo__Prev ${ecss.Prev}`}>
            <Icon.prev />
          </button>
          <button type="button" onClick={onClick}>
            {
              play ? <Icon.pause /> : <Icon.play />
            }
          </button> 
          <button type="button" class={`Momogoyo__Next ${ecss.Next}`}>
            <Icon.next />
          </button>
        </div>
        
        <div class={`Momogoyo__Status ${ecss.Status}`}>
          <div class={`Momogoyo__Volume ${ecss.Volume}`}>
            <Icon.volumeOn />
          </div>
          <div class={`Momogoyo__RunningTime ${ecss.RunningTime}`}>
            <span class={`Momogoyo__CurrentTime`}>00:00:00</span>
            <span class={`Momogoyo__TotalTime ${ecss.TotalTime}`}>00:00:00</span>
          </div>
        </div>

        <div class={`Momogoyo__Settings ${ecss.Settings}`}>
          <div class={`Momogoyo__Caption ${ecss.Caption}`}>
            <Icon.caption />
          </div>
          <div class={`Momogoyo__Pip ${ecss.Pip}`}>
            <Icon.pip />
          </div>
          <div class={`Momogoyo__Fullscreen ${ecss.Fullscreen}`}>
            <Icon.expand />
          </div>
          <div class={`Momogoyo__Setting ${ecss.Setting}`}>
            <Icon.setting />
          </div>
        </div>
      </div>

      <Seek core={core} />
    </div>
  )
}

const ecss = {
  Seek: css`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  Panel: css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  Playback: css`
    display: flex;
    align-items: center;
  `,

  Prev: css`
    
  `,

  Next: css`

  `,

  Status: css`
    display: flex;
    align-items: center;
  `,
  
  Volume: css``,
  
  RunningTime: css`
    display: flex;
    align-items: center;
  `,

  TotalTime: css`
    &:before {
      content: '/';
      
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

export default Controls