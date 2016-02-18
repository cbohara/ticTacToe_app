(function(){
	window.boardLogic = {};

	// first we need to be able to create a board.
	boardLogic.createPiece = function(coordinates){
		var piece = {
			name: 'piece',
			coordinates: coordinates,
			state: null,
		};

		return piece;
	};
	
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

	boardLogic.updateState = function(currentSquare, boardObject){
	 
	 if (currentSquare.state === null && boardObject.turnCount % 2 === 0){
	 	currentSquare.state = 'X';
	 	boardObject.increment();
	 	return currentSquare.state;
	 } else if (currentSquare.state === null && boardObject.turnCount % 2 === 1) {
	 	currentSquare.state = 'O'
	 	boardObject.increment();
	 	return currentSquare.state;
	 } else if (currentSquare.state !== null) {
	 	return 'current square filled';
	 }

	};

	boardLogic.catsGame = function(board){
		return _.every(board, function(row){
			var checkAllRows = _.every(row, function(square){
				if (square.state !== null){
					return true;
				}
			});

			return checkAllRows;
		});
	};

	boardLogic.checkHorizontalWin = function(currentSquare, board){
		var currentRow = currentSquare.coordinates.toString().split('')[0];
		var currentState = currentSquare.state;
		return _.every(board[currentRow], function(square){
			return currentState === square.state;
		});
	};

	boardLogic.checkVerticalWin = function(currentSquare, board){
		var currentColumn = currentSquare.coordinates.toString().split('')[1];
		var currentState = currentSquare.state;
		var columnPieces = _.flatten(_.map(board, function(row){
			return _.filter(row, function(square){
				var squareColumn = square.coordinates[1];
				if (squareColumn === currentColumn.toString()){
					return true;
				} else {
					return false;
				}
			});
		}));

		return _.every(columnPieces, function(square){
			return square.state === currentState;
		});
	};

	boardLogic.playAgain = function(prompt, board){
		if (prompt){
			board.resetBoard();
			board.resetTurnCount();
			$('.square').removeClass("X");
			$('.square').removeClass("O");
		}
	};
	
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

	boardLogic.checkDiagonalWin = function(currentSquare, board){
		var currentState = currentSquare.state;
		var currentCoordinates = currentSquare.coordinates;
		var diagonalSquares = _.flatten(_.map(board, function(row){
			if (currentCoordinates[0] === currentCoordinates[1]) {
				return _.filter(row, function(square){
					if (square.coordinates[0] === square.coordinates[1]){
						return true;
					} else {
						return false;
					}
				});
		    } else if (Number(currentCoordinates[0]) + Number(currentCoordinates[1]) === 2){
				return _.filter(row, function(square){
					if (Number(square.coordinates[0]) + Number(square.coordinates[1]) === 2){
						return true;
					} else {
						false;
					}
				});
			}
		}));
		
		return _.every(diagonalSquares, function(square){
			if (square === undefined){
				return false;
			}
			console.log(square.state);
			console.log(currentState);

			return square.state === currentState;
		});
	};


})();