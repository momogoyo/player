import { h } from 'preact'
import { useRef, useEffect } from 'preact/hooks'
import { css } from '@emotion/css'

import Seek from '@/components/Seek'
import Actions from '@/components/Actions'

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
      <div class={`Momogoyo_Controls ${ecss.Controls}`}>
        <Seek core={core} />
        <Actions core={core} />
      </div>
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
  `,

  Controls: css`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:before {
      content: "";
      position: absolute;
      top: -80%;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(to bottom, rgba(35, 35, 35, 0) 10%, rgba(35, 35, 35, 0.1) 20%, rgba(35, 35, 35, 0.2) 30%, rgba(35, 35, 35, 0.3) 40%, rgba(35, 35, 35, 0.4) 50%, rgba(35, 35, 35, 0.5) 70%, rgba(35, 35, 35, 0.6) 80%, rgba(35, 35, 35, 0.7) 90%, rgba(35, 35, 35, 0.8) 100%);
      opacity: 0.6;
      transition: opacity 0.3s;
    }
    &:after {
      content: "";
      z-index: -1;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: inherit;
      border-radius: inherit;
    }
  `
}

export default Player