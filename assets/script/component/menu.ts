type MenuEventCallback = (e?: any) => void;

interface MenuEvent {
    click: MenuEventCallback[];
    change: MenuEventCallback[];
}

export class Menu {
    ele: HTMLElement;
    _open: boolean = false;
    _listener: MenuEvent = {
        click: [],
        change: [],
    };

    constructor(ele: HTMLElement) {
        this.ele = ele;
        this.init();
    }

    init(): Menu {
        if (!this.ele.classList.contains("gui-menu")) {
            this.ele.classList.add("gui-menu");
        }
        if (this.ele.classList.contains("display")) {
            this._open = true;
        }

        this._initHeight();

        const t = this.ele.querySelectorAll("div");
        t.forEach((e) => {
            e.addEventListener("click", () => {
                if (e.dataset.link) {
                    location.href = e.dataset.link;
                }
                this._call("click", {
                    element: e,
                });
            });
        });

        return this;
    }

    on(event: string, callback: MenuEventCallback) {
        switch (event) {
            case "click":
                this._listener.click.push(callback);
                break;
            case "change":
                this._listener.change.push(callback);
                break;
            default:
                console.error("Invalid Event");
        }
    }

    async _call(event: "click" | "change", e?: any) {
        this._listener[event].forEach(async (callback) => {
            callback(e);
        });
    }

    switch(open?: boolean): Menu {
        if (open == undefined) {
            this._switch(!this._open);
        } else {
            this._switch(open);
        }
        this._call("change", {
            open: this._open,
        });
        return this;
    }

    _switch(open: boolean) {
        this._open = open;
        if (open) {
            this.ele.classList.add("display");
            this.ele.classList.add("gui-menu-open");
            setTimeout(() => {
                this.ele.classList.remove("gui-menu-open");
            }, 500);
        } else {
            this.ele.classList.add("gui-menu-close");
            setTimeout(() => {
                this.ele.classList.remove("display");
                this.ele.classList.remove("gui-menu-close");
            }, 500);
        }
    }

    _initHeight() {
        const def = this.ele.classList.contains("display");
        !def ? this.ele.classList.add("display") : "";
        this.ele.style.setProperty("--height", `${this.ele.offsetHeight}px`);
        !def ? this.ele.classList.remove("display") : "";
    }
}
