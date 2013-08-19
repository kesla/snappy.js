var snappy = require('snappy.js')
  // compressed is a snappy-compressed buffer
  , raw = snappy.uncompress(compressed)

console.log('original data:' + raw.toString())