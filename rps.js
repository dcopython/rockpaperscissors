//Initialize scores and msg
let playerScore = 0;
let computerScore = 0;
let msg = "";

//Scoreboard HTML
const container = document.querySelector("body");
const content = document.createElement('div');
updateScoreBoard();

//Create div for displaying results of each round and attach to body
const content2 = document.createElement('div');
content2.classList.add('div_p');
container.append(content2);

//Decide computer selection
function computerPlay() {
    let moves = ["rock", "paper", "scissors"];
    return moves[Math.floor(Math.random()*moves.length)];
}
//Logic for possible win/lose scenerios
function playRound(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) {
        msg = "You tied!";
    }
    else if (playerSelection == "rock" && computerSelection == "scissors") {
        msg = "You win!, Rock beats Scissors";
    }
    else if (playerSelection == "paper" && computerSelection == "rock") {
        msg = "You win!, Paper beats Rock";
    }
    else if (playerSelection == "scissors" && computerSelection == "paper") {
        msg = "You win!, Scissors beats Paper";
    }
    else {
        msg = `You lose! ${computerSelection} beats ${playerSelection}`;
    }
    
    //Create p tag to results of the round and attach to .div_p
    const contentp = document.createElement('p');
    contentp.textContent = `${msg}`;
    content2.append(contentp);

    calcScore(msg);
    checkEndGame();
}

//Increment scoreboard after each round
function calcScore(result) {
    if (result.search("You win!")) {
        playerScore++;
    }
    else {
        computerScore++;
    }

    updateScoreBoard();
}

//Update scoreboard whenever called
function updateScoreBoard() {
    content.textContent = `Scoreboard - Player: ${playerScore} Computer: ${computerScore}`;
    container.append(content);
}

function clearBoard(msg) {
    //Clear results from previous rounds and display winner
    const parent = document.getElementsByClassName("div_p");
    parent[0].innerHTML = '<p>' + msg + '</p>';
    
    //Set scores back to 0
    playerScore = 0;
    computerScore = 0;
};

//Check if any score is equal to 3 and end game
function checkEndGame() {
    if (playerScore == 3) {
        msg = "Player Wins!";
        clearBoard(msg);
    }
    else if (computerScore == 3) {
        msg = "Computer Wins!";
        clearBoard(msg);
    }


}

//Run playRound function when a button is clicked
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
        playRound(e.target.id, computerPlay());
    });
});