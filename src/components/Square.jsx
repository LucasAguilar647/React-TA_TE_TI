export const Square = ({children, isSelected, updateBoard, index}) =>{

    const className = `square ${isSelected ? 'is-selected' : ''}` //indica visualmente el turno del jugador
  
    const handleClick = () =>{
      updateBoard(index)
    }
  
    return(
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }