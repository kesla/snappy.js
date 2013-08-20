
var uncompress = require('./uncompress')

  , isValidCompressed = function(compressed) {
      try {
        uncompress(compressed)
        return true
      } catch(e) {
        return false
      }
    }

module.exports = isValidCompressed
