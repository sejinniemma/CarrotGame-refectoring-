'use strict'

const CARROT_SIZE = 80;
const carrotSound = new Audio('./sound/carrot_pull.mp3');

export default class Field {
    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.gameField = document.querySelector('.game__field');
        this.fieldRect = this.gameField.getBoundingClientRect();
        this.gameField.addEventListener('click',this.onclick);
    }

    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    
    init(){
        this.gameField.innerHTML = '';
        this._addItem('carrot',this.carrotCount,'img/carrot.png');
        this._addItem('bug',this.bugCount,'img/bug.png');
    }
    
    
    _addItem(className, count , imgPath){
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
    
        for(let i=0; i < count; i++){
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
        
    
            const x = randomNumnber(x1, x2);
            const y = randomNumnber(y1, y2);
            item.style.left =`${x}px`;
            item.style.top =`${y}px`;
    
            this.gameField.appendChild(item);
        } 
    }

   
    onclick(event){
            const target = event.target;
            if(target.matches('.carrot')){
                target.remove();
                playSound(carrotSound);
                this.onItemClick && this.onItemClick('carrot');
            }else if(target.matches('.bug')){ 
                this.onItemClick && this.onItemClick('bug');
            }

    }
      
}

function randomNumnber(min, max) {
    return Math.random() * (max - min) + min;
  }

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}