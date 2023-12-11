export const randomPassGenerator = (
  upperCaseLetters: number,
  lowerCaseLetters: number,
  numbers: number,
  special: number,
) => {
  const chars = [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ', // upperCaseLetters
    'abcdefghijklmnopqrstuvwxyz', // lowerCaseLetters
    '0123456789', // numbers
    '~!#$%&*-+|', // special chars
  ];

  const randInt = (this_max: number) => {
    const umax = Math.pow(2, 32);
    const max = umax - (umax % this_max);
    const r = new Uint32Array(1);
    do {
      crypto.getRandomValues(r);
    } while (r[0] > max);
    return r[0] % this_max;
  };

  const randCharFrom = (chars: string) => {
    return chars[randInt(chars.length)];
  };

  const shuffle = (arr: string[]) => {
    for (let i = 0, n = arr.length; i < n - 2; i++) {
      const j = randInt(n - i);
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  };

  return shuffle(
    [upperCaseLetters, lowerCaseLetters, numbers, special]
      .map(function (len, i) {
        return Array(len)
          .fill(chars[i])
          .map((x) => randCharFrom(x))
          .join('');
      })
      .concat()
      .join('')
      .split(''),
  ).join('');
};
