
function Square(id, value = null) {
    this.id = id;
    this.value = value;
}

let squares = [
    [new Square(1), new Square(2), new Square(3)],
    [new Square(4), new Square(5), new Square(6)],
    [new Square(7), new Square(8), new Square(9)],
];

function Player(id, marker){
    this.id = id;
    this.marker = marker;
}


const GameEngine = (function() {
    let player1 = new Player(1, "X");
    let player2 = new Player(2, "O");

    let currentTurn = 0;

    GetCurrentPlayer = function() {
        if (currentTurn == 0){
            return player1;
        }
        else {
            return player2;
        }
    };

    ToggleTurn = function() {
        if (currentTurn == 0)
            currentTurn = 1;
        else    
            currentTurn = 0;
    };

    return {GetCurrentPlayer, ToggleTurn};
})();

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
                if (MakeMove(square.id, GameEngine.GetCurrentPlayer().marker)){
                    IsThereAWinner();
                    GameEngine.ToggleTurn();
                }
            })

            gameBoard.appendChild(square);
        });
    });

    //Add final board to game field
    gameField.appendChild(gameBoard);
}

function MakeMove(clickedSquare, move) {
    let squaresFlattened = squares.flat();
    let square = squaresFlattened.find((item) => item.id == clickedSquare);
    console.log(square);

    if (square.value == null) {
        square.value = move;
        console.log("placed marker");
        DrawBoard(squares);
        return true;
    }

    console.log("Error! Invalid Move.");
    return false;

}

function IsThereAWinner() {

}

DrawBoard(squares);

// MakeMove(4, "O");
// MakeMove(5, "X");