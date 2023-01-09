import React from 'react';
import { CDN_URL } from '@constants/config';
import Button from '@components/ButtonIcon';
import s from './styles.module.scss';
import SvgInset from '@components/SvgInset';
import { SOCIALS } from '@constants/common';

const DiscordShare: React.FC = (): React.ReactElement => {
  const handleOpenLink = (): void => {
    window.open(SOCIALS.discord);
  };

  return (
    <Button variants="outline" className={s.shareBtn} onClick={handleOpenLink}>
      <SvgInset svgUrl={`${CDN_URL}/icons/ic-discord-20x20.svg`} />
    </Button>
  );
};

export default DiscordShare;
