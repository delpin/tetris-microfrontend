import { memo } from "react"
import { movePieceDirection } from "shared/types/movePieceDirection";
import { useMovePiece } from "../model/useMovePiece";

function RightButton() {
  const {move} = useMovePiece();

  const handleMove = () => {
    move(movePieceDirection.RIGHT);
  }
  
  return (
      <button onClick={handleMove}>Вправо</button>
  )
}

export default memo(RightButton)