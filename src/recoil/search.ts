import { atom } from 'recoil';

export const mSearchBtnClickState = atom<boolean>({
  key: 'mSearchBtnClickState',
  default: false,
});

export const searchInputValue = atom<string>({
  key: 'searchInputValue',
  default: '',
});

export const activeIndexState = atom<number>({
  key: 'activeIndexState',
  default: -1,
});
