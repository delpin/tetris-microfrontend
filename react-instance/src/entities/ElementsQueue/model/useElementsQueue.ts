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
    set((state) => {
      return ({
      futureMatrixElements: state.futureMatrixElements.slice(1).concat([generatePieceBlock()?.[0]])
    })})
  },
  init: (elementsCount) => {
    set(() => ({futureMatrixElements: new Array(elementsCount).fill(0).map(() => generatePieceBlock()?.[0])}))
  }
}))