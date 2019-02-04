'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _express = _interopRequireDefault(require('express'));

var _natural = require('natural');

var _net = _interopRequireDefault(require('../model/net'));

var _featurizeData = require('../dataProcessing/featurizeData');

var _katouDatasets = _interopRequireDefault(
  require('../datasets/katouDatasets')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var router = new _express.default.Router();
router.post('/', function(req, res) {
  var keyword = req.body.keyword;
  var tokenizer = new _natural.WordTokenizer();
  var inputOfDataset = (0, _featurizeData.processStringArray)(
    _katouDatasets.default.map(function(item) {
      return item.input;
    })
  );
  var combinedStringValue = (0, _featurizeData.getCombinedString)(
    inputOfDataset
  );
  var tokenizedKeyword = tokenizer.tokenize(keyword);
  var stemmedAndTokenizedKeywordArray = tokenizedKeyword.map(function(item) {
    return _natural.PorterStemmer.stem(item);
  });
  return res
    .status(200)
    .send(
      _net.default.run(
        (0, _featurizeData.formatInputData)(
          stemmedAndTokenizedKeywordArray,
          combinedStringValue
        )
      )
    );
});
var _default = router;
exports.default = _default;
