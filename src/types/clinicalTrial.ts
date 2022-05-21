export interface IClinicalTrials {
  response: {
    body: {
      items: {
        item: IClinicalTrial[];
      };
      totalCount: number;
    };
  };
}

export interface IClinicalTrial {
  sickCd: string;
  sickNm: string;
}

