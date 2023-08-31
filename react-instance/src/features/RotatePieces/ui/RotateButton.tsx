import { memo, useCallback } from "react";
import { useRotatePiece } from "../model/useRotate";
import useAddKeydownEvent from "shared/hooks/useAddKeydownEvent";

const RotateButton = () => {
    const {rotate} = useRotatePiece();

    const handleRotate = useCallback(() => {rotate()}, []);

    useAddKeydownEvent({cb: handleRotate, keyName: "ArrowUp"})

    return (
        <button onClick={handleRotate}>Повернуть</button>
    )
}

export default memo(RotateButton);