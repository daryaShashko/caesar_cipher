#!/usr/bin/env node
const { PORT } = require('./common/config');
const app = require('./app');

const { program } = require('commander');

program.storeOptionsAsProperties(false).passCommandToAction(false);

program
  .requiredOption('-s, --shift [number]', 'shift for action') // args.sugar = value, optional, default is 'Low'
  .requiredOption(
    '-a, --action [decode|encode]',
    'choose one of two actions',
    /^(decode|encode)$/i
  )
  .option('-i, --input [value]', 'file for read') // args.cold = true/false, optional, default is `undefined`
  .option('-o, --output [value]', 'file for save'); // args.servedIn = value, optional, default is 'Mug'

program.parse(process.argv);
console.log(program.opts());
// const args = program.opts();
// if (args.shift === undefined || args.action === undefined)
//   console.error('ERROR!');
// if (args.action && /^(decode|encode)$/i.test(args.action))
//   console.error('ERROR! in action');
// console.log(args);

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

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

console.log(d.replace(reg, replacer));
