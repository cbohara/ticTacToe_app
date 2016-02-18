$(document).ready(function(){
	var boardObject = window.Board;
	var Board = window.Board.board;
	var TurnCount = window.Board.turn;

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
			} else if (currentState === "square filled"){
				alert('square already has been used');
			}
		}

		if (boardLogic.checkHorizontalWin(squareObject, Board)){
			var userPrompt = confirm('you win! would you like to play again?');
		    boardLogic.playAgain(userPrompt, boardObject)
		} else if (boardLogic.checkVerticalWin(squareObject, Board)){
			var userPrompt = confirm('you win! would you like to play again?');
		    boardLogic.playAgain(userPrompt, boardObject);
		} else if (boardLogic.checkDiagonalWin(squareObject, Board)){
			var userPrompt = confirm('you win! would you like to play again?');
		    boardLogic.playAgain(userPrompt, boardObject)
		} else if (boardLogic.catsGame(Board)){
			var userPrompt = confirm('you win! would you like to play again?');
		    boardLogic.playAgain(userPrompt, boardObject)
		}
	});
});