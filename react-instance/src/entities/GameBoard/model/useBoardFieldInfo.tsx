import { generateEmptyMatrix } from 'shared/libs/generateEmptyMatrix';
import { create } from 'zustand';

  interface BoardFieldInfo {
    matrix: number[][]
    init: (line: number, columns: number) => void;
    updateMatrix: (newMatrix: number[][]) => void;
  }

export const useBoardFieldInfo = create<BoardFieldInfo>((set) => ({
  matrix: [],
  init: (line, columns) => {
    set(() => ({matrix: generateEmptyMatrix(line, columns)}))
  },
  updateMatrix: (newMatrix: number[][]) => {
    set(() => ({matrix: newMatrix}));
  }
}))