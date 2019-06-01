'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (callback) {
  _mongoose2.default.promise = global.Promise;
  var uristring = 'mongodb://localhost/authsearch';
  _mongoose2.default.connect(uristring, {
    useNewUrlParser: true
  }, function (err) {
    if (err) {
      console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
      console.log('Succeeded connected to: ' + uristring);
    }
  });
  callback();
};
//# sourceMappingURL=db.js.map