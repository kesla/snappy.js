var TOP_BIT     = 1 << 7
  , LENGTH_BITS = ~TOP_BIT

  , uncompressedLength = function(compressed) {
      var length = 0
        , i = 0

      // get length of all the bits where the top bit i set
      while(compressed[i] & TOP_BIT) {
        // and shift the correct number of bytes
        length = length | (LENGTH_BITS & compressed[i]) << (i * 7)
        i++
      }
      // also shift the last bytes (without TOP_BIT)
      length = length | compressed[i] << (i * 7)

      return length
    }

module.exports = uncompressedLength
