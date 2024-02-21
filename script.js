let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let newGameButton = document.querySelector("#new");
let msgcointainer = document.querySelector(".msg-cointainer");
let msg = document.querySelector("#msg");

let turnO = true;
let winner = null; 
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let resetGame = () => {
    turnO = true;
    winner = null; 
    enableBoxes();
    msgcointainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", handleBoxClick);
});

function handleBoxClick ()  {
    if (!winner) { 
        if (turnO) {
            this.innerText = "O";
            turnO = false;
        } else {
            this.innerText = "X";
            turnO = true;
        }
        this.removeEventListener("click", handleBoxClick);

        checkWinner();
    }
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.addEventListener("click", handleBoxClick);
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcointainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                winner = pos1val; 
                showWinner(winner);
            }
        }
    }
};

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
      
        
   