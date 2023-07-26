const cells = document.querySelectorAll(".cell");
const statusMention = document.querySelector("#status");
const restartButton = document.querySelector("#restartButton");
const winningConditions = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7,],[2,5,8],[0,4,8],[2,4,6]
];
let cellPlaces = ["","","","","","","","",""];
let currentPlayer = "X";
let gameRunning = false;

initializeGame();
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click",cellClicked));
    restartButton.addEventListener("click",restartSetting);
    statusMention.textContent = `${currentPlayer}'s turn`;
    gameRunning = true
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(cellPlaces[cellIndex] != "" || !gameRunning){
        return
    }
    updateCell(this ,cellIndex);
    checkWinner();
}
function updateCell(cell,index){
    cellPlaces[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusMention.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let whoWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const everySingleCondition = winningConditions[i];
        const a = cellPlaces[everySingleCondition[0]];
        const b = cellPlaces[everySingleCondition[1]];
        const c = cellPlaces[everySingleCondition[2]];

        if (a == "" || b == ""  || c == "" ) {
            continue;
        }
        if (a==b && b == c) {
            whoWon = true;
            break;
        }
    }
    if(whoWon){
        statusMention.textContent = `${currentPlayer} wins`;
        gameRunning = false
    }else if(!cellPlaces.includes("")){
        statusMention.textContent = "game draw !!";
        gameRunning = false;
    }else{
        changePlayer();
    }
}
function restartSetting(){
    cellPlaces = ["","","","","","","","",""];
    currentPlayer = "X";
    gameRunning = true;
    cells.forEach(cell => cell.textContent= "");
    statusMention.textContent = `${currentPlayer}'s turn`;
}
