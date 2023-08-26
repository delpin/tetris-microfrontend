import { ElementsQueue } from "entities/ElementsQueue";
import { GameBoard } from "entities/GameBoard";
import { HeldElement } from "entities/HeldElement";
import { ScorePanel } from "entities/Score";
import { LeftButton, RightButton } from "features/MovePieces";
import {ToggleStartButton} from "features/ToggleGameStatus";
import { memo } from "react"
import { useInitGame } from "../model/useInitGame";
import { useGameTick } from "../model/useGameTick";
import { useMoveCurrentPiece } from "../model/useMoveCurrentPiece";
import RotateButton from "features/RotatePieces/ui/RotateButton";

const GamePanel = () => {
    useInitGame();
    useGameTick();
    useMoveCurrentPiece();

    return (
        <div className="flex flex-col w-96 gap-4">
            <ScorePanel />
            <div className="gap-3 flex">
                <HeldElement />
                <GameBoard />
                <ElementsQueue />
            </div>
            <div className="gap-3 flex">
                <ToggleStartButton />
                <LeftButton />
                <RightButton />
                <RotateButton />
            </div>
        </div>
    )
}

export default memo(GamePanel);