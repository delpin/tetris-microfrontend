import { memo, useCallback, useEffect } from "react"
import { useMovePiece } from "../model/useMovePiece"
import { movePieceDirection } from "shared/types/movePieceDirection";
import useAddKeydownEvent from "shared/hooks/useAddKeydownEvent";

function LeftButton() {
  const {move} = useMovePiece();

  const handleMove = useCallback(() => {
    move(movePieceDirection.LEFT);
  }, [])

  useAddKeydownEvent({cb: handleMove, keyName: "ArrowLeft"});

  return (
      <button onClick={handleMove}>Влево</button>
  )
}

export default memo(LeftButton)