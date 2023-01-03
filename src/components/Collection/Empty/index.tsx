import { CDN_URL } from '@constants/config';
import SvgInset from '@components/SvgInset';
import ButtonIcon from '@components/ButtonIcon';
import s from './Empty.module.scss';

export const Empty = (): JSX.Element => {
  return (
    <div className={s.empty}>
      <div className={s.empty_inner}>
        <div className={s.empty_thumb}>
          <img src={`${CDN_URL}/pages/marketplace/empty.svg`} alt="empty.svg" />
        </div>
        <div className={s.empty_desc}>
          Bring your unique vision to life. Mint your first NFT now
        </div>
        <ButtonIcon
          sizes="large"
          endIcon={
            <SvgInset svgUrl={`${CDN_URL}/icons/ic-arrow-right-18x18.svg`} />
          }
        >
          Mint now
        </ButtonIcon>
      </div>
    </div>
  );
};
