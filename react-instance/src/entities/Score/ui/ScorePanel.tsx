import { memo, useEffect, useMemo } from "react";
import { useGameScore } from "../model/useGameScore"

const ScorePanel = () => {
    const {lines, points, init} = useGameScore();

    const resultLines = useMemo(() => {
        return lines.toString().padStart(4, '0');
    }, [lines]);

    const resultPoints = useMemo(() => {
        return points.toString().padStart(4, '0');
    }, [lines]);

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="flex justify-between">
            <div>
                <div>points</div>
                <div>{resultPoints}</div>
            </div>
            <div>
                <div>lines</div>
                <div>{resultLines}</div>
            </div>
        </div>
    )
}

export default memo(ScorePanel);