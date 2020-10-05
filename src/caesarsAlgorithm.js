const ALPHABET_LENGTH = 26;
const FIRST_LOWERCASE_CODE = 65;
const LAST_LOWERCASE_CODE = 90;
const FIRST_UPPERCASE_CODE = 97;
const LAST_UPPERCASE_CODE = 122;
const reg = /[a-zA-Z]+/g;

const shift = 3;
// const c = 'yzawxpeaasWQasd maskdmWpasdXZzdfae+0342 +231\n';
const d = 'bcdzashddvZTdvg pdvngpZsdvgACcgidh+0342 +231\n';
const isActionDecode = true;

const replacer = word => {
  const arr = [...word].map(char => {
    const trueShift = isActionDecode
      ? (ALPHABET_LENGTH - shift) % ALPHABET_LENGTH
      : shift;
    const code = char.charCodeAt(0);
    if (code >= FIRST_LOWERCASE_CODE && code <= LAST_LOWERCASE_CODE) {
      return (
        ((code - FIRST_LOWERCASE_CODE + trueShift) % ALPHABET_LENGTH) +
        FIRST_LOWERCASE_CODE
      );
    } else if (code >= FIRST_UPPERCASE_CODE && code <= LAST_UPPERCASE_CODE) {
      return (
        ((code - FIRST_UPPERCASE_CODE + trueShift) % ALPHABET_LENGTH) +
        FIRST_UPPERCASE_CODE
      );
    }
  });
  return String.fromCharCode(...arr);
};

// const caeserCoder = (text, shift, decode) => {
//   text.replace(reg, replacer);
// };

console.log(d.replace(reg, replacer));
