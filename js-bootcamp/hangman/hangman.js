const Hangman = function (word, remainingGuess){
    this.word = word.toLowerCase().split('')
    this.guessedLetters = []
    this.remainingGuess = remainingGuess
}

Hangman.prototype.getPuzzle = function(){
    let puzzle = ''

    this.word.forEach((letter)=>{
        if(letter == ' ' || this.guessedLetters.includes(letter))
            puzzle += letter
        else
            puzzle += '*'
    })

    return puzzle
}

Hangman.prototype.makeGuess = function(guess){
    if(!this.guessedLetters.includes(guess)){
        this.guessedLetters.push(guess)
        if(!this.word.includes(guess))
            this.remainingGuess--
    }
    console.log("Guess : "+guess)
    console.log("Remaining Guess left : "+this.remainingGuess)
    console.log(this.getPuzzle())
}

const game1 = new Hangman('Blue Cat',2)
console.log(game1.getPuzzle())
console.log("Total Guess : "+game1.remainingGuess)

window.addEventListener('keypress',function(e){
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
})