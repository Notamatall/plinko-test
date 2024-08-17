import { Dispatch, memo, SetStateAction } from 'react';
import PlinkoNumberOfBetsInput from './PlinkoNumberOfBetsInput';
import PlinkoBetAmountInput from './PlinkoBetAmountInput';
import PlinkoRiskSelector from './PlinkoRiskSelector';
import PlinkoRowsRange from './PlinkoRowsRange';
import { usePlinkoContext } from '../PlinkoProvider';

interface AutoBetBarProps {
  isAutobetActive: boolean;
  autobetState: [number, Dispatch<SetStateAction<number>>];
}

const PlinkoAutobetTab: React.FC<AutoBetBarProps> = memo(
  ({ isAutobetActive, autobetState }) => {
    const { activeBallsCount } = usePlinkoContext();
    return (
      <>
        <PlinkoBetAmountInput isAutobetActive={isAutobetActive} />
        <PlinkoRiskSelector
          isDisabled={isAutobetActive || activeBallsCount.value > 0}
        />
        <PlinkoRowsRange
          isDisabled={isAutobetActive || activeBallsCount.value > 0}
        />
        <PlinkoNumberOfBetsInput
          isAutobetActive={isAutobetActive}
          autobetState={autobetState}
        />
      </>
    );
  }
);

export default PlinkoAutobetTab;
