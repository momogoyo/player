import type { ConfigsType } from '@/configs/types';
import EventEmitter from 'eventemitter3';
declare class Player extends EventEmitter {
    element: HTMLElement;
    configs: ConfigsType;
    private hls;
    mediaElement: HTMLMediaElement;
    constructor(element: HTMLElement, configs: ConfigsType);
    private initialize;
    loadSource(source: string): void;
    private addEventListeners;
    render(): void;
    private destroy;
    play(): void;
    pause(): void;
    get paused(): boolean;
    setCurrentTime(time: number): void;
    setPlaybackRate(rate: number): void;
}
export default Player;
