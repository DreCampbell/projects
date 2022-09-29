import { WORDS } from './words.js';

const NUMBER_OF_GUESSES = 6
let guessesRemaining = NUMBER_OF_GUESSES
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)

function initBoard() {
    let board = document.getElementById('game-board')

    for(let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement('div')
        row.className = 'letter-row'

        for(let j = 0; j < 5; j++){
            let box = document.createElement('div')
            box.className = 'letter-box'
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

initBoard()

document.addEventListener('keyup', (e) => {
    if (guessesRemaining === 0){
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === 'Backspace' && nextLetter !== 0){
        deleteLetter()
        return
    }

    if (pressedKey === 'Enter'){
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if(!found || found.length > 1){
        return
    }else{
        insertLetter(pressedKey)
    }
})

function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter(){
    let row = document.getElementsByClassName('letter-row')[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ''
    box.classList.remove('filled-box')
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess(){
    let row = document.getElementsByClassName('letter-row')[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for( const val of currentGuess){
        guessString += val
    }

    if(guessString.length != 5){
        alert('Not enough letters!')
        return
    }

    if(!WORDS.includes(guessString)){
        alert('Word not in list!')
        return
    }

    for(let i = 0; i < 5; i++){
        let letterColour = ''
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])
        //is letter in the correct guess position
        if(letterPosition === -1){
            letterColour = 'grey'
        }else {
            if(currentGuess[i] === rightGuess[i]){
                letterColour = 'green'
            }else{
                letterColour = 'yellow'
            }
            rightGuess[letterPosition] = '#'
        }

        let delay = 250 * i
        setTimeout(()=> {
            box.style.backgroundColor = letterColour
            shadeKeyBoard(letter, letterColour)
        }, delay)
    }
    if(guessString === rightGuessString){
        alert("You guessed right! Game over!")
        guessesRemaining = 0
        return
    }else{
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;
        
        if(guessesRemaining === 0){
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${rightGuessString}"`)
        }

    }
}

function shadeKeyBoard(letter, colour){
    for(const elem of document.getElementsByClassName('keyboard-button')){
        if(elem.textContent === letter){
            let oldColour = elem.style.backgroundColor
            if(oldColour === 'green'){
                return
            }

            if(oldColour === 'yellow' && colour !== 'green'){
                return
            }

            elem.style.backgroundColor = colour
            break
        }
    }
}

document.getElementById('keyboard-cont').addEventListener("click", (e) =>{
    const target = e.target

    if(!target.classList.contains('keyboard-button')){
        return
    }
    let key = target.textContent

    if(key === 'Del'){
        key == 'Backspace'
    }

    document.dispatchEvent(new KeyboardEvent('keyup', {'key': key}))
})