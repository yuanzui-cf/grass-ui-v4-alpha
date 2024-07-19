interface RGBInterface {
    r: number;
    g: number;
    b: number;
    a?: number;
}

class RGB implements RGBInterface {
    r: number = 0;
    g: number = 0;
    b: number = 0;
    a: number | undefined;

    constructor(
        r: number,
        g: number,
        b: number,
        a: number | undefined = undefined
    ) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    toString() {
        return `rgb${this.a ? "a" : ""}(${this.r}, ${this.g}, ${this.b}${
            this.a ? ", " + String(this.a) : ""
        })`;
    }
}

export class Color {
    hex: string;
    rgb: RGB;

    constructor(color: string | RGB) {
        if (typeof color === "string") {
            // Test for hex
            let rule = /^\#?[0-9A-Fa-f]{6}$/;
            if (!rule.test(color)) {
                throw new Error("Invalid color");
            }
            this.hex = color;
            this.rgb = this.HexToRGB(color);
        } else {
            // Test for rgb
            if (color.r > 255 || color.g > 255 || color.b > 255) {
                throw new Error("Invalid color");
            }
            this.rgb = color;
            this.hex = this.RGBToHex(color);
        }
    }

    RGBToHex(rgb: RGB): string {
        return (
            "#" +
            ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b)
                .toString(16)
                .slice(1)
        );
    }

    HexToRGB(hex: string): RGB {
        let rgb: RGB = new RGB(0, 0, 0);
        rgb.r = parseInt(hex.substring(1, 3), 16);
        rgb.g = parseInt(hex.substring(3, 5), 16);
        rgb.b = parseInt(hex.substring(5, 7), 16);
        console.log(rgb);
        return rgb;
    }

    lighten(level: number): Color {
        type rgb = "r" | "g" | "b";
        for (const k in this.rgb) {
            if (k != "a") {
                const v: number = this.rgb[k as rgb];
                this.rgb[k as rgb] = Math.floor((255 - v) * level + v);
            }
        }
        this.hex = this.RGBToHex(this.rgb);
        return this;
    }
}
