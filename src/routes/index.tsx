import { ChangeEvent, useEffect, useRef } from 'react';
import cx from 'classnames';
import styles from './Routes.module.scss';
import { useRecoil } from '../hooks/state';
import { IKeyboard } from '../types/clinicalTrial';
import { mSearchBtnClickState, searchInputValue, activeIndexState } from '../states/search';
import MSearchModal from '../components/MSearchModal';
import { SearchIcon } from '../assets/index';

const RootRoute = () => {
  const [mSearchClicked, setMSearchClicked] = useRecoil(mSearchBtnClickState);
  const [searchText, setSearchText] = useRecoil(searchInputValue);
  const [activeIndex, setActiveIndex] = useRecoil(activeIndexState);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleMSearchBtnClick = () => {
    setMSearchClicked(true);
  };
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const dummyData = ['검색1', '검색2', '검색3', '검색4', '검색5', '검색6', '검색7'];

  useEffect(() => {
    if (!inputRef.current || !dummyData) return;
    inputRef.current.value = activeIndex === -1 ? searchText : dummyData[activeIndex];
  }, [activeIndex, dummyData, searchText]);

  const handleItemActive = (e: IKeyboard) => {
    if (!dummyData) return;
    const itemLength = dummyData.length;
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

  return (
    <form className={styles.app}>
      {mSearchClicked && <MSearchModal />}
      <div className={styles.mainWrap}>
        <h1 className={styles.title}>
          국내 모든 임상시험 검색하고
          <br /> 온라인으로 참여하기
        </h1>
        <div className={styles.inputWrap}>
          <input
            type='text'
            value={searchText}
            ref={inputRef}
            onChange={handleChangeInput}
            placeholder='질환명을 입력해 주세요.'
            onKeyDown={handleItemActive}
          />
          <SearchIcon className={styles.icon} />
          <button type='submit'>검색</button>
        </div>
        <button type='button' onClick={handleMSearchBtnClick} className={styles.mInputWrap}>
          <span>질환명을 입력해주세요.</span>
          <SearchIcon className={styles.icon} />
        </button>
        <ul className={styles.searchKeywordWrap}>
          <li className={styles.state}>추천 검색어</li>
          {searchText &&
            dummyData.map((item, index) => {
              return (
                <li className={cx(styles.keyword, { [styles.isActive]: activeIndex === index })} key={item}>
                  <button type='button'>
                    <SearchIcon className={styles.icon} />
                    <span>{item}</span>
                  </button>
                </li>
              );
            })}
        </ul>
        {/*       <ul className={styles.searchKeywordWrap}>
          <li className={styles.state}>추천 검색어</li>
          <li className={styles.keyword}>
            <button type='button'>
              <SearchIcon className={styles.icon} />
              <span>간암</span>
            </button>
          </li>
          <li className={styles.keyword}>
            <button type='button'>
              <SearchIcon className={styles.icon} />
              <span>간암</span>
            </button>
          </li>
          <li className={styles.keyword}>
            <button type='button'>
              <SearchIcon className={styles.icon} />
              <span>간암</span>
            </button>
          </li>
          <li className={styles.keyword}>
            <button type='button'>
              <SearchIcon className={styles.icon} />
              <span>간암</span>
            </button>
          </li>
          <li className={styles.keyword}>
            <button type='button'>
              <SearchIcon className={styles.icon} />
              <span>간암</span>
            </button>
          </li>
        </ul>
  */}
      </div>
    </form>
  );
};

export default RootRoute;
