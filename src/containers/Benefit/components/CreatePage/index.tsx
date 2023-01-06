import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import s from './CreatePage.module.scss';
import { getRandomProject } from '@services/project';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { useEffect } from 'react';
import { Project } from '@interfaces/project';
import Text from '@components/Text';
import { Col, Container, Row } from 'react-bootstrap';
import { DATA_CREATE_PAGE_SECTIONS } from '@constants/landing';
import ButtonIcon from '@components/ButtonIcon';
import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';
import { ROUTE_PATH } from '@constants/route-path';
import { Anim } from '@animations/anim';
import { useRouter } from 'next/router';
import { AnimFade } from '@animations/fade';
import { PAGE_ENTER } from '@constants/common';
import { useSelector } from 'react-redux';
import { pageLoadStatus } from '@redux/general/selector';
import { BlockContent } from '@containers/Benefit/components/BlockContent';

export const CreatePageSection = (): JSX.Element => {
  const [_, setProject] = useState<Project | null>(null);
  const router = useRouter();
  const loadStatus = useSelector(pageLoadStatus);
  const refAnim = useRef<HTMLDivElement | null>(null);
  const refList = useRef<any>([]);

  const fetchRandomProject = async () => {
    try {
      const res = await getRandomProject();
      setProject(res);
    } catch (err: unknown) {
      log('failed to fetch random project', LogLevel.Error);
      throw Error();
    }
  };

  const onClick = () => {
    router.push(ROUTE_PATH.CREATE_PROJECT);
  };

  useEffect(() => {
    // unRegisterLoading();
    refAnim.current && gsap.set(refList.current, { opacity: 0, y: 100 });
    fetchRandomProject();
  }, []);

  useEffect(() => {
    let anim: Anim | undefined;
    if (refAnim.current && loadStatus === PAGE_ENTER) {
      gsap.set(refList.current, { opacity: 0, y: 50 });
      anim = new Anim(
        refAnim.current,
        () => {
          gsap.to(refList.current, {
            opacity: 1,
            y: 0,
            delay: 0.5,
            ease: 'power3.out',
            duration: 0.8,
            stagger: 0.1,
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
    <div className={s.createPage}>
      <Container>
        <Row>
          <Col xl={{ span: 5, order: 0 }} xs={{ span: 12, order: 1 }}>
            <div className={s.createPage_content}>
              <Text
                as={'h2'}
                color={'white'}
                fontWeight={'medium'}
                className={'spacing__small'}
                size={'d3'}
                animOption={{ screen: 0.2, offset: 0, type: 'heading' }}
              >
                The most comprehensive platform for generative artists to
                feature collections
              </Text>
              <Text
                size="24"
                color={'white-80'}
                className={'spacing__large'}
                fontWeight="regular"
                as="p"
                animOption={{ screen: 0.4, offset: 0, type: 'paragraph' }}
              >
                Below the fold: <br /> <br />
                Express your creativity to the world! Generative gives you the
                tools to transform your creative code into a variety of
                generative art that evolves with each minting of a collection.
              </Text>
              <AnimFade screen={0.6}>
                <BlockContent
                  heading={'Boost the worth of your work on Ethereum'}
                >
                  Generative is the first platform for Generative Art running on
                  Ethereum. The Ethereum community is a high-end market where
                  digital art is frequently valued higher. Artists will also
                  receive a loyalty incentive if their artwork is sold on the
                  secondary market.
                </BlockContent>
              </AnimFade>
              <AnimFade screen={0.7}>
                <BlockContent
                  heading={'Numerous resources for making art are supported'}
                >
                  Generative supports a wide range of library, making the
                  process of producing generative art simplified and more
                  enjoyable.
                </BlockContent>
              </AnimFade>
              <AnimFade screen={0.8}>
                <BlockContent
                  className={'spacing__medium'}
                  heading={'Decentralized from the start'}
                >
                  No IPFS and no centralized server—your artwork is stored fully
                  and securely on the blockchain.
                </BlockContent>
              </AnimFade>
              <AnimFade screen={0.9}>
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
                  Start upload
                </ButtonIcon>
              </AnimFade>
            </div>
          </Col>
          <Col
            xl={{ span: 6, offset: 1, order: 1 }}
            xs={{ span: 12, order: 0 }}
          >
            <div className={s.createPage_project} ref={refAnim}>
              {DATA_CREATE_PAGE_SECTIONS.map((token, key: number) => {
                return (
                  <div
                    ref={el => (refList.current[Number(key)] = el)}
                    key={`token_${key}`}
                    className={s.token}
                  >
                    <img src={token} alt="token-generative" />
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
