import s from './monitor.module.scss';
import SvgInset from '@components/SvgInset';

export const Monitor = ({ data }: { data: IHardwareItem }): JSX.Element => {
  return (
    <div className={s.monitor}>
      <div className="container">
        <div className={`${s.monitor_inner} row align-items-center`}>
          <div
            className={`${s.monitor_info} col-xxl-4 col-xl-5 offset-xl-1 col-12`}
          >
            <div className={`${s.monitor_info_label} desc__small`}>
              {data.subtitle}
            </div>
            <h3 className={`${s.monitor_info_heading} heading heading__medium`}>
              {data.title}
            </h3>
            <p className={`desc__medium`}>{data.desc}</p>
          </div>
          <div
            className={`${s.monitor_detail} col-xxl-4 col-xl-5 offset-xxl-2 offset-xl-1 col-12`}
          >
            <ul className={'ul_reset'}>
              {data.options.map((option: IHardwareInfo, key) => {
                return (
                  <li key={`option_${key}`} className={s.monitor_detail_item}>
                    <span className={s.monitor_detail_item_icon}>
                      <SvgInset svgUrl={option.icon} />
                    </span>
                    <div className={s.monitor_detail_item_content}>
                      <span
                        className={`${s.monitor_detail_item_content_label} desc__small text__grey`}
                      >
                        {option.subtitle}
                      </span>
                      <p
                        className={`${s.monitor_detail_item_content_desc} desc__body text__black`}
                      >
                        {option.title}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <video
        className={s.monitor_video}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        poster={data.poster}
        src={data.video}
      />
    </div>
  );
};
