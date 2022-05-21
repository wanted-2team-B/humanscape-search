import { useRecoilState, useSetRecoilState } from 'recoil';

import Input from '../Input/Input';
import SearchResult from '../Search/SearchResultItem';

import styles from './MSearchModal.module.scss';

import { mSearchBtnClickState, searchInputValue } from '../../states/search';
import { IClinicalTrial } from '../../types/clinicalTrial';
import { BackIcon, ClearIcon, SearchIcon } from '../../assets';

import useClinicalTrialData from '../../hooks/useClinicalTrialData';
import { sortResult } from '../../libs/sort';

const ModalOverlay = () => {
  const setMSearchClicked = useSetRecoilState(mSearchBtnClickState);
  const [searchText, setSearchText] = useRecoilState(searchInputValue);
  const { data, isLoading, error, isTextEmpty } = useClinicalTrialData();
  const sortedData = data && sortResult(data, searchText);

  const handleSearchModalClose = () => {
    setMSearchClicked(false);
  };

  const handleClearInput = () => {
    setSearchText('');
  };

  return (
    <div className={styles.modalWrap}>
      <div className={styles.searchWrap}>
        <button type='button' className={styles.backBtn} onClick={handleSearchModalClose}>
          <BackIcon className={styles.backIcon} />
        </button>
        <Input />
        {!isTextEmpty && (
          <button type='button' onClick={handleClearInput}>
            <ClearIcon className={styles.clearIcon} />
          </button>
        )}
        <button type='submit'>
          <SearchIcon className={styles.searchIcon} />
        </button>
      </div>
      {!isTextEmpty && (
        <ul className={styles.searchKeywordWrap}>
          {!isLoading && data && <li className={styles.state}>추천 검색어</li>}
          {isLoading && <li className={styles.state}>검색 중...</li>}
          {sortedData &&
            sortedData.map((disease: IClinicalTrial, index: number) => (
              <SearchResult key={`clinical-${disease.sickCd}`} sickNm={disease.sickNm} index={index} />
            ))}
          {!isLoading && !data && <li className={styles.state}>검색어가 없습니다.</li>}
        </ul>
      )}
    </div>
  );
};

export default ModalOverlay;
