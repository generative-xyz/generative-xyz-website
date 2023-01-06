import s from './Loading.module.scss';
interface IProps {
  isLoaded: boolean;
  className?: string;
}
export const Loading = ({ isLoaded, className }: IProps): JSX.Element => {
  return (
    <div
      className={`${s.loading} ${!isLoaded ? s.isShow : ''} ${className || ''}`}
    >
      <div className={s.loading_inner}>
        <div className={s['lds-spinner']}>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
};
