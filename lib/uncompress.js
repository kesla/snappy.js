
var uncompressedLength = require('./uncompressed-length')

  , ignoreLengthBytes = function(buffer) {
      var ptr = 0

      while(buffer[ptr] & (1 << 7))
        ptr++;

      // ptr + 1 is the first data ptr
      return ptr + 1
    }

  , isLiteral = function(b) {
      return (b & 3) === 0
    }

  , uncompress = function(input) {
      var output    = new Buffer(uncompressedLength(input))
        , inputPtr  = ignoreLengthBytes(input)
        , outputPtr = 0
        , literalLength
        , ptr

      while(inputPtr < input.length) {
        if (isLiteral(input[inputPtr])) {
          literalLength = input[inputPtr] >> 2
          if (literalLength <= 59)
            literalLength = literalLength + 1
          else {
            throw new Error('literalLength over 60 bytes not implemented yet')
          }

          inputPtr = inputPtr + 1
          ptr = inputPtr + literalLength

          while(inputPtr < ptr) {
            output[outputPtr] = input[inputPtr]
            outputPtr = outputPtr + 1
            inputPtr = inputPtr + 1
          }
        } else {
          throw new Error('Not defined element found')
        }

        inputPtr = inputPtr + 1
      }

      return output
    }

module.exports = uncompress
