import { useRouter } from 'next/router';
import React from 'react';

const GenerativeProjectDetail: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { projectID } = router.query;

  return <section>Project ID: {projectID}</section>;
};

export default GenerativeProjectDetail;
