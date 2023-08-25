import { GameStatus } from 'shared/types/gameStatus';
import { create } from 'zustand';

  interface ToggleGameStatusInfo {
    status: GameStatus | null
    init: () => void;
    toggleGameRun: () => void
  }

export const useToggleGameStatus = create<ToggleGameStatusInfo>((set) => ({
    status: null,
  init: () => {
    set(() => ({status: GameStatus.RUN}))
  },
  toggleGameRun: () => {
    set((state) => {
        switch(state.status) {
            case GameStatus.RUN:
                return {status: GameStatus.STOPED}
        default: 
                return {status: GameStatus.RUN}
        }
    })
  }
}))