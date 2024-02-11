const gameboard = (function(){
    const board = [[],[]];
    const SIZE = 3;
    const initialize = () => {
        for(let i = 0; i < SIZE; i++)
        {
            board[i] = [];
            for(let j = 0; j < SIZE; j++)
                board[i][j] = 0;
        }
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

    return {initialize, updateBoard, printBoard};
})();

//remember the parenthesis