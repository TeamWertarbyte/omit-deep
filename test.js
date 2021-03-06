'use strict';

require('mocha');
var assert = require('assert');
var omitDeep = require('./');

describe('.omit()', function() {
  it('should always return the given value', function() {
    assertReturn(undefined);
    assertReturn(null);
    assertReturn(false);
    assertReturn(true);
    assertReturn('foo');
    assertReturn(42);
    assertReturn(new Date());
    assertReturn([]);
    assertReturn({ key: 'item' });

    function assertReturn(value) {
      // should return the unchanged object
      assert.strictEqual(omitDeep(value), value);
      // or the changed object
      assert.strictEqual(omitDeep(value, ['key']), value);
    }
  });

  it('should omit keys using dot notation', function() {
    var obj = omitDeep({a: {b: {c: {d: {e: 'e'}, f: {g: 'g'}}}}}, 'a.b.c.d');
    assert.deepEqual(obj, {a: {b: {c: {f: {g: 'g'}}}}});
  });

  it('should omit multiple keys using dot notation', function() {
    var obj = omitDeep({a: {x: 'y', b: {c: {d: {e: 'e'}, f: {g: 'g'}}}}}, ['a.b.c.d', 'a.x']);
    assert.deepEqual(obj, {a: {b: {c: {f: {g: 'g'}}}}});
  });

  it('should recursively omit key passed as a string.', function() {
    var obj = omitDeep({a: 'a', b: 'b', c: {b: 'b', d: 'd', e: {b: 'b', f: 'f', g: {b: 'b', c: 'c'}}}}, 'b');
    assert.deepEqual(obj, {a: 'a', c: {d: 'd', e: {f: 'f', g: {c: 'c'}}}});
  });

  it('should recursively omit key passed as an array.', function() {
    var obj = omitDeep({a: 'a', b: 'b', c: {b: 'b', d: 'd', e: {b: 'b', f: 'f', g: {b: 'b', c: 'c'}}}}, ['b']);
    assert.deepEqual(obj, {a: 'a', c: {d: 'd', e: {f: 'f', g: {c: 'c'}}}});
  });

  it('should recursively omit multiple keys.', function() {
    var obj = omitDeep({a: 'a', b: 'b', c: {b: 'b', d: 'd', e: {b: 'b', f: 'f', g: {b: 'b', c: 'c'}}}}, ['b', 'd', 'f']);
    assert.deepEqual(obj, {a: 'a', c: {e: {g: {c: 'c'}}}});
  });

  it('should omit the given keys.', function() {
    assert.deepEqual(omitDeep({a: 'a', b: 'b', c: 'c'}, ['a', 'c']), { b: 'b' });
  });

  it('should return the object unchanged if no keys are specified.', function() {
    assert.deepEqual(omitDeep({a: 'a', b: 'b', c: 'c'}), {a: 'a', b: 'b', c: 'c'});
  });

  it('should omit keys from objects in arrays', function() {
    var obj = omitDeep([
      {a: 'a', b: 'b'},
      [
        {a: 'a', b: 'b'}
      ]
    ], 'b');
    assert.deepEqual(obj, [
      {a: 'a'},
      [
        {a: 'a'}
      ]
    ]);
  });

  it('should preserve arrays when not omitting objects from them', function() {
    var obj = omitDeep({
      'numbers': ['1', '2']
    }, 'nothing');

    assert.deepEqual(obj, {
      'numbers': ['1', '2']
    });
  });

  it('should be immutable if inplace is false', function() {
    var old = {a: 'a', b: 'b', c: {b: 'b', d: 'd', e: {b: 'b', f: 'f', g: {b: 'b', c: 'c'}}}};
    var obj = omitDeep(old, ['b', 'd', 'f'], false);
    assert.notStrictEqual(old, obj); // new reference

    old = Object.freeze(old);
    obj = omitDeep(old, ['b', 'd', 'f'], false);
    assert.deepEqual(obj, {a: 'a', c: {e: {g: {c: 'c'}}}}); // immutable, so works with frozen object
  });

  it('should only return a new reference if things were changed if inplace is false', function() {
    var old = Object.freeze({a: 'a', b: 'b', c: {b: 'b', d: 'd', e: [{b: 'b'}, {f: 'f', g: {b: 'b', c: 'c'}}]}});
    var obj = omitDeep(old, ['b', 'd', 'f'], false);
    assert.notStrictEqual(old, obj); // changed
    assert.strictEqual(old, omitDeep(old, ['x', 'y', 'z'], false)); // not changed
  });

  it('should automatically turn off inplace mode if the object is frozen', function() {
    var old = Object.freeze({a: 'a', b: 'b', c: {b: 'b', d: 'd', e: [{b: 'b'}, {f: 'f', g: {b: 'b', c: 'c'}}]}});
    var obj;
    assert.doesNotThrow(() => {
      obj = omitDeep(old, ['b', 'd', 'f']);
    });
    assert.notStrictEqual(old, obj);

    // explicitly enable inplace mode, should throw
    assert.throws(() => {
      omitDeep(old, ['b', 'd', 'f'], true);
    }, TypeError);
  })
});
