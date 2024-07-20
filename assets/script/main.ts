import "../styles/main.less";
import "../styles/component.less";
import { GrassUIEvent } from "./event";
import { Slide } from "./component/slide.js";
import Config from "./config";

export default class GrassUI extends GrassUIEvent {
    constructor(config: Config) {
        super(config);

        this.init();
    }

    init() {
        let darkmode = localStorage.getItem("darkmode");
        if (!darkmode) {
            const dark = window.matchMedia("(prefers-color-scheme: dark)");
            darkmode = dark.matches ? "1" : "0";
            dark.onchange = () => {
                this.setDarkMode(dark.matches ? "1" : "0", false);
            };
        }
        this.setDarkMode(darkmode, false);

        window.addEventListener("load", () => {
            this.initSlide();
            this.initTheme();
        });

        this.listen();
    }

    async initSlide() {
        const slide = window.document.querySelectorAll(".gui-slide");
        slide.forEach((item) => {
            new Slide(item as HTMLElement).build();
        });
    }

    async initTheme() {
        // Color
        (async () => {
            const color =
                window.document.querySelectorAll("[data-theme-color]");
            color.forEach((item) => {
                this.changeThemeColor(
                    item.getAttribute("data-theme-color")!,
                    item as HTMLElement
                );
            });
        })();
        (async () => {
            const radius = window.document.querySelectorAll(
                "[data-theme-radius]"
            );
            radius.forEach((item) => {
                this.changeThemeColor(
                    item.getAttribute("data-theme-radius")!,
                    item as HTMLElement
                );
            });
        })();
    }
}
