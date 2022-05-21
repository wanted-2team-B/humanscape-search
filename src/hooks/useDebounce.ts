import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { activeIndexState } from '../states/search';

const useDebounce = (value: string, delay: number = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);
  const setActiveItemIndex = useSetRecoilState(activeIndexState);

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setDebounceValue(value);
      setActiveItemIndex(-1);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, setActiveItemIndex]);

  return debounceValue;
};

export default useDebounce;
