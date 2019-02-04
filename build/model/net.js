Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _brain = _interopRequireDefault(require('brain.js'));

const _katouDatasets = _interopRequireDefault(
  require('../datasets/katouDatasets')
);

const _featurizeData = require('../dataProcessing/featurizeData');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const net = new _brain.default.NeuralNetwork();
net.train((0, _featurizeData.featurizeData)(_katouDatasets.default));
const _default = net;
exports.default = _default;
