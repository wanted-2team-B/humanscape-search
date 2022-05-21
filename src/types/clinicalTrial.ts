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

export interface IKeyboard {
  key: string;
  keyCode: number;
  preventDefault: () => void;
}
