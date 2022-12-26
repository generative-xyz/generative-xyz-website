import s from './styles.module.scss';
import React, { useContext } from 'react';
import UploadGenArt from '@containers/MintGenerative/UploadGenArt';
import ProjectDetail from '@containers/MintGenerative/ProjectDetail';
import ProjectPrice from '@containers/MintGenerative/ProjectPrice';
import { useRouter } from 'next/router';
import { MintGenerativeStep } from '@enums/mint-generative';
import StepHeader from '../StepHeader';
import ProjectPreview from '../ProjectPreview';
import { MintGenerativeContext } from '@contexts/mint-generative-context';
import cs from 'classnames';

const MintGenerativeController: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { stepParam } = router.query;
  const { filesSandbox } = useContext(MintGenerativeContext);

  const renderStep = (): JSX.Element => {
    switch (stepParam) {
      case MintGenerativeStep.UPLOAD_PROJECT:
        return <UploadGenArt />;

      case MintGenerativeStep.PROJECT_DETAIL:
        return <ProjectDetail />;

      case MintGenerativeStep.SET_PRICE:
        return <ProjectPrice />;

      default:
        return <UploadGenArt />;
    }
  };

  return (
    <div className={s.mintGenerative}>
      <div className={s.stepHeaderWrapper}>
        <StepHeader />
      </div>
      <div
        className={cs(s.stepContent, {
          [`${s.stepContent__twoColumn}`]: !!filesSandbox,
        })}
      >
        <div className={s.previewWrapper}>
          <ProjectPreview />
        </div>
        <div className={s.stepContentWrapper}>{renderStep()}</div>
      </div>
    </div>
  );
};

export default MintGenerativeController;
