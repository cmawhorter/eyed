'use strict';

var expect = require('expect');
var D = require('../index.js');

var re_base62 = /^[0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]{20,22}$/;

describe('D', function() {
  describe('#uuid', function() {
    it('should generate a random uuid base62 encoded', function() {
      var one = D.uuid();
      expect(one).toMatch(re_base62);
      var two = D.uuid();
      expect(two).toMatch(re_base62);
      expect(one).toNotEqual(two);
    });
  });

  describe('#id', function() {
    it('should generate an id with a prefix', function() {
      var one = D.id('!', D.separator);
      var parts = one.split(D.separator);
      expect(parts.length).toEqual(2);
      expect(parts[0]).toEqual('!');
      expect(parts[1]).toMatch(re_base62);
    });

    it('should default to D.separator', function() {
      var one = D.id('!');
      expect(one.substr(0, 2)).toEqual('!_');
    });

    it('should allow any separator', function() {
      var one = D.id('!', 'any');
      expect(one.substr(0, 4)).toEqual('!any');
    });

    it('should not add a separator for null or empty string', function() {
      expect(D.id('!', null).substr(1)).toMatch(re_base62);
      expect(D.id('!', '').substr(1)).toMatch(re_base62);
    });
  });

  describe('#create', function() {
    it('should have a helper that does stuff', function() {
      var prefixed = D.create('!', D.separator);
      var prefixed2 = D.create('*', D.separator);
      var one = prefixed();
      var parts = one.split(D.separator);
      expect(parts.length).toEqual(2);
      expect(parts[0]).toEqual('!');
      expect(parts[1]).toMatch(re_base62);
      var two = prefixed();
      expect(one).toNotEqual(two);
      expect(prefixed()).toContain('!').toNotContain('*');
      expect(prefixed2()).toContain('*').toNotContain('!');
    });
  });
});
