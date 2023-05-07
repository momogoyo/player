type ConfigType = {
    src: string;
    autoplay: boolean;
};
declare class Player {
    element: HTMLElement;
    configs: ConfigType;
    constructor(element: HTMLElement, configs: ConfigType);
    initialize(): void;
}
export default Player;
