import { useElementsQueue } from "entities/ElementsQueue";
import { useBoardFieldInfo } from "entities/GameBoard";
import { useGameScore } from "entities/Score";
import { useMovePiece } from "features/MovePieces";
import { useRotatePiece } from "features/RotatePieces/model/useRotate";
import { useToggleGameStatus } from "features/ToggleGameStatus";
import { useEffect, useRef } from "react";
import { gameConfig } from "shared/config/gameConfig";
import { generatePositionStr } from "shared/libs/generatePositionStr";
import { GameStatus } from "shared/types/gameStatus";
import { PieceCoordinates } from "shared/types/pieceCoordinates";

function clearFullLines(matrix: number[][]) {
    let linesCleared = 0;
    const resultMatrix = matrix.reduce((result: number[][], item: number[]) => {
        if(!item.includes(0)) {
            result.unshift(new Array(gameConfig.GAME_WIDTH).fill(0));
            linesCleared += 1;
        } else {
            result.push(item);
        }

        return result;
    }, []);
  
    return {
        resultMatrix,
        linesCleared
    };
  }

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

const handleLongCheck = (positionBlock: PieceCoordinates[], matrix: number[][]) => {
    return false;
}

const checkIsBorderOfField = (positionBlock: PieceCoordinates[], matrix: number[][]) => {
    const fastCheck = (positionBlock || []).some(({x}) => {
        return x < 0 || x >= gameConfig.GAME_WIDTH;
    });
    const longCheck = handleLongCheck(positionBlock, matrix);
    return fastCheck || longCheck;
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
    const {status,finishGame} = useToggleGameStatus();
    const {incLinesWithPoints} = useGameScore()

    const forceResetFigure = (forceElement: number[][]) => {
        const positionBlock = (forceElement || [])?.reduce((result: PieceCoordinates[], line, y) => {
            const coords = line.reduce((result: PieceCoordinates[], row, x) => {
                if(!row) {
                    return result;
                }
                return result.concat({x: x + pieceCoordinates.x, y: y + pieceCoordinates.y});
            }, []);

            return result.concat(coords)
        }, []);

        const prevPositionBlock =  (forceElement || [])?.reduce((result: PieceCoordinates[], line, y) => {
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


        const resultMatrix = matrix.map((line, y) => {
            return line.map((row, x) => {
                let value = row;
                const positionInMatrix = generatePositionStr(x, y);

                // clear previous
                if(prevPositionStringsBlock?.includes(positionInMatrix) || positionStringsBlock?.includes(positionInMatrix)) {
                    value = 0;
                }

                return value; 
            })
        });

        updateMatrix(resultMatrix);

        return resultMatrix;
    } 

    const redrawBoard = (forceMatrix: number[][] | null = null) => {
        const initMatrix = forceMatrix || matrix;
        const positionBlock = (currentElement.current || [])?.reduce((result: PieceCoordinates[], line, y) => {
            const coords = line.reduce((result: PieceCoordinates[], row, x) => {
                if(!row) {
                    return result;
                }
                return result.concat({x: x + pieceCoordinates.x, y: y + pieceCoordinates.y});
            }, []);

            return result.concat(coords)
        }, []);

        if(checkIsBorderOfField(positionBlock, initMatrix)) {
            forceSetPosition(pieceCoordinates.x < (gameConfig.GAME_WIDTH /2) ? {y: pieceCoordinates.y, x: pieceCoordinates.x + 1} : {y: pieceCoordinates.y, x: pieceCoordinates.x - 1} );
            return;
        }

        if (checkIsEndOfField(positionBlock)) {
            currentElement.current = null;
            // setCurrentElement(null);
            initMovePiece();
            initRotaion();
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

        let positionStringsBlock = positionBlock.map(({x, y}) =>  generatePositionStr(x, y));

        if(!checkIsEmpty(prevPositionStringsBlock, positionStringsBlock, initMatrix)) {
            if(pieceCoordinates.y === 1) {
                alert('Game Over');
                finishGame();
                return;
            };

            if(prevPieceCoordinates.y !== pieceCoordinates.y) {
                currentElement.current = null;
                // setCurrentElement(null);
                initRotaion();
                initMovePiece();
                return;
            } else {
                forceSetPosition(prevPieceCoordinates);
                return;
            }
        }


        const matrixWithNewPosition = (initMatrix).map((line, y) => {
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

        const {linesCleared, resultMatrix} = clearFullLines(matrixWithNewPosition);
        updateMatrix(resultMatrix);

        return linesCleared;
    };

    useEffect(() => {
        if(status !== GameStatus.RUN) {
            return;
        }

        if(currentElement.current) {
            const prevFigure = [...currentElement.current];
            currentElement.current = rotateRight90(currentElement.current);
            const matrix = forceResetFigure(prevFigure);
            const clearedLines = redrawBoard(matrix);
            incLinesWithPoints(clearedLines || 0)
        }
    }, [currentRotation])

    useEffect(() => {
        if(status !== GameStatus.RUN) {
            return;
        }

        if(!currentElement.current) {
            currentElement.current = futureMatrixElements[0] as number[][];
            // setCurrentElement(futureMatrixElements[0]);
            sliceFirstElement();
        }

        if(currentElement.current && pieceCoordinates) {
            const clearedLines = redrawBoard();
            incLinesWithPoints(clearedLines || 0)
        }
    }, [pieceCoordinates])


}