//Gameboard object allows to initialize an array that keeps counts of what player played what
//It also gets the elements from the DOM and prints the board on console/screen

const gameboard = (function(){
    const board = [[],[]];
    const SIZE = 3;
    const listeners = [];
    const announce = document.getElementById('winner');
    const initialize = () => {
        for(let i = 0; i < SIZE; i++)
        {
            board[i] = [];
            for(let j = 0; j < SIZE; j++)
                board[i][j] = 0;
        }
    }
    const getBoard = () => board;
    const checkIfFull = () => {
        let checker = true;
        for(let i = 0; i < SIZE; i++)
        {
            for(let j = 0; j < SIZE; j++)
            {
                if(board[i][j] === 0)
                    checker = false;
            }
        }
        return checker;
    }
    const liveGame = () => {
        for(let i = 0; i < 9; i++)
            listeners[i] = document.getElementById('b'+i);
        return listeners;
    }
 
    const updateBoard = (row,column,player) =>{
        if(board[row][column] !== 0)
        {
            console.log("Invalid move");
            return -1;
        }
        if(player === 1)
            board[row][column] = 'O';
        else if(player === 2)
            board[row][column] = 'X';
        return 1;
    }
    const printBoard = (position,player) => {
        for(let i = 0; i < SIZE; i++) {
            let row = "";
            for(let j = 0; j < SIZE; j++)
                row += board[i][j] + " ";
            console.log(row);
        }
        if(player === 2)
        {
            listeners[position].style.backgroundColor = 'blue';
            listeners[position].textContent = 'O';
        }
        else if(player === 1)
        {
            listeners[position].style.backgroundColor = 'red';
            listeners[position].textContent = 'X';
        }        
    }
    const cleanBoard = () => {
        for(let i = 0; i < 9; i++)
        {
            
            listeners[i].style.backgroundColor = 'white';
            listeners[i].textContent = '';
        }
            
    }
    const updateWinner = (name) => {
        if(name === '1start')
        {
            announce.textContent = '';
            return;
        }
        announce.textContent = name+" wins!";
    }

    return {initialize, updateBoard, printBoard, liveGame, getBoard,checkIfFull,cleanBoard,updateWinner};
})();

//Player object saves the names of the players and the number of games won.

function player(names, Number)
{
    let name = names;
    let score = 0;
    const playerNumber = Number;
    let nameDOM;
    let changeName;
    let visibleScore;
    if(Number === 1)
    {
        nameDOM = document.getElementById('newNameOne');
        changeName = document.getElementById('nameOne');
        visibleScore = document.getElementById('scoreOne')
    }
        
    else
    {
        nameDOM = document.getElementById('newNameTwo');
        changeName = document.getElementById('nameTwo');
        visibleScore = document.getElementById('scoreTwo')
    }
    visibleScore.textContent = score;
    nameDOM.textContent = name;
    changeName.addEventListener('click',()=>{
        name = prompt('New Name:');
        nameDOM.textContent = name;
    })
    
    const getName = ()=> name;
    const getScore = ()=> score;
    const getPlayerNumber = ()=> playerNumber;
    const registerWin = () => {
        score++;
        visibleScore.textContent = score;
    };
    

    return {getName,getScore,getPlayerNumber,registerWin};
}

//The playGame object works closely with the gameboard object, initializing its event listeners and informing
//where to update the board


const playGame = (function (){
    
    const playerOne = player('Jugador Uno',1);
    const playerTwo = player('Jugador Dos',2);
    let turn = 1;
    const startGame = () => {
        gameboard.initialize(); 
        gameboard.updateWinner('1start')       
        playTheGame();
        gameboard.cleanBoard();
    }
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
    //returns -1 when there's no winner, 0 if there's a tie, or 1||2 if player 1 or 2 won
    const checkIfWinner = () => {
        const auxBoard = gameboard.getBoard();
        const checkRow = (rowOrColumn) =>{
            let aux = rowOrColumn[0];
            let checker = true;
            if(aux === 0)
            {
                checker = false;
                return checker;
            }
            for(let i = 1; i < 3; i++)
            {
                if(aux !== rowOrColumn[i])
                    checker = false;
            }
            return checker;
        }
        const invertedBoard = [[],[]]
        for(let i = 0; i < 3; i++)
        {
            invertedBoard[i] = [];
            for(let j = 0; j < 3; j++)
            {
                invertedBoard[i][j] = auxBoard[j][i];
            } 
        }
        const crossArrays = [[auxBoard[0][0],auxBoard[1][1],auxBoard[2][2]],
        [auxBoard[0][2],auxBoard[1][1],auxBoard[2][0]]];

        //below checks each row and column for a winner
        //sorry for repeating code, i'm tired
        let isThereWinner = false;
        for(let i = 0; i < 3; i++)
        {
            isThereWinner = checkRow(auxBoard[i]);
            if(isThereWinner)
            {
                if(auxBoard[i][0] === 'O')
                    return 1;
                else
                    return 2;
            }
        }
        for(let i = 0; i < 3; i++)
        {
            isThereWinner = checkRow(invertedBoard[i]);
            if(isThereWinner)
            {
                if(invertedBoard[i][0] === 'O')
                    return 1;
                else
                    return 2;
            }
        }
        for(let i = 0; i < 2; i++)
        {
            isThereWinner = checkRow(crossArrays[i]);
            if(isThereWinner)
            {
                if(crossArrays[i][0] === 'O')
                    return 1;
                else
                    return 2;
            }
        }
        if(!gameboard.checkIfFull())
            return -1;
        else
            return 0;            
    }

    const endGame = ()=> {
        let winChecker, returnValue = -1;
        winChecker = checkIfWinner();   
        switch(winChecker){
            case 0: console.log("there's a tie");
                returnValue = 0;
                break;
            case 1: console.log('Player 1 won');
               playerOne.registerWin();
               gameboard.updateWinner(playerOne.getName());
               returnValue = 0;
                break;
            case 2: console.log("Player 2 won");
               playerTwo.registerWin();
               gameboard.updateWinner(playerTwo.getName());
               returnValue = 0;
                break;
        }
        return returnValue;
    }

    const playTheGame = () => {
        const buttons = gameboard.liveGame();
        let finishGame = -1;
        let checkValid;
        const eventListeners = [];
        for(let i = 0; i < 9; i++)
            { const listeners = ()=>{                
                switch(i){
                    case 0:
                        checkValid = gameboard.updateBoard(0,0,whichTurn());
                        finishGame = endGame();
                        break;
                    case 1: checkValid =gameboard.updateBoard(0,1,whichTurn());
                    finishGame = endGame();
                    break;
                    case 2:
                        checkValid = gameboard.updateBoard(0,2,whichTurn());
                        finishGame = endGame();
                        break;
                    case 3: checkValid = gameboard.updateBoard(1,0,whichTurn());
                    finishGame = endGame();
                    break;
                    case 4:
                        checkValid = gameboard.updateBoard(1,1,whichTurn());
                        finishGame = endGame();
                        break;
                    case 5: checkValid = gameboard.updateBoard(1,2,whichTurn());
                    finishGame = endGame();
                    break;
                    case 6:
                        checkValid = gameboard.updateBoard(2,0,whichTurn());
                        finishGame = endGame();
                        break;
                    case 7: checkValid = gameboard.updateBoard(2,1,whichTurn());
                    finishGame = endGame();
                    break;
                    case 8: checkValid = gameboard.updateBoard(2,2,whichTurn());
                    finishGame = endGame();
                    break;
                }
                if(finishGame !== -1)
                {
                    gameboard.printBoard(i,whichTurn());
                    killGame();
                    return;
                }
                if(checkValid === -1)
                    turn--;
                else
                {
                    gameboard.printBoard(i,whichTurn());
                    turn--;
                }
                    
            };
            buttons[i].addEventListener('click',listeners);
            eventListeners.push(listeners);
        }
        const killGame = () => {
            // Remove all event listeners
            for (const button of buttons) {
                for (const listener of eventListeners) {
                    button.removeEventListener('click', listener);
                }
            }
        };
        
    }
    return {playerOne,playerTwo,whichTurn,playTheGame,checkIfWinner,startGame};
})();


const playAnotherGame = document.getElementById('starting');
starting.addEventListener('click',()=>{
    playGame.startGame()});




