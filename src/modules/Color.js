"use strict";

import * as convert from "color-convert";

class Color {
  #hsl;
  #hex;
  #element;

  constructor(hsl) {
    this.#hsl = hsl;
    this.#hex = `#${convert.hsl.hex(this.#hsl)}`;

    this.#element = this.#generateElement();
  }

  #generateElement = () => {
    const textColor = this.#hsl[2] < 60 ? "rgb(255,255,255)" : "rgb(0,0,0)";

    return `<div class="color" data-color="${
      this.#hex
    }" style="background-color: ${this.#hex};">
                <p style="color: ${textColor};">${this.#hex}</p>
            </div>`;
  };

  display = (parentElement) => {
    parentElement.insertAdjacentHTML("beforeend", this.#element);
  }
}

export { Color };
