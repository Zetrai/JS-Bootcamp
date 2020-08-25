class Hangman{
    constructor(word, remainingGuess){
        this.word = word.toLowerCase().split('')
        this.guessedLetters = []
        this.remainingGuess = remainingGuess
        this.status = "Playing"
    }

    // Prototype function to return puzzle
    get puzzle(){
        let puzzle = ''

        this.word.forEach((letter)=>{
            if(letter == ' ' || this.guessedLetters.includes(letter))
                puzzle += letter
            else
                puzzle += '*'
        })
    
        return puzzle
    }

    // Prototype function to receive the guess and check if its correct or not
    makeGuess(guess){
        if(this.status !== "Playing")
            return

        if(!this.guessedLetters.includes(guess)){
            this.guessedLetters.push(guess)
            if(!this.word.includes(guess) && this.remainingGuess > 0)
                this.remainingGuess--
        }
        if(!this.puzzle.includes('*'))
            this.status = "Finished"
        if(this.remainingGuess == 0 && this.status !== "Finished")
            this.status = "Failed"
        renderPuzzle(this.puzzle, this.statusMessage)
    }

    // Get StatusMessage
    get statusMessage(){
        if(this.status === "Playing")
            return "Guesses Left : " + this.remainingGuess
        else if(this.status === "Finished")
            return "Congratulations! You won the game!"
        else if(this.status === "Failed")
            return "Nice Try! The word was " + this.word.join('')
    }
}