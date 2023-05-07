import type { HlsListeners } from 'hls.js';
import type { ConfigsType } from '@/configs/types';
declare class Player {
    element: HTMLElement;
    configs: ConfigsType;
    private hls;
    private mediaElement;
    constructor(element: HTMLElement, configs: ConfigsType);
    private initialize;
    render(): void;
    loadSource(source: string): void;
    private addEventListeners;
    onPlay(): void;
    destroy(): void;
    on(event?: keyof HlsListeners, fn?: (event: any, data: any) => void): void;
    off(event: keyof HlsListeners, fn?: (event: any, data: any) => void): void;
    emit(event: keyof HlsListeners, eventData?: any): boolean;
}
export default Player;
