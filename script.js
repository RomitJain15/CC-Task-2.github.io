let currentTurn = "X";
let squares = Array.from(document.getElementsByClassName('square'));
let playerInfo = document.querySelector('.player-info');
let gameOn = true;
let p1_score = 0, p2_score = 0, ties = 0;

squares.forEach(sqaure => {
    sqaure.addEventListener('click', playMove);
})

function playMove(e) {
    if(gameOn == true) {
        let square_number = e.target.id;
        if(squares[square_number].innerText == ""){
            squares[square_number].innerText = currentTurn;
            squares[square_number].style.color = currentTurn == "X" ? 'red' : 'blue';
            currentTurn = (currentTurn == "X" ? "0" : "X");
            playerInfo.innerText = `${currentTurn}'s Turn`;
        }
        gameOver();
    }
}

function gameOver() {
    let winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let isTie = true;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (
            squares[a].innerText !== "" &&
            squares[a].innerText === squares[b].innerText &&
            squares[a].innerText === squares[c].innerText
        ) {
            currentTurn = currentTurn == "X" ? "0" : "X";
            if (currentTurn == "X") {
                p1_score += 1;
                document.querySelector('.score1').innerText = p1_score;
            } else {
                p2_score += 1;
                document.querySelector('.score2').innerText = p2_score;
            }
            playerInfo.innerText = `${currentTurn} Wins!!`;
            gameOn = false;
            for (let j = 0; j < 9; j++) {
                if (j != a && j != b && j != c) {
                    squares[j].style.color = 'grey';
                }
            }
            isTie = false; 
            break;
        }
    }

    if (isTie) {
        for (let i = 0; i < 9; i++) {
            if (squares[i].innerText == "") {
                isTie = false; 
                break;
            }
        }
    }

    if (isTie) {
        playerInfo.innerText = "Tie!!";
        gameOn = false;
        ties += 1;
        document.querySelector('.tie-cnt').innerText = ties;
    }
}

document.querySelector('.restart').addEventListener('click', restartGame);

function restartGame() {
    squares.forEach(square => {
        squares[square.id].innerText = "";
    })
    currentTurn = "X";
    playerInfo.innerText = `${currentTurn}'s Turn`;
    gameOn = true;
    for(let i = 0; i < 9; i++) {
        squares[i].style.color = 'white';
    }
}