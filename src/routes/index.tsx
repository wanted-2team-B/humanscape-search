import { useRecoilState, useRecoilValue } from 'recoil';

import Input from '../components/Input/Input';
import MSearchModal from '../components/Portal';
import SearchResultItem from '../components/Search/SearchResultItem';
import { StyledToaster } from '../components/Toaster';

import styles from './Routes.module.scss';

import { IClinicalTrial } from '../types/clinicalTrial';
import { mSearchBtnClickState, searchInputValue } from '../recoil/search';
import { SearchIcon } from '../assets/index';
import { sortResult } from '../utils/sort';
import useClinicalTrialData from '../hooks/useClinicalTrialData';

const RootRoute = () => {
  const [mSearchClicked, setMSearchClicked] = useRecoilState(mSearchBtnClickState);
  const searchText = useRecoilValue(searchInputValue);

  const { data, isLoading, error, isTextEmpty } = useClinicalTrialData();

  const sortedData = data && sortResult(data, searchText);
  const sliceData = sortedData && sortedData.slice(0, 7);

  const handleMSearchBtnClick = () => {
    setMSearchClicked(true);
  };

  return (
    <div className={styles.app}>
      {error && <StyledToaster />}
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
          <span>{searchText || '질환명을 입력해주세요.'}</span>
          <SearchIcon className={styles.icon} />
        </button>
        {!isTextEmpty && (
          <ul className={styles.searchKeywordWrap}>
            {!isLoading && data && <li className={styles.state}>추천 검색어</li>}
            {isLoading && <li className={styles.state}>검색 중...</li>}
            {sliceData &&
              sliceData.map((disease: IClinicalTrial, index: number) => (
                <SearchResultItem key={`clinical-${disease.sickCd}`} sickNm={disease.sickNm} index={index} />
              ))}
            {!isLoading && !data && <li className={styles.state}>검색어가 없습니다.</li>}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RootRoute;
