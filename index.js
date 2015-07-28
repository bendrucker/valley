'use strict'

var mapValues = require('map-values')
var difference = require('array-differ')
var assertFunction = require('assert-function')
var errors = require('./errors')
var InvalidKeyError = errors.InvalidKeyError
var InvalidValueError = errors.InvalidValueError

module.exports = Validator

function Validator (config) {
  var validators = mapValues(config, createValidator)
  return function validate (data) {
    var keys = Object.keys(data)
    var unknowns = difference(keys, Object.keys(validators))
    if (unknowns.length) return new InvalidKeyError(unknowns)

    for (var key in validators) {
      var validator = validators[key]
      var value = data[key]
      var valid = validator(value, key, data)

      if (valid instanceof Error) {
        var cause = valid
        valid = false
      }
      if (!valid) {
        return new InvalidValueError({key: key, value: value, cause: cause})
      }
    }
    return null
  }
}

function createValidator (validator) {
  assertFunction(validator)
  if (validator === Boolean) return primitiveValidator('boolean')
  if (validator === String) return primitiveValidator('string')
  if (validator === Number) return primitiveValidator('number')
  return validator
}

function primitiveValidator (type) {
  return function isType (value) {
    return typeof value === type || new Error('Expecting ' + type + ', got ' + typeof value)
  }
}
