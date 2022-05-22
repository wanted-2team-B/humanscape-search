import { useEffect, useRef } from 'react';

import { useRecoilValue } from 'recoil';
import cx from 'classnames';
import parse from 'html-react-parser';

import styles from './SearchResultItem.module.scss';

import { boldedSickNm } from '../../utils/bold';
import { activeIndexState, searchInputValue } from '../../recoil/search';
import { SearchIcon } from '../../assets/index';

interface IProps {
  index: number;
  sickNm: string;
}

const SearchResultItem = ({ sickNm, index }: IProps) => {
  const searchText = useRecoilValue(searchInputValue);
  const activeIndex = useRecoilValue(activeIndexState);

  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (itemRef.current && index === activeIndex) {
      itemRef.current.scrollIntoView(false);
    }
  }, [index, activeIndex]);

  return (
    <li className={cx(styles.keyword, { [styles.isActive]: activeIndex === index })} ref={itemRef}>
      <button type='button'>
        <SearchIcon className={styles.icon} />
        <span>{parse(boldedSickNm(searchText, sickNm))}</span>
      </button>
    </li>
  );
};

export default SearchResultItem;
