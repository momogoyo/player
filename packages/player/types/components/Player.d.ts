import { h } from 'preact';
import type Core from '@/core';
import type { ConfigsType } from '@/configs/types';
type PlayerProps = {
    core: Core;
    configs: ConfigsType;
};
declare const Player: ({ core, configs }: PlayerProps) => h.JSX.Element;
export default Player;
