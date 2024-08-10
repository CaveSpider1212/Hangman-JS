// VARIABLES
var stage = 1; // stage of the hangman image
var guessedInWord = []; // array of the letters in the word that have been guessed
var clue = ""; // the word with the blanks
var gameOver = false;



// HTML ELEMENTS
const wordBlank = document.querySelector(".word");
const letters = document.querySelectorAll(".letter");
const image = document.querySelector(".image");
const gameMessage = document.querySelector(".message");



// WORD SELECTION
const words = [
    "library",
    "briefcase",
    "piano",
    "trophy",
    "monitor",
    "frame",
    "headphones",
    "prepare",
    "elephant",
    "dropper"
]

const word = words[Math.floor(Math.random() * words.length)];
for (let i = 0; i < word.length; i++) { // adds blanks to the clue
    clue += "_";
}
wordBlank.innerText = clue;



// FUNCTIONS
const guessLetter = (button) => {
    let ltr = button.getAttribute("id");
    button.classList.add("collapsed");
    let inWord = false;

    for (let i = 0; i < word.length; i++) { // iterates through the word to see if the guessed letter is in the word
        if (ltr === word[i]) {
            guessedInWord.push(ltr);
            inWord = true;
        }
    }

    if (!inWord) { // if the guessed letter isn't in the word, add a stage to the image and change it
        stage++;
        image.setAttribute("src", `Images/stage${stage}.png`);
    }

    clue = "";
    for (let j = 0; j < word.length; j++) { // iterates through the word, checks to see if the letter has already been guessed in the word, and add it to the clue
        if (guessedInWord.includes(word[j])) {
            clue += word[j];
        }
        else {
            clue += "_"; // add a blank if the letter hasn't been guessed yet
        }
    }
    wordBlank.innerText = clue;

    if (clue === word) {
        gameMessage.classList.remove("hidden");
        gameMessage.classList.add("win");
        gameMessage.innerText = "You won! Refresh to play again.";
        gameOver = true;
    }

    if (stage == 7) {
        gameMessage.classList.remove("hidden");
        gameMessage.classList.add("loss");
        gameMessage.innerText = `You lost. The word was "${word}." Refresh to play again.`;
        gameOver = true;
    }
}



// EVENT LISTENERS
letters.forEach((letter) => {
    letter.addEventListener("click", () => {
        if (!gameOver) {
            guessLetter(letter);
        }
    })
})