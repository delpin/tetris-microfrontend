import { getInitialPiecePosition } from 'shared/libs/getInitialPiecePosition';
import { movePieceDirection } from 'shared/types/movePieceDirection';
import { PieceCoordinates } from 'shared/types/pieceCoordinates';
import { create } from 'zustand';



  interface MovePieceInfo {
    pieceCoordinates: PieceCoordinates
    prevPieceCoordinates: PieceCoordinates;
    forceSetPosition: (coords: PieceCoordinates) => void;
    init: () => void;
    move: (direction: movePieceDirection) => void
  }

export const useMovePiece = create<MovePieceInfo>((set) => ({
  pieceCoordinates: getInitialPiecePosition(),
  prevPieceCoordinates: getInitialPiecePosition(),
  init: () => {
    set(() => ({pieceCoordinates: getInitialPiecePosition(), prevPieceCoordinates: getInitialPiecePosition()}))
  },
  forceSetPosition: (coords) => {
    set((state) => {
        return {
            pieceCoordinates: coords,
            prevPieceCoordinates: coords
        }
    })
  },
  move: (direction) => {
    set((state) => {
        switch(direction) {
            case movePieceDirection.BOTTOM:
                return {
                    prevPieceCoordinates: state.pieceCoordinates,
                    pieceCoordinates: {
                        ...state.pieceCoordinates,
                        y: state.pieceCoordinates.y + 1
                    }
                }
            case movePieceDirection.LEFT:
                return {
                    prevPieceCoordinates: state.pieceCoordinates,
                    pieceCoordinates: {
                        ...state.pieceCoordinates,
                        x: state.pieceCoordinates.x - 1
                    }
                }
                case movePieceDirection.RIGHT:
                    return {
                        prevPieceCoordinates: state.pieceCoordinates,
                        pieceCoordinates: {
                            ...state.pieceCoordinates,
                            x: state.pieceCoordinates.x + 1
                        }
                    }
                    
                default: {
                    return state;
                }
        }
    })
  }
}))