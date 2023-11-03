import { Injectable } from '@angular/core';

@Injectable()
export class Utils{
    public static hexToRgb(hex: any) {
        if(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (result) {
                return {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16),
                };
            } else {
                return { r: 0, g: 0, b: 0 };
            }
        }
        return { r: 0, g: 0, b: 0 };
    }

    public static componentToHex(c: any, level: number) {
        if (level < 0) {
            c = c + c * level;
        } else {
            c = c + (255 - c) * level;
        }
        c = Math.round(c);
        var hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    }

    public static rgbToHex(rgb: RGB, level: number = 0) {
        let cc =
            '#' +
            this.componentToHex(rgb.r, level) +
            this.componentToHex(rgb.g, level) +
            this.componentToHex(rgb.b, level);
        return cc;
    }
}

interface RGB {
    r: number;
    g: number;
    b: number;
}
