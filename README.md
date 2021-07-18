# 🥕Carrot-game ver.2 (Refectoring)

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


