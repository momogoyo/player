import { h } from 'preact'
import { useRef, useEffect } from 'preact/hooks'
import { css } from '@emotion/css'

import Seek from '@/components/Controls'

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
    playerRef.current.insertAdjacentElement('afterbegin', core.mediaElement)
  }, [])

  return (
    <div
      ref={playerRef}
      class={`Momogoyo__Player ${ecss.Container}`}
    >
      <Seek core={core} />
    </div>
  )
}

const ecss = {
  Container: css`
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    color: var(--light);

    .Momogoyo__Video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
    }
  `
}

export default Player