'use strict'
import PopUp from "./popup.js";
import {GameBuilder,  Reason} from "./game.js";
import * as sound from "./sound.js";



const gameFinishBanner = new PopUp();
const game = new GameBuilder()
.WithGameDuration(10)
.WithCarrotCount(10)
.WithBugCount(20)
.build()


game.setGameStopListner((reason)=>{
    let message;
    switch (reason){
        case Reason.cancel:
            message = 'Replay❓';
            sound.PlayAlert();
            break ;
        case Reason.win:
            message = 'YOU WON🎉';
            sound.PlayWin();
            break;
        case Reason.lose:
            message = 'YOU LOSE💩';
            sound.PlayAlert();
            break;
    }
    gameFinishBanner.showWithText(message);  
})

gameFinishBanner.setClickListener(()=>{
    game.score = 0;
    game.start();
    game.showGameButton();
})




