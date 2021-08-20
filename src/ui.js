export const modFox = function modFox(state){
    document.querySelector('.fox').classList=`fox fox-${state}`
}

export const modScane = function modScane(state){
    document.querySelector('.game').className = `game ${state}`
}

export const togglePoopBag = function togglePoopBag(show){
    document.querySelector('.poop-bag').classList.toggle("hidden" ,!show)
}