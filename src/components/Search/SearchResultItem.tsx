import cx from 'classnames';
import parse from 'html-react-parser';
import { useRecoilValue } from 'recoil';

import styles from './SearchResultItem.module.scss';

import { SearchIcon } from '../../assets';
import { boldedSickNm } from '../../libs/bold';
import { activeItemIndexState } from '../../states/search';

interface IProps {
  keyword: string;
  index: number;
  sickNm: string;
}

const SearchResultItem = ({ keyword, sickNm, index }: IProps) => {
  const activeItemIndex = useRecoilValue(activeItemIndexState);
  return (
    <li className={cx(styles.keyword, { [styles.isActive]: activeItemIndex === index })}>
      <button type='button'>
        <SearchIcon className={styles.icon} />
        <span>{parse(boldedSickNm(keyword, sickNm))}</span>
      </button>
    </li>
  );
};

export default SearchResultItem;
