import { h } from 'preact'
import { useRef, useEffect } from 'preact/hooks'
import { css } from '@emotion/css'

import type Core from '@/core'
import type { ConfigsType } from '@/configs/types'

type PlayerProps = {
  core: Core
  configs: ConfigsType
}

const Player = ({
  core,
  configs
}: PlayerProps) => {
  const playerRef = useRef(null)

  useEffect(() => {
    playerRef.current.appendChild(core.mediaElement)
  }, [])

  return (
    <div
      ref={playerRef}
      class={`Momogoyo__Player`}
    >
      <button type="button" class={`${ecss.Button}`} onClick={() => core.play()}>재생</button>
      <button type="button" class={`${ecss.Button}`} onClick={() => core.pause()}>정지</button>
    </div>
  )
}

const ecss = {
  Button: css`
    width: 100px;
    height: 50px;
  `
}

export default Player