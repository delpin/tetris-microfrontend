import { memo, useEffect } from "react"
import { useHeldElement } from "../model/useHeldElement"
import { BoardBlockElements } from "shared/ui/board-block-elements";

const HeldElement = () => {
    const {init, element} = useHeldElement();

    useEffect(() => {
        init();
    }, [])

    return (
        <div>
            <BoardBlockElements matrix={element} />
        </div>
    )
}

export default memo(HeldElement)