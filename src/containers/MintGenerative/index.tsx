import s from './styles.module.scss';
import React from 'react';
import { MintGenerativeContextProvider } from '@contexts/mint-generative-context';
import UploadGenArt from '@containers/MintGenerative/UploadGenArt';
import ProjectDetail from '@containers/MintGenerative/ProjectDetail';
import ProjectPrice from '@containers/MintGenerative/ProjectPrice';
import { useRouter } from 'next/router';
import { MintGenerativeStep } from '@enums/mint-generative';
import StepHeader from './StepHeader';

const MintGenerativeController: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { stepParam } = router.query;

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
    <MintGenerativeContextProvider>
      <div className={s.mintGenerative}>
        <div className={s.stepHeaderWrapper}>
          <StepHeader />
        </div>
        <div className={s.stepContent}>{renderStep()}</div>
      </div>
    </MintGenerativeContextProvider>
  );
};

export default MintGenerativeController;
