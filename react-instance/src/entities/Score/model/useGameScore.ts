import { create } from 'zustand';

  interface GameScoreInfo {
    points: number,
    lines: number,
    init: () => void,
    incPoints: (incValue: number) => void;
    incLines: (incValue: number) => void;
  }

export const useGameScore = create<GameScoreInfo>((set) => ({
  points: 0,
  lines: 0,
  init: () => {
    set(() => ({points: 0, lines: 0}))
  },
  incPoints: (incValue: number) => {
    set((state) => ({points: state.points + incValue}))
  },
  incLines: (incValue: number) => {
    set((state) => ({lines: state.points + incValue}))
  }
}))