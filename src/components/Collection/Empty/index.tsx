import { CDN_URL, NETWORK_CHAIN_ID } from '@constants/config';
import SvgInset from '@components/SvgInset';
import ButtonIcon from '@components/ButtonIcon';
import s from './styles.module.scss';
import { Project } from '@interfaces/project';
import useContractOperation from '@hooks/useContractOperation';
import { IMintGenerativeNFTParams } from '@interfaces/contract-operations/mint-generative-nft';
import { TransactionReceipt } from 'web3-eth';
import MintGenerativeNFTOperation from '@services/contract-operations/generative-nft/mint-generative-nft';
import { useContext, useEffect, useState } from 'react';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import _get from 'lodash/get';
import { isTestnet } from '@utils/chain';
import { ErrorMessage } from '@enums/error-message';
import { WalletContext } from '@contexts/wallet-context';

const LOG_PREFIX = 'Empty';

export const Empty = ({
  projectInfo,
}: {
  projectInfo?: Project;
}): JSX.Element => {
  const { walletBalance } = useContext(WalletContext);
  const router = useRouter();
  const {
    call: mintToken,
    reset: resetMintToken,
    errorMessage,
  } = useContractOperation<IMintGenerativeNFTParams, TransactionReceipt>(
    MintGenerativeNFTOperation,
    true
  );
  const [isMinting, setIsMinting] = useState(false);

  const handleMintToken = async () => {
    try {
      setIsMinting(true);

      if (!projectInfo) {
        return;
      }

      if (walletBalance < parseFloat(projectInfo.mintPrice.toString())) {
        if (isTestnet()) {
          toast.error(
            'Insufficient funds testnet. Go to profile and get testnet faucet'
          );
        } else {
          toast.error('Insufficient funds.');
        }
        return;
      }

      const mintTx = await mintToken({
        projectAddress: projectInfo.genNFTAddr,
        mintFee: projectInfo.mintPrice.toString(),
        chainID: NETWORK_CHAIN_ID,
      });

      if (!mintTx) {
        toast.error(ErrorMessage.DEFAULT);
        return;
      }

      const tokenID: string | null = _get(
        mintTx,
        'events.Transfer.returnValues.tokenId',
        null
      );

      router.push(`/generative/${projectInfo.tokenID}/${tokenID}`);
    } catch (err: unknown) {
      log(err as Error, LogLevel.Error, LOG_PREFIX);
    } finally {
      setIsMinting(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.remove();
      toast.error(ErrorMessage.DEFAULT);
      resetMintToken();
    }
  }, [errorMessage]);

  return (
    <div className={`${s.empty} empty`}>
      <div className={s.empty_inner}>
        <div className={s.empty_thumb}>
          <img src={`${CDN_URL}/pages/marketplace/empty.svg`} alt="empty.svg" />
        </div>
        <div className={s.empty_desc}>
          Bring your unique vision to life. Mint your first NFT now
        </div>
        {projectInfo && (
          <ButtonIcon
            onClick={handleMintToken}
            sizes="large"
            disabled={isMinting}
            endIcon={
              <SvgInset svgUrl={`${CDN_URL}/icons/ic-arrow-right-18x18.svg`} />
            }
          >
            {isMinting ? 'Minting...' : 'Mint now'}
          </ButtonIcon>
        )}
      </div>
    </div>
  );
};
