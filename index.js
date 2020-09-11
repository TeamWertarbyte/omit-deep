'use strict';

var isObject = require('is-plain-object');
var unset = require('unset-value');
var has = require('has-value');

module.exports = function omitDeep(value, keys, inplace = !Object.isFrozen(value)) {
  if (Array.isArray(value)) {
    if (inplace) {
      for (var i = 0; i < value.length; i++) {
        value[i] = omitDeep(value[i], keys, inplace);
      }
      return value;
    } else {
      var cleanedArray = value.map(v => omitDeep(v, keys, inplace))
      if (cleanedArray.some((v, i) => v !== value[i])) {
        return cleanedArray;
      }
      return value; // unchanged
    }
  }

  if (!isObject(value)) {
    return value;
  }

  if (typeof keys === 'string') {
    keys = [keys];
  }

  if (!Array.isArray(keys)) {
    return value;
  }

  if (inplace) {
    for (var j = 0; j < keys.length; j++) {
      unset(value, keys[j]);
    }

    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        value[key] = omitDeep(value[key], keys, inplace);
      }
    }

    return value;
  } else {
    let newValue = value;
    for (var j = 0; j < keys.length; j++) {
      if (newValue === value && has(value, keys[j])) {
        newValue = Object.assign({}, value);
      }
      unset(newValue, keys[j]);
    }

    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        let cleanedValueAtKey = omitDeep(value[key], keys, inplace);
        if (cleanedValueAtKey !== value[key]) {
          if (newValue === value) {
            newValue = Object.assign({}, value);
          }
          newValue[key] = cleanedValueAtKey;
        }
      }
    }

    return newValue;
  }
};
