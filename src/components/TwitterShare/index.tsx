import React from 'react';
import { CDN_URL } from '@constants/config';
import { TwitterShareButton } from 'react-share';
import cs from 'classnames';
import s from './styles.module.scss';
import SvgInset from '@components/SvgInset';

interface IProps {
  url: string;
  title: string;
  hashtags: Array<string>;
  className?: string;
}

const TwitterShare: React.FC<IProps> = ({
  url,
  title,
  hashtags,
  className,
}: IProps): React.ReactElement => {
  return (
    <TwitterShareButton
      url={url}
      title={title}
      hashtags={hashtags}
      className={cs(s.shareBtn, className)}
    >
      <SvgInset svgUrl={`${CDN_URL}/icons/ic-twitter-20x20.svg`} />
    </TwitterShareButton>
  );
};

export default TwitterShare;
