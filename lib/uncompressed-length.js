var varint = require('varint')

  , uncompressedLength = function(compressed) {
      return varint.decode(compressed)
    }

module.exports = uncompressedLength
