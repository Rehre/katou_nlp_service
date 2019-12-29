import { WordTokenizer, PorterStemmer } from 'natural';

export function formatInputData(
  stemeedAndTokenizedKeyword,
  combinedStringValue
) {
  return combinedStringValue.map(item => {
    if (stemeedAndTokenizedKeyword.includes(item)) return 1;
    return 0;
  });
}

export function getCombinedString(arrayOfTokenizedAndSteemedString) {
  const uniqueString = [];

  arrayOfTokenizedAndSteemedString.forEach(item => {
    item.forEach(word => {
      if (!uniqueString.includes(word)) {
        uniqueString.push(word);
      }
    });
  });

  return uniqueString;
}

export function processStringArray(stringArray) {
  const tokenizer = new WordTokenizer();

  return stringArray.map(item => {
    const tokenizedStringArray = tokenizer.tokenize(item);
    const stemmedStringArray = tokenizedStringArray.map(tokenizedString =>
      PorterStemmer.stem(tokenizedString)
    );

    return stemmedStringArray;
  });
}

export function featurizeData(dataset) {
  const inputOfDataset = processStringArray(dataset.map(item => item.input));
  const combinedStringValue = getCombinedString(inputOfDataset);
  const formattedInputDataset = inputOfDataset.map(item =>
    formatInputData(item, combinedStringValue)
  );
  const featurizedDataset = dataset.map((item, index) => {
    // eslint-disable-next-line no-param-reassign
    const input = formattedInputDataset[index];

    return { input, output: item.output };
  });

  return featurizedDataset;
}
