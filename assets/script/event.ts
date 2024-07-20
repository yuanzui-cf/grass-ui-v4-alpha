import Config, { ThemeConfig } from "./config";
import { Color } from "./util/color";

export class GrassUIEvent {
    // Root Class
    root: HTMLElement = document.querySelector(":root")!;

    // Settings
    darkmode = "normal";
    theme: ThemeConfig;

    constructor(config: Config) {
        console.log(
            "%cGrass UI%cv4-alpha",
            "padding: 5px; background-color: rgb(20,60,20); color: white; border-radius: 4px 0 0 4px",
            "padding: 5px; background-color: rgba(20,60,20,.3); border-radius: 0 4px 4px 0"
        );

        this.theme = {
            color: config?.theme?.color || "#1e8a3d",
            radius: config?.theme?.radius || "10px",
        };
    }

    async listen() {
        this.onDarkModeChange();
        this.onThemeColorChange();
        this.onThemeRadiusChange();
        setTimeout(() => this.listen(), 100);
    }

    async onDarkModeChange() {
        if (this.root.style.colorScheme != this.darkmode) {
            this.root.style.colorScheme = this.darkmode;
        }
    }

    async setDarkMode(mode: string) {
        this.darkmode = mode;
        localStorage.setItem("darkmode", this.darkmode);
    }

    async onThemeColorChange() {
        if (
            window
                .getComputedStyle(this.root)
                .getPropertyValue("--theme-color") !=
            this.theme.color!.toString()
        ) {
            this.changeThemeColor(this.theme.color!.toString(), this.root);
        }
    }

    async setThemeColor(themeColor: string) {
        this.theme.color = themeColor;
    }

    async changeThemeColor(color: string, root: HTMLElement) {
        root.style.setProperty("--theme-color", color);
        root.style.setProperty(
            "--theme-color-light",
            new Color(color).lighten(0.4).toString()
        );
        root.style.setProperty(
            "--theme-color-light-hover",
            new Color(color).lighten(0.45).toString()
        );
        root.style.setProperty(
            "--theme-color-extreme-light",
            new Color(color).lighten(0.8).toString()
        );
        root.style.setProperty(
            "--theme-color-extreme-light-hover",
            new Color(color).lighten(0.75).toString()
        );
        root.style.setProperty(
            "--theme-color-dark",
            new Color(color).darken(0.45).toString()
        );
        root.style.setProperty(
            "--theme-color-dark-hover",
            new Color(color).darken(0.4).toString()
        );
        root.style.setProperty(
            "--theme-color-extreme-dark",
            new Color(color).darken(0.8).toString()
        );
        root.style.setProperty(
            "--theme-color-extreme-dark-hover",
            new Color(color).darken(0.75).toString()
        );
        root.style.setProperty(
            "--theme-color-extreme-light-alpha",
            new Color(color).lighten(0.785).toString()
        );
        root.style.setProperty(
            "--theme-color-extreme-dark-alpha",
            new Color(color).darken(0.8).alpha(0.6).toString()
        );
        root.style.setProperty(
            "--theme-color-extreme-light-alpha",
            new Color(color).lighten(0.8).alpha(0.6).toString()
        );
    }

    async onThemeRadiusChange() {
        if (
            window
                .getComputedStyle(this.root)
                .getPropertyValue("--theme-radius") != this.theme.radius!
        ) {
            this.root.style.setProperty("--theme-radius", this.theme.radius!);
        }
    }

    async setThemeRadius(themeRadius: string) {
        this.theme.radius = themeRadius;
    }
}
