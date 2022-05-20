import styles from './Routes.module.scss';

import { useRecoil, useRecoilValue } from '../hooks/state';
import { mSearchBtnClickState, searchInputValue } from '../states/search';
import MSearchModal from '../components/MSearchModal';
import { SearchIcon } from '../assets/index';
import { getClinicalTrialData } from '../services/clinicalTrial';
import { useQuery } from 'react-query';

const RootRoute = () => {
  const [mSearchClicked, setMSearchClicked] = useRecoil(mSearchBtnClickState);
  const searchText = useRecoilValue(searchInputValue);
  const isTextEmpty: boolean = searchText.trim() === '';

  const { data, isLoading, error } = useQuery(['clinicInfo', searchText], () => getClinicalTrialData(searchText), {
    enabled: !isTextEmpty,
    cacheTime: 10 * 60 * 1000, // 10분정도 캐시에 머무르고 그 이후로 가비지 콜렉터로 들어간다..
    staleTime: 5 * 60 * 1000, // 5분이 지나면 최신화가 필요하다고 생각하고 refetch
    onError(err) {
      console.log(err);
    },
  });

  const handleMSearchBtnClick = () => {
    setMSearchClicked(true);
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
          <input type='text' placeholder='질환명을 입력해 주세요.' />
          <SearchIcon className={styles.icon} />
          <button type='submit'>검색</button>
        </div>
        <button type='button' onClick={handleMSearchBtnClick} className={styles.mInputWrap}>
          <span>질환명을 입력해주세요.</span>
          <SearchIcon className={styles.icon} />
        </button>
        {!isTextEmpty && (
          <ul className={styles.searchKeywordWrap}>
            {!isLoading && data && <li className={styles.state}>추천 검색어</li>}
            {isLoading && <li className={styles.state}>검색 중...</li>}
            <li className={styles.keyword}>
              <button type='button'>
                <SearchIcon className={styles.icon} />
                <span>간암</span>
              </button>
            </li>
            {/* {data &&
              data.map((disease: IClinicalTrial, index: number) => {
                if (index > 6) return null;
                return (
                  <SearchResult
                    key={`clinical-${disease.sickCd}${Math.random()}`}
                    keyword={searchText}
                    sickNm={disease.sickNm}
                    index={index}
                  />
                );
              })} */}
            {!isLoading && !data && <li className={styles.state}>검색어가 없습니다.</li>}
          </ul>
        )}
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
