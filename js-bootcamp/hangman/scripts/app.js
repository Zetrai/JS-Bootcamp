const puzzleEl = document.querySelector("#word")
const statusEl = document.querySelector("#status")
// Render Puzzle to the screen
const renderPuzzle = (puzzle, statusMsg) =>{
    
    puzzleEl.innerHTML = ''
    statusEl.innerHTML = statusMsg

    puzzle.split('').forEach((letter)=>{
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzleEl.appendChild(letterEl)
    })
}

// Creating Hangman object
let game1

// Creating event Listner for user to make a guess by pressing any letter
window.addEventListener('keypress',(e) =>{
    const guess = String.fromCharCode(e.charCode).toLowerCase()
    game1.makeGuess(guess)
})

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game1 = new Hangman(puzzle, 5)
    console.log(game1)
    renderPuzzle(game1.puzzle, game1.statusMessage)
}
document.querySelector('#reset').addEventListener('click', startGame)

startGame()
