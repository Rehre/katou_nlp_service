'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.formatInputData = formatInputData;
exports.getCombinedString = getCombinedString;
exports.processStringArray = processStringArray;
exports.featurizeData = featurizeData;

var _natural = require('natural');

function formatInputData(stemeedAndTokenizedKeyword, combinedStringValue) {
  return combinedStringValue.map(function(item) {
    if (stemeedAndTokenizedKeyword.includes(item)) return 1;
    return 0;
  });
}

function getCombinedString(arrayOfTokenizedAndSteemedString) {
  var uniqueString = [];
  arrayOfTokenizedAndSteemedString.forEach(function(item) {
    item.forEach(function(word) {
      if (!uniqueString.includes(word)) {
        uniqueString.push(word);
      }
    });
  });
  return uniqueString;
}

function processStringArray(stringArray) {
  var tokenizer = new _natural.WordTokenizer();
  return stringArray.map(function(item) {
    var tokenizedStringArray = tokenizer.tokenize(item);
    var stemmedStringArray = tokenizedStringArray.map(function(
      tokenizedString
    ) {
      return _natural.PorterStemmer.stem(tokenizedString);
    });
    return stemmedStringArray;
  });
}

function featurizeData(dataset) {
  var inputOfDataset = processStringArray(
    dataset.map(function(item) {
      return item.input;
    })
  );
  var combinedStringValue = getCombinedString(inputOfDataset);
  var formattedInputDataset = inputOfDataset.map(function(item) {
    return formatInputData(item, combinedStringValue);
  });
  var featurizedDataset = dataset.map(function(item, index) {
    // eslint-disable-next-line no-param-reassign
    var input = formattedInputDataset[index];
    return {
      input: input,
      output: item.output,
    };
  });
  return featurizedDataset;
}
