import s from './benchmark.module.scss';
import classNames from 'classnames';

interface IProp {
  title: string;
  className: string;
  color: 'yellow' | 'blue' | 'dep-blue';
  target1: { title: string; value: number };
  target2: { title: string; value: number };
}

export const Benchmark = ({
  className,
  color,
  title,
  target1,
  target2,
}: IProp): JSX.Element => {
  return (
    <div
      className={classNames(
        s.benchmark,
        className,
        color === 'yellow' && s.benchmark__yellow,
        color === 'blue' && s.benchmark__blue,
        color === 'dep-blue' && s.benchmark__depBlue
      )}
    >
      <h5 className={classNames(s.benchmark_heading, 'desc__large')}>
        {title}
      </h5>
      <div className={s.benchmark_target}>
        <div className={s.benchmark_val}>
          <div className={s.benchmark_val_border}>
            <span className={s.benchmark_val_border_span} />
          </div>
          <div className={s.benchmark_val_value}>{target1.value}</div>
        </div>
        <p className={s.benchmark_target_title}>{target2.title}</p>
      </div>
      <div className={s.benchmark_target}>
        <div className={s.benchmark_val}>
          <div className={s.benchmark_val_border}>
            <span className={s.benchmark_val_border_span} />
          </div>
          <div className={s.benchmark_val_value}>{target2.value}</div>
        </div>
        <p className={s.benchmark_target_title}>{target2.title}</p>
      </div>
    </div>
  );
};
