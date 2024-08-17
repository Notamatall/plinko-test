import Image from 'next/image';
import { Dispatch, memo, SetStateAction } from 'react';
import styles from './PlinkoInputs.module.scss';
import infinity from '@/assets/games/plinko/infinity.svg';
interface PlinkoNumberOfBetsInputProps {
  isAutobetActive: boolean;
  autobetState: [number, Dispatch<SetStateAction<number>>];
}

const PlinkoNumberOfBetsInput: React.FC<PlinkoNumberOfBetsInputProps> = ({
  isAutobetActive,
  autobetState: [state, setter],
}: PlinkoNumberOfBetsInputProps) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputLabel}>Number of bets</div>
      <div className={styles.input}>
        <input
          style={{ paddingLeft: 15 }}
          className={styles.inputField}
          type="number"
          disabled={isAutobetActive}
          value={state.toString()}
          onChange={(e) => {
            const value = e.target.value;
            setter(+value);
          }}
          onBlur={(e) => {
            const value = e.target.value;
            if (value === '') {
              setter(0);
            }
          }}
        />

        <div className={styles.inputButtons}>
          <button className={styles.infinityBtn}>
            <Image src={infinity} alt="bet" width={15} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

const PlinkoNumberOfBetsInputMemo = memo(PlinkoNumberOfBetsInput);
export default PlinkoNumberOfBetsInputMemo;
