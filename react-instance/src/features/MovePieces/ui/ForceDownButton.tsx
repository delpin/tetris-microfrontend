import { memo, useCallback } from "react"
import { useMovePiece } from "../model/useMovePiece";
import useAddKeydownEvent from "shared/hooks/useAddKeydownEvent";

function ForceDownButton() {
  const {setIsForceDown} = useMovePiece();

  const handleMove = useCallback(() => {
    setIsForceDown(true);
  }, [])

  useAddKeydownEvent({cb: handleMove, keyName: "ArrowDown"});
  
  return (
      <button onClick={handleMove}>Вниз</button>
  )
}

export default memo(ForceDownButton)