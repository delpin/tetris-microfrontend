import { useElementsQueue } from "entities/ElementsQueue";
import { useBoardFieldInfo } from "entities/GameBoard";
import { useMovePiece } from "features/MovePieces";
import { useRotatePiece } from "features/RotatePieces/model/useRotate";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { gameConfig } from "shared/config/gameConfig";
import { generatePositionStr } from "shared/libs/generatePositionStr";
import { PieceCoordinates } from "shared/types/pieceCoordinates";

const checkIsEmpty = (prevPositionStringsBlock: string[], positionStringsBlock: string[], matrix: number[][]) => {
    const matrixObject = (matrix || [])?.reduce((result: PieceCoordinates[], line, y) => {
        const coords = line.reduce((result: PieceCoordinates[], row, x) => {
            if(!row) {
                return result;
            }
            return result.concat({x: x, y: y});
        }, []);

        return result.concat(coords)
    }, []);

    const matrixStringObject =  matrixObject.map(({x, y}) =>  generatePositionStr(x, y)).filter(coords => !prevPositionStringsBlock.includes(coords));

    return !(positionStringsBlock || []).some((str) => {
        return matrixStringObject.includes(str);
    })
}

const checkIsEndOfField = (positionBlock: PieceCoordinates[]) => {
    return (positionBlock || []).some(({y}) => {
        return y === gameConfig.GAME_HEIGHT;
    })
}

const checkIsBorderOfField = (positionBlock: PieceCoordinates[]) => {
    return (positionBlock || []).some(({x}) => {
        return x < 0 || x >= gameConfig.GAME_WIDTH;
    })
}

function rotateRight90 (matrix: number[][]) {
    let result:number[][] = [];
    for (let i = matrix.length - 1; i >= 0; i--) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (!result[j]) {
          result[j] = [];
        }
        result[j].push(matrix[i][j]);
      }
    }
    return result;
  }

export const useMoveCurrentPiece = () => {
    // const [currentElement, setCurrentElement] = useState<number[][] | null>(null);
    const currentElement = useRef<number[][] | null>(null);
    const {futureMatrixElements, sliceFirstElement } = useElementsQueue();
    const {matrix, updateMatrix } = useBoardFieldInfo();
    const {pieceCoordinates, prevPieceCoordinates, init: initMovePiece, forceSetPosition} = useMovePiece();
    const {init: initRotaion, currentRotation} = useRotatePiece();

    const redrawBoard = () => {
        const positionBlock = (currentElement.current || [])?.reduce((result: PieceCoordinates[], line, y) => {
            const coords = line.reduce((result: PieceCoordinates[], row, x) => {
                if(!row) {
                    return result;
                }
                return result.concat({x: x + pieceCoordinates.x, y: y + pieceCoordinates.y});
            }, []);

            return result.concat(coords)
        }, []);

        if(checkIsBorderOfField(positionBlock)) {
            forceSetPosition(prevPieceCoordinates);
            return;
        }

        if (checkIsEndOfField(positionBlock)) {
            currentElement.current = null;
            // setCurrentElement(null);
            initMovePiece();
            initRotaion()
            return;
        }
        
        const prevPositionBlock =  (currentElement.current || [])?.reduce((result: PieceCoordinates[], line, y) => {
            const coords = line.reduce((result: PieceCoordinates[], row, x) => {
                if(!row) {
                    return result;
                }
                return result.concat({x: x + prevPieceCoordinates.x, y: y + prevPieceCoordinates.y});
            }, []);

            return result.concat(coords)
        }, []);


        const prevPositionStringsBlock =  prevPositionBlock.map(({x, y}) =>  generatePositionStr(x, y));

        const positionStringsBlock = positionBlock.map(({x, y}) =>  generatePositionStr(x, y));


        if(!checkIsEmpty(prevPositionStringsBlock, positionStringsBlock, matrix)) {
            currentElement.current = null;
            // setCurrentElement(null);
            initRotaion();
            initMovePiece();
            return;
        }


        const resultMatrix = matrix.map((line, y) => {
            return line.map((row, x) => {
                let value = row;
                const positionInMatrix = generatePositionStr(x, y);

                // clear previous
                if(prevPositionStringsBlock?.includes(positionInMatrix)) {
                    value = 0;
                }

                // draw next
                if(positionStringsBlock?.includes(positionInMatrix)) {
                    value = 1;
                }

                return value; 
            })
        });

        updateMatrix(resultMatrix);
    }

    // useEffect(() => {
    //     if(currentElement.current) {
    //         currentElement.current = rotateRight90(currentElement.current);
    //     }
    // }, [currentRotation])

    useEffect(() => {
        if(!currentElement.current) {
            currentElement.current = futureMatrixElements[0] as number[][];
            // setCurrentElement(futureMatrixElements[0]);
            sliceFirstElement();
        }

        if(currentElement.current && pieceCoordinates) {
            redrawBoard();
        }
    }, [pieceCoordinates])


}