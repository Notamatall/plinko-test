import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CANVAS_SIZES,
  DEFAULT_MULTIPLIER_WIDTH_PX,
  DEFAULT_PEG_GAP_PX,
  getSizes,
  MIN_PINS_ON_ROW,
} from './types/config';
import {
  PlinkoBetInfo,
  PlinkoDropBallResponse,
  Position,
} from '@/types/games/plinko';
import PlinkoProvider, { usePlinkoContext } from './PlinkoProvider';
import Peg from './types/peg';
import Ball from './types/ball';
import { MULTIPLIERS, MULTIPLIERS_FREQUENCIES } from './constants';
import {
  GET_CURRENT_USER_PROFILE_QUERY_KEY,
  useGetCurrentUserProfileQuery,
  useGetPlinkoConfigQuery,
  usePlinkoDropBall,
} from '@/queries';
import { ANIMATIONS } from './animations';
import { randomInteger } from './utils';
import styles from './styles.module.scss';
import PlinkoMultiplierWithTooltip from './multiplier-tooltip';
import { Loader } from '@mantine/core';
import { useLocalStorage } from 'usehooks-ts';
import { LS_SOUND_KEY } from '@/types/LocalStorageKeys';
import PlinkoSideBar from './sidebar';
import auraEffectStatic from '@/assets/games/plinko/auraEffect-red.svg';
import ballImageStatic from '@/assets/games/plinko/ball-red.svg';
import { PlinkoResultMultiplier } from './styled';
import { LiveBetsTable } from '../LiveBetsTable';
import { useModal } from '@/context/ModalContext';
import SoundController from '@/components/SoundController';
import ExchangeCoinsBtn from '@/components/ExchangeCoinsBtn';
import notify from '@/utils/showNotification/showNotification';
import { genericOnErrorHandler } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';

const PlinkoGame = () => {
  const {
    rowsCount,
    localBalance,
    risk,
    animationsQueue,
    activeBallsCount,
    bet,
    engine,
  } = usePlinkoContext();
  const { data: config, isLoading: isRateLimitLoading } =
    useGetPlinkoConfigQuery();
  const { mutateAsync: dropBall } = usePlinkoDropBall();
  const {
    data: user,
    isLoading: isUserLoading,
    isFetching,
  } = useGetCurrentUserProfileQuery();
  const queryClient = useQueryClient();

  const [isSoundEnabled] = useLocalStorage(LS_SOUND_KEY, true, {
    initializeWithValue: true,
  });

  const { openModal } = useModal();

  const [multipliersWidth, setMultipliersWidth] = useState<number>(
    DEFAULT_MULTIPLIER_WIDTH_PX
  );

  const renderFrameId = useRef<number | null>(null);
  const [isBetBtnLocked, setIsBetBtnLocked] = useState<boolean>(false);
  const isBetBtnLockedRef = useRef<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [resultsQueue, setResultsQueue] = useState<PlinkoBetInfo[]>([]);

  const auraEffect = useRef<HTMLImageElement | null>(null);
  const ballImage = useRef<HTMLImageElement | null>(null);
  const endAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    auraEffect.current = new Image();
    auraEffect.current.src = auraEffectStatic.src;
    ballImage.current = new Image();
    ballImage.current.src = ballImageStatic.src;
    endAudio.current = new Audio('/audio/plinko/result.mp3');
  }, []);

  const onOpenBetInfo = useCallback((multiplierInfo: PlinkoBetInfo) => {
    openModal({
      name: 'games/plinko/info',
      props: {
        data: multiplierInfo,
      },
    });
  }, []);

  const playEndSound = useCallback(() => {
    if (isSoundEnabled && endAudio.current) {
      endAudio.current.currentTime = 0;
      endAudio.current.play?.().catch(() => {});
    }
  }, [isSoundEnabled, endAudio]);

  useEffect(() => {
    if (activeBallsCount.value === 0 && user?.gamecoinBalance != undefined) {
      localBalance.setValue(user.gamecoinBalance);
      localBalance.ref.current = user.gamecoinBalance;
    }
  }, [user, isFetching]);

  useEffect(() => {
    if (endAudio.current) {
      endAudio.current.muted = !isSoundEnabled;
    }
  }, [isSoundEnabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (ctx && canvas) {
      canvas.height = CANVAS_SIZES.height;
      canvas.width = CANVAS_SIZES.width;
      engine.launchEngine(canvas, ctx, renderFrameId);
    }
    return () => {
      renderFrameId.current && cancelAnimationFrame(renderFrameId.current);
    };
  }, [renderFrameId, engine]);

  useEffect(() => {
    const p = engine;
    p.clearPegs();
    const { spacing, pegRadius } = getSizes(p.rowsCount);
    for (let row = 0; row < engine.rowsCount; row++) {
      let start =
        CANVAS_SIZES.width / 2 - ((row + MIN_PINS_ON_ROW - 1) / 2) * spacing;
      for (let column = 0; column < row + MIN_PINS_ON_ROW; column++) {
        const x = start + spacing * column;
        const y = DEFAULT_PEG_GAP_PX + pegRadius + row * spacing;
        p.addPeg(new Peg(x, y, pegRadius, auraEffect.current!));
      }
    }

    const multiplierWidth =
      (spacing * (rowsCount.value + 1) * canvasRef.current?.offsetWidth!) /
      CANVAS_SIZES.width;
    setMultipliersWidth(multiplierWidth);
  }, [rowsCount]);

  useEffect(() => {
    const onResizeAction = (e: UIEvent) => {
      const { spacing } = getSizes(engine.rowsCount);
      const multiplierWidth =
        (spacing * (rowsCount.value + 1) * canvasRef.current?.offsetWidth!) /
        CANVAS_SIZES.width;
      setMultipliersWidth(multiplierWidth);
    };

    window.addEventListener('resize', onResizeAction);
    return () => {
      window.removeEventListener('resize', onResizeAction);
    };
  }, [rowsCount]);

  const addToBalance = (value: number) => {
    localBalance.ref.current = localBalance.ref.current + value;
    localBalance.setValue((prev) => prev + value);
  };

  const createBall = useCallback(
    (
      index: number,
      animation: Position[],
      bet: number,
      model: PlinkoDropBallResponse
    ) => {
      const { ballRadius } = getSizes(rowsCount.value);
      const y = 0;
      const x = animation[0].x;
      const ball = new Ball(
        x,
        y,
        ballRadius,
        () => {
          const result: PlinkoBetInfo = {
            ...model,
            login: user?.displayName ?? '',
            rowsCount: rowsCount.value,
            risk: risk.value,
            frequency: MULTIPLIERS_FREQUENCIES[rowsCount.value][index],
            bet,
          };

          addToBalance(model.payout);
          activeBallsCount.setValue((prev) => prev - 1);
          setResultsQueue((prev) => [result, ...prev.slice(0, 5)]);
          animationsQueue.setValue((prev) => [...prev, index]);

          setTimeout(() => {
            animationsQueue.setValue((prev) => prev.filter((v) => v !== index));
          }, 200);
          playEndSound();
        },
        index,
        ballImage.current!,
        animation
      );
      return ball;
    },
    [rowsCount, risk, playEndSound, user]
  );

  const validateBetSize = (bet: number) => {
    if (bet < config.minBet) {
      notify({
        type: 'error',
        message: `Bet cannot be less than ${config.minBet}`,
      });
      return false;
    }
    if (bet > config.maxBet) {
      notify({
        type: 'error',
        message: `Bet cannot be greater than ${config.maxBet}`,
      });
      return false;
    }
    return true;
  };

  const handleDropBall = useCallback(
    async (withLock: boolean = true) => {
      if (isBetBtnLockedRef.current || !validateBetSize(bet.value))
        return false;

      const prevBalance = localBalance.ref.current;
      const balanceAfterBet = localBalance.ref.current - bet.value;
      if (balanceAfterBet >= 0) {
        localBalance.ref.current = localBalance.ref.current - bet.value;

        if (withLock) {
          isBetBtnLockedRef.current = true;
          setIsBetBtnLocked(true);
          setTimeout(() => {
            isBetBtnLockedRef.current = false;
            setIsBetBtnLocked((prev) => !prev);
          }, config.manualMs);
        }

        try {
          activeBallsCount.setValue((prev) => prev + 1);

          const response = await dropBall({
            bet: bet.value,
            rowsCount: rowsCount.value,
            risk: risk.value,
          });

          if (response && response.results && response.payout) {
            const multiplierIndex = response.results.reduce(
              (res, curr) => (res += curr),
              0
            );
            const multiplierAnimations =
              ANIMATIONS[rowsCount.value][multiplierIndex];
            const randomAnimationIndex = randomInteger(
              0,
              multiplierAnimations.length
            );
            const animation = multiplierAnimations[randomAnimationIndex];
            const newBall = createBall(
              multiplierIndex,
              animation,
              bet.value,
              response
            );
            localBalance.setValue((prev) => prev - bet.value);
            engine.addBall(newBall);
            return true;
          } else activeBallsCount.setValue((prev) => prev - 1);
        } catch (error: any) {
          genericOnErrorHandler(error);
          localBalance.ref.current = prevBalance;
          activeBallsCount.setValue((prev) => prev - 1);
          queryClient.invalidateQueries({
            queryKey: [GET_CURRENT_USER_PROFILE_QUERY_KEY],
          });
          return false;
        }
      }
      return false;
    },
    [createBall, bet, rowsCount, risk, config]
  );
  return (
    <div className={styles.plinkoContainer}>
      {<ExchangeCoinsBtn balance={localBalance.value} />}

      <div className={styles.plinkoGameContainer}>
        <div className={styles.plinkoSidebar}>
          <PlinkoSideBar
            dropBall={handleDropBall}
            isBetButtonLocked={isBetBtnLocked}
          />
        </div>
        {user || (!user && !isUserLoading && !isRateLimitLoading) ? null : (
          <div className={styles.gameOverlay}>
            <Loader color="pink" />
          </div>
        )}

        <div className={styles.plinkoBoard}>
          <div className={styles.plinkoAbsoluteWrapper}>
            <SoundController />
          </div>
          <div className={styles.plinkoBoardGradient} />
          <div className={styles.plinkoCanvasContainer}>
            <canvas ref={canvasRef}></canvas>
          </div>
          <div
            className={styles.plinkoMultipliers}
            style={{ width: multipliersWidth + 'px' }}
          >
            {MULTIPLIERS[rowsCount.value] &&
              MULTIPLIERS[rowsCount.value][risk.value].map(
                (multiplier, index) => (
                  <PlinkoMultiplierWithTooltip
                    key={`multiplier-${index}`}
                    multiplier={multiplier}
                    index={index}
                  />
                )
              )}
          </div>

          <div className={styles.plinkoGameResults}>
            {resultsQueue
              .slice(
                resultsQueue.length >= 6 ? resultsQueue.length - 6 : 0,
                resultsQueue.length
              )
              .map((result, index) => (
                <PlinkoResultMultiplier
                  onClick={() => onOpenBetInfo(result)}
                  frequency={result.frequency}
                  key={`multiplier_result-${index}-${result.gameId}`}
                >
                  <span>{result.multiplier}</span>
                  <span>x</span>
                </PlinkoResultMultiplier>
              ))}
          </div>
        </div>
      </div>
      <LiveBetsTable />
    </div>
  );
};

const PlinkoMain = () => {
  return (
    <PlinkoProvider>
      <PlinkoGame />
    </PlinkoProvider>
  );
};
export default PlinkoMain;
