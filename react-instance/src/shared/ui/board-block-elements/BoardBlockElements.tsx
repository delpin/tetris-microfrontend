import { memo } from "react";
import { RowBlockElements } from "shared/ui/row-block-elements";

interface Props {
    matrix: number[][]
}

const BoardBlockElements = ({matrix}: Props) => {
    return (<div>
        {(matrix || []).map((line, index) => {
            return (<RowBlockElements key={index} line={line} />)
        })}
    </div>);
}

export default memo(BoardBlockElements);