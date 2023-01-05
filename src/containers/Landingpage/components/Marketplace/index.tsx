import { Col, Container, Row } from 'react-bootstrap';
import s from './Marketplace.module.scss';
import Heading from '@components/Heading';
import Text from '@components/Text';
import ButtonIcon from '@components/ButtonIcon';
import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';
import Image from 'next/image';
import classNames from 'classnames';

export const MarketplaceSection = (): JSX.Element => {
  return (
    <div className={s.marketplace}>
      <Container>
        <Row className={'align-items-center'}>
          <Col xs={{ span: 5 }}>
            <div className={s.marketplace_content}>
              <Heading
                as={'h5'}
                color={'blue-c'}
                className={'spacing__small'}
                fontWeight={'semibold'}
              >
                Marketplace
              </Heading>
              <Text
                as={'h2'}
                color={'white'}
                className={'spacing__small'}
                fontWeight={'bold'}
                size={'d3'}
              >
                Discover & buy Gen.art.
              </Text>
              <Text
                size="24"
                color={'white'}
                className={'spacing__large'}
                fontWeight="semibold"
                as="p"
              >
                World-renowned artists. A hand-crafted experience for
                discovering art you love. 100% verified collections. And
                industry-leading 1% fees when {`you're`} ready to buy.
              </Text>
              <ButtonIcon
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
            </div>
          </Col>
          <Col xs={{ span: 6 }}>
            <div className={s.marketplace_card}>
              <div className={classNames(s.layer, s.layer__1)}>
                <Image
                  width={1516 / 2}
                  height={1693 / 2}
                  src={`${CDN_URL}/pages/landingpage/thumb-layer-1.png`}
                  alt="fame-min"
                />
              </div>
              <div className={classNames(s.layer, s.layer__2)}>
                <Image
                  width={1140 / 2}
                  height={1017 / 2}
                  src={`${CDN_URL}/pages/landingpage/thumb-layer-2.png`}
                  alt="fame-min"
                />
              </div>
              <div className={classNames(s.layer, s.layer__3)}>
                <Image
                  width={1140 / 2}
                  height={1017 / 2}
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
