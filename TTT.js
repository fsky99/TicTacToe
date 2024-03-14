let board = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // Defining the board ids


//a function for the winning combination of the board for the game
function Win(TheBoard, ThePlayer) {
  if (
    (TheBoard[0] == ThePlayer && TheBoard[1] == ThePlayer && TheBoard[2] == ThePlayer) ||
    (TheBoard[3] == ThePlayer && TheBoard[4] == ThePlayer && TheBoard[5] == ThePlayer) ||
    (TheBoard[6] == ThePlayer && TheBoard[7] == ThePlayer && TheBoard[8] == ThePlayer) ||
    (TheBoard[0] == ThePlayer && TheBoard[3] == ThePlayer && TheBoard[6] == ThePlayer) ||
    (TheBoard[1] == ThePlayer && TheBoard[4] == ThePlayer && TheBoard[7] == ThePlayer) ||
    (TheBoard[2] == ThePlayer && TheBoard[5] == ThePlayer && TheBoard[8] == ThePlayer) ||
    (TheBoard[0] == ThePlayer && TheBoard[4] == ThePlayer && TheBoard[8] == ThePlayer) ||
    (TheBoard[2] == ThePlayer && TheBoard[4] == ThePlayer && TheBoard[6] == ThePlayer)
  ) {
    return true;
  } else {
    return false;
  }
}

// Function to check if the game is over by calling the win function to check if the current player has won
function isGameOver(board, player) {
  if (Win(board, player)) {      // chcek if it's a win return true
    return true;    
  } else if (getEmptyCells(board).length === 0 && !Win(board, user) && !Win(board, ai)) {  
    return true; // Tie condition --> if there's no empty cells on the board and nnone has won
  }
  return false;  
}

// Function to get the empty cells on the board
function getEmptyCells(board) {
  return board.filter((cell) => typeof cell === 'number');
}

// Function to reset the game and refresh the page if the game is done
function resetGame() {
  location.reload();
}

// Function to evaluate the score on the board based on the current state of the game
function evaluate(board) {
  if (Win(board, user)) {       // if the user is wining return -1
    return -1;
  } else if (Win(board, ai)) {       // else if it's the ai return 1
    return 1;
  } else {
    return 0;       //if it's tie then it will return 0
  }
}

// Implementing the Minimax Algorithm by returning the best move with the score
function minimax(board, player) {
  const emptyCells = getEmptyCells(board);     //get the empty cells and stoere them in the array

  // the base case for the algoritm to represent the scores
  if (Win(board, user)) {
    return { score: -1 };  //if the user wins then return -1
  } else if (Win(board, ai)) { //if the ai win return 1
    return { score: 1 };
  } else if (emptyCells.length === 0) { //if there's no empty cells and no one has won return 0
    return { score: 0 };
  }

  const moves = [];      //empty array for the moves to store them
  for (let i = 0; i < emptyCells.length; i++) {      //loop to go through the empty cells on the bored
    const move = {};    // for every empty cell , vreate move object and store the index of the cell in the index
    move.index = board[emptyCells[i]];    
    board[emptyCells[i]] = player;       //put the X or O for the ai or user on the empty cell to evaluate this move

    //we will chack the minimax function to evaluate the scores for the opponent player best move after the current player move
    if (player === ai) {   //if this cuurent player is the ai
      const result = minimax(board, user);   //then call the minimax with the user as the player to get the result object that has the score in 'score' of the move
      move.score = result.score;
    } else {            
      const result = minimax(board, ai);  // else if it's the user who is the current player then call minimax with the ai as the player go get the result object with the score in 'score' of the move 
      move.score = result.score;
    }

    board[emptyCells[i]] = move.index;   // getting back the original state of the board by assining the original cell value to the empty cell
    moves.push(move);  // then add the move to the 'moves' array
  }

  let bestMove;  //index of the best move 
  if (player === ai) {   //if the player is the ai
    let bestScore = -Infinity;   //best score is -infinity 'lowest possible score'
    for (let i = 0; i < moves.length; i++) { //loop through the moves array with the highest score
      if (moves[i].score > bestScore) { // if the move has a score that it's higher than the 'current best score'
        bestScore = moves[i].score;  //set it as the best score
        bestMove = i;   //set the index as the best score
      }
    }
  } else {  //if the current player is not the ai
    let bestScore = Infinity;  //set the best score to infinity ' highest positive score'
    for (let i = 0; i < moves.length; i++) {  //loop though the moves array to find the move with the lowest score
      if (moves[i].score < bestScore) {  // if a move has a lower score than the curren best score then update best score with the index of htat score
        bestScore = moves[i].score;
        bestMove = i;  //assign the index to the best move
        //best move will have the index of the best score based on the user , ai will have the highest score , and the user has the lowest
      }
    }
  }

  return moves[bestMove];
}

// Function to handle cell click 
function cellClicked(cellId) {
  if (typeof board[cellId] === 'number' && !isGameOver(board, user)) { //if the celll is empty and the gaem is not over
    makeMove(cellId, user);  //call makemove function with the user 

    if (!isGameOver(board, user)) {  //if the game is not over , make the ai move
      const bestMove = minimax(board, ai).index;  //call minimax to get the best move for the index and then call makemove function with this index for the ai player
      makeMove(bestMove, ai);
    }
  }
}

// Function to update the bored by making a move on the board
function makeMove(move, player) {
      //display the move on the cell by the index chosen
  board[move] = player;
  const cell = document.getElementById(move.toString());
  cell.textContent = player;

  if (isGameOver(board, player)) { //if the game is over then:
    setTimeout(() => {
      if (Win(board, player)) {  //shows the player who win through an alert
        alert(player + ' Winnnnnns!');
      } else {
        alert("It's a tie :( !");  //if it's a tie then show an alert telling the user it's a tie
      }
      resetGame();
    }, 100);
  }
}



