import { ReactSVG } from 'react-svg';
import React from 'react';

type IProps = {
  svgUrl: string;
  className?: string;
  size?: number;
  onClick?: () => void;
};

const SvgInset: React.FC<IProps> = ({ svgUrl, className, size, onClick }) => {
  return (
    <ReactSVG
      onClick={onClick}
      className={className}
      src={svgUrl}
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
