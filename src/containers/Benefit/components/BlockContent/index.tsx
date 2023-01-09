import Heading from '@components/Heading';
import Text from '@components/Text';
import s from './BlockContent.module.scss';
import { ReactNode } from 'react';

interface IProps {
  heading: string;
  className?: string;
  children: ReactNode;
}

export const BlockContent = ({
  heading,
  children,
  className,
}: IProps): JSX.Element => {
  return (
    <div className={`${s.blockContent} ${className}`}>
      <Heading as="h6" color={'white'} fontWeight={'semibold'}>
        {heading}
      </Heading>
      <Text as="p" color={'white-60'} size="18" fontWeight={'medium'}>
        {children}
      </Text>
    </div>
  );
};
