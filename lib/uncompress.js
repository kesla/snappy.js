
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
        , bytes
        , i

      this.inputPtr = this.inputPtr + 1

      if (length > 59) {
        bytes = length - 59
        length = 0
        for(i = 0; i < bytes; ++i) {
          length = (length << 8) | this.input[this.inputPtr]
          this.inputPtr = this.inputPtr + 1
        }
      }

      length = length + 1

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

  , copy = function(length, offset) {
      var ptr = this.outputPtr - offset
        , i = 0

      if (ptr < 0)
        throw new Error('offset > this.output')

      for(; i < length; ++i) {
        this.output[this.outputPtr] = this.output[ptr + i]
        this.outputPtr = this.outputPtr + 1
      }
    }

  , oneByteCopy = function() {
      var length = ((this.input[this.inputPtr] >> 2) & 7) + 4
        , offset = ((this.input[this.inputPtr] >> 5) << 8) | this.input[this.inputPtr + 1]

      this.copy(length, offset)

      this.inputPtr = this.inputPtr + 2
    }

  , twoByteCopy = function() {
      var length = (this.input[this.inputPtr] >> 2) + 1
        , offset = this.input.readInt16LE(this.inputPtr + 1)

      this.copy(length, offset)

      this.inputPtr = this.inputPtr + 3
    }

  , fourByteCopy = function() {
      var length = (this.input[this.inputPtr] >> 2) + 1
        , offset = this.input.readInt32LE(this.inputPtr + 1)

      this.copy(length, offset)

      this.inputPtr = this.inputPtr + 5
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
        else if (type === ONE_BYTE_COPY)
          this.oneByteCopy()
        else if (type === TWO_BYTE_COPY)
          this.twoByteCopy()
        else
          this.fourByteCopy()
      }
    }

  , uncompress = function(input) {
      var obj = new Uncompress(input)
      return obj.output
    }

Uncompress.prototype.ignoreLengthBytes = ignoreLengthBytes
Uncompress.prototype.type              = type
Uncompress.prototype.copy              = copy
Uncompress.prototype.copyLiteral       = copyLiteral
Uncompress.prototype.oneByteCopy       = oneByteCopy
Uncompress.prototype.twoByteCopy       = twoByteCopy
Uncompress.prototype.fourByteCopy      = fourByteCopy
Uncompress.prototype.literalLength     = literalLength

module.exports = uncompress
