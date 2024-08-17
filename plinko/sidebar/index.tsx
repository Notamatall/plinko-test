import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePlinkoContext } from '../PlinkoProvider';
import {
  useGetCurrentUserProfileQuery,
  useGetPlinkoConfigQuery,
} from '@/queries';
import { useModal } from '@/context/ModalContext';
import styles from './PlinkoSideBar.module.scss';
import { LS_SOUND_KEY } from '@/types/LocalStorageKeys';
import PlinkoAutobetTab from './PlinkoAutobetTab';
import PlinkoManualTab from './PlinkoManualTab';
import { useLocalStorage } from 'usehooks-ts';

interface PlinkoSideBarProps {
  isBetButtonLocked: boolean;
  dropBall: (withLock: boolean) => Promise<boolean>;
}
type SideBarTabs = 'Manual' | 'Auto';

const PlinkoSideBar: React.FC<PlinkoSideBarProps> = React.memo(
  ({ isBetButtonLocked, dropBall }): React.ReactElement => {
    const { data: rateLimit } = useGetPlinkoConfigQuery();
    const { data: user } = useGetCurrentUserProfileQuery();
    const { openModal } = useModal();

    const { localBalance, bet } = usePlinkoContext();
    const [activePanel, setActivePanel] = useState<SideBarTabs>('Manual');
    const [autobetCount, setAutobetsCount] = useState<number>(0);
    const [isAutobetActive, setIsAutobetActive] = useState<boolean>(false);
    const autobetInterval = useRef<any | null>(null);
    const betAudio = useRef<HTMLAudioElement | null>(null);
    const [canMakeBet, setCanMakeBet] = useState<boolean>(
      !user || localBalance.ref.current - bet.value >= 0
    );

    const [isSoundEnabled] = useLocalStorage(LS_SOUND_KEY, true, {
      initializeWithValue: true,
    });

    useEffect(() => {
      betAudio.current = new Audio('/audio/plinko/bet.mp3');
    }, []);

    useEffect(() => {
      setCanMakeBet(!user || localBalance.ref.current - bet.value >= 0);
    }, [user, localBalance, bet]);

    const isBetButtonActive = useMemo(() => {
      if (user) {
        return (
          (localBalance.value - bet.value >= 0 &&
            (!isBetButtonLocked || isAutobetActive)) ??
          false
        );
      } else return true;
    }, [localBalance, bet, user, isBetButtonLocked, isAutobetActive]);

    const playBetSound = useCallback(() => {
      if (isSoundEnabled && betAudio.current) {
        betAudio.current.currentTime = 0;
        betAudio.current.play?.().catch(() => {});
      }
    }, [betAudio, isSoundEnabled]);

    useEffect(() => {
      const stopAutobet = () => {
        setIsAutobetActive(false);
        autobetInterval.current && clearInterval(autobetInterval.current);
      };

      if (!isAutobetActive) return;
      let localAutobetCount = autobetCount;
      if (autobetCount === 0) {
        autobetInterval.current = setInterval(async () => {
          const plinkoResult = await dropBall(false);
          if (!plinkoResult) stopAutobet();
        }, rateLimit.autoMs);
      } else {
        autobetInterval.current = setInterval(async () => {
          localAutobetCount--;
          if (localAutobetCount <= 0) stopAutobet();
          const plinkoResult = await dropBall(false);
          if (plinkoResult) setAutobetsCount((prev) => prev - 1);
          else stopAutobet();
        }, rateLimit.autoMs);
      }

      return () => {
        autobetInterval.current && clearInterval(autobetInterval.current);
      };
    }, [isAutobetActive, autobetCount, dropBall, rateLimit]);

    const onStopAutobetClick = useCallback(() => {
      setIsAutobetActive(false);
      autobetInterval.current && clearInterval(autobetInterval.current);
    }, [autobetInterval]);

    const onStartAutobetClick = useCallback(() => {
      setIsAutobetActive(true);
    }, []);

    const getBetButtonLabel = useMemo(() => {
      return activePanel === 'Auto'
        ? isAutobetActive
          ? 'Stop Autobet'
          : 'Start Autobet'
        : activePanel === 'Manual'
          ? 'Place Bet'
          : activePanel === 'Admin'
            ? 'Start simulation'
            : null;
    }, [activePanel, isAutobetActive]);

    const onBtnClick = () => {
      if (!user) openModal({ name: 'user/auth' });
      else {
        if (isBetButtonActive) {
          if (activePanel === 'Auto') {
            isAutobetActive ? onStopAutobetClick() : onStartAutobetClick();
          } else dropBall(true).then((result) => result && playBetSound());
        }
      }
    };

    return (
      <>
        <div className={styles.plinkoActions}>
          <div className={styles.plinkoSwitchContainer}>
            <div className={styles.plinkoSwitchButtons}>
              <button
                className={
                  activePanel === 'Manual'
                    ? styles.plinkoSwitchButtonActive
                    : styles.plinkoSwitchButton
                }
                disabled={isAutobetActive}
                onClick={() => setActivePanel('Manual')}
              >
                Manual
              </button>
              <button
                className={
                  activePanel === 'Auto'
                    ? styles.plinkoSwitchButtonActive
                    : styles.plinkoSwitchButton
                }
                disabled={isAutobetActive}
                onClick={() => setActivePanel('Auto')}
              >
                Auto
              </button>
            </div>
          </div>

          {activePanel === 'Manual' && (
            <PlinkoManualTab isAutobetActive={isAutobetActive} />
          )}
          {activePanel === 'Auto' && (
            <PlinkoAutobetTab
              isAutobetActive={isAutobetActive}
              autobetState={[autobetCount, setAutobetsCount]}
            />
          )}

          <button
            disabled={
              !canMakeBet && (isBetButtonLocked === false || isAutobetActive)
            }
            className={styles.plinkoBetBtn}
            onClick={onBtnClick}
          >
            {getBetButtonLabel}
          </button>
        </div>
        <div className={styles.plinkoDices} />
      </>
    );
  }
);
export default PlinkoSideBar;
