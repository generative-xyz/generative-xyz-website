import { MintGenerativePages } from '@enums/mint-generative';
import MintGenerativeStep1 from '@containers/MintGenerative/Step1';
import MintGenerativeStep2 from '@containers/MintGenerative/Step2';
import MintGenerativeStep3 from '@containers/MintGenerative/Step3';
import { useRouter } from 'next/router';
import DefaultLayout from '@components/Layout/DefaultLayout';
import MintGenerative from '@containers/MintGenerative';
import { MintGenerativeContextProvider } from '@contexts/mint-generative-context';

const MintGenerativeSubPages = () => {
  const router = useRouter();
  const { subpages } = router.query;

  const renderSubPages = (): JSX.Element => {
    switch (subpages) {
      case MintGenerativePages.UPLOAD_PROJECT:
        return <MintGenerativeStep1 />;

      case MintGenerativePages.PRODUCT_DETAIL:
        return <MintGenerativeStep2 />;

      case MintGenerativePages.SET_PRICE:
        return <MintGenerativeStep3 />;

      default:
        return <MintGenerativeStep1 />;
    }
  };

  return (
    <DefaultLayout>
      <MintGenerativeContextProvider>
        <MintGenerative>{renderSubPages()}</MintGenerative>
      </MintGenerativeContextProvider>
    </DefaultLayout>
  );
};

export default MintGenerativeSubPages;
