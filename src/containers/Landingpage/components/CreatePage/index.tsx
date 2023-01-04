import { useState } from 'react';

import s from './CreatePage.module.scss';
import { getRandomProject } from '@services/project';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { useEffect } from 'react';
import { Project } from '@interfaces/project';
import Heading from '@components/Heading';
import Text from '@components/Text';
import { Col, Container, Row } from 'react-bootstrap';
import { DATA_CREATE_PAGE_SECTIONS } from '@constants/landing';
import ButtonIcon from '@components/ButtonIcon';
import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';

export const CreatePageSection = (): JSX.Element => {
  const [_, setProject] = useState<Project | null>(null);
  const fetchRandomProject = async () => {
    try {
      const res = await getRandomProject();
      setProject(res);
    } catch (err: unknown) {
      log('failed to fetch random project', LogLevel.Error);
      throw Error();
    }
  };

  useEffect(() => {
    fetchRandomProject();
  }, []);

  return (
    <div className={s.createPage}>
      <Container>
        <Row>
          <Col xs={5}>
            <div className={s.createPage_content}>
              <Heading
                as={'h5'}
                color={'blue-c'}
                className={'spacing__small'}
                fontWeight={'semibold'}
              >
                Artist
              </Heading>
              <Text
                as={'h2'}
                color={'white'}
                fontWeight={'bold'}
                className={'spacing__small'}
                size={'d3'}
              >
                Where imagination comes to life.
              </Text>
              <Text
                size="24"
                color={'white'}
                className={'spacing__large'}
                fontWeight="semibold"
                as="p"
              >
                World-renowned artists. A hand-crafted experience for
                discovering art you love.{' '}
                <strong>100% verified collections</strong>. And industry-leading
                1% fees when {`you're`} ready to buy.
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
                Get started
              </ButtonIcon>
            </div>
          </Col>
          <Col xs={{ span: 6, offset: 1 }}>
            <div className={s.createPage_project}>
              {DATA_CREATE_PAGE_SECTIONS.map((token, key) => {
                return (
                  <div key={`token_${key}`} className={s.token}>
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
