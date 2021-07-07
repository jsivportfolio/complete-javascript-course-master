'use strict';

// DIAGRAMS CAN BE MADE FOR FREE AT diagrams.net();

// STEP 1)

    // DEFINE VARIABLES
    const elementPlayer0 = document.querySelector('.player--0');
    const elementPlayer1 = document.querySelector('.player--1');
    const elementScore0 = document.querySelector('#score--0');
    const elementScore1 = document.getElementById('score--1');
    const elementDice = document.querySelector('.dice');
    const btnNew = document.querySelector('.btn--new');
    const btnRoll = document.querySelector('.btn--roll');
    const btnHold = document.querySelector('.btn--hold');
    const elementCurrentScore0 = document.getElementById('current--0');
    const elementCurrentScore1 = document.getElementById('current--1');


// STEP 2)

    // // Starting Conditions
    // elementScore0.textContent = 0;
    // elementScore1.textContent = 0;
    // elementDice.classList.add('hidden');

    // // state variable
    // const playerScores = [0,0]
    // let currentScore = 0;
    // let activePlayer = 0;
    // let isGameActive = true;

    let playerScores;
    let currentScore;
    let activePlayer;
    let isGameActive;

// DEFINE FUNCTIONS

    // function Initialization of State Variables
    const functionInit = function () {

        // state variables
        playerScores = [0,0]
        currentScore = 0;
        activePlayer = 0;
        isGameActive = true;
        
        elementScore0.textContent = 0;
        elementScore1.textContent = 0;
        elementCurrentScore0.textContent = 0;
        elementCurrentScore1.textContent = 0;

        elementDice.classList.add('hidden');
        elementPlayer0.classList.remove('player--winner');
        elementPlayer1.classList.remove('player--winner');
        elementPlayer0.classList.add('player--active');
        elementPlayer1.classList.remove('player--active');
    }

    functionInit();

    const functionSwitchPlayer = function () {
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0; // if player 1, then player 2, else player 1
        // toggle() method
            // adds class if not present
            // removes class if present
                // ensure it is only on one element
        elementPlayer0.classList.toggle('player--active');
        elementPlayer1.classList.toggle('player--active');
    };

    // function Rolling the Dice
    btnRoll.addEventListener('click', function (){
            if (isGameActive) {
            // 1. Generating a random dice roll
            const aDiceRoll = Math.trunc(Math.random() * 6 + 1);
            console.log(aDiceRoll);
            console.log('aDiceRoll = ' + aDiceRoll);

            // 2. Display the dice roll
            elementDice.classList.remove('hidden');
            elementDice.src = `dice-${aDiceRoll}.png` // dynamically load image depending on the result of dice roll 

            // 3. Check for rolled dice with number 1: if true, then switch to the next player
            if (aDiceRoll !== 1) {
                // ADD dice roll to the current score
                currentScore += aDiceRoll;
                document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            } else {
                // SWITCH to the next player between players
                functionSwitchPlayer();
            }
        }
    });

    btnHold.addEventListener('click', function (){
        if (isGameActive) {
        // 1. Add current score to active player's score
        playerScores[activePlayer] += currentScore; // SAME AS = playerScores[1] = playerScores[1] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = playerScores[activePlayer]; // hold the score
        console.log(playerScores[activePlayer]);
        console.log('playerScores[activePlayer] = ' + playerScores[activePlayer]);
        console.log();

            // 2. Check if player's score is >= 100
            if (playerScores[activePlayer] >= 50) {
                // GAME OVER
                isGameActive = false;
                elementDice.classList.add('hidden');
                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
                
            } else {
                // Switch to the next player
                functionSwitchPlayer();
            } 
        }
    });

    btnNew.addEventListener('click', functionInit);