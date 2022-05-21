import { IClinicalTrial } from '../types/clinicalTrial';

export const sortResult = (resultArr: IClinicalTrial[], keyword: string): IClinicalTrial[] => {
  if (!resultArr) return [];

  return resultArr.slice().sort((resultA, resultB) => {
    if (resultA.sickNm.indexOf(keyword) < resultB.sickNm.indexOf(keyword)) {
      return -1;
    }
    if (resultA.sickNm.indexOf(keyword) > resultB.sickNm.indexOf(keyword)) {
      return 1;
    }
    return 0;
  });
};
