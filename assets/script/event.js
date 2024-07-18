import Color from "colorjs.io";

export class GrassUIEvent {
    // Root Class
    root = document.querySelector(":root");

    // Settings
    darkmode = "normal";
    themeColor = "#1e8a3d";

    async listen() {
        this.onDarkModeChange();
        this.onThemeColorChange();
        setTimeout(() => this.listen(), 100);
    }

    onDarkModeChange() {
        if (this.root.style.colorScheme != this.darkmode) {
            this.root.style.colorScheme = this.darkmode;
        }
    }

    setDarkMode(mode) {
        this.darkmode = mode ? mode : "normal";
        localStorage.setItem("darkmode", this.darkmode);
    }

    onThemeColorChange() {
        if (
            window
                .getComputedStyle(this.root)
                .getPropertyValue("--theme-color") != this.themeColor
        ) {
            this.root.style.setProperty("--theme-color", this.themeColor);
            this.root.style.setProperty(
                "--theme-color-light",
                new Color(this.themeColor).lighten(0.65)
            );
            this.root.style.setProperty(
                "--theme-color-light-hover",
                new Color(this.themeColor).lighten(0.6)
            );
            this.root.style.setProperty(
                "--theme-color-extreme-light",
                new Color(this.themeColor).lighten(0.785)
            );
            this.root.style.setProperty(
                "--theme-color-extreme-light-hover",
                new Color(this.themeColor).lighten(0.76)
            );
            this.root.style.setProperty(
                "--theme-color-dark",
                new Color(this.themeColor).darken(0.2)
            );
            this.root.style.setProperty(
                "--theme-color-dark-hover",
                new Color(this.themeColor).darken(0.3)
            );
            this.root.style.setProperty(
                "--theme-color-extreme-dark",
                new Color(this.themeColor).darken(0.65)
            );
            this.root.style.setProperty(
                "--theme-color-extreme-dark-hover",
                new Color(this.themeColor).darken(0.6)
            );
        }
    }

    setThemeColor(themeColor) {
        this.themeColor = themeColor;
    }
}
