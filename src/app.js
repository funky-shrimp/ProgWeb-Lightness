"use strict"

import {generatePalette, isHexColor, hslToHex, getShadowColor} from "./modules/utils"
import {Color} from "./modules/Color"
import {Notyf} from 'notyf';

const form = document.querySelector("form")
const containerElement = document.querySelector("main");
const body = document.querySelector("body");
const notyf = new Notyf();

const displayColors = (userInput,palette) =>{
    const header = document.querySelector("header");

    //affichage du container
    if(!header.classList.contains("minimized")) header.classList.toggle("minimized");

    //reset du container
    containerElement.innerHTML = "";

    //Affichage des couleurs
    palette.map((c)=> new Color(c).display(containerElement))
    

    //couleur dégradé
    const gradientColors = [0, Math.round(palette.length / 2), palette.length - 1].map(
        (index) => `#${hslToHex(palette[index])}`
      );

    body.style.background = `linear-gradient(to right, ${gradientColors.join(", ")})`;
    body.style.backgroundSize = `400% 400%`;

    //Ombre
    document.documentElement.style.setProperty("--shadow-color",getShadowColor(userInput));

}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const userInput = document.querySelector("input[type='text']").value;

    try{
        if(!isHexColor(userInput)){
            throw new Error(`${userInput} is not a valid Hexadecimal color`)
        }    

        const palette = generatePalette(userInput);
        
        displayColors(userInput,palette);
    }catch(err){
        console.error(err);
        notyf.error(err.message);
    }

})

containerElement.addEventListener("click", (e) => {
    if(e.target.tagName.toLowerCase() === "div" && e.target.classList.contains("color")){
        const color = e.target.dataset.color;

        navigator.clipboard.writeText(color).then(() => {
            console.log("copier dans le presse papier");
            notyf.success(`${color} copied to clipboard`);
        }).catch(err => {
            console.error(err);
        })
}
})