'use stirct';
import Field from "./field.js";
import * as sound from "./sound.js";


export default class GamdBuilder{
    WithGameDuration(gameDuration){
        this.gameDuration = gameDuration;
        return this;
    }

    WithCarrotCount(carrotCount){
        this.carrotCount = carrotCount;
        return this;
    }

    WithBugCount(bugCount){
        this.bugCount = bugCount;
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
                this.stop();
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


    stop(){
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.PlayAlert();
        sound.StopBackground();

        this.gameStop && this.gameStop('cancel');
    }

    initGame(){
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
        }


    onitemClick = (item) => {
        if(!this.started) {
            return;
        }
        if(item === 'carrot'){
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount){
                this.finish(true);
            } 
        }else if(item === 'bug'){ 
                this.finish(false);
        }
    }

    finish(win){
        this.started = false;
        this.hideGameButton();
        this.stopGameTimer();
        sound.StopBackground();
        if(win){
            sound.PlayWin();
        }else{
            sound.PlayAlert();
        }
        this.gameStop && this.gameStop(win? 'win' : 'lose');
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
            this.finish(this.carrotCount === this.score);
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

    

