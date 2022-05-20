import { atom } from '../hooks/state';

export const mSearchBtnClickState = atom<Boolean>({
  key: 'mSearchBtnClickState',
  default: false,
});
