import { h } from 'preact'
import { css } from '@emotion/css'

import type Core from '@/core'

type SeekProps = {
  core: Core
}

const Seek = ({
  core
}: SeekProps) => {
  return (
    <div class={`Momogoyo__Seek ${ecss.Seek}`}></div>
  )
}

const ecss = {
  Seek: css`
    display: flex;
    width: 100%;
    height: 2px;
    background-color: var(--primary100);
`
}

export default Seek

