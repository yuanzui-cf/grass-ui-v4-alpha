import "../styles/main.less";
import "../styles/component.less";
import { GrassUIEvent } from "./event";
import { Slide } from "./component/slide.js";

export default class GrassUI extends GrassUIEvent {
    init() {
        console.log(
            "%cGrass UI%cv4-alpha",
            "padding: 5px; background-color: rgb(20,60,20); color: white; border-radius: 4px 0 0 4px",
            "padding: 5px; background-color: rgba(20,60,20,.3); border-radius: 0 4px 4px 0"
        );

        const darkmode = localStorage.getItem("darkmode") || "normal";
        this.setDarkMode(darkmode);

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
        const theme = window.document.querySelectorAll("[data-theme-color]");
        theme.forEach((item) => {
            this.changeThemeColor(
                item.getAttribute("data-theme-color")!,
                item as HTMLElement
            );
        });
    }
}
