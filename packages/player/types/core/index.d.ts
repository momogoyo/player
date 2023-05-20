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
    get autoplay(): boolean;
    get muted(): boolean;
    get loop(): boolean;
    get currentTime(): number;
    get playbackRate(): number;
    set autoplay(value: boolean);
    set muted(value: boolean);
    set loop(value: boolean);
    set currentTime(value: number);
    set playbackRate(value: number);
    play(): void;
    pause(): void;
}
export default Player;
