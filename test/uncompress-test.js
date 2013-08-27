
var fs = require('fs')

  , test = require('tape')

  , uncompress = require('../lib/uncompress')

  , small   = fs.readFileSync(__dirname + '/fixtures/small-compressed.bin')
  , small2  = fs.readFileSync(__dirname + '/fixtures/small2-compressed.bin')
  , random  = fs.readFileSync(__dirname + '/fixtures/random-compressed.bin')
  , medium  = fs.readFileSync(__dirname + '/fixtures/medium-compressed.bin')
  , large   = fs.readFileSync(__dirname + '/fixtures/large-compressed.bin')
  , urls    = fs.readFileSync(__dirname + '/fixtures/urls.10K-compressed.bin')

  , randomRaw = fs.readFileSync(__dirname + '/fixtures/random-raw.bin')
  , urlsRaw   = fs.readFileSync(__dirname + '/fixtures/urls.10K-raw.txt')

test('uncompress small', function(t) {
  var m = uncompress(small)
  var data = 'foo'

  t.equal(m.length, data.length, 'should have correct length')
  t.equal(m.toString(), 'foo', 'should have correct data')
  t.end()
})

test('uncompress small2', function(t) {
  var m = uncompress(small2)
  var data = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@3$%^&*()_'

  t.equal(m.length, data.length, 'should have correct length')
  t.equal(m.toString(), data, 'should have correct data')
  t.end()
})

test('uncompress random', function(t) {
  var m = uncompress(random)

  t.equal(m.length, 1024, 'should have correct length')
  t.deepEqual(m.toString('hex'), randomRaw.toString('hex'), 'should have correct data')
  t.end()
})

test('uncompress urls', function(t) {
  var m = uncompress(urls)

  t.equal(m.length, urlsRaw.length, 'should have correct length')

  t.deepEqual(m.toString(), urlsRaw.toString(), 'should have correct data')
  t.end()
})

test('uncompress medium', function(t) {
  var m = uncompress(medium)
  var data = Array(21).join('abcdefghijklmnopqrstuvwxyz')

  t.equal(m.length, data.length, 'should have correct length')
  t.equal(m.toString(), data, 'should have correct data')
  t.end()
})

test('uncompress large', function(t) {
  var m = uncompress(large)
  var data = Array(10001).join('abcdefghijklmnopqrstuvwxyz')

  t.equal(m.length, 260000, 'should have correct length')
  t.equal(m.toString(), data, 'should have correct data')
  t.end()
})
