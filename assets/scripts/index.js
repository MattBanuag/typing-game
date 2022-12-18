'use strict';
// UTILITIES & FUNCTIONS
// Add Event Listener Function
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
// Query Selector Function
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

// Getting Random Words Function
function randomizer(array) {
    for(let i = 0; i <= array.length; i++) {
        let randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}

// Running Timer Function
function timer(timeLeft) {
    const timer = setInterval(() => {
        timeDisplay.innerHTML = `<i class="fa-solid fa-clock"></i> ${--timeLeft} seconds`;

        if(timeLeft == 0) {
            wordDisplay.innerText = 'Time\'s up';
            wordDisplay.style.color = '#FF1E00';
            startBtn.style.cursor = 'not-allowed';
            startBtn.disabled = true;
            wordInput.disabled = true;
            clearInterval(timer);
        }
    }, 1000);
}

// Validation Function
function validate() {
    onEvent('keyup', wordInput, () => {
        if(wordInput.value == randomWord) {
            wordInput.style.border = 'thin solid #4BB543';
            pointsDisplay.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${points += 1}`;
            wordDisplay.innerText = randomWord = randomizer(words);
            wordInput.value = '';
        } else {
            wordInput.style.border = 'thin solid #FF1E00';
        }
    });
}

// Start Game Function
function startGame() {
    timer(timeLeft);
    wordInput.disabled = false;
    wordInput.focus();
    wordDisplay.innerText = randomWord;
}

// HTML DOCUMENT BRIDGE
const wordDisplay = select('.word-display');
const timeDisplay = select('.time-display');
const pointsDisplay = select('.points-display');
const startBtn = select('.start-btn');
const restartBtn = select('.restart-btn');
const wordInput = select('.word-input');

// WORD ARRAY
const words = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
    'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
    'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
    'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
    'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
    'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
    'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
    'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
    'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
    'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
    'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
    'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
    'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window'
];

// GAME SETUP
let timeLeft = 10;
let points = 0;
let randomWord = randomizer(words);
wordInput.value = '';
wordInput.disabled = true;

// EVENT LISTENERS
onEvent('click', startBtn, () => {
    startGame();
    validate();
});

onEvent('click', restartBtn, () => {
    window.location.reload();
    wordInput.value = '';
});