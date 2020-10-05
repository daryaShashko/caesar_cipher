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
const genCharObj = () => {
  let i = 'a'.charCodeAt(0);
  const j = 'z'.charCodeAt(0);
  let ii = 'A'.charCodeAt(0);
  const jj = 'Z'.charCodeAt(0);
  const b = [
    ...Array.from({ length: jj - ii + 1 }, () => ii++),
    ...Array.from({ length: j - i + 1 }, () => i++)
  ];
  return b.reduce(
    (acc, chCode) => ({
      ...acc,
      [String.fromCharCode(chCode)]: chCode
    }),
    {}
  );
};

console.log(genCharObj());
