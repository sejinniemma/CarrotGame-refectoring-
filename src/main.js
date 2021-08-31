'use strict'
import PopUp from "./popup.js";
import {GameBuilder,  Reason} from "./game.js";
import * as sound from "./sound.js";


let i = 0;

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
.WithGameDuration(10)
.WithCarrotCount(10)
.WithBugCount(20)
.build()

// 게임의 이 함수들을 불러주는 것
// 그러니까 불러주는걸 오브젝트로 레벨별로 나누면 되는거아님?

// gameNext[i].lev;


// const gameNext = [
    
//     {
//         lev : game.WithGameDuration(10)
//                     .WithCarrotCount(10)
//                     .WithBugCount(20)
//                     .build()
//     },
//     {
//         lev : game.WithGameDuration(20)
//                     .WithCarrotCount(20)
//                     .WithBugCount(30)
//                     .build()
//     },
//     {
//         lev : game.WithGameDuration(30)
//                     .WithCarrotCount(30)
//                     .WithBugCount(40)
//                     .build()
//     }
// ]


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




