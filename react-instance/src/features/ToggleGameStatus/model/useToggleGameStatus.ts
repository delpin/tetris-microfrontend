import { GameStatus } from 'shared/types/gameStatus';
import { create } from 'zustand';

  interface ToggleGameStatusInfo {
    status: GameStatus | null;
    prevStatus: GameStatus | null;
    init: () => void;
    toggleGameRun: () => void;
    finishGame: () => void;
  }

export const useToggleGameStatus = create<ToggleGameStatusInfo>((set) => ({
  status: GameStatus.INIT,
  prevStatus: GameStatus.INIT,
  init: () => {
    set((state) => ({status: GameStatus.RUN, prevStatus: state.status}))
  },
  finishGame: () => {
    set((state) => {
        return {status: GameStatus.INIT, prevStatus: state.status}
    })
  },
  toggleGameRun: () => {
    set((state) => {
        switch(state.status) {
            case GameStatus.RUN:
                return {status: GameStatus.STOPED, prevStatus: state.status}
        default: 
                return {status: GameStatus.RUN, prevStatus: state.status}
        }
    })
  }
}))