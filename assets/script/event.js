import Color from "colorjs.io";

export class GrassUIEvent {
    // Root Class
    /** @type {HTMLElement} */
    root = document.querySelector(":root");

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

    async setDarkMode(mode) {
        this.darkmode = mode ? mode : "normal";
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

    async setThemeColor(themeColor) {
        this.themeColor = themeColor;
    }

    /**
     * 改变主题颜色
     * @param {string} color
     * @param {HTMLElement} root
     */
    changeThemeColor(color, root) {
        root.style.setProperty("--theme-color", color);
        root.style.setProperty(
            "--theme-color-light",
            new Color(color).lighten(0.65)
        );
        root.style.setProperty(
            "--theme-color-light-hover",
            new Color(color).lighten(0.6)
        );
        root.style.setProperty(
            "--theme-color-extreme-light",
            new Color(color).lighten(0.785)
        );
        root.style.setProperty(
            "--theme-color-extreme-light-hover",
            new Color(color).lighten(0.76)
        );
        root.style.setProperty(
            "--theme-color-dark",
            new Color(color).darken(0.2)
        );
        root.style.setProperty(
            "--theme-color-dark-hover",
            new Color(color).darken(0.3)
        );
        root.style.setProperty(
            "--theme-color-extreme-dark",
            new Color(color).darken(0.65)
        );
        root.style.setProperty(
            "--theme-color-extreme-dark-hover",
            new Color(color).darken(0.6)
        );
        root.style.setProperty(
            "--theme-color-extreme-light-alpha",
            new Color(color).lighten(0.785).alpha(0.2);
        );
        root.style.setProperty(
            "--theme-color-extreme-dark-alpha",
            new Color(color).darken(0.3).alpha(0.2);
        );
    }
}
