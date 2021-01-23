'use strict';

// Const Variables
const mainBtn = document.getElementById('main-btn');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const wrongEl = document.getElementById('wrong');
const correctEl = document.getElementById('correct');
const saveBtn = document.getElementById('save-btn');
const incorrectDisplay = document.getElementById('incorrect-display');

// Let Variables
let answer, number1, number2, score;
let wrong = 0;
let correct = 0;
let symbol = '+';
let autoSave = 'on';

// Init Functions
populateUI();
problem();

// Decide Function
function decide() {
  if (score >= 10 && score < 20) {
    return addLvlTwo();
  } else if (score >= 20 && score < 30) {
    return addLvlThree();
  } else if (score >= 30 && score < 40) {
    return subLvlOne();
  } else if (score >= 40 && score < 50) {
    return subLvlTwo();
  } else if (score >= 50 && score < 60) {
    return subLvlThree();
  } else if (score >= 60 && score < 70) {
    return mulLvlOne();
  } else if (score >= 70 && score < 80) {
    return mulLvlTwo();
  } else if (score >= 80) {
    return mulLvlThree();
  } else {
    return addLvlOne();
  }
}

// Random Number Function
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Level Functions Adding
function addLvlOne() {
  symbol = '+';
  return getRandomInt(0, 10);
}

function addLvlTwo() {
  symbol = '+';
  return getRandomInt(5, 15);
}

function addLvlThree() {
  symbol = '+';
  return getRandomInt(10, 30);
}

// Level Functions Subtraction
function subLvlOne() {
  symbol = '-';
  return getRandomInt(0, 10);
}

function subLvlTwo() {
  symbol = '-';
  return getRandomInt(0, 20);
}

function subLvlThree() {
  symbol = '-';
  return getRandomInt(10, 30);
}

// Level Functions Multiplication
function mulLvlOne() {
  symbol = 'x';
  return getRandomInt(0, 7);
}

function mulLvlTwo() {
  symbol = 'x';
  return getRandomInt(4, 11);
}

function mulLvlThree() {
  symbol = 'x';
  return getRandomInt(6, 15);
}

// Check Answer Function
function checkAnswer() {
  incorrectDisplay.classList.add('hidden');
  let numberValue = answerEl.value;
  if (numberValue) {
    numberValue = Number(answerEl.value);
    if (answer === numberValue) {
      correct++;
      answerEl.style.border = '3px solid #19de7b';
    } else {
      wrong++;
      answerEl.style.border = '3px solid #ff1646';
      incorrectDisplay.classList.remove('hidden');
      incorrectDisplay.textContent = `${number1} ${symbol} ${number2} = ${answer}`;
    }
    answerEl.value = '';
    score = correct - wrong;
    problem();
  }
}

// New Problem Function
function problem() {
  number1 = decide();
  number2 = decide();
  if (symbol === '+') {
    answer = number1 + number2;
  } else if (symbol === '-') {
    answer = number1 - number2;
    while (number1 < number2) {
      number1 = decide();
      number2 = decide();
      answer = number1 - number2;
    }
  } else if (symbol === 'x') {
    answer = number1 * number2;
  }
  questionEl.textContent = `${number1} ${symbol} ${number2} = `;
}

// Event Listeners
mainBtn.addEventListener('click', checkAnswer);

saveBtn.addEventListener('click', () => {
  autoSave === 'off' ? (autoSave = 'on') : (autoSave = 'off');
});

// Save Function
function save() {
  const savedScore = localStorage.setItem('score', score);
  const savedCorrect = localStorage.setItem('correct', correct);
  const savedWrong = localStorage.setItem('wrong', wrong);
}

// Local Storage Function
function populateUI() {
  if (localStorage.getItem('score')) {
    score = localStorage.getItem('score');
  }
  if (localStorage.getItem('correct')) {
    correct = localStorage.getItem('correct');
  }
  if (localStorage.getItem('wrong')) {
    wrong = localStorage.getItem('wrong');
  }
}

// Update Game Variable
const updateGame = setInterval(() => {
  wrongEl.textContent = `❌ ${wrong}`;
  correctEl.textContent = `✔️ ${correct}`;
  if (autoSave === 'on') {
    saveBtn.textContent = 'Save: On';
    save();
  } else {
    saveBtn.textContent = 'Save: Off';
  }
}, 10);

// Clear Local Storage Event Listener
document.addEventListener('keypress', event => {
  if (event.code === 'Space') {
    clearGame();
  }
});

// Check Answer Event Listener
document.addEventListener('keypress', event => {
  if (event.code === 'Enter') {
    event.preventDefault();
    checkAnswer();
  }
});

// Clear Game Function
function clearGame() {
  wrong = 0;
  correct = 0;
  score = 0;
  symbol = '+';
  autoSave = 'off';
  answerEl.style.border = '3px solid #333';
  incorrectDisplay.classList.add('hidden');
  answerEl.value = '';
  localStorage.clear();
  problem();
}
