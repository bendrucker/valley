'use strict'

var createError = require('create-error-class')
var format = require('simple-format')
var typeName = require('type-name')

exports.InvalidInputError = createError('InvalidInputError', function (input) {
  this.message = 'Invalid input: expected plain object, got ' + typeName(input)
})

exports.InvalidKeyError = createError('InvalidKeyError', function (keys) {
  if (!Array.isArray(keys)) keys = [keys]
  this.message = 'The following keys are not allowed: ' + keys.join(', ')
})

exports.InvalidValueError = createError('InvalidValueError', function (props) {
  this.key = props.key
  var message = format('Invalid data in "%s"', props.key)
  if (props.cause) message += ': ' + props.cause.message
  this.message = message
})
