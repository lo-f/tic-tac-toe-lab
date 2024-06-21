/*------------------------------- Min Requirements ------------------------*/
/* 
Display an empty tic-tac-toe board when the page is initially displayed.
A player can click on the nine cells to make a move.
Every click will alternate between marking an X and O.
Display whose turn it is (X or O).
The cell cannot be played again once occupied with an X or O.
Provide win logic and display a winning message.
Provide logic for a cat’s game (tie), also displaying a message.
Provide a Reset Game button that will clear the contents of the board.
*/


/*-------------------------------- Pseudocode -------------------------------*/

//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*
Define constants and variables:
    define a constant for X and O

Define app's state variables, w/o values to them:
    define a variable for Player1's choice
    define a variable for Player2's choice
    define a variable for game message

Add event listneners:
    add event listener for sqr0
    add event listener for sqr1
    add event listener for sqr2
    add event listener for sqr3
    add event listener for sqr4
    add event listener for sqr5
    add event listener for sqr6
    add event listener for sqr7
    add event listener for sqr8

Initialize all state variables
    using event listeners, assign Player1's choice to variable for Player1's
        choice
    using event listeners, assign Player2's choice to variable for Player2's
        choice

Render game message to the DOM

3-in-a-row
    IF X's have three in a row by row, column, or diagnal
        then X wins
    ELSE IF O's have three in a row by row, column, or diagnal
        then O wins
    ELSE the game is a tie

Render game message to DOM

*/

/*-------------------------------- Constants --------------------------------*/

let board, turn, winner, tie;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

/*---------------------------- Variables (state) ----------------------------*/

function init () {
    board = [
        '', '', '', 
        '', '', '', 
        '', '', '', 
    ];
    turn = 'X'
    winner = false;
    tie = false;
    render ();
};

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('reset')

/*-------------------------------- Functions --------------------------------*/

function render () {
    updateBoard();
    updateMessage();
};

function updateBoard () {
    board.forEach((el, idx) => {
        const squareEl = squareEls[idx];
        squareEl.textContent = el;
    })
}

function updateMessage () {
    let output;
    if (winner === false && tie === false) {
        output = `Player ${turn}'s turn!`
    } else if ((winner === false) && (tie === true)) {
        output = `It's a tie!`;
    } else {
        output = `Player ${turn} is the WINNER!`
    }
    messageEl.textContent = output;
};

function placePiece(index) {
    if (winner === true) return
    else if (board[index] === '' && turn === 'X') {
        board[index] = 'X';
    } else if (board[index] === '' && turn === 'O') {
        board[index] = 'O';
    }
    // testing
    // console.log(board[index])
}

function checkForWinner () {
    winningCombos.forEach((won) => {
        if ((board[won[0]]) !== ''
            && board[won[0]] === board[won[1]]
            && board[won[1]] === board[won[2]]) {
                winner = true
                // console.log('someone won')
            }
        })
}

function checkForTie () {
    if (winner === true) return
    if (board.includes('')) {
        tie = false;
    }   else {
        tie = true;
    }
}

function switchPlayerTurn () {
    if (winner === true) return;
    if (winner === false
        && turn === 'X') {
            turn = 'O'
        } else if (winner === false
            && turn === 'O') {
                turn = 'X'
        }
}

function handleClick (event) {
    const squareIndex = event.target.id;
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}


/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
    square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init)


init()
