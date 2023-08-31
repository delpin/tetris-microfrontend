import  { memo } from 'react';
import { useToggleGameStatus } from '../model/useToggleGameStatus';
import { GameStatus } from 'shared/types/gameStatus';

const ToggleStartButton = () => {
  const {status, toggleGameRun} = useToggleGameStatus();

  return (
    <button onClick={toggleGameRun}>{status !== GameStatus.RUN ? 'Старт' : 'Стоп' }</button>
  )
}

export default memo(ToggleStartButton)