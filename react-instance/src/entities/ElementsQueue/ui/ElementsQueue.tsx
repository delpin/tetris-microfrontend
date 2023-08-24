import { memo, useEffect } from "react"
import { useElementsQueue } from "../model/useElementsQueue"
import { BoardBlockElements } from "shared/ui/board-block-elements";

const ElementsQueue = () => {
    const {futureMatrixElements, init} = useElementsQueue();

    useEffect(() => {
        init(5)
    }, []);

    return (
        <div className="flex flex-col gap-3">
            {futureMatrixElements.map((item, index) => {
                return (
                    <BoardBlockElements key={index} matrix={item} />
                )
            })}
        </div>
    )
}

export default memo(ElementsQueue)