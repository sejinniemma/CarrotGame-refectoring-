'use strict'
import PopUp from "./popup.js";
import Field from "./field.js";

const bgSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bugSound = new Audio('./sound/bug_pull.mp3');

const winSound = new Audio('./sound/game_win.mp3');

let score = 0;
let carrotCount = 5;
let bugCount = 5;
let timer = undefined;
let started = false;

const GAME_DURATON_SEC = 5;
const gameTimer = document.querySelector('.game__timer');
const gameBtn = document.querySelector('.game__button');
const gameScore = document.querySelector('.game__score');



const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(()=>{
    score = 0;
    startGame();
    showGameButton();
})



const gameField = new Field(carrotCount,bugCount);
gameField.setClickListener(onitemClick);

function onitemClick(item){
        if(!started) {
            return;
        }
        if(item === 'carrot'){
            score++;
            updateScoreBoard();
            if(score === carrotCount){
                finishGame(true);
            } 
        }else if(item === 'bug'){ 
                finishGame(false);
        }
       
    }

    function finishGame(win){
        started = false;
        hideGameButton();
        stopGameTimer();
        stopSound(bgSound);
        if(win){
            playSound(winSound);
        }else{
            playSound(bugSound);
        }
        gameFinishBanner.showWithText(win ? 'YOU WIN🎉' : 'YOU LOST💩');
     }
     
     function updateScoreBoard(){
         gameScore.innerHTML = carrotCount - score;
     }



// START GAME!!
gameBtn.addEventListener('click',()=>{
    if(started){
        stopGame();
    }else {
        startGame();
    } 
})

function startGame(){
    started = true;
    initGame();
    StartgameTimer();
    showStopButton();
    showTimerAndScore();
    playSound(bgSound);
    
}

function stopGame(){
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText('REPLAY❓');
    playSound(alertSound);
    stopSound(bgSound);
}

// showTimerAndScore
function showTimerAndScore(){
    gameTimer.style.visibility ='visible';
    gameScore.style.visibility ='visible';
}

//  creat carrots & bugs randomly on gameField
function initGame(){
    gameScore.innerText = carrotCount;
    gameField.init();
}

  

//   make game Timer
function StartgameTimer(){
    let remainingTimeSec = GAME_DURATON_SEC;
    updateTimerText(remainingTimeSec);
    timer =  setInterval(()=>{
        if(remainingTimeSec <= 0){
            clearInterval(timer);
            finishGame(carrotCount === score);
            return;
        }   
           updateTimerText(--remainingTimeSec);  
  },1000)   
}

function updateTimerText(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = `${minutes} : ${seconds}`;
}

function stopGameTimer(){
   clearInterval(timer);
}


// make stop button
function showStopButton (){
    const Icon = gameBtn.querySelector('.fas');
    Icon.classList.add('fa-stop');
    Icon.classList.remove('fa-play');
}

function hideGameButton(){
    gameBtn.style.visibility ="hidden";
}

function showGameButton(){
    gameBtn.style.visibility ="visible";
}


function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}