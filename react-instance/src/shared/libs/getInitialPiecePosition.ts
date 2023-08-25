import { gameConfig } from "shared/config/gameConfig";

export const getInitialPiecePosition = () => ({
  x: gameConfig.GAME_WIDTH / 2 - gameConfig.BLOCK_WIDTH / 2,
  y: 0
});