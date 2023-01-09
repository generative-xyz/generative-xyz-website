import React from 'react';
import { CDN_URL } from '@constants/config';
import Button from '@components/ButtonIcon';
import s from './styles.module.scss';
import SvgInset from '@components/SvgInset';
import { getScanUrl } from '@utils/chain';

interface IProps {
  transactionHash: string | null;
}

const EtherscanShare: React.FC<IProps> = ({
  transactionHash,
}: IProps): React.ReactElement => {
  const handleOpenLink = (): void => {
    if (!transactionHash) {
      return;
    }
    const scanBaseURL = getScanUrl();
    const exploreURL = `${scanBaseURL}/tx/${transactionHash}`;
    window.open(exploreURL);
  };

  return (
    <Button variants="outline" className={s.shareBtn} onClick={handleOpenLink}>
      <SvgInset svgUrl={`${CDN_URL}/icons/ic-etherscan-20x20.svg`} />
    </Button>
  );
};

export default EtherscanShare;
