var _ = require('underscore');
var WindshaftError = require('./error');

var parseWindshaftErrors = function (response) {
  response = response || {};
  if (response.errors_with_context) {
    return _.map(response.errors_with_context, function (error) {
      return new WindshaftError(error);
    });
  }
  if (response.errors) {
    var content = typeof response.errors[0] === 'string'
      ? { message: response.errors[0] }
      : response.errors[0];

    return [
      new WindshaftError(content)
    ];
  }
  return [];
};

module.exports = parseWindshaftErrors;
