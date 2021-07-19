'use strict'
import PopUp from "./popup.js";
import Game from "./game.js";




// Popup
const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(()=>{
    score = 0;
    game.start();
    game.showGameButton();
})

// Game
const game = new Game(5, 5, 5);

game.setGameStopListner((result)=>{
    console.log(result)
})








