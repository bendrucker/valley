'use strict'

var test = require('tape')
var Validator = require('./')

test(function (t) {
  var validate = Validator({
    foo: function () {
      return false
    }
  })
  var err = validate({})
  t.ok(err)
  t.equal(err.key, 'foo')
  t.equal(err.name, 'InvalidValueError')
  t.equal(err.message, 'Invalid data in "foo"')
  t.end()
})

test('bad input', function (t) {
  var validate = Validator({})
  var err = validate([])
  t.ok(err)
  t.equal(err.name, 'InvalidInputError')
  t.equal(err.message, 'Invalid input: expected plain object, got Array')
  t.end()
})

test('unknown key', function (t) {
  var validate = Validator({})
  var err = validate({foo: true})
  t.ok(err)
  t.equal(err.name, 'InvalidKeyError')
  t.equal(err.message, 'The following keys are not allowed: foo')
  t.end()
})

test('primitive', function (t) {
  var validate = Validator({foo: Boolean})
  t.notOk(validate({foo: true}))
  t.notOk(validate({foo: false}))
  var err = validate({foo: 'true'})
  t.equal(err.message, 'Invalid data in "foo": Expecting boolean, got string')
  t.end()
})

test('date', function (t) {
  var validate = Validator({foo: Date})
  t.notOk(validate({foo: new Date()}))
  var err = validate({foo: '2015-01-01'})
  t.equal(err.message, 'Invalid data in "foo": Expecting date, got string')
  t.end()
})
