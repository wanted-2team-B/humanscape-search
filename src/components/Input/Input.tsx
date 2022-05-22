import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

import useClinicalTrialData from '../../hooks/useClinicalTrialData';
import { activeIndexState, searchInputValue } from '../../recoil/search';

const Input = () => {
  const [searchText, setSearchText] = useRecoilState(searchInputValue);
  const [activeIndex, setActiveIndex] = useRecoilState(activeIndexState);

  const inputRef = useRef<HTMLInputElement>(null);

  const { data } = useClinicalTrialData();
  const sliceData = data && data.slice(0, 7);

  useEffect(() => {
    if (!inputRef.current || !data) return;
    inputRef.current.value = activeIndex === -1 ? searchText : data[activeIndex].sickNm;
  }, [activeIndex, data, searchText]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleItemActive = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (!data || !sliceData) return;
    const itemLength = window.innerWidth < 1000 ? data.length : sliceData.length;
    const key = e.key || e.keyCode;

    if (key === 'ArrowUp' || key === 38) {
      e.preventDefault();
      switch (activeIndex) {
        case -1:
          setActiveIndex(itemLength - 1);
          break;
        case 0:
          setActiveIndex(-1);
          break;
        default:
          setActiveIndex((prevIndex) => (prevIndex - 1) % itemLength);
      }
    }
    if (key === 'ArrowDown' || key === 40) {
      switch (activeIndex) {
        case -1:
          setActiveIndex(0);
          break;
        case itemLength - 1:
          setActiveIndex(-1);
          break;
        default:
          setActiveIndex((prevIndex) => (prevIndex + 1) % itemLength);
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
