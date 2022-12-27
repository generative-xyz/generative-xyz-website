import s from './frame-item.module.scss';
import { AnimRanText } from '@animations/ranText';
import cn from 'classnames';
import React from 'react';

interface IProp {
  data: IFrame;
  openCheckoutPopup: () => void;
}

export const FrameItem = ({ data, openCheckoutPopup }: IProp): JSX.Element => {
  return (
    <div className={s.frameItem} onClick={openCheckoutPopup}>
      <div className={`${s.frameItem_inner}`}>
        <div className={'image__fit'}>
          <img src={data.img} alt="8-ethf4d1101ffd" />
        </div>
        <p className="desc__medium">{data.name}</p>
        <AnimRanText
          tag={'p'}
          className={cn(s.frameItem_item_price, 'desc__large text__black mb-0')}
          offset={0.2}
        >
          {data.price} ETH
        </AnimRanText>
      </div>
    </div>
  );
};
