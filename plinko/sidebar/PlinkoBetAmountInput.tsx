import Image from 'next/image';
import { PlinkoBetModification } from '@/types/games/plinko';
import { usePlinkoContext } from '../PlinkoProvider';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  useGetCurrentUserProfileQuery,
  useGetPlinkoConfigQuery,
} from '@/queries';
import coinIco from '@/assets/tickets/coin-game.svg';
import styles from './PlinkoInputs.module.scss';
import fairnessIco from '@/assets/mines/fairness.svg';
import { useModal } from '@/context/ModalContext';

interface PlinkoBetAmountBarProps {
  isAutobetActive: boolean;
}
const inputSetters: PlinkoBetModification[] = ['1/2', 'x2', 'max'];
const PlinkoBetAmountInput: React.FC<PlinkoBetAmountBarProps> = ({
  isAutobetActive,
}: PlinkoBetAmountBarProps) => {
  const { bet, localBalance } = usePlinkoContext();
  const { data: user } = useGetCurrentUserProfileQuery();
  const [canMakeBet, setCanMakeBet] = useState<boolean>(
    !user || localBalance.ref.current - bet.value >= 0
  );
  const { openModal } = useModal();
  const { data: config } = useGetPlinkoConfigQuery();

  useEffect(() => {
    setCanMakeBet(!user || localBalance.ref.current - bet.value >= 0);
  }, [user, localBalance, bet]);

  const onFairnessClick = useCallback(() => {
    return user
      ? () => openModal({ name: 'games/provably-fair' })
      : () => openModal({ name: 'user/auth' });
  }, [user]);

  return (
    <div className={styles.inputContainer}>
      <div className={styles.fairnessBtnContainer}>
        <label className={styles.inputLabel}>Bet Amount</label>
        <button onClick={onFairnessClick} className={styles.fairnessBtn}>
          Fairness{' '}
          <Image src={fairnessIco} alt="" style={{ marginTop: '3px' }} />
        </button>
      </div>
      <p className={styles.maxBetNote}>Max bet: {config.maxBet}</p>

      <div className={styles.input}>
        <Image
          width={24}
          src={coinIco}
          className={styles.inputIcon}
          alt="Coin"
        />

        <input
          className={styles.inputField}
          disabled={isAutobetActive}
          id="bet"
          type="text"
          autoComplete="off"
          min={config.minBet}
          max={config.maxBet}
          value={bet.value.toString()}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (isNaN(value)) {
              return bet.value;
            }
            bet.setValue(value);
          }}
          onBlur={(e) => {
            const value = Number(e.target.value);
            if (isNaN(value) || value < config.minBet) {
              bet.setValue(config.minBet);
            }
            return bet.value;
          }}
        />
        <div className={styles.inputButtons}>
          {inputSetters.map((value) => (
            <button
              className={styles.inputBtn}
              key={value}
              disabled={isAutobetActive}
              onClick={() => {
                bet.setValue(value);
              }}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      {!canMakeBet && (
        <div className={styles.inError}>
          Can&apos;t bet more than your balance
        </div>
      )}
    </div>
  );
};
const PlinkoBetAmountInputMemo = memo(PlinkoBetAmountInput);
export default PlinkoBetAmountInputMemo;
