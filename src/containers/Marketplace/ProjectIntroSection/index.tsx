import Heading from '@components/Heading';
import { IGetProjectDetailResponse } from '@interfaces/api/project';
import { useRouter } from 'next/router';

import ProgressBar from '@components/ProgressBar';
import Text from '@components/Text';
import s from './styles.module.scss';

type Props = {
  project: IGetProjectDetailResponse;
};

const ProjectIntroSection = ({ project }: Props) => {
  const router = useRouter();

  return (
    <div className={s.wrapper} style={{ marginBottom: '100px' }}>
      <div>
        {!router.query?.projectID && (
          <Heading
            as="h4"
            fontWeight="semibold"
            style={{ marginBottom: '4px' }}
          >
            Recent Collection
          </Heading>
        )}
        <Heading fontWeight="bold" style={{ marginBottom: '10px' }}>
          {project?.name}
        </Heading>
        {/* <div className={s.creator}>
          <div>
            <Avatar imgSrcs={[``, ``, ``]} width={40} height={40} />
          </div>
          <div></div>
          <div></div>
        </div> */}
        <ProgressBar size="small" />
        <Text fontWeight="bold" size="12">
          Testing text size
        </Text>
      </div>
      <div className={s.preview}></div>
      <div></div>
    </div>
  );
};

export default ProjectIntroSection;
