import { Color } from "./util/color";

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
}
