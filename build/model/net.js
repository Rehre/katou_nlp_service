'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _brain = _interopRequireDefault(require('brain.js'));

var _katouDatasets = _interopRequireDefault(
  require('../datasets/katouDatasets')
);

var _featurizeData = require('../dataProcessing/featurizeData');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var net = new _brain.default.NeuralNetwork();
net.train((0, _featurizeData.featurizeData)(_katouDatasets.default));
var _default = net;
exports.default = _default;
