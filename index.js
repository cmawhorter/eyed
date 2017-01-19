'use strict';

var uuid  = require('uuid');
var BaseX = require('base-x');
var basex = BaseX('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

var ids = module.exports = {
  separator: '_',

  uuid: function() {
    var buffer = new Buffer(16);
    uuid.v4(null, buffer);
    return basex.encode(buffer);
  },

  id: function(prefix, separator) {
    separator = void 0 === separator ? ids.separator : separator || '';
    return prefix + separator + ids.uuid();
  },
}
