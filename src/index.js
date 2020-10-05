#!/usr/bin/env node
const fs = require('fs').promises;
const caeserCoder = require('./caesarsAlgorithm');

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

const ceaserToFile = ({
  input: inputUrl,
  output: outputUrl,
  shift,
  action
}) => {
  return fs
    .readFile(inputUrl, 'utf8')
    .then(content =>
      fs.writeFile(outputUrl, caeserCoder(content, shift, action))
    )
    .catch(err => console.error(err));
};

ceaserToFile(props).then(
  () => console.log('DONE!!'),
  () => console.error('SOMETHING WRONG')
);
