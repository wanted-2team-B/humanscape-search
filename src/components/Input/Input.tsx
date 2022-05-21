import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import useClinicalTrialData from '../../hooks/useClinicalTrialData';
import { sortResult } from '../../libs/sort';

import { activeItemIndexState, searchInputValue } from '../../states/search';
import { IKeyboard } from '../../types/clinicalTrial';

const Input = () => {
  const [searchText, setSearchText] = useRecoilState(searchInputValue);
  const [activeItemIndex, setactiveItemIndex] = useRecoilState(activeItemIndexState);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data } = useClinicalTrialData();
  const sortedData = data && sortResult(data, searchText);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    if (!inputRef.current || !sortedData) return;
    inputRef.current.value = activeItemIndex === -1 ? searchText : sortedData[activeItemIndex].sickNm;
  }, [activeItemIndex, sortedData, searchText]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemActive = (e: IKeyboard) => {
    // if (e.nativeEvent.isComposing) return;
    if (!sortedData) return;
    const itemLength = windowSize < 1000 ? sortedData.length : 7;
    const key = e.key || e.keyCode;

    if (key === 'ArrowUp' || key === 38) {
      e.preventDefault();
      switch (activeItemIndex) {
        case -1:
          setactiveItemIndex(itemLength - 1);
          break;
        case 0:
          setactiveItemIndex(-1);
          break;
        default:
          setactiveItemIndex((prevIndex) => (prevIndex - 1) % itemLength);
      }
    }
    if (key === 'ArrowDown' || key === 40) {
      switch (activeItemIndex) {
        case -1:
          setactiveItemIndex(0);
          break;
        case itemLength - 1:
          setactiveItemIndex(-1);
          break;
        default:
          setactiveItemIndex((prevIndex) => (prevIndex + 1) % itemLength);
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

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
