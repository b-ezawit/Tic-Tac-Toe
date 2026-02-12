const cells = document.querySelectorAll(".cell");
const currentStatus = document.getElementById("currentStatus");
const  restartBtn = document.getElementById("restartBtn");

//win conditons:
const winConditions = [
    //rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    //columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    //diagonals:
    [0, 4, 8],
    [2, 4, 6]
];
  
//options one for each cell:
let currPlayer = "X";

let options = ["", "", "", 
               "", "", "", 
               "", "", "" ]

let gameRunning = false;
let won = false;

initialize();

function initialize(){
    cells.forEach(cell => cell.addEventListener("click",clickedCell));
    restartBtn.addEventListener("click", restart);
    currentStatus.textContent = `${currPlayer}'s turn`;
    gameRunning = true;
}

function clickedCell(){
    const cellIndex = this.getAttribute('cellIndex');
    if  (!gameRunning || options[cellIndex] !== ""){
        this.style.backgroundColor = "red";
        setTimeout(()=>{
            this.style.backgroundColor = "";
        } , 200);
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currPlayer;
    cell.innerHTML = (currPlayer==='X') ? '<img src="assets/X.png" class="icon"/>' : '<img src="assets/O.png" class="icon"/>' ;
}

function changePlayer(){
    currPlayer = (currPlayer === "X") ? "O" : "X"; 
    currentStatus.textContent = `${currPlayer}'s turn`;
}

function checkWinner(){
    for(let i=0; i < winConditions.length; i++){
        cell1 = options[winConditions[i][0]];
        cell2 = options[winConditions[i][1]];
        cell3 = options[winConditions[i][2]];
        if (cell1 === "" || cell2 === ""|| cell3 === ""){
            continue;
        }
        if(cell1 === cell2  && cell2 === cell3) {
            won = true;
            break;
        }
    }
    if (won){
        currentStatus.textContent = `✨Winner: ${currPlayer}`
        currentStatus.classList.add("winner")
        gameRunning = false;
    }
    else if (!options.includes("")){
        currentStatus.textContent = `🟰 Draw`;
        currentStatus.classList.add("draw")
        gameRunning = false;
    }
    else{
        changePlayer();
    }
}
function restart(){
    currPlayer = "X";
    currentStatus.classList.remove("winner", "draw");
    currentStatus.textContent = `${currPlayer}'s turn`
    cells.forEach(cell=>cell.textContent="");
    options = ["", "", "", 
                   "", "", "", 
                   "", "", "" ]
    gameRunning = true;
    won = false;
}

