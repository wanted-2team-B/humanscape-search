import ReactDOM from 'react-dom';

import { useState } from 'react';
import { useRecoil } from '../hooks/state';
import { mSearchBtnClickState } from '../states/search';
import { BackIcon, SearchIcon, ClearIcon } from '../assets/index';
import styles from './MSearchModal.module.scss';

const ModalOverlay = () => {
  const [, setMSearchClicked] = useRecoil(mSearchBtnClickState);
  const [enteredInput, setEnteredInput] = useState('');
  const [showClearValueBtn, setShowClearValueBtn] = useState(false);

  const handleSearchModalClose = () => {
    setMSearchClicked(false);
  };

  const handleEnteredInput = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredInput(event.currentTarget.value);
    if (enteredInput.length > 0) setShowClearValueBtn(true);
    else setShowClearValueBtn(false);
  };

  const handleClearInput = () => {
    setEnteredInput('');
    setShowClearValueBtn(false);
  };

  return (
    <div className={styles.modalWrap}>
      <div className={styles.searchWrap}>
        <button type='button' className={styles.backBtn} onClick={handleSearchModalClose}>
          <BackIcon className={styles.backIcon} />
        </button>
        <input type='text' value={enteredInput} onChange={handleEnteredInput} placeholder='질환명을 입력해 주세요.' />
        {showClearValueBtn && (
          <button type='button' onClick={handleClearInput}>
            <ClearIcon className={styles.clearIcon} />
          </button>
        )}
        <button type='submit'>
          <SearchIcon className={styles.searchIcon} />
        </button>
      </div>
      <ul className={styles.searchKeywordWrap}>
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
      </ul>
    </div>
  );
};

const MSearchModal = () => {
  return <>{ReactDOM.createPortal(<ModalOverlay />, document.getElementById('overlay-root') as HTMLInputElement)}</>;
};

export default MSearchModal;
