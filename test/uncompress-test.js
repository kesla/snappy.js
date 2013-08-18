
var fs = require('fs')

  , test = require('tape')

  , uncompress = require('../lib/uncompress')

  , small   =  fs.readFileSync(__dirname + '/fixtures/small-compressed.bin')
  , medium  = fs.readFileSync(__dirname + '/fixtures/medium-compressed.bin')
  , large   =  fs.readFileSync(__dirname + '/fixtures/large-compressed.bin')

test('uncompress small', function(t) {
  var m = uncompress(small)
  t.equal(m.length, 3, 'should have correct length')
  t.end()
})

test('uncompress medium', function(t) {
  var m = uncompress(medium)
  t.equal(m.length, 520, 'should have correct length')
  t.end()
})

test('uncompress large', function(t) {
  var m = uncompress(large)
  t.equal(m.length, 52000, 'should have correct length')
  t.end()
})
