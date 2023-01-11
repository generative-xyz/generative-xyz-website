import { useEffect } from 'react';
import s from './Benefit.module.scss';
import { CreatePageSection } from '@containers/Benefit/components/CreatePage';
import { SimpleLoading } from '@components/SimpleLoading';
import { ImageContent } from '@containers/Benefit/components/ImageContent';
import { CDN_URL } from '@constants/config';
import { Container } from 'react-bootstrap';

export const BenefitPage = (): JSX.Element => {
  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      html.classList.add('is-landing');
    }

    return () => {
      if (html) {
        html.classList.remove('is-landing');
      }
    };
  }, []);

  return (
    <div className={s.benefit}>
      <SimpleLoading theme={'dark'} />
      <CreatePageSection />
      <Container>
        <div className={s.benefit_rows}>
          <div className={s.benefit_rows_inner}>
            <ImageContent
              heading={`Boost the worth of your work on Ethereum.`}
              imageUrl={`${CDN_URL}/pages/landingpage/image-row-content.jpeg`}
            >
              Generative is the first platform for Generative Art running on
              Ethereum. The Ethereum community is a high-end market where
              digital art is frequently valued higher. Artists will also receive
              a loyalty incentive if their artwork is sold on the secondary
              market.
            </ImageContent>
            <ImageContent
              right={true}
              heading={`Numerous resources for making art are supported.`}
              imageUrl={`${CDN_URL}/pages/landingpage/image-row-content.jpeg`}
            >
              Generative supports a wide range of library, making the process of
              producing generative art simplified and more enjoyable.
            </ImageContent>
            <ImageContent
              heading={`Decentralized from the start.`}
              imageUrl={`${CDN_URL}/pages/landingpage/image-row-content.jpeg`}
            >
              No IPFS and no centralized server—your artwork is stored fully and
              securely on the blockchain.
            </ImageContent>
          </div>
        </div>
      </Container>
    </div>
  );
};
