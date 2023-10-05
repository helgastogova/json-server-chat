import { useState, useEffect, useMemo } from 'react';

export const useIsClient = () => {
  const [isClient, setIsClient] = useState(() => typeof window !== 'undefined');

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export function useBreakpoint() {
  const isClient = useIsClient();
  const [breakpoints, setBreakpoints] = useState({
    isS: false,
    isM: false,
    isL: false,
  });

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      const width = window.innerWidth;
      const isS = width <= 348;
      const isM = width <= 720;
      const isL = width < 1120;

      setBreakpoints({ isS, isM, isL });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  return useMemo(() => breakpoints, [breakpoints]);
}
