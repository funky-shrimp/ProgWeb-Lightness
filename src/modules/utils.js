"use strict";

import * as convert from "color-convert"

const generatePalette = (hex) => {
    if(!hex) return

    const [h,s] = convert.hex.hsl(hex);

    const colors = [];

    for(let i = 0; i <= 100; i+=10) {
        colors.push([h,s,i]);
    }

    return colors;
}

const isHexColor = (hex) => {
    return /^#[0-9A-F]{6}$/i.test(hex)
}

const hslToHex = (hsl) => {
    return convert.hsl.hex(hsl);
}

const getShadowColor = (hex) => {
    const hsl = convert.hex.hsl(hex);

    return `${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%`
}

export {generatePalette, isHexColor, hslToHex, getShadowColor}