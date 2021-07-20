'use strict'
import PopUp from "./popup.js";
import GameBuilder from "./game.js";


const gameFinishBanner = new PopUp();
const game = new GameBuilder()
 .WithGameDuration(5)
 .WithCarrotCount(5)
 .WithBugCount(5)
 .build();


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







