'use strict'

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up')
    this.popUpText = document.querySelector('.pop-up__message')
    this.popUpRefresh = document.querySelector('.pop-up__refresh')
    this.popUpRefresh.addEventListener('click', () => {
      this.onclick && this.onclick()
      this.hide()
    })
  }

  setClickListener(onclick) {
    this.onclick = onclick
  }

  showWithText(text) {
    this.popUp.classList.remove('pop-up--hide')
    this.popUpText.innerHTML = text
  }

  hide() {
    this.popUp.classList.add('pop-up--hide')
  }
}
