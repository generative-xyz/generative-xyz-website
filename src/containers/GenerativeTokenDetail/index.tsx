import { useRouter } from 'next/router';
import React from 'react';

const GenerativeTokenDetail: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { projectID, tokenID } = router.query;

  return (
    <section>
      <p>Project ID: {projectID}</p>
      <p>Token ID: {tokenID}</p>
    </section>
  );
};

export default GenerativeTokenDetail;
