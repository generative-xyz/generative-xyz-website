import s from './Loading.module.scss';
interface IProps {
  isLoaded: boolean;
}
export const Loading = ({ isLoaded }: IProps): JSX.Element => {
  return (
    <div className={`${s.loading} ${!isLoaded ? s.isShow : ''}`}>
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
