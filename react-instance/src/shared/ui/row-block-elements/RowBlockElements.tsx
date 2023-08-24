import { memo } from "react";
import { CellItem } from "shared/ui/cell-element";

interface Props {
    line: number[]
}

const RowBlockElements = ({line}: Props) => {
    return (<div className="flex">
        {line.map((element, index) => {
            return <CellItem key={index} isActive={!!element} />
        })}
    </div>);
}

export default memo(RowBlockElements);