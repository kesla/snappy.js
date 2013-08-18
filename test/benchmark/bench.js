
var fs = require('fs')
  , path = require('path')

  , snappy = require('snappy')
  , snappyjs = require('../../snappy.js')

  , input = fs.readFileSync(path.resolve(__dirname, '../fixtures/urls.10K-compressed.bin'))

console.time('snappy')
for(var i = 0; i < 10; ++i)
  snappy.uncompressSync(input)
console.timeEnd('snappy')

console.time('snappy.js')
for(var i = 0; i < 10; ++i)
  snappyjs.uncompress(input)

console.timeEnd('snappy.js')