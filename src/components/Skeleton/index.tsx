import React from 'react';
import s from './styles.module.scss';

interface IProps {
  width: number;
  height: number;
}

const Skeleton = ({ width, height }: IProps) => {
  return (
    <div
      className={s.skeleton}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></div>
  );
};

export default Skeleton;
