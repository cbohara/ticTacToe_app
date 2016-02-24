// do not need to modify
$(document).ready(function(){
	var boardObject = window.Board;
	// access just the matrix of the window.Board object
	var Board = window.Board.board;

	// access just the turnCount function in window.Board object
	var TurnCount = window.Board.turnCount;

	$('.square').on('click', function(e){
		var coordinate = this.attributes.id.nodeValue;

		var squareObject = boardLogic.findSquare(Board, coordinate);

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
		    boardLogic.playAgain(userPrompt, boardObject);
		} else if (boardLogic.checkVerticalWin(squareObject, Board)){
			var userPrompt = confirm('You win! Would you like to play again?');
		    boardLogic.playAgain(userPrompt, boardObject);
		} else if (boardLogic.checkDiagonalWin(squareObject, Board)){
			var userPrompt = confirm('You win! Would you like to play again?');
		    boardLogic.playAgain(userPrompt, boardObject);
		} else if (boardLogic.catsGame(squareObject, Board)){
			var userPrompt = confirm('Cats game! No one won. Would you like to play again?');
		    boardLogic.playAgain(userPrompt, boardObject);
		}
	});
});