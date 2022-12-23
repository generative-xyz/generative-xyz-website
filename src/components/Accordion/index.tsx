import React, { ReactNode } from 'react';
import { Accordion } from 'react-bootstrap';
import styles from './styles.module.scss';

type Props = {
  header: string;
  content: string | ReactNode;
};

const AccordionComponent = ({ header, content }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header bsPrefix="custom">{header}</Accordion.Header>
          <Accordion.Body>{content}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default AccordionComponent;
