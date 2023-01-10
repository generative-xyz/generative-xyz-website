import s from './HardwareDisplay.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Heading from '@components/Heading';
import Text from '@components/Text';
import ButtonIcon from '@components/ButtonIcon';
import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';
import Image from 'next/image';
import { AnimFade } from '@animations/fade';
import { ROUTE_PATH } from '@constants/route-path';
import { useRouter } from 'next/router';

export const HardwareDisplaySection = (): JSX.Element => {
  const router = useRouter();
  const onClick = () => {
    router.push(ROUTE_PATH.DISPLAY);
  };

  return (
    <div className={s.hardwareDisplay}>
      <Container>
        <Row>
          <Col xl={{ span: 5, order: 1 }} xs={{ span: 12, order: 1 }}>
            <div className={s.hardwareDisplay_content}>
              <Heading
                as={'h5'}
                color={'purple-a'}
                className={'spacing__small'}
                fontWeight={'semibold'}
                animOption={{ screen: 0, offset: 0, type: 'random' }}
              >
                Display
              </Heading>
              <Text
                as={'h2'}
                color={'white'}
                className={'spacing__small'}
                fontWeight={'semibold'}
                size={'d3'}
                animOption={{ screen: 0, offset: 0, type: 'heading' }}
              >
                Bring your Generative Art to life.
              </Text>
              <Text
                size="20"
                color={'white-80'}
                className={'spacing__large'}
                fontWeight="regular"
                as="p"
                animOption={{ screen: 0, offset: 0, type: 'paragraph' }}
              >
                Generative Display is a groundbreaking new frame that renders
                generative artworks and allows collectors to interact with their
                art. It accomplishes this by using powerful internal components
                and code to develop unique artworks in real time.
              </Text>
              <AnimFade offset={0.25}>
                <ButtonIcon
                  sizes={'large'}
                  variants={'secondary'}
                  onClick={onClick}
                  endIcon={
                    <SvgInset
                      svgUrl={`${CDN_URL}/icons/ic-arrow-right-18x18.svg`}
                    />
                  }
                >
                  Buy display
                </ButtonIcon>
              </AnimFade>
            </div>
          </Col>
          <Col xl={{ span: 6, order: 0 }} xs={12}>
            <div className={s.hardwareDisplay_fame}>
              <AnimFade threshold={30}>
                <Image
                  width={706}
                  height={706}
                  src={`${CDN_URL}/pages/landingpage/fame-min.jpeg`}
                  alt="fame-min"
                />
              </AnimFade>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
