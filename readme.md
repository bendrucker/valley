# valley [![Build Status](https://travis-ci.org/bendrucker/valley.svg?branch=master)](https://travis-ci.org/bendrucker/valley)

> Functional and lightweight data validation


## Install

```
$ npm install --save valley
```


## Usage

All validation is strict. There is no type conversion and only the specified keys are allowed.

```js
var Validator = require('valley')
var validate = Validator({
  foo: String,
  bar: Number
})
validate({foo: 'a string', bar: 123})
//=> null
validate({foo: 123})
//=> InvalidValueError: 'Invalid data in "foo": expected string, got number'
validate({baz: ''})
//=> InvalidKeyError: 'The following keys are not allowed: baz'
```

You can also nest validators:

```js
var validateUser = Validator({
  id: Number,
  name: String
})
var validatePost = Validator({
  title: String,
  author: validateUser 
})
validatePost({
  title: 'npm all the things',
  author: {
    id: 1,
    name: 'Ben'
  }
})
//=> null
```

## API

#### `Validator(config)` -> `function`

Creates a validator function that accepts a data object.

##### config

*Required*  
Type: `object`

An object where keys correspond to your schema. Values are objects that will be called with `value, key, object`. When a truthy non-error value is returned, validation passes for that key. When a falsy value is returned, validation fails with a generic error. When an `Error` is returned, the error message will be used in the validation error.

## License

MIT © [Ben Drucker](http://bendrucker.me)
