import { generateEmptyMatrix } from 'shared/libs/generateEmptyMatrix';
import { create } from 'zustand';

  interface GameScoreInfo {
    element: number[][],
    init: () => void,
    clear: () => void;
    add: (element: number[][]) => void;
  }

export const useHeldElement = create<GameScoreInfo>((set) => ({
  element: [],
  init: () => {
    set(() => ({element: generateEmptyMatrix(4,4)}))
  },
  clear: () => {
    set(() => ({element: generateEmptyMatrix(4,4)}))
  },
  add: (element: number[][]) => {
    set(() => ({element}))
  }
}))