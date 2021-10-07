'use strict'
import { ItemType } from './game.js'
import * as sound from './sound.js'
const CARROT_SIZE = 80

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount
    this.bugCount = bugCount
    this.gameField = document.querySelector('.game__field')
    this.fieldRect = this.gameField.getBoundingClientRect()
    this.gameField.addEventListener('click', this.onclick)
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick
  }

  init() {
    this.gameField.innerHTML = ''
    this._addItem(ItemType.carrot, this.carrotCount, 'img/carrot.png')
    this._addItem(ItemType.bug, this.bugCount, 'img/bug.png')
  }

  _addItem(className, count, imgPath) {
    const x1 = 0
    const y1 = 0
    const x2 = this.fieldRect.width - CARROT_SIZE
    const y2 = this.fieldRect.height - CARROT_SIZE

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img')
      item.setAttribute('class', className)
      item.setAttribute('src', imgPath)
      item.style.position = 'absolute'

      let x = randomNumnber(x1, x2)
      let y = randomNumnber(y1, y2)
      item.style.left = `${x}px`
      item.style.top = `${y}px`

      this.gameField.appendChild(item)

      if (className === ItemType.bug) {
        let k = randomNumnber(x1, x2)
        let i = randomNumnber(y1, y2)
        item.animate([{ left: `${k}px` }, { top: `${i}px` }], {
          duration: 10000,
          iterations: Infinity,
        })
      }
    }
  }

  onclick = (event) => {
    const target = event.target
    if (target.matches('.carrot')) {
      target.remove()
      sound.PlayCarrot()
      this.onItemClick && this.onItemClick(ItemType.carrot)
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug)
    }
  }
}

function randomNumnber(min, max) {
  return Math.random() * (max - min) + min
}
