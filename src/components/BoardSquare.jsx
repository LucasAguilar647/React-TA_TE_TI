import { Square } from "./Square";

export function BoardSquare({ updateBoard, board }) {
  return (
    <section className="game">
      {board.map((square, index) => {
        //(_, index) ""_ es la primera posicion
        return (
          <Square
            key={index} // la clave debe ser unica, en este caso se le puede pasar el index porque es unica
            index={index}
            updateBoard={updateBoard} //le estor pasando la funcion (para ejecutarlo cuando quiera), no el resultado de la ejecucion(updateBoard())
          >
            {square}
          </Square>
        );
      })}
    </section>
  );
}
