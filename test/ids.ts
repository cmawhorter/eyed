import { expect } from 'chai';
import { create, id, parseId, uuid, validId } from '../src/main';

const re_base62 = /^[0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]{18,24}$/;

describe('eyed', function() {
  describe('#uuid', function() {
    it('should generate a random uuid base62 encoded', function() {
      const one = uuid();
      expect(one).to.match(re_base62);
      const two = uuid();
      expect(two).to.match(re_base62);
      expect(one).to.not.equal(two);
    });
  });

  describe('#id', function() {
    it('should generate an id with a prefix', function() {
      const one = id('!', '_');
      const parts = one.split('_');
      expect(parts.length).to.equal(2);
      expect(parts[0]).to.equal('!');
      expect(parts[1]).to.match(re_base62);
    });

    it('should default to separator', function() {
      const one = id('!');
      expect(one.substr(0, 2)).to.equal('!_');
    });

    it('should allow any separator', function() {
      const one = id('!', 'any');
      expect(one.substr(0, 4)).to.equal('!any');
    });

    it('should not add a separator for null or empty string', function() {
      expect(id('!', null).substr(1)).to.match(re_base62);
      expect(id('!', '').substr(1)).to.match(re_base62);
    });
  });

  describe('#create', function() {
    it('should have a helper that does stuff', function() {
      const prefixed = create('!', '_');
      const prefixed2 = create('*', '_');
      const one = prefixed();
      const parts = one.split('_');
      expect(parts.length).to.equal(2);
      expect(parts[0]).to.equal('!');
      expect(parts[1]).to.match(re_base62);
      const two = prefixed();
      expect(one).to.not.equal(two);
      expect(prefixed()).to.contain('!').to.not.contain('*');
      expect(prefixed2()).to.contain('*').to.not.contain('!');
    });
  });

  describe('parseId', () => {
    it('should parse an id', () => {
      const parsed = parseId('a_b', 'a', '_');
      expect(parsed).to.deep.equal({ prefix: 'a', separator: '_', uuid: 'b' });
    });
    it('should parse an id with a string separator', () => {
      const parsed = parseId('ahellob', 'a', 'hello');
      expect(parsed).to.deep.equal({ prefix: 'a', separator: 'hello', uuid: 'b' });
    });
    it('should parse an id without a separator', () => {
      expect(parseId('ab', 'a', null)).to.deep.equal({ prefix: 'a', separator: '', uuid: 'b' });
      expect(parseId('ab', 'a', '')).to.deep.equal({ prefix: 'a', separator: '', uuid: 'b' });
    });
    it('should throw if id is not parseable', () => {
      expect(() => parseId('a', 'a', '')).throws(/malformed id/, 'missing uuid');
      expect(() => parseId('a_', 'a', '_')).throws(/malformed id/, 'missing uuid2');
      expect(() => parseId('_b', 'a', '_')).throws(/malformed id/, 'missing prefix');
      expect(() => parseId('a_b_c', 'a', '_')).throws(/malformed id/, 'too many separators');
    });
  });

  describe('validId', () => {
    it('should return true for a valid id', () => {
      expect(validId('card_a', 'card', '_')).to.equal(true);
    });
    it('should return false for an invalid id', () => {
      expect(validId('card_+', 'card', '_')).to.equal(false);
    });
    it('should return false for an id with valid base62 in strict mode', () => {
      expect(validId('card_a', 'card', '_', true)).to.equal(false);
    });
    it('should return false for an id with valid base62 in strict mode', () => {
      expect(validId(id('card', '_'), 'card', '_', true)).to.equal(true);
    });
  });
});
