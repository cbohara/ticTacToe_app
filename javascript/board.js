(function(){
	window.boardLogic = {};
	/* this function creates each piece on the board. Each piece is an object with coordinates and a state.
	
	STATE: can either be null, 'X' or 'O'. When the first player clicks on an empty square, the squares state should be changed to 'X', when the second player clicks on an empty square, the state should be changed to 'O'.

	COORDINATES: The coordinates are the string value of the column and row.
	[[{}, {}, {name: 'piece', coordinates: '02', state: null}] 
	 [{}, {}, {}] 
	 [{}, {}, {}]]
	*/
	boardLogic.createPiece = function(coordinates){
		var piece = {
			name: 'piece',
			coordinates: coordinates,
			state: null
		};
		return piece;
	};
	/* 
	Our Board is an object that does a couple of things:

	-Holds the turnCount (Board.turnCount). The turnCount tells the program whether its player 1 or player 2's turn.

	-Board.board is the matrix itself. calling Board.resetBoard() creates a new 3 by 3 matrix where the states of each object are set to null.
	*/ 

	boardLogic.create = function(num){
		var board = _.range(num);
		// var board = [0, 1, 2]
		_.each(board, function(space, index, board){
			var row = _.map(_.range(num), function(val){
			// creates row of 3 new pieces with coordinates
			return boardLogic.createPiece(index.toString() + val.toString());
			});
			board[index] = row;
		});
		return board;
	};

	boardLogic.createBoard = function(){	
		var Board = {
			// Holds the turnCount. The turnCount tells the program whether its player 1 or player 2's turn
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
		// calling Board.resetBoard() creates a new 3 by 3 matrix where the states of each object are set to null
		Board.resetBoard();
		
		return Board;
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

// ========= Helper functions to solve =============

// when a square is clicked and its state changes to X, its coordinates will be pushed into the xArray
var xArray = [];
// when a square is clicked and its state changes to O, its coordinates will be pushed into the oArray
var oArray = [];
// when any square is clicked, its coordinates will be pushed into the xoArray 
var xoArray = [];

	boardLogic.updateState = function(currentSquare, boardObject){
		// check the squares state to make sure it  is not already filled
		var state = currentSquare.state;
		// if it is player 1's turn, change the current squares state to X. and return the squares state
		if(state === null && boardObject.turnCount%2===0){
			// increment the turnCount
 			boardObject.increment();
 			// push the coordinates of the current square into xArray
 			xArray.push(currentSquare.coordinates);
 			// push the coordinates of the current square into xoArray
 			xoArray.push(currentSquare.coordinates);
 			// change the state of the current square to X and return state
 			currentSquare.state = 'X';
 			return state = 'X';
 		// if it is player 2's turn, change the current squares state to 'O' and return the squares state
 		} else if(state === null && boardObject.turnCount%2 !== 0){
 			// increment the turnCount
 			boardObject.increment();
 			// push the coordinates of the current square into xArray
 			oArray.push(currentSquare.coordinates);
 			// push the coordinates of the current square into xoArray
 			xoArray.push(currentSquare.coordinates);
			// change the state of the current square to O and return state
 			currentSquare.state = 'O';
 			return state = 'O';
 		// if the square has already been used, return 'current square filled'
 		} else {
 			return 'current square filled';
 		}
	};

	boardLogic.checkHorizontalWin = function(currentSquare, board){
	// if every square in the currentSquares row has the same state, that player has won.
	/*loop through xArray and oArray
	if array = ["00","01","02"] OR ["10","11","12"] OR ["20","21","22"]
	return true	
	*/
		// loop through xArray
		var char0 = _.filter(xArray, function(element){
			return element.charAt(0) === '0'});
		if(char0.length === 3){
			return true;
		}
		char0 = _.filter(xArray, function(element){
			return element.charAt(0) === '1'});
		if(char0.length === 3){
			return true;
		}
		char0 = _.filter(xArray, function(element){
			return element.charAt(0) === '2'});
		if(char0.length === 3){
			return true;
		}
		// loop through oArray
		char0 = _.filter(oArray, function(element){
			return element.charAt(0) === '0'});
		if(char0.length === 3){
			return true;
		}
		char0 = _.filter(oArray, function(element){
			return element.charAt(0) === '1'});
		if(char0.length === 3){
			return true;
		}
		char0 = _.filter(oArray, function(element){
			return element.charAt(0) === '2'});
		if(char0.length === 3){
			return true;
		}
	};

	boardLogic.checkVerticalWin = function(currentSquare, board){
		// if every square in the currentSquares column has the same state, that player has won.
		/*loop through xArray and oArray
		if array = ["00","10","20"] OR ["01","11","21"] OR ["02","12","22"]
		return true	
		*/
		// loop through xArray
		var char1 = _.filter(xArray, function(element){
			return element.charAt(1) === '0'});
		if(char1.length === 3){
			return true;
		}
		char1 = _.filter(xArray, function(element){
			return element.charAt(1) === '1'});
		if(char1.length === 3){
			return true;
		}
		char1 = _.filter(xArray, function(element){
			return element.charAt(1) === '2'});
		if(char1.length === 3){
			return true;
		}
		// loop through oArray
		char1 = _.filter(oArray, function(element){
			return element.charAt(1) === '0'});
		if(char1.length === 3){
			return true;
		}
		char1 = _.filter(oArray, function(element){
			return element.charAt(1) === '1'});
		if(char1.length === 3){
			return true;
		}
		char1 = _.filter(oArray, function(element){
			return element.charAt(1) === '2'});
		if(char1.length === 3){
			return true;
		}
	};

	boardLogic.checkDiagonalWin = function(currentSquare, board){
		// if every square diagonal to the currentSquare is has the same state, that player has won.
		/*loop through xArray and oArray
		if array = ["00,"11","22"]
		return true	
		*/
		// if the two integer digits in the coordinate are the same, it is a square in the top left to bottom right diagonal. check xArray
		var charMatch = _.filter(xArray, function(element){
			return element.charAt(0) === element.charAt(1)});
		if(charMatch.length === 3){
			return true;
		}
		// check oArray
		charMatch = _.filter(oArray, function(element){
			return element.charAt(0) === element.charAt(1)});
		if(charMatch.length === 3){
			return true;
		}
		/*loop through xArray and oArray
		if array =["20","11","02"]
		return true	
		*/
		// if the two integer digits in the coordinate add up to 2, it is a square in the top right to bottom left diagonal. check xArray.
		var charSum = _.filter(xArray, function(element){
			return parseInt(element.charAt(0)) + parseInt(element.charAt(1)) === 2});
		if(charSum.length === 3){
			return true;
		}
		// check oArray
		var charSum = _.filter(oArray, function(element){
			return parseInt(element.charAt(0)) + parseInt(element.charAt(1)) === 2});
		if(charSum.length === 3){
			return true;
		}
	};

	boardLogic.catsGame = function(currentSquare, board){
		// look through the board return true if all of the squares have been filled but no one has won.
		if(xoArray.length === 9){
			return true;
		}
	};

	boardLogic.playAgain = function(prompt, board){
		// if the players prompt is true, clear the state from each square in the board back to null
		if(prompt){
			// empty out arrays
			xArray = [];
			oArray = [];
			xoArray = [];
			// change turnCount to 2
			board.resetTurnCount();
			// set each square to null
			console.log(board);
			console.log('board.board',board.board);
			console.log('[0]',board.board[0]);
			console.log('[0][0]',board.board[0][0]);
			console.log(board.board[0][0].state);
			// board.board is [Array[3], Array[3], Array[3]]
			_.each(board.board,function(row){
				// row aka board.board[0] is [Object, Object, Object]
				_.map(row, function(object){
					// Object aka board.board[0][0] is {name: "piece", coordinates: "00", state: "X"}
					object.state === null;
				});
			});
		}
		console.log('after??',board.board);
		return board;
	}
})();