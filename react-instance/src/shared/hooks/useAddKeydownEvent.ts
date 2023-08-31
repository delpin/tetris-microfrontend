import { useCallback, useEffect } from "react";

interface Props {
    cb: () => void;
    keyName: string;
}

export const useAddKeydownEvent = ({keyName, cb}: Props) => {

    const handleAction = useCallback((event: Event) => {
            event.preventDefault();
            const key = (event as KeyboardEvent).key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
            switch (key) { // change to event.key to key to use the above variable
              case keyName:
                    cb();
                break;
              default:
                break;
            }
            return false;
    }, [])

    useEffect(() => {
        document.addEventListener("keydown", handleAction);

        return () => {
            document.removeEventListener("keydown", handleAction);
        }

    return;
    })
}

export default useAddKeydownEvent;