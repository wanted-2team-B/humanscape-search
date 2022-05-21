import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';

import { searchInputValue } from '../states/search';
import useDebounce from './useDebounce';
import { getClinicalTrialData } from '../services/clinicalTrial';
import { checkWord } from '../libs/checkWord';
import { AxiosError } from 'axios';

const useClinicalTrialData = () => {
  const searchText = useRecoilValue(searchInputValue);
  const debounceInputValue = useDebounce(searchText);

  const isTextEmpty: boolean = debounceInputValue.trim() === '';

  const { data, isLoading, error } = useQuery(
    ['clinicInfo', debounceInputValue],
    () => getClinicalTrialData(debounceInputValue),
    {
      enabled: !isTextEmpty && checkWord(debounceInputValue),
      cacheTime: 10 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
      onError(err: AxiosError) {
        toast.remove();
        toast.error(`${err.message}! 새로 고침 해주세요.`);
      },
    }
  );
  return { data, isLoading, error, isTextEmpty };
};

export default useClinicalTrialData;
