
function Square(id, value = null) {
    this.id = id;
    this.value = value;
}

let squares = [
    [new Square(1), new Square(2), new Square(3)],
    [new Square(4), new Square(5), new Square(6)],
    [new Square(7), new Square(8), new Square(9)],
];

function Player(marker){
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

        if (player1.marker == 'X'){
            this.currentTurn = 1;
        }
        else {
            this.currentTurn = 2;
        }

        SetTurnDisplay(this.currentTurn);
    }

    GetCurrentPlayer = function(){
        return this.currentTurn;
    }

    return {InitializeGame, ToggleTurn, GetCurrentPlayer};
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
                    IsThereAWinner();
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
        console.log("Placed Marker for Player: ", GameEngine.GetCurrentPlayer());
        let player = GameEngine.ToggleTurn()
        square.value = player.marker;
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

}

function StartGame(e) {
    e.preventDefault();
    const dialog = document.querySelector("dialog");
    dialog.style.visibility = "hidden";
    dialog.close();
    
    DrawBoard(squares);
    if (e.target[0].checked){
        GameEngine.InitializeGame(new Player('X'), new Player('O'));
    }
    else {
        GameEngine.InitializeGame(new Player('O'), new Player('X'));
    }

    setInterval(setTime, 1000);
}

const dialog = document.querySelector("dialog");
dialog.showModal();



