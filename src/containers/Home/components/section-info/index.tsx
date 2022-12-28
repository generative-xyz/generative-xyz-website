import s from './seciton-info.module.scss';
import classNames from 'classnames';
import { AnimRanText } from '@animations/ranText';
import { AnimHeading } from '@animations/heading';
import { AnimParagraph } from '@animations/paragraph';
import { ReactNode } from 'react';

interface IPros {
  subTitle: string;
  title: string;
  className?: string;
  children?: ReactNode;
  variant?: 'center' | 'left-right';
  color?: 'dark' | 'white';
}

export const SectionInfo = ({
  subTitle,
  title,
  children,
  className,
  variant = 'center',
  color = 'white',
}: IPros): JSX.Element => {
  return (
    <div
      className={classNames(
        'sectionInfo',
        s.sectionInfo,
        className,
        variant === 'center' && s.sectionInfo__center,
        variant === 'left-right' && s.sectionInfo__leftRight,
        color === 'dark' && s.sectionInfo__dark,
        color === 'white' && s.sectionInfo__white
      )}
    >
      <div className="container">
        <div className="row">
          <div className="offset-xl-1 col-xl-10 col-12">
            <div className={`sectionInfo_inner ${s.sectionInfo_inner}`}>
              <AnimRanText className={`${s.sectionInfo_sub} desc__label`}>
                {subTitle}
              </AnimRanText>
              <AnimHeading
                tag={'h2'}
                className={`${s.sectionInfo_heading} heading heading__large`}
              >
                {title}
              </AnimHeading>
              <AnimParagraph
                className={`${s.sectionInfo_content} ${
                  s[className + '_sectionInfo_content']
                }`}
              >
                {children}
              </AnimParagraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
