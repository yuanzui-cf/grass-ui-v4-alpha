import { RGB } from "./util/color";

export default interface Config {
    theme?: ThemeConfig;
}

export interface ThemeConfig {
    /**
     * Only support hex in string, rgb should use class RGB.
     */
    color?: string | RGB;
    radius?: string;
}
