import { generateEmptyMatrix } from 'shared/libs/generateEmptyMatrix';
import { generatePieceBlock } from 'shared/libs/generatePieceBlock';
import { create } from 'zustand';

  interface BoardFieldInfo {
    futureMatrixElements: number[][][]
    init: (elementsCount: number) => void
  }

export const useElementsQueue = create<BoardFieldInfo>((set) => ({
  futureMatrixElements: [],
  init: (elementsCount) => {
    set(() => ({futureMatrixElements: new Array(elementsCount).fill(0).map(() => generatePieceBlock()?.[0])}))
  }
}))