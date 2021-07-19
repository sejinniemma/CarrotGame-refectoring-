'use strict'
import PopUp from "./popup.js";
import Game from "./game.js";


const gameFinishBanner = new PopUp();
const game = new Game(5, 5, 5);


game.setGameStopListner((reason)=>{
    let message;
    switch (reason){
        case 'cancel':
            message = 'Replay❓';
            break ;
        case 'win':
            message = 'YOU WON🎉';
            break;
        case 'lose':
            message = 'YOU LOSE💩';
            break;
    }

    gameFinishBanner.showWithText(message);

})

gameFinishBanner.setClickListener(()=>{
    game.score = 0;
    game.start();
    game.showGameButton();
})







