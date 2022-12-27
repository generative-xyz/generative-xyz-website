import { ReactSVG } from 'react-svg';
import React from 'react';
import s from './style.module.scss';

type IProps = {
  svgUrl: string;
  className?: string;
  size?: number;
  onClick?: () => void;
};

const SvgInset: React.FC<IProps> = ({ svgUrl, className, size, onClick }) => {
  return (
    <div
      className={`svgInset ${s.svgInset} ${className || ''}`}
      onClick={onClick}
      // style={{
      //   width: size,
      //   height: size
      // }}
    >
      <ReactSVG
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
    </div>
  );
};

export default SvgInset;
