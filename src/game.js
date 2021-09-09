'use stirct';
import Field from "./field.js";
import * as sound from "./sound.js";

export const ItemType = Object.freeze({
    carrot : 'carrot',
    bug : 'bug',
})

export const Reason = Object.freeze({
    win : 'win',
    lose : 'lose',
    cancel : 'cancel',
})

// 1.next 함수를 만들어서 이겼을때 stop대신 이 함수
// 2.최종적으로 이겼을 때는 조건을 만들어서 win이 나올 수 있게 만들기
export class GameBuilder{

 WithGameDuration(gameDuration){
    this.gameDuration = gameDuration
    return this;
}

WithCarrotCount(carrotCount){
    this.carrotCount =  carrotCount
    return this;
}

WithBugCount(bugCount){
    this.bugCount =  bugCount;
    return this;
}

build(){
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        )
    }
    
}

class Game{
    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.timer = undefined;
        this.started = false;
        this.score = 0;

        this.gameField = new Field(carrotCount,bugCount);
        this.gameField.setClickListener(this.onitemClick);
        
       
        this.gameBtn = document.querySelector('.game__button');
        this.gameScore = document.querySelector('.game__score');
        this.gameTimer = document.querySelector('.game__timer');
        
        this.gameBtn.addEventListener('click',()=>{
            if(this.started){
                this.stop(Reason.cancel);
            }else {
                this.start();
            } 
        })
    }

    setGameStopListner(gameStop){
        this.gameStop = gameStop;
    }


    start(){
        this.started = true;
        this.initGame();
        this.StartgameTimer();
        this.showStopButton();
        this.showTimerAndScore();
        sound.PlayBackground();    
    }

   
    stop(reason){
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.StopBackground();
        this.gameStop && this.gameStop(reason)
    }

    initGame(){
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
        }


    onitemClick = (item) => {
        if(!this.started) {
            return;
        }
        if(item === ItemType.carrot){
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount){
                this.stop(Reason.win);
            } 
        }else if(item === ItemType.bug){ 
                this.stop(Reason.lose);
        }
    }

     updateScoreBoard(){
         this.gameScore.innerHTML = this.carrotCount - this.score;
     }


    showTimerAndScore(){
    this.gameTimer.style.visibility ='visible';
    this.gameScore.style.visibility ='visible';
}

    StartgameTimer(){
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer =  setInterval(()=>{
        if(remainingTimeSec <= 0){
            clearInterval(this.timer);
            this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
            return;
        }   
          this.updateTimerText(--remainingTimeSec);  
  },1000)   
}

    stopGameTimer(){
        clearInterval(this.timer);
    }
    
    updateTimerText(time){
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerHTML = `${minutes} : ${seconds}`;
    }

    showStopButton (){
    const Icon = this.gameBtn.querySelector('.fas');
    Icon.classList.add('fa-stop');
    Icon.classList.remove('fa-play');
}

    hideGameButton(){
    this.gameBtn.style.visibility ="hidden";
}
    
    showGameButton(){
    this.gameBtn.style.visibility ="visible";
}
}

    

