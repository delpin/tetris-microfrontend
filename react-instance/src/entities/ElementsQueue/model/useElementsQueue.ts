import { generatePieceBlock } from 'shared/libs/generatePieceBlock';
import { create } from 'zustand';

  interface ElementsQueueInfo {
    futureMatrixElements: number[][][]
    init: (elementsCount: number) => void,
    sliceFirstElement: () => void,
  }

export const useElementsQueue = create<ElementsQueueInfo>((set) => ({
  futureMatrixElements: [],
  sliceFirstElement: () => {
    set((state) => ({futureMatrixElements: [generatePieceBlock()?.[0]].concat(state.futureMatrixElements.slice(1))
    }))
  },
  init: (elementsCount) => {
    set(() => ({futureMatrixElements: new Array(elementsCount).fill(0).map(() => generatePieceBlock()?.[0])}))
  }
}))