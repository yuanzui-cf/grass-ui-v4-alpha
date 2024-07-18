import "../styles/main.less";
import "../styles/component.less";
import { GrassUIEvent } from "./event";
import { Slide } from "./component/slide";

export default class GrassUI extends GrassUIEvent {
    /**
     * @type {Window & typeof globalThis}
     */
    window;

    /**
     * @param {Window} window
     */
    init(window) {
        console.log(
            "%cGrass UI%cv4-alpha",
            "padding: 5px; background-color: rgb(20,60,20); color: white; border-radius: 4px 0 0 4px",
            "padding: 5px; background-color: rgba(20,60,20,.3); border-radius: 0 4px 4px 0"
        );

        this.window = window;

        const darkmode = localStorage.getItem("darkmode");
        this.setDarkMode(darkmode);

        this.initSlide();

        this.listen();
    }

    async initSlide() {
        const slide = this.window.document.querySelectorAll(".gui-slide");
        slide.forEach((item) => {
            new Slide(item).build();
        });
    }
}
