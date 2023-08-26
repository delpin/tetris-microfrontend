import { Rotation } from 'shared/types/piece';
import { create } from 'zustand';



  interface RotateInfo {
    currentRotation: Rotation
    init: () => void;
    rotate: () => void
  }

export const useRotatePiece = create<RotateInfo>((set) => ({
  currentRotation: 0,
  init: () => {
    set(() => ({currentRotation: 0}))
  },
  rotate: () => {
    set((state) => {
        const newValue = state.currentRotation + 1;
        return {
            currentRotation: (newValue > 3 ? 0 : newValue) as Rotation,
        }
    })
  },
}))