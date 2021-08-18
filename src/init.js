import Game from "./gameState"

const TIME_RATE = 3000;

async function init(){
   
    console.log('Starting game')

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