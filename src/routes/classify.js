import express from 'express';
import { WordTokenizer, PorterStemmer } from 'natural';

import net from '../model/net';

import {
  processStringArray,
  getCombinedString,
  formatInputData,
} from '../dataProcessing/featurizeData';
import katouDatasets from '../datasets/katouDatasets';

const router = new express.Router();

router.post('/', (req, res) => {
  const { keyword } = req.body;
  const tokenizer = new WordTokenizer();

  const inputOfDataset = processStringArray(
    katouDatasets.map(item => item.input)
  );
  const combinedStringValue = getCombinedString(inputOfDataset);

  const tokenizedKeyword = tokenizer.tokenize(keyword);
  const stemmedAndTokenizedKeywordArray = tokenizedKeyword.map(item =>
    PorterStemmer.stem(item)
  );

  return res
    .status(200)
    .send(
      net.run(
        formatInputData(stemmedAndTokenizedKeywordArray, combinedStringValue)
      )
    );
});

export default router;
