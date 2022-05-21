import cx from 'classnames';
import parse from 'html-react-parser';
import { useRecoilValue } from 'recoil';

import styles from './SearchResultItem.module.scss';

import { boldedSickNm } from '../../libs/bold';
import { activeItemIndexState, searchInputValue } from '../../states/search';
import { SearchIcon } from '../../assets';

interface IProps {
  index: number;
  sickNm: string;
}

const SearchResultItem = ({ sickNm, index }: IProps) => {
  const searchText = useRecoilValue(searchInputValue);
  const activeItemIndex = useRecoilValue(activeItemIndexState);

  return (
    <li className={cx(styles.keyword, { [styles.isActive]: activeItemIndex === index })}>
      <button type='button'>
        <SearchIcon className={styles.icon} />
        <span>{parse(boldedSickNm(searchText, sickNm))}</span>
      </button>
    </li>
  );
};

export default SearchResultItem;
