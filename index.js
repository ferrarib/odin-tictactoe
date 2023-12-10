
function Square(id, row, column, value = null) {
    this.id = id;
    this.row = row;
    this.column = column;
    this.value = value;
}

let squares = [
    [new Square(1, 0, 0), new Square(2, 0, 1), new Square(3, 0, 2)],
    [new Square(4, 1, 0), new Square(5, 1, 1), new Square(6, 1, 2)],
    [new Square(7, 2, 0), new Square(8, 2, 1), new Square(9, 2, 2)],
];

let moves = [];

function Player(name, marker){
    this.name = name;
    this.marker = marker;
}


const GameEngine = (function() {

    ToggleTurn = function() {
        if (this.currentTurn == 1){
            this.currentTurn = 2;
            SetTurnDisplay(this.currentTurn);
            return this.player1;
        }
        else {
            this.currentTurn = 1;
            SetTurnDisplay(this.currentTurn);
            return this.player2;
        }
    };

    InitializeGame = function(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.currentTurn = 1;

        const player1Label = document.querySelector("#player1 .name");
        player1Label.textContent = player1.name;

        const player2Label = document.querySelector("#player2 .name");
        player2Label.textContent = player2.name;

        SetTurnDisplay(this.currentTurn);
    }

    ResetGame = function() {
        this.currentTurn = 1;
        SetTurnDisplay(this.currentTurn);
    }

    GetCurrentPlayer = function(){
        return this.currentTurn;
    }

    GetPlayerName = function(playerNum){
        if (playerNum == 1)
            return this.player1.name;
        else {
            return this.player2.name;
        }
    }

    return {InitializeGame, ToggleTurn, GetCurrentPlayer, GetPlayerName, ResetGame};
})();

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

let myInterval = null;

function DrawBoard(squares = null) {
    //The are which the board will be drawn
    const gameField = document.getElementById("game-field");

    //Clear previous board if exists
    gameField.innerHTML = '';

    //The tic tac toe board itself
    const gameBoard = document.createElement("div");
    gameBoard.id = "game-board";

    //create squares and add to game board grid
    squares.forEach(row => {
        row.forEach(column => {
            let square = document.createElement("div");
            square.classList.add("board-item");
            square.id = column.id;
            square.textContent = column.value;

            square.addEventListener('click', () => {
                if (MakeMove(square.id)){
                    let result = IsThereAWinner();
                    if (result == -1) {
                        EndGame(result);
                    }
                    else if (result == 1 || result == 2){
                        let winnerName = GameEngine.GetPlayerName(result);
                        EndGame(winnerName);
                    }
                }
            })

            gameBoard.appendChild(square);
        });
    });

    //Add final board to game field
    gameField.appendChild(gameBoard);
}

function MakeMove(clickedSquare) {
    let squaresFlattened = squares.flat();
    let square = squaresFlattened.find((item) => item.id == clickedSquare);

    if (square.value == null) {
        let player = GameEngine.ToggleTurn()
        square.value = player.marker;
        moves.push([square.row, square.column]);
        DrawBoard(squares);
        return true;
    }

    console.log("Error! Invalid Move.");
    return false;

}

function SetTurnDisplay(currentTurn){
    const player1TurnDisplay = document.querySelector("#player1 .your-turn");
    const player2TurnDisplay = document.querySelector("#player2 .your-turn");

    player1TurnDisplay.style.visibility = currentTurn == 1 ? "visible" : "hidden";
    player2TurnDisplay.style.visibility = currentTurn == 2 ? "visible" : "hidden";
}

function IsThereAWinner() {
    console.log("checking if there is a winner...");

    const cases = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const grid = new Uint8Array(9);
    for (let i = 0; i < moves.length; ++i) {
      grid[moves[i][0] * 3 + moves[i][1]] = (i % 2) + 1;
    }
    for (let i = 0; i < cases.length; ++i) {
      const role = grid[cases[i][0]];
      if (role !== 0 && grid[cases[i][1]] === role && grid[cases[i][2]] === role) {
        return role === 1 ? 1 : 2;
      }
    }
    return moves.length === 9 ? -1 : 0;
}

function StartGame(e) {
    e.preventDefault();
    const dialog = document.querySelector("#splash");
    dialog.style.visibility = "hidden";
    dialog.close();

    const goDialog = document.querySelector("#game-over");
    goDialog.style.visibility = "hidden";
    goDialog.close();

    
    DrawBoard(squares);
    
    GameEngine.InitializeGame(new Player(e.target[0].value, 'X'), new Player(e.target[1].value, 'O'));

    myInterval = setInterval(setTime, 1000);
}

function ResetGameWithCurrentPlayers(e) {
    e.preventDefault();
    squares = [
        [new Square(1, 0, 0), new Square(2, 0, 1), new Square(3, 0, 2)],
        [new Square(4, 1, 0), new Square(5, 1, 1), new Square(6, 1, 2)],
        [new Square(7, 2, 0), new Square(8, 2, 1), new Square(9, 2, 2)],
    ];

    moves = [];

    totalSeconds = 0;

    const dialog = document.querySelector("#splash");
    dialog.style.visibility = "hidden";
    dialog.close();

    const goDialog = document.querySelector("#game-over");
    goDialog.style.visibility = "hidden";
    goDialog.close();

    GameEngine.ResetGame();
    
    DrawBoard(squares);
    myInterval = setInterval(setTime, 1000);
}

function EndGame(winner) {
    clearInterval(myInterval);

    const gameOverModal = document.querySelector("#game-over");
    gameOverModal.style.visibility = "visible";
    const gameOverMessage = gameOverModal.querySelector(".game-message");

    if (winner == -1){
        gameOverMessage.textContent = "Game over: No more available moves";
    }
    else {
        gameOverMessage.textContent = "Winner: " + winner;
    }

    gameOverModal.showModal();
}

const dialog = document.querySelector("#splash");
dialog.showModal();


