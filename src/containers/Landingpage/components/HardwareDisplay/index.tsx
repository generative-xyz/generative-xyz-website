import s from './HardwareDisplay.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Heading from '@components/Heading';
import Text from '@components/Text';
import ButtonIcon from '@components/ButtonIcon';
import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';
import Image from 'next/image';

export const HardwareDisplaySection = (): JSX.Element => {
  return (
    <div className={s.hardwareDisplay}>
      <Container>
        <Row>
          <Col xs={{ span: 5, order: 1 }}>
            <div className={s.hardwareDisplay_content}>
              <Heading
                as={'h5'}
                color={'blue-c'}
                className={'spacing__small'}
                fontWeight={'semibold'}
              >
                Display
              </Heading>
              <Text
                as={'h2'}
                color={'white'}
                className={'spacing__small'}
                fontWeight={'bold'}
                size={'d3'}
              >
                Bring your Generative Art to life.
              </Text>
              <Text
                size="24"
                color={'white'}
                className={'spacing__large'}
                fontWeight="semibold"
                as="p"
              >
                Generative Display is a groundbreaking new frame that renders
                generative artworks and allows collectors to interact with their
                art. It accomplishes this by using powerful internal components
                and code to develop unique artworks in real time.
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
                Buy display
              </ButtonIcon>
            </div>
          </Col>
          <Col xs={{ span: 6, order: 0 }}>
            <div className={s.hardwareDisplay_fame}>
              <Image
                width={706}
                height={706}
                src={`${CDN_URL}/pages/landingpage/fame-min.jpeg`}
                alt="fame-min"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
