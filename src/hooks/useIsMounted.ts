import { useEffect, useState } from 'react';

function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return isMounted;
}

export default useIsMounted;
