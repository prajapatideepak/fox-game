import {ICON}from './constants.js';

const toggleHighlighted = (icon , show)=>{
        document.querySelector(`.${ICON[icon]}-icon`).classList.toggle("highlighted",show)
}

export default function initButtons(handleuserAction) {
    let selectedIcon = 0;

    function buttonclick({target}){
        if(target.classList.contains('left-btn')){
            toggleHighlighted(selectedIcon,false)
            selectedIcon = (2+selectedIcon) % ICON.length
            toggleHighlighted(selectedIcon, true)

        }
        else if(target.classList.contains('right-btn')){
            toggleHighlighted(selectedIcon,false)
            selectedIcon = (1+ selectedIcon)% ICON.length
           toggleHighlighted(selectedIcon,true)

        }
        else{
            handleuserAction(ICON[selectedIcon]);
        }
    }
  document.querySelector(".buttons").addEventListener("click", buttonclick);
}