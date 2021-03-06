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
answerEl.focus();

// Decide Function
function decide() {
  if (score >= 10 && score < 20) {
    return addLvlTwo();
  } else if (score >= 20 && score < 30) {
    return addLvlThree();
  } else if (score >= 30 && score < 40) {
    return addLvlFour();
  } else if (score >= 40 && score < 50) {
    return subLvlOne();
  } else if (score >= 50 && score < 60) {
    return subLvlTwo();
  } else if (score >= 60 && score < 70) {
    return subLvlThree();
  } else if (score >= 70 && score < 80) {
    return subLvlFour();
  } else if (score >= 80 && score < 100) {
    return mulLvlOne();
  } else if (score >= 100 && score < 110) {
    return mulLvlTwo();
  } else if (score >= 110 && score < 120) {
    return mulLvlThree();
  } else if (score >= 120 && score < 130) {
    return mulLvlFour();
  } else if (score >= 130) {
    return mulLvlFive();
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
  return getRandomInt(10, 20);
}

function addLvlFour() {
  symbol = '+';
  return getRandomInt(15, 30);
}

// Level Functions Subtraction
function subLvlOne() {
  symbol = '-';
  return getRandomInt(0, 10);
}

function subLvlTwo() {
  symbol = '-';
  return getRandomInt(0, 15);
}

function subLvlThree() {
  symbol = '-';
  return getRandomInt(5, 20);
}

function subLvlFour() {
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
  return getRandomInt(4, 10);
}

function mulLvlThree() {
  symbol = 'x';
  return getRandomInt(6, 12);
}

function mulLvlFour() {
  symbol = 'x';
  return getRandomInt(10, 15);
}

function mulLvlFive() {
  symbol = 'x';
  return getRandomInt(12, 20);
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
      correctEl.classList.add('active');
      setTimeout(() => {
        correctEl.classList.remove('active');
      }, 400);
    } else {
      wrong++;
      answerEl.style.border = '3px solid #ff1646';
      incorrectDisplay.classList.remove('hidden');
      incorrectDisplay.textContent = `${number1} ${symbol} ${number2} = ${answer}`;
      wrongEl.classList.add('active');
      setTimeout(() => {
        wrongEl.classList.remove('active');
      }, 400);
    }
    answerEl.value = '';
    score = correct - wrong;
    answerEl.focus();
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
  wrongEl.innerHTML = `${wrong} <i class="fas fa-times lead wrong"></i> `;
  correctEl.innerHTML = `${correct} <i class="fas fa-check lead correct"></i> `;
  if (autoSave === 'on') {
    saveBtn.textContent = 'Auto Saving';
    save();
  } else {
    saveBtn.textContent = 'Not Saving';
  }
}, 10);

// Clear Local Storage Event Listener
document.addEventListener('keypress', event => {
  if (event.code === 'Space') {
    clearGame();
  }
});

// Check Answer Event Listener
document.addEventListener('keypress', e => {
  if (e.code === 'Enter') {
    e.preventDefault();
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
