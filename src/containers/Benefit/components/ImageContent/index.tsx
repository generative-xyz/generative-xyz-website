import s from './ImageContent.module.scss';
import Heading from '@components/Heading';
import { Row, Col } from 'react-bootstrap';
import Text from '@components/Text';
import { ReactNode } from 'react';
import Image from 'next/image';
import { AnimFade } from '@animations/fade';

interface IProp {
  heading: string;
  children: ReactNode;
  imageUrl: string;
  right?: boolean;
}

export const ImageContent = ({
  heading,
  children,
  imageUrl,
  right = false,
}: IProp): JSX.Element => {
  return (
    <Row className={`${s.imageContent} ${right ? s.imageContent__right : ''}`}>
      <Col md={{ order: right ? 1 : 0, span: 6 }} xs={12}>
        <AnimFade screen={1.2}>
          <Image
            src={imageUrl}
            width={432}
            height={576}
            alt={'row-image-content'}
          />
        </AnimFade>
      </Col>
      <Col md={{ order: right ? 0 : 1, span: 6 }} xs={12}>
        <Heading
          className={s.imageContent_heading}
          color={'white'}
          as={'h3'}
          fontWeight={'semibold'}
          animOption={{ screen: 1.4, offset: 0, type: 'heading' }}
        >
          {heading}
        </Heading>
        <Text
          size="20"
          color={'white-80'}
          className={`${s.imageContent_desc} spacing__large`}
          fontWeight="regular"
          as="p"
          animOption={{ screen: 0, offset: 0, type: 'paragraph' }}
        >
          {children}
        </Text>
      </Col>
    </Row>
  );
};
