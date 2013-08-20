
  var fs = require('fs')

    , test = require('tape')

    , isValidCompressed = require('../lib/is-valid-compressed')

    , small   = fs.readFileSync(__dirname + '/fixtures/small-compressed.bin')
    , small2  = fs.readFileSync(__dirname + '/fixtures/small2-compressed.bin')
    , random  = fs.readFileSync(__dirname + '/fixtures/random-compressed.bin')
    , medium  = fs.readFileSync(__dirname + '/fixtures/medium-compressed.bin')
    , large   = fs.readFileSync(__dirname + '/fixtures/large-compressed.bin')
    , urls    = fs.readFileSync(__dirname + '/fixtures/urls.10K-compressed.bin')

test('isValidCompressed small', function(t) {
  var m = isValidCompressed(small)

  t.equal(true, m)
  t.end()
})

test('isValidCompressed small2', function(t) {
  var m = isValidCompressed(small2)

  t.equal(true, m)
  t.end()
})

test('isValidCompressed random', function(t) {
  var m = isValidCompressed(random)

  t.equal(true, m)
  t.end()
})

test('isValidCompressed urls', function(t) {
  var m = isValidCompressed(urls)

  t.equal(true, m)
  t.end()
})

test('isValidCompressed medium', function(t) {
  var m = isValidCompressed(medium)

  t.equal(true, m)
  t.end()
})

test('isValidCompressed large', function(t) {
  var m = isValidCompressed(large)

  t.equal(true, m)
  t.end()
})

test('isValidCompressed bad input', function(t) {
  var m = isValidCompressed(new Buffer('beep boop'))

  t.equal(false, m)
  t.end()
})
