import { memo, useEffect } from "react";
import { useBoardFieldInfo } from "../model/useBoardFieldInfo";
import { BoardBlockElements } from "shared/ui/board-block-elements";

interface Props {
    
}

const GameBoard = ({}: Props) => {
    const {matrix} = useBoardFieldInfo();

  return (
    <BoardBlockElements matrix={matrix} />
  )
}

export default memo(GameBoard)