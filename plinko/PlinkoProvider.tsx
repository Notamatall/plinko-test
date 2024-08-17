import React, {
  Dispatch,
  MutableRefObject,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  PlinkoBetModification,
  PlinkoGenericState,
  PlinkoRiskType,
  PlinkoRows,
} from '@/types/games/plinko';
import {
  DEFAULT_ACTIVE_BALLS_COUNT,
  DEFAULT_BET_VALUE,
  DEFAULT_LOCAL_BALANCE,
  DEFAULT_MULTIPLIER_ANIMATIONS_QUEUE,
  DEFAULT_RISK,
  DEFAULT_ROWS_COUNT,
} from './types/config';
import PlinkoEngine from './types/plinko';
import { useGetPlinkoConfigQuery } from '@/queries';

interface IPlinkoContext {
  rowsCount: {
    value: PlinkoRows;
    setValue: (rowsCount: PlinkoRows) => void;
  };
  bet: {
    value: number;
    setValue: (bet: PlinkoBetModification) => void;
  };
  risk: PlinkoGenericState<PlinkoRiskType>;
  activeBallsCount: PlinkoGenericState<number>;
  animationsQueue: PlinkoGenericState<number[]>;
  localBalance: {
    ref: MutableRefObject<number>;
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
  };
  engine: PlinkoEngine;
}

const defaultValue: IPlinkoContext = {
  rowsCount: {
    value: DEFAULT_ROWS_COUNT,
    setValue: () => {},
  },
  bet: {
    value: DEFAULT_BET_VALUE,
    setValue: () => {},
  },
  risk: {
    value: DEFAULT_RISK,
    setValue: () => {},
  },
  activeBallsCount: {
    value: DEFAULT_ACTIVE_BALLS_COUNT,
    setValue: () => {},
  },
  animationsQueue: {
    value: DEFAULT_MULTIPLIER_ANIMATIONS_QUEUE,
    setValue: () => {},
  },
  localBalance: {
    ref: { current: DEFAULT_LOCAL_BALANCE },
    value: DEFAULT_LOCAL_BALANCE,
    setValue: () => {},
  },
  engine: {} as PlinkoEngine,
};

export const PlinkoContext = React.createContext<IPlinkoContext>(defaultValue);

const CrashProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: config } = useGetPlinkoConfigQuery();

  const [risk, setRisk] = useState<PlinkoRiskType>(DEFAULT_RISK);
  const [rowsCount, setRowsCount] = useState<PlinkoRows>(DEFAULT_ROWS_COUNT);
  const [activeBallsCount, setActiveBallsCount] = useState<number>(
    DEFAULT_ACTIVE_BALLS_COUNT
  );

  const [animationsQueue, setAnimationQueue] = useState<number[]>([]);
  const [plinkoEngine, _setPlinkoEngine] = useState<PlinkoEngine>(
    new PlinkoEngine(DEFAULT_ROWS_COUNT)
  );

  const [bet, setBet] = useState<number>(config.minBet ?? DEFAULT_BET_VALUE);
  const [localBalance, setLocalBalance] = useState<number>(
    DEFAULT_LOCAL_BALANCE
  );

  const localBalanceRef = useRef(DEFAULT_LOCAL_BALANCE);

  useEffect(() => {
    setBet(config.minBet);
  }, [config]);

  const onRowCountChange = useCallback((value: PlinkoRows) => {
    if (value) {
      plinkoEngine.clearBalls();
      plinkoEngine.setRowsCount(value);
      setRowsCount(value);
    }
  }, []);

  const getValueNormalized = useCallback(
    (value: number) => {
      const valueToNormalized =
        value < config.minBet
          ? 0
          : value > config.maxBet
            ? config.maxBet
            : value;
      return Math.floor(valueToNormalized);
    },
    [config]
  );

  const onBet = useCallback(
    (bet: '1/2' | 'x2' | 'max' | number) => {
      if (typeof bet === 'string') {
        switch (bet) {
          case '1/2':
            return setBet((prev) => getValueNormalized(prev / 2));
          case 'x2':
            return setBet((prev) => {
              const value =
                localBalanceRef.current && prev * 2 >= localBalanceRef.current
                  ? (localBalanceRef.current ?? 0)
                  : prev * 2;
              return getValueNormalized(value);
            });
          case 'max': {
            return setBet(getValueNormalized(localBalanceRef.current));
          }
          default:
            return;
        }
      } else {
        const betToSet =
          localBalanceRef.current && bet >= localBalanceRef.current
            ? localBalanceRef.current
            : bet;
        setBet(getValueNormalized(betToSet));
      }
    },
    [localBalanceRef]
  );

  const betInfo = useMemo(() => {
    return {
      bet: {
        value: bet,
        setValue: onBet,
      },
    };
  }, [bet]);

  const riskInfo = useMemo(() => {
    return {
      risk: {
        value: risk,
        setValue: setRisk,
      } as PlinkoGenericState<PlinkoRiskType>,
    };
  }, [risk]);

  const rowsCountInfo = useMemo(() => {
    return {
      rowsCount: {
        value: rowsCount,
        setValue: onRowCountChange,
      },
    };
  }, [rowsCount]);

  const activeBallsCountInfo = useMemo(() => {
    return {
      activeBallsCount: {
        value: activeBallsCount,
        setValue: setActiveBallsCount,
      } as PlinkoGenericState<number>,
    };
  }, [activeBallsCount]);

  const animationsQueueInfo = useMemo(() => {
    return {
      animationsQueue: {
        value: animationsQueue,
        setValue: setAnimationQueue,
      } as PlinkoGenericState<number[]>,
    };
  }, [animationsQueue]);

  const localBalanceInfo = useMemo(() => {
    return {
      localBalance: {
        ref: localBalanceRef,
        value: localBalance,
        setValue: setLocalBalance,
      },
    };
  }, [localBalanceRef, localBalance]);

  return (
    <PlinkoContext.Provider
      value={{
        engine: plinkoEngine,
        ...localBalanceInfo,
        ...animationsQueueInfo,
        ...activeBallsCountInfo,
        ...betInfo,
        ...riskInfo,
        ...rowsCountInfo,
      }}
    >
      <>{children}</>
    </PlinkoContext.Provider>
  );
};

export function usePlinkoContext() {
  const context = React.useContext(PlinkoContext);
  if (context === undefined) {
    throw new Error('usePlinkoContext must be used within a PlinkoContext');
  }
  return context;
}

export default CrashProvider;
