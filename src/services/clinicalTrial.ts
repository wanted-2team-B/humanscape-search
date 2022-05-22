import axios from 'axios';
import { IClinicalTrial, IClinicalTrials } from '../types/clinicalTrial';
import { sortResult } from '../utils/sort';

let number = 0;

const PROXY = window.location.hostname === 'localhost' ? '/B551182/diseaseInfoService/getDissNameCodeList' : '/proxy';

export const getClinicalTrialData = async (searchText: string): Promise<IClinicalTrial[]> => {
  try {
    const { data } = await axios.get<IClinicalTrials>(`${PROXY}?ServiceKey=${process.env.REACT_APP_API_KEY}`, {
      params: {
        searchText,
        numOfRows: 30,
        pageNo: 1,
        sickType: 1,
        diseaseType: 'SICK_NM',
        medTp: 2,
      },
    });
    const singleItemArr: IClinicalTrial[] = [];
    const { items, totalCount } = data.response.body;
    const responseItem = items.item;
    number += 1;

    // eslint-disable-next-line no-console
    console.log('api call count: ', number);
    if (totalCount !== 1) {
      return sortResult(responseItem, searchText);
    }

    return sortResult(singleItemArr.concat(responseItem), searchText);
  } catch (error) {
    throw new Error('API 호출 실패');
  }
};
