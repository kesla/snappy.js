
var LITERAL         = 0
  , ONE_BYTE_COPY   = 1
  , TWO_BYTE_COPY   = 2
  , THREE_BYTE_COPY = 3

  , uncompressedLength = require('./uncompressed-length')

  , ignoreLengthBytes = function() {
      var ptr = 0

      while(this.input[ptr] & (1 << 7))
        ptr++;

      // ptr + 1 is the first data ptr
      return ptr + 1
    }

  , type = function() {
      return this.input[this.inputPtr] & 3
    }

  , literalLength = function() {
      var length = this.input[this.inputPtr] >> 2

      if (length <= 59) {
        length = length + 1
        this.inputPtr = this.inputPtr + 1
      }
      else
        throw new Error('literalLength over 60 bytes not implemented yet')

      return length
    }

  , copyLiteral = function() {
      var literalLength = this.literalLength()
        , endPtr = this.inputPtr + literalLength

      while(this.inputPtr < endPtr) {
        this.output[this.outputPtr] = this.input[this.inputPtr]
        this.outputPtr++
        this.inputPtr++
      }
    }

  , twoByteCopy = function() {
      var length = (this.input[this.inputPtr] >> 2) + 1
        , offset = this.input.readInt16LE(this.inputPtr + 1)
        , ptr = this.outputPtr - offset
        , i = 0

      for(; i < length; ++i) {
        this.output[this.outputPtr] = this.output[ptr + i]
        this.outputPtr = this.outputPtr + 1
      }

      this.inputPtr = this.inputPtr + 3
    }

  , Uncompress = function(input) {
      var type

      this.output = new Buffer(uncompressedLength(input))
      this.outputPtr = 0

      this.input = input
      this.inputPtr = this.ignoreLengthBytes()

      while(this.inputPtr < this.input.length) {
        type = this.type()
        if (type === LITERAL)
          this.copyLiteral()
        else if (type === TWO_BYTE_COPY) {
          this.twoByteCopy()
        }
        else
          throw new Error('Not implemented yet:' + this.type())

        // this.inputPtr++
      }
    }

  , uncompress = function(input) {
      var obj = new Uncompress(input)
      return obj.output
    }

Uncompress.prototype.ignoreLengthBytes = ignoreLengthBytes
Uncompress.prototype.type              = type
Uncompress.prototype.copyLiteral       = copyLiteral
Uncompress.prototype.twoByteCopy       = twoByteCopy
Uncompress.prototype.literalLength     = literalLength

module.exports = uncompress
