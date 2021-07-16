'use strict'

const bgSound = new Audio('./sounds/sound/bg.mp3');
const alertSound = new Audio('./sounds/sound/alert.wav');
const bugSound = new Audio('./sounds/sound/bug_pull.mp3');
const carrotSound = new Audio('./sounds/sound/carrot_pull.mp3');
const winSound = new Audio('./sounds/sound/game_win.mp3');

const GAME_DURATON_SEC = 5;
const CARROT_SIZE = 80;
const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();
const gameTimer = document.querySelector('.game__timer');
const gameBtn = document.querySelector('.game__button');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');


let score = 0;
let carrotCount = 5;
let bugCount = 5;
let timer = undefined;
let started = false;

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
    showPopUpWithText('REPLAY❓');
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
    gameField.innerHTML = '';
    gameScore.innerText = carrotCount;
    addItem('carrot',carrotCount,'img/carrot.png');
    addItem('bug',bugCount,'img/bug.png');
}
function addItem(className, count , imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for(let i=0; i < count; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
    

        const x = randomNumnber(x1, x2);
        const y = randomNumnber(y1, y2);
        item.style.left =`${x}px`;
        item.style.top =`${y}px`;

        gameField.appendChild(item);
    } 
}
function randomNumnber(min, max) {
    return Math.random() * (max - min) + min;
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

// POPup 
function showPopUpWithText(text){
    popUp.classList.remove('pop-up--hide');
    popUpText.innerHTML = text;
}

function hidePopUp(){
    popUp.classList.add('pop-up--hide');
}
// refresh button

popUpRefresh.addEventListener('click',()=>{
    score = 0;
    startGame();
    showGameButton();
    hidePopUp();
})

// remove carrot 

gameField.addEventListener('click',onFieldClick);

function onFieldClick(event){
    if(!started) {
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')){
        target.remove();
        playSound(carrotSound);
        score++;
        updateScoreBoard();
        if(score === carrotCount){
            finishGame(true);
        } 
    }else if(target.matches('.bug')){ 
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
   showPopUpWithText(win ? 'YOU WIN🎉' : 'YOU LOST💩');
}

function updateScoreBoard(){
    gameScore.innerHTML = carrotCount - score;
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}