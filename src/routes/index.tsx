import styles from './Routes.module.scss';

import { useRecoil } from '../hooks/state';
import { mSearchBtnClickState } from '../states/search';
import MSearchModal from '../components/MSearchModal';
import { SearchIcon } from '../assets/index';

const RootRoute = () => {
  const [mSearchClicked, setMSearchClicked] = useRecoil(mSearchBtnClickState);

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
