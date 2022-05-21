import { useRecoilState, useRecoilValue } from 'recoil';

import Input from '../components/Input/Input';
import MSearchModal from '../components/Portal';
import SearchResult from '../components/Search/SearchResultItem';

import styles from './Routes.module.scss';

import { sortResult } from '../libs/sort';

import { IClinicalTrial } from '../types/clinicalTrial';

import { mSearchBtnClickState, searchInputValue } from '../states/search';
import { SearchIcon } from '../assets/index';

import useClinicalTrialData from '../hooks/useClinicalTrialData';

const RootRoute = () => {
  const [mSearchClicked, setMSearchClicked] = useRecoilState(mSearchBtnClickState);
  const { data, isLoading, error, isTextEmpty } = useClinicalTrialData();
  const searchText = useRecoilValue(searchInputValue);
  const sortedData = data && sortResult(data, searchText);
  const spliceArr = sortedData && sortedData.slice(0, 7);

  const handleMSearchBtnClick = () => {
    setMSearchClicked(true);
  };

  return (
    <div className={styles.app}>
      {mSearchClicked && <MSearchModal />}
      <div className={styles.mainWrap}>
        <h1 className={styles.title}>
          국내 모든 임상시험 검색하고
          <br /> 온라인으로 참여하기
        </h1>
        <div className={styles.inputWrap}>
          <Input />
          <SearchIcon className={styles.icon} />
          <button type='submit'>검색</button>
        </div>
        <button type='button' onClick={handleMSearchBtnClick} className={styles.mInputWrap}>
          <span>{searchText.length !== 0 ? searchText : '질환명을 입력해주세요.'}</span>
          <SearchIcon className={styles.icon} />
        </button>
        {!isTextEmpty && (
          <ul className={styles.searchKeywordWrap}>
            {!isLoading && data && <li className={styles.state}>추천 검색어</li>}
            {isLoading && <li className={styles.state}>검색 중...</li>}
            {spliceArr &&
              spliceArr.map((disease: IClinicalTrial, index: number) => {
                return <SearchResult key={`clinical-${disease.sickCd}`} sickNm={disease.sickNm} index={index} />;
              })}
            {!isLoading && !data && <li className={styles.state}>검색어가 없습니다.</li>}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RootRoute;
