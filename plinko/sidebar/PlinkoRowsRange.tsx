import { PlinkoRows } from '@/types/games/plinko';
import { usePlinkoContext } from '../PlinkoProvider';
import styles from './PlinkoInputs.module.scss';
import { memo } from 'react';
import { Slider } from '@mantine/core';

interface PlinkoRowsRangeProps {
  isDisabled: boolean;
}

const PlinkoRowsRange: React.FC<PlinkoRowsRangeProps> = memo(
  ({ isDisabled }): React.ReactElement => {
    const { rowsCount } = usePlinkoContext();
    return (
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>Rows</div>
        <div className={styles.inputLabel}>{rowsCount.value}</div>
        <Slider
          color="jackpot"
          disabled={isDisabled}
          value={rowsCount.value}
          onChange={(v: any) => {
            rowsCount.setValue(+v);
          }}
          step={1}
          min={PlinkoRows.EIGHT}
          max={PlinkoRows.SIXTEEN}
        />
      </div>
    );
  }
);

export default PlinkoRowsRange;
