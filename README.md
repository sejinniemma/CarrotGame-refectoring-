# 🥕Carrot-game ver.2 (Refectoring)


https://user-images.githubusercontent.com/80943394/127277083-66d3f90e-29b5-4927-badb-bafac3ac9169.mov

https://user-images.githubusercontent.com/80943394/180550284-ebd68575-34a8-4b80-ab1c-64d8c257ab86.mov

### The reason why I was trying to refectoring❓

- It was not bad 'carrot game ver.1' before refectoring but I just wanted to practice to refectoring

### How did you do refectoring ❓

- I divided 5 parts (main.js , popup.js , field.js , game.js , sound.js) by adding files

### main function 🙌
1. make Class template & create new Object
2. module files (export & import)

## PopUp.js 🎁

- This file is gathering functions related with popup from main.js
- This is faithful to their jobs which is showing popup banner and click event by refresh button

- how startGame() function can be executed in popUp class ? (rememebr their top scope) :
Although popUp class dosen't have information about startGame(), the reason why startGame() can be executed in popUp class is related their lexical scope. 
they remember their top scope reference as long as they exists.
When function declaration is evaluated, and function object is made,
they save their top scope reference to their environment. 

- this binding issue : The reason why I made arrow function when I send startGame() to their this.onClick memeber variable:
If I send only startGame() reference , 'this' information will disapear (this.onClick).


<img width="1253" alt="스크린샷 2021-07-18 오후 12 51 57" src="https://user-images.githubusercontent.com/80943394/126055529-76038ec8-4e2e-464c-996b-18a2d370b32a.png">


## Field.js 🌳

- This is the file related with field.
- show items(carrots and bugs) & click event on the field

1. make click event (remove items) 
2. add setClickListener : for processing score and other things outside (from main.js)
<img width="1246" alt="스크린샷 2021-07-18 오후 1 48 14" src="https://user-images.githubusercontent.com/80943394/126056236-ca58ef3c-fef7-4d9b-b600-5e54677bd9b0.png">

<img width="1239" alt="스크린샷 2021-07-18 오후 2 03 50" src="https://user-images.githubusercontent.com/80943394/126056552-412a35d4-6205-4a7b-9c1d-197095c8e211.png">

3. show items on the field
<img width="726" alt="스크린샷 2021-07-18 오후 1 57 38" src="https://user-images.githubusercontent.com/80943394/126056302-f613131d-1ec7-46da-9f1d-a50711c14e1e.png">

4. I didn't make all functions not using commonly as a 'Class'.For instance function 'randomNumber()'.because whenever I make new instance (new object),all Class member variables and functions would be applied even if they don't need ..which is unefficient.

### binding issue 💥
- when we send function as a parameter, information about Class dosen't send with parameter
- 'this.onItemClick' event error from function onClick()
- There are 3 ways we can solve this issue
1. using arrow function
 <img width="772" alt="스크린샷 2021-07-18 오후 3 18 36" src="https://user-images.githubusercontent.com/80943394/126057759-864ec0d3-974c-4805-b1c1-04136131b0ef.png">
2. using bind
  <img width="442" alt="스크린샷 2021-07-18 오후 3 15 51" src="https://user-images.githubusercontent.com/80943394/126057690-b0edf18a-d0fc-47ab-89ea-ab733959ed07.png">
3. make onClick function to member variable
  <img width="784" alt="스크린샷 2021-07-18 오후 3 21 38" src="https://user-images.githubusercontent.com/80943394/126057831-de2bc156-ba29-455a-a399-698fa613db88.png">

## Sound.js 🎶

- This is a sound file 
- I didn't use Class for this file
- I made meaningful sound function so user can catch what it is about at once.

https://user-images.githubusercontent.com/80943394/126057231-87559f0b-85d5-4cd8-bdba-7ad452a8f939.mov

## Game.js 🎮
### Main function
- game start & stop, make score, finish game banner(win,loose,replay)

### setGameStopListener 
- I wasn't able to make finsh game banner in game.js so I made this function to send to 'main.js' so that I can reference finishgamebanner 😆

### switch (main.js) 
- This is for making finishgamebanner that is referred from setGameStopListener in game.js
- Let's see down below!

<img width="1440" alt="스크린샷 2021-07-19 오후 5 46 50" src="https://user-images.githubusercontent.com/80943394/126131553-79e42bea-2716-4fa2-b92b-df501620b7db.png">


### Build Pattern 👻

- const game = new Game(5, 5, 5) > parameter dosen't clear
- we can use builder for more clear recogination (naming)
- I exported 'class GameBuilder' instead of 'class Game' 

<img width="1440" alt="스크린샷 2021-07-20 오후 1 35 35" src="https://user-images.githubusercontent.com/80943394/126262849-fa2c73b3-5490-41a6-94db-59677e5e53e3.png">


### Object.freeze()❄️

- For some users like me who often make a typo
- I made a strict object using freeze. 

<img width="1440" alt="스크린샷 2021-07-20 오후 4 39 05" src="https://user-images.githubusercontent.com/80943394/126281482-a702af41-2633-4f20-a919-2fbbefeac21a.png">

### remove finish()

- There are common functions so I tried to combine stop() with finish() as a one function
- both of them is almost similer
- make parameter : stop(reason)

1. original
<img width="1440" alt="스크린샷 2021-07-20 오후 5 43 12" src="https://user-images.githubusercontent.com/80943394/126426775-30215cfb-c66a-49c6-ba40-25fe067ea80e.png">

2. change
<img width="1440" alt="스크린샷 2021-07-20 오후 6 04 45" src="https://user-images.githubusercontent.com/80943394/126426851-1bd629e7-f9b2-40a9-8503-691c07414bdf.png">
