export const checkWord = (keyword: string): boolean => {
  // eslint-disable-next-line
  const pattern = /([^가-힣A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s\x20])/i;
  if (pattern.test(keyword)) {
    return false;
  }
  return true;
};
