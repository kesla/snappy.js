
var uncompressedLength = require('./uncompressed-length')

  , uncompress = function(buffer) {
      var uncompressed = new Buffer(uncompressedLength(buffer))

      return uncompressed
    }

module.exports = uncompress
