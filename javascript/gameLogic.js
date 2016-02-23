// do not need to modify
$(document).ready(function(){
	var boardObject = window.Board;
	// holds the contents of the entire game and its history
	/* var boardObject = {
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
		board: [[Object, Object, Object,],
			   [Object, Object, Object],
			   [Object, Object, Object]],
	}
	*/
	// access just the matrix of the window.Board object
	var Board = window.Board.board;
	/*
	var Board: [[Object, Object, Object,],
			   [Object, Object, Object],
			   [Object, Object, Object]],
	*/
	// access just the turnCount function in window.Board object
	var TurnCount = window.Board.turnCount;
	// was var TurnCount = window.Board.turn;
	// think that was an error

	$('.square').on('click', function(e){
		var coordinate = this.attributes.id.nodeValue;
		/* number printed when click on square
			00 01 02
			10 11 12
			20 21 22
		*/
		var squareObject = boardLogic.findSquare(Board, coordinate);
		/* squareObject = {
			name: "piece", 
			coordinates: "12", 
			state: null}
		*/
		var currentState = squareObject.state;

		if (squareObject){
			currentState = boardLogic.updateState(squareObject, boardObject);
			if (currentState === 'X') {
				this.classList.add('X');
			} else if (currentState === 'O'){
				this.classList.add('O');
			} else if (currentState === "current square filled"){
				alert('Square already has been used');
			}
		}

		if (boardLogic.checkHorizontalWin(squareObject, Board)){
			var userPrompt = confirm('You win! Would you like to play again?');
		    boardLogic.playAgain(userPrompt, boardObject)
		} else if (boardLogic.checkVerticalWin(squareObject, Board)){
			var userPrompt = confirm('You win! Would you like to play again?');
		    boardLogic.playAgain(userPrompt, boardObject);
		} else if (boardLogic.checkDiagonalWin(squareObject, Board)){
			var userPrompt = confirm('You win! Would you like to play again?');
		    boardLogic.playAgain(userPrompt, boardObject)
		} else if (boardLogic.catsGame(squareObject, Board)){
			var userPrompt = confirm('Cats game! No one won. Would you like to play again?');
		    boardLogic.playAgain(userPrompt, boardObject)
		}
	});
});