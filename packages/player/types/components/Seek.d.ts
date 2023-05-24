import { h } from 'preact';
import type Core from '@/core';
import type { ConfigsType } from '@/configs/types';
type SeekProps = {
    core: Core;
    configs: ConfigsType;
};
declare const Seek: ({ core, configs }: SeekProps) => h.JSX.Element;
export default Seek;
