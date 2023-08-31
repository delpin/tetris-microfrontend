import { useElementsQueue } from "entities/ElementsQueue";
import { useBoardFieldInfo } from "entities/GameBoard";
import { useGameScore } from "entities/Score";
import { useMovePiece } from "features/MovePieces";
import { useRotatePiece } from "features/RotatePieces/model/useRotate";
import { useEffect } from "react"
import { gameConfig } from "shared/config/gameConfig";

export const useInitGame = () => {
    const {init: initMovePiece} = useMovePiece();
    const {init: initBoard } = useBoardFieldInfo();
    const { init: initFutureElements} = useElementsQueue();
    const { init: initRotateElements} = useRotatePiece();
    const { init: initScore } = useGameScore();

    useEffect(() => {
        initBoard(gameConfig.GAME_HEIGHT, gameConfig.GAME_WIDTH);
        initMovePiece();
        initFutureElements(5);
        initRotateElements();
        initScore();
    }, []);
}