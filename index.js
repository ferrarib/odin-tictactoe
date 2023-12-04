


function DrawBoard(squares = null){
    //The are which the board will be drawn
    const gameField = document.getElementById("game-field");

    //Clear previous board if exists
    gameField.innerHTML = '';

    //The tic tac toe board itself
    const gameBoard = document.createElement("div");
    gameBoard.id = "game-board";


    //create squares and add to game board grid

    //Add final board to game field
    gameField.appendChild(gameBoard);
}


//DrawBoard();