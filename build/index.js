'use strict';

var _express = _interopRequireDefault(require('express'));

var _bodyParser = _interopRequireDefault(require('body-parser'));

var _cors = _interopRequireDefault(require('cors'));

var _classify = _interopRequireDefault(require('./routes/classify'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use(
  _bodyParser.default.urlencoded({
    extended: false,
  })
);
app.use((0, _cors.default)());
app.use('/classify', _classify.default);
app.get('/', function(req, res) {
  return res.send('index');
});
var port = process.env.PORT || 4000;
app.listen(port, function() {
  return console.log('Server listening in PORT: '.concat(port));
});
