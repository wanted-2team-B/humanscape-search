import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import useClinicalTrialData from '../../hooks/useClinicalTrialData';
import { sortResult } from '../../utils/sort';
import { activeIndexState, searchInputValue } from '../../recoil/search';

const Input = () => {
  const [searchText, setSearchText] = useRecoilState(searchInputValue);
  const [activeIndex, setactiveIndex] = useRecoilState(activeIndexState);

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data } = useClinicalTrialData();
  const sortedData = data && sortResult(data, searchText);
  const sliceData = sortedData && sortedData.slice(0, 7);

  useEffect(() => {
    if (!inputRef.current || !sortedData) return;
    inputRef.current.value = activeIndex === -1 ? searchText : sortedData[activeIndex].sickNm;
  }, [activeIndex, sortedData, searchText]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleItemActive = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (!sortedData || !sliceData) return;
    const itemLength = windowSize < 1000 ? sortedData.length : sliceData.length;
    const key = e.key || e.keyCode;

    if (key === 'ArrowUp' || key === 38) {
      e.preventDefault();
      switch (activeIndex) {
        case -1:
          setactiveIndex(itemLength - 1);
          break;
        case 0:
          setactiveIndex(-1);
          break;
        default:
          setactiveIndex((prevIndex) => (prevIndex - 1) % itemLength);
      }
    }
    if (key === 'ArrowDown' || key === 40) {
      switch (activeIndex) {
        case -1:
          setactiveIndex(0);
          break;
        case itemLength - 1:
          setactiveIndex(-1);
          break;
        default:
          setactiveIndex((prevIndex) => (prevIndex + 1) % itemLength);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  return (
    <input
      type='text'
      value={searchText}
      placeholder='질환명을 입력해 주세요.'
      onChange={handleInputChange}
      ref={inputRef}
      onKeyDown={handleItemActive}
    />
  );
};

export default Input;
