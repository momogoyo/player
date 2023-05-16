import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { css } from '@emotion/css'

import type Core from '@/core'

type SeekProps = {
  core: Core
}

const Seek = ({
  core
}: SeekProps) => {
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
    <div class={`Momogoyo__Seek`}>
      <div class={`Momogoyo__Time`}>
        <span class={`current-time`}></span>
        <span class={`running-time`}></span>
      </div>

      <div class={`Momogoyo__Controls`}>
        <button type="button">-10</button>
        <button type="button" class={`${ecss.Button}`} onClick={onClick}>
          {
            play ? '정지' : '재생'
          }
        </button> 
        <button type="button">+10</button>
      </div>

      <div class={`Momogoyo__Progress`}></div>
    </div>
  )
}

const ecss = {
  Button: css`
    width: 100px;
    height: 50px;
  `
}

export default Seek