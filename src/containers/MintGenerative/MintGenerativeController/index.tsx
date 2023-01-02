import s from './styles.module.scss';
import React, { useContext, useMemo } from 'react';
import UploadGenArt from '@containers/MintGenerative/UploadGenArt';
import ProjectDetail from '@containers/MintGenerative/ProjectDetail';
import SetPrice from '@containers/MintGenerative/SetPrice';
import { useRouter } from 'next/router';
import { MintGenerativeStep } from '@enums/mint-generative';
import StepHeader from '../StepHeader';
import ProjectPreview from '../ProjectPreview';
import MintSuccess from '../MintSuccess';
import { MintGenerativeContext } from '@contexts/mint-generative-context';
import cs from 'classnames';
import { CDN_URL } from '@constants/config';

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
        return <SetPrice />;

      case MintGenerativeStep.MINT_SUCCESS:
        return <MintSuccess />;

      default:
        return <UploadGenArt />;
    }
  };

  const isLastStep = useMemo(() => {
    return stepParam === MintGenerativeStep.MINT_SUCCESS;
  }, [stepParam]);

  return (
    <div
      className={cs(s.mintGenerative, {
        [`${s.mintGenerative__success}`]: isLastStep,
      })}
      style={
        isLastStep
          ? {
              backgroundImage: `url(${CDN_URL}/images/mint-success-bg.svg)`,
            }
          : {}
      }
    >
      <div
        className={cs(s.stepHeaderWrapper, {
          [`${s.stepHeaderWrapper__hide}`]: isLastStep,
        })}
      >
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
