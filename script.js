const board = document.querySelector('.game-board');
const timerEl = document.getElementById('timer');
const movesEl = document.getElementById('moves');
const winMessage = document.getElementById('win-message');

const emojis = ['🍎','🍌','🍇','🍒','🍉','🥑','🍍','🥕'];
let cards = [...emojis, ...emojis]; // duplicate for pairs

let flippedCards = [];
let matchedCards = 0;
let moves = 0;
let timer = 0;
let gameStarted = false;
let timerInterval;

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

// Create cards
cards.forEach(emoji => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerText = emoji;
  card.addEventListener('click', flipCard);
  board.appendChild(card);
});

// Start timer
function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    timerEl.textContent = timer;
  }, 1000);
}

function flipCard() {
  if (!gameStarted) {
    gameStarted = true;
    startTimer();
  }

  if (this.classList.contains('flipped') || flippedCards.length === 2) return;

  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    movesEl.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.innerText === card2.innerText) {
    matchedCards += 2;
    flippedCards = [];

    if (matchedCards === cards.length) {
      clearInterval(timerInterval);
      winMessage.classList.remove('hidden');
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 800);
  }
}
