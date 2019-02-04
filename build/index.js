const _express = _interopRequireDefault(require('express'));

const _bodyParser = _interopRequireDefault(require('body-parser'));

const _classify = _interopRequireDefault(require('./routes/classify'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use(
  _bodyParser.default.urlencoded({
    extended: false,
  })
);
app.use('/classify', _classify.default);
app.get('/', function(req, res) {
  return res.send('index');
});
const port = process.env.PORT || 4000;
app.listen(port, function() {
  return console.log('Server listening in PORT: '.concat(port));
});
