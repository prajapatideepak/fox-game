const gameState = {
    current:"idle",
    clock: 1,
    tick(){
        this.clock+=1
        console.log("clock :", this.clock )
        return this.clock
    }
}
module.exports = gameState