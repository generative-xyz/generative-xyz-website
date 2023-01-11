import s from './hero.module.scss';
import { gsap } from 'gsap';

import React, { useEffect } from 'react';
import Button from '@components/Button';
import { AnimParallax } from '@animations/parallax';
import { AnimFade } from '@animations/fade';
import classNames from 'classnames';
import { AnimHeading } from '@animations/heading';
import { useAppDispatch } from '@redux';
import { setIsScrolling } from '@redux/general/action';
import { CDN_URL } from '@constants/config';

export const SectionHero = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const scrollTo = () => {
    dispatch(setIsScrolling(true));
    gsap.to(window, {
      scrollTo: '#tech-spec',
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        setTimeout(() => {
          dispatch(setIsScrolling(false));
        }, 1500);
      },
    });
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ScrollToPlugin = require('gsap/ScrollToPlugin').default;
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  return (
    <div className={s.Home_video} id="frame-video">
      <AnimParallax className={s.Home_video_hero}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={`${CDN_URL}/pages/home/videos/video-hero-block-1-poster.jpeg`}
        >
          <source
            src={`${CDN_URL}/pages/home/videos/Video%20Top%20Banner%2016X9-compress.mp4`}
            type="video/mp4"
          />
        </video>
      </AnimParallax>

      <div className={`${s.Home_video_content} container`}>
        <AnimHeading
          tag={'h1'}
          className={`${s.Home_video_content_heading} heading heading__supper`}
        >
          Bring your Generative Art to life.
        </AnimHeading>

        <ul className={`${s.Home_video_content_ctas} ul_reset`}>
          <li>
            <AnimFade screen={0.2}>
              <Button
                size="xl"
                variant="cta-anim"
                className={classNames(s.Home_video_content_ctas_orderBtn)}
                onClick={scrollTo}
              >
                <span className="text">Order Now</span>
              </Button>
            </AnimFade>
          </li>
          {/*<li>*/}
          {/*  <AnimFade screen={0.4}>*/}
          {/*    <Button*/}
          {/*      size="xl"*/}
          {/*      variant="cta-border"*/}
          {/*      className={classNames(*/}
          {/*        s.Home_video_content_ctas_bookBtn,*/}
          {/*        'js-anim-fade'*/}
          {/*      )}*/}
          {/*      onClick={openCheckoutPopup}*/}
          {/*    >*/}
          {/*      <span className="text">Book a tour</span>*/}
          {/*    </Button>*/}
          {/*  </AnimFade>*/}
          {/*</li>*/}
        </ul>
        {/*<AnimFade className={s.Home_video_content_ctas_play} screen={0.6}>*/}
        {/*  <Button*/}
        {/*    size="xs"*/}
        {/*    variant="cta-none"*/}
        {/*    className={classNames(*/}
        {/*      s.Home_video_content_ctas_playBtn,*/}
        {/*      'js-anim-fade'*/}
        {/*    )}*/}
        {/*    onClick={openCheckoutPopup}*/}
        {/*  >*/}
        {/*    <span className="icon">*/}
        {/*      <svg*/}
        {/*        width="6"*/}
        {/*        height="7"*/}
        {/*        viewBox="0 0 6 7"*/}
        {/*        fill="none"*/}
        {/*        xmlns="http://www.w3.org/2000/svg"*/}
        {/*      >*/}
        {/*        <path*/}
        {/*          d="M5.2195 2.7045L1.86066 0.649117C1.19189 0.240601 0.333252 0.719591 0.333252 1.50142V5.49813C0.333252 6.27996 1.19296 6.76002 1.86066 6.35043L5.2195 4.29505C5.81574 3.93134 5.81574 3.06928 5.2195 2.7045Z"*/}
        {/*          fill="white"*/}
        {/*        />*/}
        {/*      </svg>*/}
        {/*    </span>*/}
        {/*    <span className="text">Play Video</span>*/}
        {/*  </Button>*/}
        {/*</AnimFade>*/}
      </div>
    </div>
  );
};
