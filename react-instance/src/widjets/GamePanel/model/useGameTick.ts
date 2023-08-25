import { useMovePiece } from "features/MovePieces";
import { useToggleGameStatus } from "features/ToggleGameStatus"
import { useEffect, useRef } from "react"
import { GameStatus } from "shared/types/gameStatus";
import { movePieceDirection } from "shared/types/movePieceDirection";

export const useGameTick = () => {
    const {status} = useToggleGameStatus();
    const {move: movePiece} = useMovePiece();
    const gameInterval = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        return () => {
            clearInterval(gameInterval.current);
        }
    }, []);

    const gameTick = () => {
        movePiece(movePieceDirection.BOTTOM);
    }

    useEffect(() => {
        if(status === GameStatus.RUN) {
            gameInterval.current = setInterval(() => {
                gameTick();
            }, 1000)
        } else {
            clearInterval(gameInterval.current);
        }
    }, [status]);
}