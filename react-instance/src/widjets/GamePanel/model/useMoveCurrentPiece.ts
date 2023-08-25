import { useElementsQueue } from "entities/ElementsQueue";
import { useBoardFieldInfo } from "entities/GameBoard";
import { useMovePiece } from "features/MovePieces";
import { useEffect, useState } from "react";
import { generatePositionStr } from "shared/libs/generatePositionStr";
import { PieceCoordinates } from "shared/types/pieceCoordinates";

export const useMoveCurrentPiece = () => {
    const [currentElement, setCurrentElement] = useState<number[][] | null>(null);
    const {futureMatrixElements, sliceFirstElement } = useElementsQueue();
    const {matrix, updateMatrix } = useBoardFieldInfo();
    const {pieceCoordinates, prevPieceCoordinates} = useMovePiece();

    useEffect(() => {
        if(!currentElement) {
            setCurrentElement(futureMatrixElements[0]);
            sliceFirstElement();
        }
    }, [currentElement]);


    const redrawBoard = () => {
        const prevPositionBlock =  (currentElement || [])?.reduce((result: string[], line, y) => {
            return result.concat(line.filter(row => !!row).map((row, x) => {
                return generatePositionStr(x + prevPieceCoordinates.x, y + prevPieceCoordinates.y);
            }))
        }, []);

        const positionBlock =  (currentElement || [])?.reduce((result: string[], line, y) => {
            return result.concat(line.filter(row => !!row).map((row, x) => {
                return generatePositionStr(x + pieceCoordinates.x, y + pieceCoordinates.y);
            }))
        }, []);

        const resultMatrix = matrix.map((line, y) => {
            return line.map((row, x) => {
                let value = row;
                if(prevPositionBlock?.includes(generatePositionStr(x, y))) {
                    value = 0;
                }
                if(positionBlock?.includes(generatePositionStr(x, y))) {
                    value = 1;
                }

                return value; 
            })
        });

        updateMatrix(resultMatrix);
    }



    useEffect(() => {
        if(currentElement && pieceCoordinates) {
            redrawBoard();
        }
    }, [pieceCoordinates])

}