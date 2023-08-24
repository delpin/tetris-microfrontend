import classNames from "classnames";
import { memo } from "react";

interface Props {
    isActive: boolean;
    activeColor?: string;
}

const CellElement = ({isActive, activeColor="indigo-500"}: Props) => {
    return (
        <div className={classNames("w-5 h-5 border border-slate-400", {['bg-white']: !isActive, [`bg-${activeColor}`]: !!isActive})}></div>
    )
}

export default memo(CellElement);