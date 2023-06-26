import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS, WINNER_COMBOS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { BoardSquare } from "./components/BoardSquare";

function App() {
  const [enabled, setEnabled] = useState(false);

  const [position, setPosition] = useState({x: -20, y: -20})

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event; //la posicion de mi puntero
      setPosition({x:clientX, y:clientY})
    };

    if (enabled) { //me suscribo al evento
      window.addEventListener("pointermove", handleMove);
    }

    return () =>{
      window.removeEventListener("pointermove", handleMove)//limpia la suscripcion anterior cuando cambia el estado
      setPosition({x:-20, y:-20})
    }
  }, [enabled]); //se ejecuta cada vez que cambia el enabled

  //los useState siempte tienen que estar en el cuerpo del componente, internamente se guardan en una lista con sus posiciones(no se pueden meter en if)
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  }); // busca en el localStorage el estado del board, si hay algo quiero que me devuelva ese algo, sino, todos en null

  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem("turn");
    return turnFromLocalStorage ?? TURNS.X;
  }); //busca en el localStorage el estado del turno si hay algo que siga con turno ese y sino es que esta vacio entonces arranca en "x"

  const [winner, setWinner] = useState(null); //indica con False que hay empate y null

  const resetGame = () => {
    //seteo todo a como estaba cuando empezo el juego
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return; // si en la posicion ya hay algo escrito no hace nada, si es null va a la siguiente linea

    const newBoard = [...board]; //hago una copia superficial del board para no modificar el valor del array, para no modificar el estado
    newBoard[index] = turn;
    setBoard(newBoard); //actualiza el board para que se muestre la x u o

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn); //actualiza el turno cuando se pulsa en el div

    window.localStorage.setItem("board", JSON.stringify(newBoard)); // guarda en el localStorage de la pag la partida (guarda en string)
    window.localStorage.setItem("turn", newTurn); //tengo que guardar el nuevo turno

    const newWinner = checkWinnerFrom(newBoard); // le paso el ultimo tablero creado para revisar si hay ganador
    if (newWinner) {
      confetti(); //hay que instalar una dependencia (npm install canvas-confetti -E) e importarlo
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) setWinner(false); //empate
  };

  return (
    <main className="board">
      <h1>TA TE TI</h1>
      <button onClick={resetGame}>Reset game</button>

      <BoardSquare updateBoard={updateBoard} board={board} />

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />

      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Descativar" : "Activar"} efecto{" "}
      </button>

      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "1px solid #fff",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          filter: 'blur(2px)'
        }}
      />
    </main>
  );
}

export default App;
