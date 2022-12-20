import { MintGenerativeContextProvider } from '@contexts/mint-generative-context';
import MintGenerativeSubPages from './[subpages]';

const MintGenerativePage = () => {
  return (
    <MintGenerativeContextProvider>
      <MintGenerativeSubPages />
    </MintGenerativeContextProvider>
  );
};

export default MintGenerativePage;
