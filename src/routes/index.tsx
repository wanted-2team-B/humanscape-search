import { FormEvent } from 'react';
import cx from 'classnames';
import styles from './Routes.module.scss';
import { IClinicalTrial, IKeyboard } from '../types/clinicalTrial';
import { mSearchBtnClickState, searchInputValue, activeIndexState } from '../states/search';
import MSearchModal from '../components/Modal/MSearchModal';
import { SearchIcon } from '../assets/index';
import { getClinicalTrialData } from '../services/clinicalTrial';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import useDebounce from '../hooks/useDebounce';
import Input from '../components/Input/Input';
import SearchResultItem from '../components/Search/SearchResultItem';

const RootRoute = () => {
  const [mSearchClicked, setMSearchClicked] = useRecoilState(mSearchBtnClickState);

  const searchText = useRecoilValue(searchInputValue);
  const debounceInputValue = useDebounce(searchText);
  const isTextEmpty: boolean = debounceInputValue.trim() === '';

  const { data, isLoading, error } = useQuery(
    ['clinicInfo', debounceInputValue],
    () => getClinicalTrialData(debounceInputValue),
    {
      enabled: !isTextEmpty,
      cacheTime: 10 * 60 * 1000, // 10분정도 캐시에 머무르고 그 이후로 가비지 콜렉터로 들어간다..
      staleTime: 5 * 60 * 1000, // 5분이 지나면 최신화가 필요하다고 생각하고 refetch
      onError(err) {
        console.log(err);
      },
    }
  );

  const handleMSearchBtnClick = () => {
    setMSearchClicked(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className={styles.app} onSubmit={handleSubmit}>
      {mSearchClicked && <MSearchModal data={data} isTextEmpty={isTextEmpty} isLoading={isLoading} />}
      <div className={styles.mainWrap}>
        <h1 className={styles.title}>
          국내 모든 임상시험 검색하고
          <br /> 온라인으로 참여하기
        </h1>
        <div className={styles.inputWrap}>
          <Input data={data} />
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
            {data &&
              data.map((disease: IClinicalTrial, index: number) => (
                <SearchResultItem
                  key={`clinical-${disease.sickCd}${Math.random()}`}
                  keyword={searchText}
                  sickNm={disease.sickNm}
                  index={index}
                />
              ))}
            {!isLoading && !data && <li className={styles.state}>검색어가 없습니다.</li>}
          </ul>
        )}
      </div>
    </form>
  );
};

export default RootRoute;
