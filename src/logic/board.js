import {WINNER_COMBOS}  from"../constants"

export const checkWinnerFrom = (boardToCheck) =>{
    for(const combo of WINNER_COMBOS){
      const [a ,b, c] = combo //tengo la combinacion
      if(boardToCheck[a] && boardToCheck[a] ===  boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) //me fijo si hay algo en el primer elemento, y si son todos iguales
      {  
        return boardToCheck[a]
      }
    }
    return null // si no hay ganador
  }

 export const checkEndGame = (newBoard) => {
   return newBoard.every((Square) => Square !== null); // pregunta si todos los espacios son diferentes a null, es decir si ya se jugo todo el tablero
 }; 