import Hls from 'hls.js'
import { h, render as prender } from 'preact'
import { Events } from '@/core/constants'
import { addClass } from '@momogoyo/shared'
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

    // window.addEventListener('load', this.initialize.bind(this))
  }

  public render (): void {
    prender(h(Component, { core: this, configs: this.configs}), this.element)
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

  get muted (): boolean {
    return this.mediaElement.muted
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

  set muted (value: boolean) {
    this.mediaElement.muted = value
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
}

export default Player