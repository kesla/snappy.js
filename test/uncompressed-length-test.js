
var fs = require('fs')

  , test = require('tape')

  , uncompressedLength = require('../lib/uncompressed-length')

  , small   = fs.readFileSync(__dirname + '/fixtures/small-compressed.bin')
  , medium  = fs.readFileSync(__dirname + '/fixtures/medium-compressed.bin')
  , large   = fs.readFileSync(__dirname + '/fixtures/large-compressed.bin')

test('uncompressedLength', function(t) {

  // 'foo'
  t.equal(uncompressedLength(small), 3, 'correct small length')

  // alphabet 20 times
  t.equal(uncompressedLength(medium), 520, 'correct medium length')

  // alphabet 2000 times
  t.equal(uncompressedLength(large), 52000, 'correct large length')

  t.end()
})
