export class Slide {
    /** @type {HTMLElement} */
    ele;
    /** @type {Number} */
    _stay_time = 5000;
    /** @type {Number} */
    _timer = -1;
    /** @type {Number} */
    _now = 0;
    /** @type {[Number, Number]} */
    _scale = [7.7, 3];

    /**
     * Slide constructor.
     * @param {HTMLElement} ele
     */
    constructor(ele) {
        if (!ele.classList.contains("gui-slide")) {
            ele.classList.add("gui-slide");
        }
        this.ele = ele;
    }

    /**
     * Set stay time of slide.
     * @param {Number} time
     * @return {Slide}
     */
    setStayTime(time = 2000) {
        this._stay_time = time;
        return this;
    }

    /**
     * Set scale of slide.
     * @param {Number} x
     * @param {Number} y
     * @return {Slide}
     */
    setScale(x = 7.7, y = 3) {
        this._scale = [x, y];
        return this;
    }

    build() {
        // Set Size
        const changeSize = () => {
            this.ele.style.setProperty(
                "--height",
                `${(this.ele.clientWidth / this._scale[0]) * this._scale[1]}px`
            );
        };
        window.addEventListener("resize", changeSize);
        changeSize();

        // Switch
        if (this._timer !== -1) {
            clearInterval(this._timer);
            this._timer = -1;
            this._now = 0;
        }
        this._timer = setInterval(() => {
            const children = this.ele.children;
            this._now++;
            if (this._now == children.length) {
                this._now = 0;
            }
            let prev, ani;
            this._now > 0
                ? (() => {
                      this.ele.classList.remove("reverse");
                      prev = this._now - 1;
                      ani = "gui-slide-in";
                  })()
                : (() => {
                      prev = children.length - 1;
                      ani = "gui-slide-out";
                  })();
            children[prev].classList.add(ani);
            children[prev].removeAttribute("now");
            children[this._now].classList.add(ani);
            setTimeout(() => {
                children[prev].classList.remove(ani);
                children[prev].classList.remove("display");
                children[this._now].classList.remove(ani);
            }, 500);
            children[this._now].classList.add("display");
            children[this._now].setAttribute("now", "");
        }, this._stay_time);
    }
}