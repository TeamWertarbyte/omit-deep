# omit-deep [![NPM version](https://badge.fury.io/js/omit-deep.svg)](http://badge.fury.io/js/omit-deep)


> Recursively omit specified keys from an object.

## Install
#### Install with [npm](npmjs.org):

```bash
npm i omit-deep --save-dev
```

## Run tests

```bash
npm test
```

## Usage

```js
var omitDeep = require('omit-deep');

omitDeep({a: 'a', b: 'b', c: {b: 'b', d: {b: 'b', f: 'f'}}});
//=> {a: 'a', c: {d: {f: 'f'}}}
```

### Other javascript/node.js utils

Other projects that I maintain:

  - [arr](https://github.com/jonschlinkert/arr)
  - [arr-diff](https://github.com/jonschlinkert/arr-diff)
  - [arr-flatten](https://github.com/jonschlinkert/arr-flatten)
  - [array-last](https://github.com/jonschlinkert/array-last)
  - [array-slice](https://github.com/jonschlinkert/array-slice)
  - [array-sum](https://github.com/jonschlinkert/array-sum)
  - [arrayify-compact](https://github.com/jonschlinkert/arrayify-compact)
  - [compact-object](https://github.com/jonschlinkert/compact-object)
  - [delete](https://github.com/jonschlinkert/delete)
  - [for-in](https://github.com/jonschlinkert/for-in)
  - [for-own](https://github.com/jonschlinkert/for-own)
  - [has-any](https://github.com/jonschlinkert/has-any)
  - [has-value](https://github.com/jonschlinkert/has-value)
  - [is-number](https://github.com/jonschlinkert/is-number)
  - [is-plain-object](https://github.com/jonschlinkert/is-plain-object)
  - [map-files](https://github.com/jonschlinkert/map-files)
  - [mixin-deep](https://github.com/jonschlinkert/mixin-deep)
  - [mixin-object](https://github.com/jonschlinkert/mixin-object)
  - [object-length](https://github.com/jonschlinkert/object-length)
  - [object-size](https://github.com/jonschlinkert/object-size)
  - [omit-empty](https://github.com/jonschlinkert/omit-empty)
  - [reduce-object](https://github.com/jonschlinkert/reduce-object)

## API


## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on October 05, 2014._