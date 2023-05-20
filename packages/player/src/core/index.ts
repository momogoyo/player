import Hls from 'hls.js'
import { h, render as prender } from 'preact'
import { Events } from '@/core/constants'
import { addClass, debounce } from '@momogoyo/shared'
import Component from '@/components/Player'

import type { ConfigsType } from '@/configs/types'
import EventEmitter from 'eventemitter3'

class Player extends EventEmitter {
  private hls: Hls
  public mediaElement: HTMLMediaElement

  constructor(
    public element: HTMLElement,
    public configs: ConfigsType
  ) {
    super()
    
    this.hls = new Hls()

    this.initialize()
    this.addEventListeners()
  }

  private initialize (): void {
    this.mediaElement = document.createElement('video') as HTMLMediaElement
    const src = this.configs.src
    addClass(this.mediaElement, 'Momogoyo__Video')
    
    this.loadSource(src)
  }
  
  public loadSource (source: string): void {
    if (Hls.isSupported() && this.hls) {
      this.hls.loadSource(source)
      this.hls.attachMedia(this.mediaElement)
    } else if (this.mediaElement.canPlayType('application/vnd.apple.mpegurl')) {
      this.mediaElement.src = source
    }
  }

  private addEventListeners () {
    this.hls.on(Hls.Events.MANIFEST_PARSED, this.render.bind(this))
    
    this.mediaElement.addEventListener(Events.TIMEUPDATE, this.timeUpdate.bind(this))
  }

  public render (): void {
    prender(h(Component, { core: this, configs: this.configs }), this.element)
    this.emit(Events.RENDERED)
  }

  private destroy(): void {
    if (this.hls) {
      this.hls.destroy()
    }
  }

  // getter / setter
  get paused (): boolean {
    return this.mediaElement.paused
  }

  get autoplay (): boolean {
    return this.mediaElement.autoplay
  }
  
  get loop (): boolean {
    return this.mediaElement.loop
  }
  
  get currentTime (): number {
    return this.mediaElement.currentTime
  }

  get playbackRate (): number {
    return this.mediaElement.playbackRate
  }

  set autoplay (value: boolean) {
    this.mediaElement.autoplay = value
  }

  set loop (value: boolean) {
    this.mediaElement.loop = value
  }

  set currentTime (value: number) {
    this.mediaElement.currentTime = value
  }

  set playbackRate (value: number) {
    this.mediaElement.playbackRate = value
  }

  // methods
  play () {
    this.mediaElement.play()
    this.emit(Events.PLAY)
  }
  
  pause () {
    this.mediaElement.pause()
    this.emit(Events.PAUSE)
  }

  muted (value = false) {
    this.mediaElement.muted = value
  }

  duration () {
    return this.mediaElement.duration
  }

  timeUpdate () {
    const current = Math.min(Math.max(0, this.currentTime), this.mediaElement.duration)
    this.emit(Events.TIMEUPDATE, current)
  }

  volume (value = 0.5) {
    this.mediaElement.volume = value
  }

  fullscreen (fullscreen: boolean) {
    if (!fullscreen) {
      const target = (this.configs.fullscreenTarget || this.mediaElement) as HTMLElement & {
        mozRequestFullScreen(): Promise<void>
        webkitRequestFullscreen(): Promise<void>
        msRequestFullScreen(): Promise<void>
      }

      if (target.requestFullscreen) {
        target.requestFullscreen()
      } else if (target.mozRequestFullScreen) { /* Firefox */
        target.mozRequestFullScreen()
      } else if (target.webkitRequestFullscreen) { /* Chrome, Safari, Opera */
        target.webkitRequestFullscreen()
      } else if (target.msRequestFullScreen) { /* IE/Edge */
        target.msRequestFullScreen()
      }
    } else {
      const documentElement = document as Document & {
        mozCancelFullScreen(): Promise<void>
        webkitExitFullscreen(): Promise<void>
        msExitFullScreen(): Promise<void>
      }

      if (documentElement.exitFullscreen) {
        documentElement.exitFullscreen()
      } else if (documentElement.mozCancelFullScreen) { /* Firefox */
        documentElement.mozCancelFullScreen()
      } else if (documentElement.webkitExitFullscreen) { /* Chrome, Safari, Opera */
        documentElement.webkitExitFullscreen()
      } else if (documentElement.msExitFullScreen) { /* IE/Edge */
        documentElement.msExitFullScreen()
      }
    }
  }
}

export default Player