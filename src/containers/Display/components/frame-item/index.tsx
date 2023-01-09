import s from './frame-item.module.scss';
import { AnimRanText } from '@animations/ranText';
import cn from 'classnames';
import React from 'react';
import Button from '@components/Button';
import classNames from 'classnames';

interface IProp {
  data: IFrame;
  openCheckoutPopup: () => void;
}

export const FrameItem = ({ data, openCheckoutPopup }: IProp): JSX.Element => {
  return (
    <div className={s.frameItem}>
      <div className={`${s.frameItem_inner}`}>
        <div className={`${s.frameItem_img} image__fit`}>
          <img src={data.image} alt="8-ethf4d1101ffd" />
        </div>
        <p className="desc__medium">{data.name}</p>
        <AnimRanText
          tag={'p'}
          className={cn(s.frameItem_item_price, 'desc__large text__black mb-0')}
          offset={0.2}
        >
          {data.eth_price || data.price} ETH
        </AnimRanText>

        <div className={classNames(s.frameItem_ctas)}>
          <ul className={s.frameItem_uls}>
            <li className={s.frameItem_uls_item}>
              <Button
                size="xl"
                variant="black"
                className={classNames(s.Home_video_content_ctas_orderBtn)}
                onClick={openCheckoutPopup}
              >
                <span className="text">Buy</span>
              </Button>
            </li>
            {/*<li className={s.frameItem_uls_item}>*/}
            {/*  <Button*/}
            {/*    size="xl"*/}
            {/*    variant="cta-border__black"*/}
            {/*    className={classNames(*/}
            {/*      s.Home_video_content_ctas_bookBtn,*/}
            {/*      'js-anim-fade'*/}
            {/*    )}*/}
            {/*    onClick={openCheckoutPopup}*/}
            {/*  >*/}
            {/*    <span className="text">buy as artist</span>*/}
            {/*  </Button>*/}
            {/*</li>*/}
          </ul>
        </div>
      </div>
    </div>
  );
};
