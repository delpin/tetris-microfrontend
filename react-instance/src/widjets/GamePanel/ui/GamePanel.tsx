import { ElementsQueue } from "entities/ElementsQueue";
import { GameBoard } from "entities/GameBoard";
import { HeldElement } from "entities/HeldElement";
import { ScorePanel } from "entities/Score";
import { memo } from "react"

const GamePanel = () => {
    return (
        <div className="flex flex-col w-96 gap-4">
            <ScorePanel />
            <div className="gap-3 flex">
                <HeldElement />
                <GameBoard />
                <ElementsQueue />
            </div>
        </div>
    )
}

export default memo(GamePanel);