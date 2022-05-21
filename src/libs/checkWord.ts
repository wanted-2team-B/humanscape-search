export const checkWord = (keyword: string): boolean => {
  const start = 44032;
  const end = 55203;

  let isPerfect: boolean = true;

  const wordArr = keyword.split('').map((word) => word.charCodeAt(0));

  for (let i = 0; i < wordArr.length; i += 1) {
    if (wordArr[i] < start) isPerfect = false;
    if (wordArr[i] > end) isPerfect = false;
  }

  return isPerfect;
};
