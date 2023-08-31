import { useElementsQueue } from "entities/ElementsQueue";
import { useBoardFieldInfo } from "entities/GameBoard";
import { useGameScore } from "entities/Score";
import { useToggleGameStatus } from "features/ToggleGameStatus";
import { useEffect } from "react";
import { gameConfig } from "shared/config/gameConfig";
import { GameStatus } from "shared/types/gameStatus";

export const useRestart = () => {
    const {status, prevStatus} = useToggleGameStatus();
    const {init: initBoard } = useBoardFieldInfo();
    const { init: initScore } = useGameScore();
    const { init: initFutureElements} = useElementsQueue();

    useEffect(() => {
        if(prevStatus === GameStatus.INIT) {
            initBoard(gameConfig.GAME_HEIGHT, gameConfig.GAME_WIDTH);
            initScore();
            initFutureElements(5);
        }
    }, [status])
}