import { useMovePiece } from "features/MovePieces";
import { useToggleGameStatus } from "features/ToggleGameStatus"
import { useEffect, useRef } from "react"
import { GameStatus } from "shared/types/gameStatus";
import { movePieceDirection } from "shared/types/movePieceDirection";

export const useGameTick = () => {
    const {status} = useToggleGameStatus();
    const {move: movePiece, isForceDown} = useMovePiece();
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
            clearInterval(gameInterval.current);
            gameInterval.current = setInterval(() => {
                gameTick();
            }, isForceDown ? 10 : 300)
        } else {
            clearInterval(gameInterval.current);
        }
    }, [status, isForceDown]);
}