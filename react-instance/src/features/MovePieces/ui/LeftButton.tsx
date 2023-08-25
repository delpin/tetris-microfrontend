import { memo } from "react"
import { useMovePiece } from "../model/useMovePiece"
import { movePieceDirection } from "shared/types/movePieceDirection";

function LeftButton() {
  const {move} = useMovePiece();

  const handleMove = () => {
    move(movePieceDirection.LEFT);
  }
  
  return (
      <button onClick={handleMove}>Влево</button>
  )
}

export default memo(LeftButton)