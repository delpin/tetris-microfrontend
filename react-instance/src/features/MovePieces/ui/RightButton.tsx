import { memo, useCallback } from "react"
import { movePieceDirection } from "shared/types/movePieceDirection";
import { useMovePiece } from "../model/useMovePiece";
import useAddKeydownEvent from "shared/hooks/useAddKeydownEvent";

function RightButton() {
  const {move} = useMovePiece();

  const handleMove = useCallback(() => {
    move(movePieceDirection.RIGHT);
  }, [])

  useAddKeydownEvent({cb: handleMove, keyName: "ArrowRight"});
  
  return (
      <button onClick={handleMove}>Вправо</button>
  )
}

export default memo(RightButton)