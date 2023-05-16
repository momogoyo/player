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
    get paused(): boolean;
    get currentTime(): number;
    play(): void;
    pause(): void;
    setCurrentTime(time: number): void;
    setPlaybackRate(rate: number): void;
}
export default Player;
