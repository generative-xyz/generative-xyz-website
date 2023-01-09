import React from 'react';
import { CDN_URL } from '@constants/config';
import Button from '@components/ButtonIcon';
import s from './styles.module.scss';
import SvgInset from '@components/SvgInset';
import { toast } from 'react-hot-toast';

interface IProps {
  url: string;
}

const LinkShare: React.FC<IProps> = ({ url }: IProps): React.ReactElement => {
  const handleCopyLink = (): void => {
    navigator.clipboard.writeText(url);
    toast.remove();
    toast.success('Copied');
  };

  return (
    <Button className={s.shareBtn} variants="outline" onClick={handleCopyLink}>
      <SvgInset
        className={s.icon}
        svgUrl={`${CDN_URL}/icons/ic-link-angled-20x20.svg`}
      />
    </Button>
  );
};

export default LinkShare;
