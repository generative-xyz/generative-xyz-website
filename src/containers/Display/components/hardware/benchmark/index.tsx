import s from '@containers/Display/components/hardware/hardware.module.scss';
import { BenchmarkItem } from '../benchmark-item';
import classNames from 'classnames';

export const Benchmark = (): JSX.Element => {
  return (
    <div className={classNames(s.hardWare_benchmark, 'container')}>
      <div className={`row ${s.hardWare_benchmark_header}`}>
        <div className="col-xl-6 offset-xl-3 col-md-10 offset-md-1 col-12">
          <h3 className={`heading heading__medium`}>Benchmark</h3>
          <p className={`desc__medium`}>
            Generative Display has set a rising standard in showcasing living
            art — with numbers that speak for themselves.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6 offset-xl-3 col-md-10 offset-md-1 col-12">
          <BenchmarkItem
            className={s.hardWare_benchmark_item}
            title={'GPU'}
            isCine={false}
            color={'dep-blue'}
            target1={{ title: 'Generative Display', value: 27478 }}
            target2={{ title: 'Apple M1 8 core', value: 10433 }}
          />
          <BenchmarkItem
            className={s.hardWare_benchmark_item}
            color={'yellow'}
            isCine={true}
            title={'Multi-core CPU'}
            target1={{ title: 'Generative Display', value: 3945 }}
            target2={{ title: 'Apple M1 8 core', value: 2040 }}
          />
          <BenchmarkItem
            className={s.hardWare_benchmark_item}
            title={'Single-core CPU'}
            color={'blue'}
            isCine={true}
            target1={{ title: 'Generative Display', value: 502 }}
            target2={{ title: 'Apple M1 8 core', value: 403 }}
          />
        </div>
      </div>
    </div>
  );
};
