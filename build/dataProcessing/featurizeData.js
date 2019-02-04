Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getCombinedString = getCombinedString;
exports.processStringArray = processStringArray;
exports.formatInputData = formatInputData;
exports.featurizeData = featurizeData;

const _natural = require('natural');

function getCombinedString(arrayOfTokenizedAndSteemedString) {
  const uniqueString = [];
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
  const tokenizer = new _natural.WordTokenizer();
  return stringArray.map(function(item) {
    const tokenizedStringArray = tokenizer.tokenize(item);
    const stemmedStringArray = tokenizedStringArray.map(function(
      tokenizedString
    ) {
      return _natural.PorterStemmer.stem(tokenizedString);
    });
    return stemmedStringArray;
  });
}

function formatInputData(stemeedAndTokenizedKeyword, combinedStringValue) {
  return combinedStringValue.map(function(item) {
    if (stemeedAndTokenizedKeyword.includes(item)) return 1;
    return 0;
  });
}

function featurizeData(dataset) {
  const inputOfDataset = processStringArray(
    dataset.map(function(item) {
      return item.input;
    })
  );
  const combinedStringValue = getCombinedString(inputOfDataset);
  const formattedInputDataset = inputOfDataset.map(function(item) {
    return formatInputData(item, combinedStringValue);
  });
  const featurizedDataset = dataset.map(function(item, index) {
    // eslint-disable-next-line no-param-reassign
    const input = formattedInputDataset[index];
    return {
      input,
      output: item.output,
    };
  });
  return featurizedDataset;
}
