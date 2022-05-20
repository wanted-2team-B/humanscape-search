import { atom } from '../hooks/state';

export const mSearchBtnClickState = atom<boolean>({
  key: 'mSearchBtnClickState',
  default: false,
});

export const searchInputValue = atom<string>({
  key: 'searchInputValue',
  default: '',
});
