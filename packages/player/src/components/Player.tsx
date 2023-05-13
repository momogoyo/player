import { h } from 'preact'
import { useRef, useEffect } from 'preact/hooks'
import { css } from '@emotion/css'
import Seek from '@/components/Seek'

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
      <Seek core={core} />
    </div>
  )
}

export default Player