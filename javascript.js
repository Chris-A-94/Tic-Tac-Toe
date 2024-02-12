//Gameboard object allows to initialize an array that keeps counts of what player played what
//It also sets up listeners and prints the board on console/screen

const gameboard = (function(){
    const board = [[],[]];
    const SIZE = 3;
    const listeners = [];
    const initialize = () => {
        for(let i = 0; i < SIZE; i++)
        {
            board[i] = [];
            for(let j = 0; j < SIZE; j++)
                board[i][j] = 0;
        }
    }
    const liveGame = () => {
        for(let i = 0; i < 9; i++)
            listeners[i] = document.getElementById(i);
        return listeners;
    }
    const updateBoard = (row,column,player) =>{
        if(board[row][column] !== 0)
        {
            console.log("Invalid move");
            return;
        }
        if(player === 1)
            board[row][column] = 'O';
        else if(player === 2)
            board[row][column] = 'X';
    }
    const printBoard = () => {
        for(let i = 0; i < SIZE; i++) {
            let row = "";
            for(let j = 0; j < SIZE; j++)
                row += board[i][j] + " ";
            console.log(row);
        }
    }

    return {initialize, updateBoard, printBoard, liveGame};
})();

//Player object saves the names of the players and the number of games won.

function player(names, Number)
{
    const name = names;
    let score = 0;
    const playerNumber = Number;
    const getName = ()=> name;
    const getScore = ()=> score;
    const getPlayerNumber = ()=> playerNumber;
    const registerWin = () => score++;

    return {getName,getScore,getPlayerNumber,registerWin};
}

//The playGame object works closely with the gameboard object, initializing its event listeners and informing
//where to update the board


const playGame = (function (){
    gameboard.initialize();
    const playerOne = player('one',1);
    const playerTwo = player('two',2);
    let turn = 1;
    const whichTurn = () => {
        if(turn % 2 === 0)
        {
            turn++;
            return 2;
        }
        else
        {
            turn++;
            return 1;
        }
    };
    const playTheGame = () => {
        const buttons = gameboard.liveGame();
        for(let i = 0; i < 9; i++)
            {buttons[i].addEventListener('click',()=>{
                
                switch(i){
                    case 0:
                        gameboard.updateBoard(0,0,whichTurn());
                        break;
                    case 1: gameboard.updateBoard(0,1,whichTurn());
                    break;
                    case 2:
                        gameboard.updateBoard(0,2,whichTurn());
                        break;
                    case 3: gameboard.updateBoard(1,0,whichTurn());
                    break;
                    case 4:
                        gameboard.updateBoard(1,1,whichTurn());
                        break;
                    case 5: gameboard.updateBoard(1,2,whichTurn());
                    break;
                    case 6:
                        gameboard.updateBoard(2,0,whichTurn());
                        break;
                    case 7: gameboard.updateBoard(2,1,whichTurn());
                    break;
                    case 8: gameboard.updateBoard(2,2,whichTurn());
                    break;
                }
                gameboard.printBoard();
            })
        }
    }
    return {playerOne,playerTwo,whichTurn,playTheGame};
})();


playGame.playTheGame();

//remember the parenthesis