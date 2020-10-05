#!/usr/bin/env node
const fs = require('fs').promises;
const caeserCoder = require('./caesarsAlgorithm');
const props = require('./props');

const ceaserToFile = ({
  input: inputUrl,
  output: outputUrl,
  shift,
  action
}) => {
  return fs
    .readFile(inputUrl, 'utf8')
    .then(content => {
      const transformedContent = caeserCoder(content, shift, action);
      return fs.appendFile(outputUrl, transformedContent);
    })
    .catch(err => console.error(err));
};

ceaserToFile(props).then(
  () => console.log('DONE!!'),
  () => console.error('SOMETHING WRONG')
);
