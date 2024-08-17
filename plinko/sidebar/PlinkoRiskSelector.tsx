import { usePlinkoContext } from '../PlinkoProvider';
import { PlinkoRiskType } from '@/types/games/plinko';
import styles from './PlinkoInputs.module.scss';
import { memo, useMemo } from 'react';
interface PlinkoRiskSelectorProps {
  isDisabled: boolean;
}
const PlinkoRiskSelector: React.FC<PlinkoRiskSelectorProps> = ({
  isDisabled,
}) => {
  const { risk } = usePlinkoContext();
  const riskList = useMemo(() => Object.values(PlinkoRiskType), []);

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputLabel}>Risk</div>
      <div className={styles.plinkoRiskSelectorBtns}>
        {riskList.map((value, index) => (
          <button
            className={styles.plinkoRiskSelectorBtn}
            disabled={isDisabled || risk.value === value}
            style={risk.value === value ? { background: '#4a4d4e' } : {}}
            key={`risk-${index}`}
            onClick={() => risk.setValue(value)}
          >
            {value.toLowerCase()}
          </button>
        ))}
      </div>
    </div>
  );
};
const PlinkoRiskSelectorMemo = memo(PlinkoRiskSelector);
export default PlinkoRiskSelectorMemo;
