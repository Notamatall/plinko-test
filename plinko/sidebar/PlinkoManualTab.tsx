import PlinkoBetAmountInput from './PlinkoBetAmountInput';
import { usePlinkoContext } from '../PlinkoProvider';
import PlinkoRiskSelector from './PlinkoRiskSelector';
import PlinkoRowsRange from './PlinkoRowsRange';
import { memo } from 'react';

interface PlinkoManualBarProps {
  isAutobetActive: boolean;
}

const PlinkoManualTab: React.FC<PlinkoManualBarProps> = memo(
  ({ isAutobetActive }) => {
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
      </>
    );
  }
);

export default PlinkoManualTab;
