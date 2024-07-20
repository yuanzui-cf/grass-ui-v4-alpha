import Color from "colorjs.io";

export class GrassUIEvent {
    // Root Class
    root: HTMLElement = document.querySelector(":root")!;

    // Settings
    darkmode = "normal";
    themeColor = "#1e8a3d";

    async listen() {
        this.onDarkModeChange();
        this.onThemeColorChange();
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
                .getPropertyValue("--theme-color") != this.themeColor
        ) {
            this.changeThemeColor(this.themeColor, this.root);
        }
    }

    async setThemeColor(themeColor: string) {
        this.themeColor = themeColor;
    }
    
    // @ts-ignore
    async changeThemeColor(color: string, root: HTMLElement) {
        // TODO: 将 Color 库迁移至自定义函数
        root.style.setProperty("--theme-color", color);
        root.style.setProperty(
            "--theme-color-light",
            // @ts-ignore
            new Color(color).lighten(0.65)
        );
        root.style.setProperty(
            "--theme-color-light-hover",
            // @ts-ignore
            new Color(color).lighten(0.6)
        );
        root.style.setProperty(
            "--theme-color-extreme-light",
            // @ts-ignore
            new Color(color).lighten(0.785)
        );
        root.style.setProperty(
            "--theme-color-extreme-light-hover",
            // @ts-ignore
            new Color(color).lighten(0.76)
        );
        root.style.setProperty(
            "--theme-color-dark",
            // @ts-ignore
            new Color(color).darken(0.2)
        );
        root.style.setProperty(
            "--theme-color-dark-hover",
            // @ts-ignore
            new Color(color).darken(0.3)
        );
        root.style.setProperty(
            "--theme-color-extreme-dark",
            // @ts-ignore
            new Color(color).darken(0.65)
        );
        root.style.setProperty(
            "--theme-color-extreme-dark-hover",
            // @ts-ignore
            new Color(color).darken(0.6)
        );
        root.style.setProperty(
            "--theme-color-extreme-light-alpha",
            // @ts-ignore
            new Color(color).lighten(0.785)
        );
        root.style.setProperty(
            "--theme-color-extreme-dark-alpha",
            // @ts-ignore
            new Color(color).darken(0.3)
        );
    }
}
