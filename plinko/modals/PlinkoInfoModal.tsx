import { PlinkoBetInfo } from '@/types/games/plinko';
import { DateTime } from 'luxon';
import { PlinkoMultiplier } from '../multiplier-tooltip/styled';
import styles from './styles.module.scss';
import cup from '@/assets/Cup.svg';
import coinIco from '@/assets/tickets/coin-game.svg';
import copyIcon from '@/assets/copy.svg';
import arrowDown from '@/assets/arrow-down.svg';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import { Accordion } from '@mantine/core';
import { memo, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  getProvablyFairDetailsForVerification,
  PROVABLY_FAIR_DETAILS_FOR_VERIFICATION_KEY,
} from '@/queries/provably-fair';
import { useQueryClient } from '@tanstack/react-query';
import { PlinkoData } from '@/types/games/provably-fair';

const PlinkoInfoModal: React.FC<{
  data: PlinkoBetInfo;
}> = ({ data }) => {
  const { closeModal } = useModal();
  const router = useRouter();
  const { openModal } = useModal();
  const isoDate = DateTime.fromISO(data.createdAt);
  const queryClient = useQueryClient();

  const { data: details } = getProvablyFairDetailsForVerification(data.seedId);

  const [copiedKey, setCopiedKey] = useState<number | null>(null);

  const onCopyToBufferClick = (key: number, value: string) => {
    setCopiedKey(key);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setCopiedKey(null);
    }, 500);
  };

  const onRotateOrVerifyClick = () => {
    openModal({
      name: 'games/provably-fair',
      props: {
        onRotateAction: () =>
          queryClient.invalidateQueries({
            queryKey: [PROVABLY_FAIR_DETAILS_FOR_VERIFICATION_KEY, data.seedId],
          }),
        ...(!!details?.serverSeed
          ? {
              data: {
                serverSeed: details.serverSeed,
                clientSeed: details.clientSeed,
                nonce: data.gameNonce,
                game: 'PLINKO',
                gameData: {
                  rowsCount: data.rowsCount.toString(),
                  risk: data.risk.toString(),
                } as PlinkoData,
              },
            }
          : {}),
      },
    });
  };
  const rotateBtnText = useMemo(() => {
    return details && !!details.serverSeed ? 'Verify' : 'Rotate';
  }, [details]);

  const serverSeedText = useMemo(() => {
    return details && !!details.serverSeed
      ? 'Server seed'
      : 'Server seed (hashed)';
  }, [details]);

  const serverSeedValue = useMemo(() => {
    return details && !!details.serverSeed
      ? details.serverSeed
      : details?.hashedServerSeed;
  }, [details]);

  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoGameTitle}>Plinko</div>
      <div className={styles.infoHeader}>
        Placed by:
        <div className={styles.infoHeaderLogin}>
          <span className={styles.infoHeaderLoginText}>{data.login}</span>
        </div>
        <span className={styles.infoHeaderDate}>
          {isoDate.toLocaleString({ dateStyle: 'long', timeStyle: 'short' })}
        </span>
      </div>
      <div className={styles.infoBody}>
        <div className={styles.infoBodyHeader}>
          <div className={styles.infoBodyHeaderCell}>
            <span>Bet</span>
            <div className={styles.centeredFlex}>
              <span>
                <Image alt="cup" src={coinIco} width={20} height={20} />
              </span>
              <span>{data.bet.toFixed(2)}</span>
            </div>
          </div>
          <div className={styles.infoBodyHeaderCell}>
            <span>Multiplier</span>
            <div className={styles.centeredFlex}>
              <span>
                <Image alt="cup" src={cup} width={20} height={20} />
              </span>
              <span>{data.multiplier}x</span>
            </div>
          </div>
          <div className={styles.infoBodyHeaderCell}>
            <span>Payout</span>

            <div className={styles.centeredFlex}>
              <span>
                <Image alt="cup" src={coinIco} width={20} height={20} />
              </span>
              <span>{data.payout.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className={styles.infoBodyMultiplier}>
          <PlinkoMultiplier
            style={{ maxWidth: '55px' }}
            frequency={data.frequency}
            isAnimationActive={false}
            withAdaptivness={false}
          >
            <span>{data.multiplier}</span>
            {Number.parseInt(data.multiplier.toString()).toString().length <
            3 ? (
              <span>x</span>
            ) : null}
          </PlinkoMultiplier>
        </div>
      </div>
      <div className={styles.infoFooter}>
        <div className={styles.infoModalFlex}>
          <div>Risk</div>
          <input value={data.risk} readOnly={true} />
        </div>
        <div className={styles.infoModalFlex}>
          <div>Rows count</div>
          <input value={data.rowsCount} readOnly={true} />
        </div>
      </div>
      <button onClick={closeModal} className={styles.playPlinkoBtn}>
        Play Plinko
      </button>
      <Accordion
        classNames={styles}
        chevron={
          <div className={styles.arrowContainer}>
            <Image src={arrowDown} alt="arrow-down" width={20} height={20} />
          </div>
        }
      >
        <Accordion.Item className={styles.provablyFairItem} value="first">
          <Accordion.Control className={styles.provablyFairHeader}>
            <span className={styles.provablyFairHeaderText}>Provably Fair</span>
          </Accordion.Control>
          <Accordion.Panel className={styles.provablyFairContent}>
            <div className={styles.infoFooter}>
              <div className={styles.infoModalFlex}>
                <div className={styles.provablyFairContentText}>
                  Client Seed
                </div>
                <input value={details?.clientSeed} readOnly={true} />
                {copiedKey === 1 ? (
                  <span className={styles.copyIcon}>Copied</span>
                ) : (
                  <Image
                    onClick={() => {
                      if (details?.clientSeed)
                        onCopyToBufferClick(1, details?.clientSeed.toString());
                    }}
                    src={copyIcon}
                    className={styles.copyIcon}
                    alt="copy"
                    width={20}
                    height={20}
                  />
                )}
              </div>
              <div className={styles.infoModalFlex}>
                <div className={styles.provablyFairContentText}>Nonce</div>
                <input value={data.gameNonce} readOnly={true} />
                {copiedKey === 2 ? (
                  <span className={styles.copyIcon}>Copied</span>
                ) : (
                  <Image
                    onClick={() => {
                      onCopyToBufferClick(2, data.gameNonce.toString());
                    }}
                    src={copyIcon}
                    className={styles.copyIcon}
                    alt="copy"
                    width={20}
                    height={20}
                  />
                )}
              </div>
            </div>
            <div className={styles.infoFooter}>
              <div className={styles.infoModalFlex} style={{ width: '100%' }}>
                <div className={styles.provablyFairContentText}>
                  {serverSeedText}
                </div>
                <input value={serverSeedValue} readOnly={true} />
                {copiedKey === 3 ? (
                  <span className={styles.copyIcon}>Copied</span>
                ) : (
                  <Image
                    onClick={() => {
                      if (details?.hashedServerSeed)
                        onCopyToBufferClick(3, details?.hashedServerSeed);
                    }}
                    src={copyIcon}
                    className={styles.copyIcon}
                    alt="copy"
                    width={20}
                    height={20}
                  />
                )}
              </div>
            </div>
            {!!details?.serverSeed ? null : (
              <div className={styles.centeredFlex}>
                <span className={styles.verifyText}>
                  To verify this bet, you need to rotate your seed pair
                </span>
              </div>
            )}
            <div className={styles.centeredFlex}>
              <button
                className={styles.rotateBtn}
                onClick={onRotateOrVerifyClick}
              >
                <span className={styles.verifyText}>{rotateBtnText}</span>
              </button>
            </div>
            <div className={styles.centeredFlex}>
              <span
                className={styles.moreInfo}
                onClick={() => {
                  router.push('/provably-fair');
                  closeModal();
                }}
              >
                More information about provable fairness
              </span>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

const PlinkoInfoModalMemo = memo(PlinkoInfoModal);
export default PlinkoInfoModalMemo;
