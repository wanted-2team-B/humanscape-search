import { atom } from '../hooks/state';

export const mSearchBtnClickState = atom<Boolean>({
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
