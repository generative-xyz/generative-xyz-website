import { Col, Container, Row } from 'react-bootstrap';
import s from './Marketplace.module.scss';
import Heading from '@components/Heading';
import Text from '@components/Text';
import ButtonIcon from '@components/ButtonIcon';
import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';
import Image from 'next/image';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { AnimFade } from '@animations/fade';
import { useSelector } from 'react-redux';
import { pageLoadStatus } from '@redux/general/selector';
import { ROUTE_PATH } from '@constants/route-path';
import { gsap } from 'gsap';
import { Anim } from '@animations/anim';
import { PAGE_ENTER } from '@constants/common';
import { useRouter } from 'next/router';

export const MarketplaceSection = (): JSX.Element => {
  const loadStatus = useSelector(pageLoadStatus);
  const refAnim = useRef<HTMLDivElement | null>(null);

  const refImg1 = useRef<HTMLDivElement | null>(null);
  const refImg2 = useRef<HTMLDivElement | null>(null);
  const refImg3 = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const onClick = () => {
    router.push(ROUTE_PATH.MARKETPLACE);
  };

  useEffect(() => {
    refImg1.current && gsap.set(refImg1.current, { opacity: 0 });
    refImg2.current && gsap.set(refImg2.current, { opacity: 0, y: 50, x: -50 });
    refImg3.current &&
      gsap.set(refImg3.current, { opacity: 0, y: 100, x: -100 });
  }, []);

  useEffect(() => {
    let anim: Anim | undefined;
    if (refAnim.current && loadStatus === PAGE_ENTER) {
      anim = new Anim(
        refAnim.current,
        () => {
          refImg1.current &&
            gsap.to(refImg1.current, {
              opacity: 1,
              ease: 'power3.out',
              duration: 0.8,
            });
          refImg3.current &&
            gsap.to(refImg3.current, {
              opacity: 1,
              y: 0,
              x: 0,
              ease: 'power3.out',
              duration: 0.8,
              delay: 0.2,
            });
          refImg2.current &&
            gsap.to(refImg2.current, {
              opacity: 1,
              y: 0,
              x: 0,
              ease: 'power3.out',
              duration: 0.8,
              delay: 0.4,
            });
        },
        20
      );
    }
    return () => {
      anim && anim.kill();
    };
  }, [loadStatus]);

  return (
    <div className={s.marketplace}>
      <Container>
        <Row className={'align-items-center'}>
          <Col xl={{ span: 5, order: 0 }} xs={{ span: 12, order: 1 }}>
            <div className={s.marketplace_content}>
              <Heading
                as={'h5'}
                color={'blue-c'}
                className={'spacing__small'}
                fontWeight={'semibold'}
                animOption={{ screen: 0, offset: 0, type: 'random' }}
              >
                Marketplace
              </Heading>
              <Text
                as={'h2'}
                color={'white'}
                className={'spacing__small'}
                fontWeight={'medium'}
                size={'d3'}
                animOption={{ screen: 0, offset: 0, type: 'heading' }}
              >
                Discover & buy Gen.art.
              </Text>
              <Text
                size="24"
                color={'white-80'}
                className={'spacing__large'}
                fontWeight="regular"
                as="p"
                animOption={{ screen: 0, offset: 0, type: 'paragraph' }}
              >
                World-renowned artists. A hand-crafted experience for
                discovering art you love. 100% verified collections. And
                industry-leading 1% fees when {`you're`} ready to buy.
              </Text>
              <AnimFade offset={0.25}>
                <ButtonIcon
                  onClick={onClick}
                  sizes={'medium'}
                  variants={'secondary'}
                  endIcon={
                    <SvgInset
                      svgUrl={`${CDN_URL}/icons/ic-arrow-right-18x18.svg`}
                    />
                  }
                >
                  Explore collections
                </ButtonIcon>
              </AnimFade>
            </div>
          </Col>
          <Col xl={{ span: 6, order: 1 }} xs={{ span: 12, order: 0 }}>
            <div ref={refAnim} className={s.marketplace_card}>
              <div ref={refImg1} className={classNames(s.layer, s.layer__1)}>
                <Image
                  width={780}
                  height={846}
                  src={`${CDN_URL}/pages/landingpage/thumb-layer-1.png`}
                  alt="fame-min"
                />
                <Image
                  className={s.isMobile}
                  width={390}
                  height={658}
                  src={`${CDN_URL}/pages/marketplace/card-thumb.png`}
                  alt="fame-min"
                />
              </div>
              <div ref={refImg2} className={classNames(s.layer, s.layer__2)}>
                <Image
                  width={570}
                  height={508}
                  src={`${CDN_URL}/pages/landingpage/thumb-layer-2.png`}
                  alt="fame-min"
                />
              </div>
              <div ref={refImg3} className={classNames(s.layer, s.layer__3)}>
                <Image
                  width={570}
                  height={508}
                  src={`${CDN_URL}/pages/landingpage/thumb-layer-3.png`}
                  alt="fame-min"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
