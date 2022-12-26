import { ReactSVG } from 'react-svg';
import React from 'react';
import cs from 'classnames';
import s from './style.module.scss';

interface IProps {
  url: string;
  className?: string;
  size?: number;
  onClick?: () => void;
}

const SvgInset: React.FC<IProps> = ({
  url,
  className,
  size,
  onClick,
}: IProps): React.ReactElement => {
  return (
    <ReactSVG
      className={cs('svgInset', s.svgInset, className ?? '')}
      onClick={onClick}
      src={url}
      beforeInjection={(svg): void => {
        if (size) {
          svg.setAttribute('height', `${size}`);
          svg.setAttribute('width', `${size}`);
          svg.style.minWidth = `${size}`;
          svg.style.minHeight = `${size}`;
        }
      }}
    />
  );
};

export default SvgInset;
