(function(){
	window.boardLogic = {};

	/* this function creates each piece on the board. Each piece is an object with coordinates and a state.
	
	STATE: can either be null, 'X' or 'O'. When the first player clicks on an empty square, the squares state should be changed to 'X', when the second player clicks on an empty square, the state should be changed to 'O'.

	COORDINATES: The coordintes are the string value of the column and row.

	Here's an example:

	[[{}, {}, {name: 'piece', coordinates: '02', state: null}] 
	 [{}, {}, {}] 
	 [{}, {}, {}]]
	*/
	boardLogic.createPiece = function(coordinates){
		var piece = {
			name: 'piece',
			coordinates: coordinates,
			state: null,
		};

		return piece;
	};
	/* 

	Here we create a board constructor which has all the logic we'll need to make this thing work.

	Our Board is an object that does a couple of things: 

	1. Holds the turnCount (Board.turnCount). The turnCount tells the program whether its player 1 or player 2's turn.

	2. Board.board is the matrix itself. calling Board.resetBoard() creates a new 3 by 3 matrix where the states of each object are set to null.

	*/ 
	boardLogic.createBoard = function(){	
		var Board = {
			turnCount: 2,
			increment: function(){
				this.turnCount++
			},
			resetTurnCount: function(){
				this.turnCount = 2;
			},
			resetBoard: function(){
				this.board = boardLogic.create(3);
			}
		};

		Board.resetBoard()
		
		return Board;
	};


	boardLogic.create = function(num){
		var board = _.range(num);
		_.each(board, function(space, index, board){
			row = _.map(_.range(num), function(val){
			 return boardLogic.createPiece(index.toString() + val.toString());
			});
			board[index] = row;
		});

		return board;
	};

	window.Board = boardLogic.createBoard();

	boardLogic.findSquare = function(board, coordinates){
	  var result;
	  _.each(board, function(row){
	  	if (result === undefined) {
	  		result = _.find(row, function(square){
	  			return square.coordinates === coordinates;
	  		});
	  	}
	  });
	  if (result === undefined) {
	  	result = "square not found";
	  }

	  return result;
	};



// ======================== Helper functions to solve ====================================
	

	boardLogic.updateState = function(currentSquare, boardObject){
		// check the squares state. If it is player 1's turn, change the current squares state to X. and return the squares state.
		// if it is player 2's turn, change the current squares state to 'O' and return the squares state.
		// if the square has already been used, return 'current square filled'

	};

	boardLogic.catsGame = function(board){
		// look through the board return true if all of the squares have been filled but no one has won.
	};

	boardLogic.checkHorizontalWin = function(currentSquare, board){
	// if every square in the currentSquares row has the same state, that player has won.
	};

	boardLogic.checkVerticalWin = function(currentSquare, board){
	// if every square in the currentSquares column has the same state, that player has won.
	};

	boardLogic.playAgain = function(prompt, board){
		// if the players prompt is true, clear the state from each square in the board.
	};
	
	
	boardLogic.checkDiagonalWin = function(currentSquare, board){
		// if every square diagonal to the currentSquare is has the same state, that player has won.
	};


})();