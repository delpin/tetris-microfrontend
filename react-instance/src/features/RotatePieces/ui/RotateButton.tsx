import { memo } from "react";
import { useRotatePiece } from "../model/useRotate";

const RotateButton = () => {
    const {rotate} = useRotatePiece();
    return (
        <button onClick={rotate}>Повернуть</button>
    )
}

export default memo(RotateButton);