const ALPHABET_LENGTH = 26;
const FIRST_LOWERCASE_CODE = 65;
const LAST_LOWERCASE_CODE = 90;
const FIRST_UPPERCASE_CODE = 97;
const LAST_UPPERCASE_CODE = 122;
const reg = /[a-zA-Z]+/g;

const replacer = (word, shift, action) => {
  const isActionDecode = action === 'decode';
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

module.exports = function ceaser(text, shift, action) {
  return text.replace(reg, word => replacer(word, shift, action));
};
