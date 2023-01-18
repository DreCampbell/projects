const tiles = document.querySelectorAll('.tile');
const PlayerX = 'X';
const PlayerO = 'O';
let turn = PlayerX;

const boardState = Array(tiles.length);
boardState.fill(null);

//Elements
const strike = document.getElementById('strike');
const gameOverArea = document.getElementById('gameOverArea');
const gameOverText = document.getElementById('gameOverText');
const playAgain = document.getElementById('playAgain');
playAgain.addEventListener("click", startNewGame);

tiles.forEach((tile) => tile.addEventListener("click", tileClick))

function tileClick(event){
    if(gameOverArea.classList.contains('visible')){
        return;
    }

    function setHoverText(){
        //remove all hover text
        tiles.forEach((tile) => {
            tile.classList.remove('x-hover');
            tile.classList.remove('o-hover');
        })

        const hoverClass = `${turn.toLowerCase()}-hover`;

        tiles.forEach((tile) =>{
            if(tile.innerText == ''){
                tile.classList.add(hoverClass);
            }
        })
    }

    setHoverText()

    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if(tile.innerText != ''){
        return;
    }

    if(turn === PlayerX){
        tile.innerText = PlayerX;
        boardState[tileNumber - 1] = PlayerX;
        turn = PlayerO;
    }else{
        tile.innerText = PlayerO;
        boardState[tileNumber - 1] = PlayerO;
        turn = PlayerX;
    }
    setHoverText();
    checkWinner();
}

function checkWinner(){
    for(const winningCombo of winningCombos ){
        //Object Destructuring
        const {combo, strikeClass} = winningCombo
        const tileValue1 = boardState[combo[0] - 1];
        const tileValue2 = boardState[combo[1] - 1];
        const tileValue3 = boardState[combo[2] - 1];

        if(
            tileValue1 != null &&
            tileValue1 === tileValue2 && 
            tileValue1 === tileValue3
            ){
            strike.classList.add(strikeClass)
            gameOverScreen(tileValue1);
            return;
        }
    }
    //check for Draw
    const allTilesFilledIn = boardState.every((tile) => tile != null);
    if(allTilesFilledIn){
        gameOverScreen(null)
    }
}

function gameOverScreen(winnerText){
    let text = 'Draw!';
    if(winnerText != null){
        text = `Player ${winnerText} is the Winner!`
    }
    gameOverArea.className = 'visible'
    gameOverText.innerText = text
}

function startNewGame(){
    strike.className = 'strike';
    gameOverArea.className = 'hidden';
    boardState.fill(null);
    tiles.forEach((tile) => tile.innerText = '');
    turn = PlayerX;
    setHoverText();
}

const winningCombos = [
    //rows
    {combo:[1, 2, 3], strikeClass: "strike-row-1"},
    {combo:[4, 5, 6], strikeClass: "strike-row-2"},
    {combo:[7, 8, 9], strikeClass: "strike-row-3"},
    
    //columns
    {combo:[1, 4, 7], strikeClass: "strike-column-1"},
    {combo:[2, 5, 8], strikeClass: "strike-column-2"},
    {combo:[3, 6, 9], strikeClass: "strike-column-3"},

     //diagonals
    {combo:[1, 5, 9], strikeClass: "strike-diagonal-1"},
    {combo:[3, 5, 7], strikeClass: "strike-diagonal-2"},
]