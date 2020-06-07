/*
	Game Logic:

	1. Game Initializes
	2. Default game type == Best of 3
	3. Player clicks 'Begin Game'
	4. Player selects their first move. The move gets pushed to an array.
	5. Short timer counts down, then displays both the player's and opponent's moves (opponent is random generator, also pushed to it's own array)
	6. Winner get's point added to their score. Best of nth game wins (add simple CSS animation for winner)
	7. 
*/
var MOVE_BUTTONS = document.querySelectorAll('.button--move');
var MOVE_ARR = ['rock', 'paper', 'scissors'];
var playerScore /* = 0 */; // don't set value until init??
var opponentScore /* = 0 */; // don't set value until init??
var bestOfGames = function(x) {
	return x / 2;
};
var selectedMove,playerMoves, opponentMoves, playerCurrentMove, opponentCurrentMove, numOfGames;

init();

document.getElementById('button--begin').addEventListener('click', beginGame);

document.getElementById('button--reset').addEventListener('click', init);


// Determines the winner of the game.
function determineWinner(player, opponent) {

	switch (true) {
		case player === 'rock' && opponent === 'scissors':
			playerScore += 1;
			document.getElementById('player-score').innerHTML = playerScore;
			console.log('Player wins!');
			console.log(playerScore + ' | ' + opponentScore);
			break;
		case player === 'scissors' && opponent === 'paper':
			playerScore += 1;
			document.getElementById('player-score').innerHTML = playerScore;
			console.log('Player wins!');
			console.log(playerScore + ' | ' + opponentScore);
			break;
		case player === 'paper' && opponent === 'rock':
			playerScore += 1;
			document.getElementById('player-score').innerHTML = playerScore;
			console.log('Player wins!');
			console.log(playerScore + ' | ' + opponentScore);
			break;
		case player === opponent:
			console.log('Tie game!');
			console.log(playerScore + ' | ' + opponentScore);
			break;
		default:
			opponentScore += 1;
			document.getElementById('opponent-score').innerHTML = opponentScore;
			console.log('Opponent wins!');
			console.log(playerScore + ' | ' + opponentScore);
	}
}

function handleMoveSelectorClick(e) {
	selectedMove = e.target.dataset.move;
	opponentCurrentMove = MOVE_ARR[Math.floor(Math.random() * MOVE_ARR.length)];
	
	console.log('My move: ' + selectedMove + ' | Opp move: ' + opponentCurrentMove);
	document.getElementById('player-move').innerHTML = selectedMove.toUpperCase();
	document.getElementById('opponent-move').innerHTML = opponentCurrentMove.toUpperCase();

	determineWinner(selectedMove, opponentCurrentMove);

	// numOfGames -= 1;
	// console.log('Num games left: ' + numOfGames);

	// 
	if(playerScore > bestOfGames(numOfGames) || opponentScore > bestOfGames(numOfGames)) {
		for(var j = 0; j < MOVE_BUTTONS.length; j++) {
			MOVE_BUTTONS[j].disabled = true;
			console.log(MOVE_BUTTONS[j]);
		}

		if(playerScore > opponentScore) {
			document.getElementById('winner').innerHTML = 'Player Wins!';
		} else {
			document.getElementById('winner').innerHTML = 'Opponent Wins!';
		}

		numOfGames = document.getElementById('best-of-num').value;
	}
}

// Begins a new game.
function beginGame() {
	numOfGames = document.getElementById('best-of-num').value;

	document.getElementById('best-of-num').disabled = true;
	document.getElementById('button--begin').disabled = true;
	document.getElementById('button--reset').disabled = false;
	
	console.log(numOfGames);
	console.log(bestOfGames(numOfGames));

	for(var i = 0; i < MOVE_BUTTONS.length; i++) {
		MOVE_BUTTONS[i].disabled = false;
		MOVE_BUTTONS[i].addEventListener('click', handleMoveSelectorClick);
	}
}

// Initializes game. Used to also reset the game.
function init() {
	playerMoves = [];
	opponentMoves = [];
	playerCurrentMove = '';
	opponentCurrentMove = '';
	playerScore = 0;
	opponentScore = 0;

	// document.getElementById('best-of-num').value = 3;
	document.getElementById('best-of-num').disabled = false;
	document.getElementById('button--begin').disabled = false;
	document.getElementById('button--reset').disabled = true;
	document.getElementById('player-move').innerHTML = '';
	document.getElementById('opponent-move').innerHTML = '';
	document.getElementById('player-score').innerHTML = 0;
	document.getElementById('opponent-score').innerHTML = 0;
	document.getElementById('winner').innerHTML = ' ';

	for(var i = 0; i < MOVE_BUTTONS.length; i++) {
		MOVE_BUTTONS[i].disabled = true;
		MOVE_BUTTONS[i].removeEventListener('click', handleMoveSelectorClick);
	}

}