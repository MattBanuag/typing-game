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

// Ready Set Go Timer Function
function readySetGo(countdown) {
    const countdownTime = setInterval(() =>  {
        wordDisplay.innerText = --countdown;

        if(countdown == 0) {
            wordDisplay.innerText = randomWord;
            clearInterval(countdownTime);
        }
    }, 1000);
}

// Preparing LocalStorage Function
function prepStorage() {
    if(localStorage.getItem('Games') == null) {
        localStorage.setItem('Games', '[]');
    }
}

// Save Result Function
function saveData() {
    const currentDate = new Date().toJSON().slice(0, 10);
    const stats = {
        score: points,
        date: currentDate
    };

    // Getting Old Data and Pushing New Data
    const prevGames = JSON.parse(localStorage.getItem('Games'));
    prevGames.push(stats);

    localStorage.setItem('Games', JSON.stringify(prevGames));
}

// Show Leaderboard Function
function showData() {
    const allGames = JSON.parse(localStorage.getItem('Games'));

    for(let game of allGames) {
        scoreTable.innerHTML += `
        <tr>
            <td>#1</td>
            <td>${game.score}</td>
            <td>${game.date}</td>
        </tr>
    `;
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
            saveData();
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
    startBtn.disabled = true;
    wordInput.disabled = false;
    wordInput.focus();
}

// HTML DOCUMENT BRIDGE
const scoreTable = select('table');
const wordDisplay = select('.word-display');
const timeDisplay = select('.time-display');
const pointsDisplay = select('.points-display');
const startBtn = select('.start-btn');
const restartBtn = select('.restart-btn');
const wordInput = select('.word-input');
const dialog = select('dialog');

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
let timeLeft = 100;
let countdown = 4;
let points = 0;
let randomWord = randomizer(words);
wordInput.value = '';
wordInput.disabled = true;
dialog.showModal();
prepStorage();
showData();

// EVENT LISTENERS
onEvent('click', dialog, function(event) {
    const rect = this.getBoundingClientRect();

    if(event.clientY < rect.top || event.clientY > rect.bottom || 
      event.clientX < rect.left || event.clientX > rect.right) {
        dialog.close();
    }
});

onEvent('click', startBtn, () => {
    readySetGo(countdown);

    setTimeout(() => {
        startGame();
        validate();
    }, 4000);
});

onEvent('click', restartBtn, () => {
    window.location.reload();
    wordInput.value = '';
});