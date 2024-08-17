import React, { memo, useState } from 'react';
import Image from 'next/image';
import { calculateProbability, calculateReward } from '../utils';
import { usePlinkoContext } from '../PlinkoProvider';
import { MULTIPLIERS_FREQUENCIES } from '../constants';
import styled from './styles.module.scss';
import { Flex, Input, Popover } from '@mantine/core';
import { PlinkoMultiplier } from './styled';
import percentage from '@/assets/games/plinko/percentage.svg';
import coinIco from '@/assets/tickets/coin-game.svg';
import styles from './styles.module.scss';
interface PlinkoMultiplierWithTooltipProps {
  multiplier: number;
  index: number;
}

const PlinkoMultiplierWithTooltip = memo(
  ({ multiplier, index }: PlinkoMultiplierWithTooltipProps) => {
    const [visible, setVisible] = useState(false);
    const { rowsCount, animationsQueue, bet } = usePlinkoContext();

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    return (
      <div className={styled.plinkoMultiplier}>
        <Popover
          width={350}
          position="top"
          withArrow
          shadow="md"
          opened={visible}
        >
          <Popover.Target>
            <PlinkoMultiplier
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              frequency={MULTIPLIERS_FREQUENCIES[rowsCount.value][index]}
              isAnimationActive={animationsQueue.value.includes(index)}
              withAdaptivness={true}
            >
              <span>{multiplier}</span>
              {Number.parseInt(multiplier.toString()).toString().length < 3 ? (
                <span>x</span>
              ) : null}
            </PlinkoMultiplier>
          </Popover.Target>
          <Popover.Dropdown className={styles.popoverContent}>
            <div className={styles.fieldWrapper}>
              <span>Profit</span>
              <div className={styles.inputWrapper}>
                <Image
                  className={styles.inputIcon}
                  src={coinIco}
                  alt="bet"
                  width={16}
                  height={16}
                />
                <input
                  value={calculateReward(bet.value, multiplier)}
                  readOnly={true}
                />
              </div>
            </div>
            <div className={styles.fieldWrapper}>
              <span>Chance</span>
              <div className={styles.inputWrapper}>
                <Image
                  className={styles.inputIcon}
                  src={percentage}
                  alt="bet"
                  width={16}
                  height={16}
                />
                <input
                  value={calculateProbability(rowsCount.value, index)}
                  readOnly={true}
                />
              </div>
            </div>
          </Popover.Dropdown>
        </Popover>
      </div>
    );
  }
);

export default PlinkoMultiplierWithTooltip;
