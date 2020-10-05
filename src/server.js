#!/usr/bin/env node
const { PORT } = require('./common/config');
const app = require('./app');
const caeserCoder = require('./caesarsAlgorithm');
const fs = require('fs').promises;

const { program } = require('commander');

program.storeOptionsAsProperties(false).passCommandToAction(false);

const myParseInt = value => {
  if (!Number(value)) {
    console.error('error: no shift, please enter shift for make action');
    // eslint-disable-next-line no-process-exit
    return process.exit();
  }
  return parseInt(value, 10);
};

const actionParser = value => {
  const regex = /\b(code|decode)\b/;
  const isValid = value && regex.test(value);
  if (!isValid) {
    console.error('error: please, use only decode or code names for action');
    // eslint-disable-next-line no-process-exit
    return process.exit();
  }
  return value;
};

program
  .requiredOption('-s, --shift <number>', 'shift for action', myParseInt)
  .requiredOption('-a, --action <value>', 'decode or code text', actionParser)
  .option('-i, --input <value>', 'file for read')
  .option('-o, --output <value>', 'file for save')
  .parse(process.argv);

const props = program.opts();
console.log(props);

const ceaserToFile = ({
  input: inputUrl,
  output: outputUrl,
  shift,
  action
}) => {
  console.log('--------', caeserCoder);
  return fs
    .readFile(inputUrl, 'utf8')
    .then(content =>
      fs.writeFile(outputUrl, caeserCoder(content, shift, action))
    )
    .catch(err => console.error(err));
};

ceaserToFile(props);
//
// const fileReader = url => {
//   fs.readFile(url, 'utf8', (err, data) => {
//     if (err) {
//       return console.log(err);
//     }
//     console.log(data);
//   });
// };
//
// const fileWriter = url => {
//   fs.writeFile(url);
// };

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

// const ALPHABET_LENGTH = 26;
// const FIRST_LOWERCASE_CODE = 65;
// const LAST_LOWERCASE_CODE = 90;
// const FIRST_UPPERCASE_CODE = 97;
// const LAST_UPPERCASE_CODE = 122;
// const reg = /[a-zA-Z]+/g;
//
// const shift = 3;
// // const c = 'yzawxpeaasWQasd maskdmWpasdXZzdfae+0342 +231\n';
// const d = 'bcdzashddvZTdvg pdvngpZsdvgACcgidh+0342 +231\n';
// const isActionDecode = true;
//
// const replacer = word => {
//   const arr = [...word].map(char => {
//     const trueShift = isActionDecode
//       ? (ALPHABET_LENGTH - shift) % ALPHABET_LENGTH
//       : shift;
//     const code = char.charCodeAt(0);
//     if (code >= FIRST_LOWERCASE_CODE && code <= LAST_LOWERCASE_CODE) {
//       return (
//         ((code - FIRST_LOWERCASE_CODE + trueShift) % ALPHABET_LENGTH) +
//         FIRST_LOWERCASE_CODE
//       );
//     } else if (code >= FIRST_UPPERCASE_CODE && code <= LAST_UPPERCASE_CODE) {
//       return (
//         ((code - FIRST_UPPERCASE_CODE + trueShift) % ALPHABET_LENGTH) +
//         FIRST_UPPERCASE_CODE
//       );
//     }
//   });
//   return String.fromCharCode(...arr);
// };
//
// console.log(d.replace(reg, replacer));
