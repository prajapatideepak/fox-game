import { modFox, modScane } from "./ui"
import {RAIN_CHANCE,SCANE,WAKE_TIME,SLEEP_TIME ,getNextDiedTime ,getNextHungerTime} from './constants'
const gameState = {
    current:"INIT",
    clock: 1,
    wakes:-1,
    sleepTIme: -1,
    hungertime :-1,
    diedTime:-1,
    tick(){
        this.clock+=1
        console.log("clock :", this.clock )
        if(this.clock===this.wakes){
            this.wake()
        }else if(this.clock===this.sleepTIme){ 
                this.sleep()
        }else if(this.clock === this.hungertime){
            this.hunger()
        }else if(this.clock === this.diedTime){
            this.died()
        }
        return this.clock
    },
    startGame(){
        this.current = "HATCHING";
        console.log(this.current)
        this.wakes = this.clock + 3
        modFox('egg')
        modScane('day')
    },
    wake(){
        this.current = "IDLING "
        this.wakes = -1
        console.log('awoken') 
        modFox('idling')
        this.scane = Math.random > RAIN_CHANCE ? 0 : 1
        modScane(SCANE[this.scane])
        this.sleepTIme = this.clock + WAKE_TIME
        this.hungertime = getNextHungerTime(this.clock)
    },
    sleep(){
        this.current = "SLEEP"
        modScane('night')
        modFox('sleep')
        this.wakes = this.clock + SLEEP_TIME 
    }
    ,
    hunger(){
        this.current="HUNGRY";
        modFox('hungry')
        this.hungertime=-1
        this.diedTime = getNextDiedTime(this.clock)

    }
    ,
    died(){
        this.current = "DIED";
        console.log("mar gaya ")
        this.diedTime=-1
    }
    ,
    handleuserAction(icon){ 
        console.log(icon)
        if(["CELEBRATING","SLEEP","FEEDING","HATCHING"].includes(this.current)){
           // Do nothing 
            return
        }
        if(this.current === "INIT" || this.current==="DEAD"){
            this.startGame()
            return
        }
        switch (icon) {
            case "weather":
            this.changeWeather()
                break;
            case "poop":
            this.clearUpPoop()
                break;
            case "fish":
            this.feed();
                break;
           
        }
    },
    changeWeather(){
        console.log('weather')
    },
    clearUpPoop(){
        console.log("cleanning the poop")
    },
    feed(){
        console.log("feed")
    }

}
//window.gameState = 
export const handleuserAction = gameState.handleuserAction.bind(gameState)
export default gameState