'use strict';

// Selectors
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

// Starting condition
let currentScore, scores, activePlayer, playing;

const init = function () {
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    scores = [0, 0];

    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    diceEl.classList.add('hidden');

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

// Function to switch the active player
const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Rolling the dice
btnRoll.addEventListener('click', function () {
    if (playing) {
        // Generate a random dice roll
        const score = Math.trunc(Math.random() * 6) + 1;

        // Display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${score}.png`;

        // Check if rolled number is 1
        if (score !== 1) {
            currentScore += score;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

// Holding current score
btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
            playing = false;
        } else {
            switchPlayer();
        }
    }
});

// Reset game
btnNew.addEventListener('click', init);
