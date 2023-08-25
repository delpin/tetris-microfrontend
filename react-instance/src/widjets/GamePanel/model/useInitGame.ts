import { useElementsQueue } from "entities/ElementsQueue";
import { useBoardFieldInfo } from "entities/GameBoard";
import { useMovePiece } from "features/MovePieces";
import { useToggleGameStatus } from "features/ToggleGameStatus"
import { useEffect } from "react"
import { gameConfig } from "shared/config/gameConfig";

export const useInitGame = () => {
    const { init: initPlay} = useToggleGameStatus();
    const {init: initMovePiece} = useMovePiece();
    const {init: initBoard } = useBoardFieldInfo();
    const { init: initFutureElements} = useElementsQueue();

    useEffect(() => {
        initPlay();
        initMovePiece();
        initFutureElements(5);
        initBoard(gameConfig.GAME_HEIGHT, gameConfig.GAME_WIDTH);
    }, []);
}