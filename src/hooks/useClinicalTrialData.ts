import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import { searchInputValue } from '../states/search';
import useDebounce from './useDebounce';
import { getClinicalTrialData } from '../services/clinicalTrial';
import { checkWord } from '../libs/checkWord';

const useClinicalTrialData = () => {
  const searchText = useRecoilValue(searchInputValue);
  const debounceInputValue = useDebounce(searchText);

  const isTextEmpty: boolean = debounceInputValue.trim() === '';

  const { data, isLoading, error } = useQuery(
    ['clinicInfo', debounceInputValue],
    () => getClinicalTrialData(debounceInputValue),
    {
      enabled: !isTextEmpty && checkWord(debounceInputValue),
      cacheTime: 10 * 60 * 1000, // 10분정도 캐시에 머무르고 그 이후로 가비지 콜렉터로 들어간다..
      staleTime: 5 * 60 * 1000, // 5분이 지나면 최신화가 필요하다고 생각하고 refetch
      onError(err) {
        window.location.reload();
      },
    }
  );
  return { data, isLoading, error, isTextEmpty };
};

export default useClinicalTrialData;
