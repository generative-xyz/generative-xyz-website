import s from './monitor.module.scss';

export const Monitor = ({ data }: { data: IHardwareItem }): JSX.Element => {
  return (
    <div className={s.monitor}>
      <div className="container">
        <div className={`${s.monitor_inner} row`}>
          <div className={`${s.monitor_info} col-4 offset-1`}>
            <div className={`${s.monitor_info_label} desc__small`}>
              {data.subtitle}
            </div>
            <h3 className={`${s.monitor_info_heading} heading heading__medium`}>
              {data.title}
            </h3>
            <p className={`desc__medium`}>{data.desc}</p>
          </div>
          <div className={`${s.monitor_detail} col-4 offset-2`}>
            <ul className={'ul_reset'}>
              {data.options.map((option: IHardwareInfo, key) => {
                return (
                  <li key={`option_${key}`} className={s.monitor_detail_item}>
                    <span className={s.monitor_detail_item_icon}>
                      <img src={option.icon} alt="monitro6a1a6c3212" />
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
    </div>
  );
};
