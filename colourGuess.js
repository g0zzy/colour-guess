var goalColour = "";
var goalColourIdx = getGoalColourIdx(6);
var easyLevel = false;

var backgroundColour = document.body.style.background;
var squares = document.getElementsByClassName("square");
var outcome = document.getElementById("outcome");
var h1 = document.getElementsByTagName("h1")[0];
var colourToGuess = document.getElementById("colourToGuess");
var newGameBtn = document.getElementById("newGame");
var easyBtn = document.getElementById("easy");
var hardBtn = document.getElementById("hard");

var loopUntil = easyLevel ? squares.length/2 : squares.length; 
resetGame();

easyBtn.addEventListener("click", setEasyMode);
hardBtn.addEventListener("click", setHardMode);
newGameBtn.addEventListener("click", resetGame);

for(var i = 0; i < squares.length; i++){
	squares[i].addEventListener("click", playGame);
}

// ----------- Functions -----------
function makeAllSquaresSameColour(){
	loopUntil = easyLevel ? squares.length/2 : squares.length; 
	for(var i = 0; i < loopUntil; i++){
		squares[i].style.backgroundColor = goalColour;
	} 
}

function getRandomColour(){
	var rgb = "rgb(";
	for(var i = 0; i < 3; i++){
		rgb += Math.floor(Math.random()*256);
		if(i !== 2)
			rgb += ", ";
	}
	rgb += ")";
	return rgb; 
}

function getGoalColourIdx(level){
	return Math.floor(Math.random()*level);
}

function resetGame(){
	setLevelConstraints();
	for(var i = 0; i < loopUntil; i++){
		var randomColour = getRandomColour();
		squares[i].style.backgroundColor = randomColour;
		if(i === goalColourIdx )
			goalColour = randomColour;
	}
	colourToGuess.textContent = goalColour; 
	outcome.textContent = "";
	newGameBtn.textContent = "New Game";
	h1.style.backgroundColor = backgroundColour;
}

function playGame(){
	if(this.style.backgroundColor === goalColour){
		makeAllSquaresSameColour();
		outcome.textContent = "Correct!";
		h1.style.backgroundColor = goalColour; 
		newGameBtn.textContent = "Play Again?";
	}
	else{
		this.style.backgroundColor = backgroundColour;
		outcome.textContent = "Try Again!";
	}
}

function easyBtnSelected(){
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
}

function hardBtnSelected(){
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
}

function setEasyMode(){
	easyBtnSelected();
	easyLevel = true;
	for(var i = 3; i < squares.length; i++){
		squares[i].style.display = "none";
	}
	resetGame();
}

function setHardMode(){
	hardBtnSelected();
	easyLevel = false;
	for(var i = 3; i < squares.length; i++){
		squares[i].style.display = "block";
	}
	resetGame();
}

function setLevelConstraints(){
	if(easyLevel){
		loopUntil = squares.length/2;
		goalColourIdx = getGoalColourIdx(3);
	}
	else{
		loopUntil = squares.length;
		goalColourIdx = getGoalColourIdx(6);
	}
}