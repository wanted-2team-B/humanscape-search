import axios from 'axios';
import { IClinicalTrial, IClinicalTrials } from '../types/clinicalTrial';

let number = 0;

export const getClinicalTrialData = async (searchText: string): Promise<IClinicalTrial[]> => {
  try {
    const { data } = await axios.get<IClinicalTrials>(
      `/B551182/diseaseInfoService/getDissNameCodeList?ServiceKey=${process.env.REACT_APP_API_KEY}`,
      {
        params: {
          searchText,
          numOfRows: 30, // 큰 화면으로 보면 검색결과가 7개 이상임
          pageNo: 1,
          sickType: 1,
          diseaseType: 'SICK_NM',
          medTp: 2,
        },
      }
    );
    const emptyArr: IClinicalTrial[] = [];
    const { items, totalCount } = data.response.body;
    const responseItem = items.item;
    number += 1;

    console.log('api call count: ', number);
    if (totalCount !== 1) {
      return responseItem;
    }

    return emptyArr.concat(responseItem);
  } catch (error) {
    throw new Error('API 호출 실패');
  }
};
