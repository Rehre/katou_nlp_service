Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = _interopRequireDefault(require('express'));

const _natural = require('natural');

const _net = _interopRequireDefault(require('../model/net'));

const _featurizeData = require('../dataProcessing/featurizeData');

const _katouDatasets = _interopRequireDefault(
  require('../datasets/katouDatasets')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const router = new _express.default.Router();
router.post('/', function(req, res) {
  const keyword = req.body.keyword;
  const tokenizer = new _natural.WordTokenizer();
  const inputOfDataset = (0, _featurizeData.processStringArray)(
    _katouDatasets.default.map(function(item) {
      return item.input;
    })
  );
  const combinedStringValue = (0, _featurizeData.getCombinedString)(
    inputOfDataset
  );
  const tokenizedKeyword = tokenizer.tokenize(keyword);
  const stemmedAndTokenizedKeywordArray = tokenizedKeyword.map(function(item) {
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
const _default = router;
exports.default = _default;
