import { create } from 'zustand';

  interface GameScoreInfo {
    points: number,
    lines: number,
    init: () => void,
    incPoints: (incValue: number) => void;
    incLines: (incValue: number) => void;
    incLinesWithPoints: (incValue: number) => void;
  }

  const pointsPerLine = 100;
const addScore = (additionalLines: number) => {
  // what's this called?
  if (additionalLines === 4) {
    return pointsPerLine * 10;
  } else {
    return additionalLines * pointsPerLine;
  }
};

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
    set((state) => ({lines: state.lines + incValue}));
  },
  incLinesWithPoints: (incValue: number) => {
    set((state) => ({lines: state.lines + incValue, points: state.points + addScore(incValue)}));
  }
}))