import Game from "./gameState"
import {TIME_RATE} from "./constants.js"
import initButtons from "./buttons.js"
import {handleuserAction} from "./gameState"
async function init(){
   
    console.log('Starting game')
    initButtons(handleuserAction)
    let nextTimeTotick = Date.now()

     function nextanimationframe(){
        const now = Date.now();
       // console.log(now , nextTimeTotick)
        if(nextTimeTotick <=now){
            Game.tick()

            nextTimeTotick = now + TIME_RATE

        }
    requestAnimationFrame(nextanimationframe);
    }
    nextanimationframe()
}
init()