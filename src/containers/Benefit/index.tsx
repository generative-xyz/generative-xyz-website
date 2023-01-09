import { useEffect } from 'react';
import s from './Benefit.module.scss';
import { CreatePageSection } from '@containers/Benefit/components/CreatePage';
import { SimpleLoading } from '@components/SimpleLoading';
import { registerLoading } from '@helpers/anim.helpers';

export const BenefitPage = (): JSX.Element => {
  useEffect(() => {
    registerLoading(1);
    const html = document.querySelector('html');
    if (html) {
      html.classList.add('is-landing');
    }

    return () => {
      if (html) {
        html.classList.remove('is-landing');
      }
    };
  }, []);

  return (
    <div className={s.benefit}>
      <SimpleLoading theme={'dark'} />
      <CreatePageSection />
    </div>
  );
};
