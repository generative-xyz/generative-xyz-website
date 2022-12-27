import React from 'react';
import { gsap } from 'gsap';
import { LOGO_URL } from '@constants/common';
import Button from '@components/Button';

import { setIsOpenCheckoutPopup } from '@redux/general/action';

import s from './Header.module.scss';
import { useAppDispatch } from '@redux/index';
import SvgInset from '@components/SvgInset';
import { useRef } from 'react';
import { useEffect } from 'react';
import { getScrollTop } from '@helpers/common';
import { useSelector } from 'react-redux';
import { disabledMenuSelector } from '@redux/general/selector';
import Link from 'next/link';

const HeaderFixed: React.FC = () => {
  const dispatch = useAppDispatch();
  const openCheckoutPopup = () => dispatch(setIsOpenCheckoutPopup(true));
  const refHeader = useRef<HTMLDivElement>(null);
  const refData = useRef({
    scrollCurrent: 0,
    isHide: false,
    disabled: false,
    lock: false,
  });
  const disabledMenu = useSelector(disabledMenuSelector);

  const hideMenu = () => {
    refData.current.isHide = true;
    gsap.killTweensOf(refHeader.current);
    gsap.to(refHeader.current, {
      y: '-100%',
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  const showMenu = () => {
    refData.current.isHide = false;
    gsap.killTweensOf(refHeader.current);
    gsap.to(refHeader.current, { y: '0%', duration: 0.6, ease: 'power3.out' });
  };

  const onWinScrolling = () => {
    if (refData.current.lock) return;
    const scrollTop = getScrollTop();
    if (scrollTop - refData.current.scrollCurrent > 0) {
      if (!refData.current.isHide) {
        hideMenu();
      }
    } else {
      if (refData.current.isHide) {
        showMenu();
      }
    }

    if (refHeader.current) {
      if (scrollTop > 100) {
        refHeader.current.classList.add(s['is-scrolling']);
      } else {
        refHeader.current.classList.remove(s['is-scrolling']);
      }
    }
    refData.current.scrollCurrent = scrollTop;
  };

  useEffect(() => {
    window.addEventListener('scroll', onWinScrolling);
    return () => {
      if (refHeader.current)
        refHeader.current.classList.remove(s['is-scrolling']);
      window.removeEventListener('scroll', onWinScrolling);
    };
  }, []);

  useEffect(() => {
    refData.current.lock = disabledMenu;
    if (disabledMenu) {
      hideMenu();
    }
    return () => {
      refData.current.lock = false;
      showMenu();
    };
  }, [disabledMenu]);

  return (
    <div ref={refHeader} className={s.Header}>
      <div className={`${s.Header_container} container`}>
        <Link href="/" className={s.Header_logo}>
          <SvgInset svgUrl={LOGO_URL} className={s.Header_logo} />
        </Link>
        <nav className={s.Header_menuContainer}>
          <a href="#frame-video" className={s.Header_menuItem}>
            Hardware
          </a>
          <a href="#tech-spec" className={s.Header_menuItem}>
            Marketplace
          </a>
          <a
            href="testnet.generative.xyz/mint-generative/upload-project"
            className={s.Header_menuItem}
          >
            + Create generative art
          </a>
          <Button
            size="lg"
            variant="cta-anim"
            className={s.Header_connectBtn}
            onClick={openCheckoutPopup}
          >
            <span className="text">Order Now</span>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default HeaderFixed;
