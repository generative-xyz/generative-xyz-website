import s from './benchmark-item.module.scss';
import classNames from 'classnames';
import { useState, useEffect, useRef, useContext } from 'react';
import { gsap } from 'gsap';
import { PAGE_ENTER } from '@constants/common';
import { Anim } from '@animations/anim';
import { CDN_URL } from '@constants/config';
import { LoadingContext } from '@contexts/loading-context';

interface IProp {
  title: string;
  className: string;
  isCine: boolean;
  color: 'yellow' | 'blue' | 'dep-blue';
  target1: { title: string; value: number };
  target2: { title: string; value: number };
}

interface IValueTarget {
  value: number;
}

interface IRefData {
  target1: IValueTarget;
  target2: IValueTarget;
}

export const BenchmarkItem = ({
  className,
  color,
  title,
  target1,
  target2,
  isCine = true,
}: IProp): JSX.Element => {
  const comp = useRef<HTMLDivElement>(null);

  const [valueTarget1, setValueTarget1] = useState<number>();
  const [valueTarget2, setValueTarget2] = useState<number>();
  const [persenTarget1, setPersenTarget1] = useState<number>();
  const [persenTarget2, setPersenTarget2] = useState<number>();

  const refData = useRef<IRefData>({
    target1: { value: 0 },
    target2: { value: 0 },
  });

  const { pageLoadStatus } = useContext(LoadingContext);

  useEffect(() => {
    const anim = gsap.context(() => {
      if (!comp.current) return;

      if (comp.current) {
        comp.current.classList.add(`is-handle`);
      }
    }, [comp]);

    return () => {
      anim.revert();
      if (comp.current) {
        comp.current?.classList.remove(`is-handle`);
      }
    };
  }, []);

  useEffect(() => {
    if (comp.current && pageLoadStatus === PAGE_ENTER) {
      new Anim(comp.current, () => {
        gsap.to(refData.current.target1, {
          value: target1.value,
          duration: 1.8,
          ease: 'power3.inOut',
          onUpdate: () => {
            setValueTarget1(Math.floor(refData.current.target1.value));
            setPersenTarget1(
              Math.floor((refData.current.target1.value / target1.value) * 100)
            );
          },
        });
        gsap.to(refData.current.target2, {
          value: target2.value,
          duration: 1.8,
          ease: 'power3.inOut',
          delay: 0.2,
          onUpdate: () => {
            setValueTarget2(Math.floor(refData.current.target2.value));
            setPersenTarget2(
              Math.floor((refData.current.target2.value / target1.value) * 100)
            );
          },
        });
      });
    }
  }, [pageLoadStatus]);

  return (
    <div ref={comp} className={classNames(s.benchmark, className)}>
      <div className={s.benchmark_header}>
        <h5 className={classNames(s.benchmark_heading)}>{title}</h5>
        <div className={classNames(s.benchmark_heading_tool)}>
          {isCine ? (
            <>
              <img
                src={`${CDN_URL}/pages/home/icons/cin.png`}
                width={20}
                height={20}
                alt="Cinebench R20"
              />
              Cinebench R20
            </>
          ) : (
            <>
              <img
                src={`${CDN_URL}/pages/home/icons/gfx.png`}
                width={20}
                height={20}
                alt="GFXBench 4.0"
              />
              GFXBench 4.0 - Car Chase Offscreen
            </>
          )}
        </div>
      </div>

      <div className={s.benchmark_target}>
        <div className={s.benchmark_val}>
          <div className={s.benchmark_val_border}>
            <span
              style={{ width: `${persenTarget1}%` }}
              className={classNames(
                s.benchmark_val_border_span,
                color === 'yellow' && s.benchmark_val_border_span__yellow,
                color === 'blue' && s.benchmark_val_border_span__blue,
                color === 'dep-blue' && s.benchmark_val_border_span__depBlue
              )}
            />
          </div>
          <div className={s.benchmark_val_value}>{valueTarget1}</div>
        </div>
        <p
          className={classNames(
            s.benchmark_target_title,
            s.benchmark_target_title__target1
          )}
        >
          {target1.title}
        </p>
      </div>
      <div className={s.benchmark_target}>
        <div className={s.benchmark_val}>
          <div
            className={classNames(
              s.benchmark_val_border,
              s.benchmark_val_border__target2
            )}
            style={{ width: `${persenTarget2}%` }}
          >
            <span className={s.benchmark_val_border_span} />
          </div>
          <div
            className={classNames(
              s.benchmark_val_value,
              s.benchmark_val_value__target2
            )}
          >
            {valueTarget2}
          </div>
        </div>
        <p className={s.benchmark_target_title}>{target2.title}</p>
      </div>
    </div>
  );
};
