# snappy.js[![build status](https://secure.travis-ci.org/kesla/snappy.js.svg)](http://travis-ci.org/kesla/snappy.js)

A implementation of the snappy-algorithm

## Installation

```
npm install snappy.js
```

## Stability

__unstable__: APIs may change, right now _only_ snappy.uncompress is implemented.

## Performance

There's a simple benchmark in test/benchmarks/bench.js that compares uncompressing in snappy.js and snappy. Here's the results running on my machine:

```
snappy: 12ms
snappy.js: 211ms
```

I hope to squize out some more performance out of snappy.js, but I doubt that it will every get as quick as snappy.

## Example

```javascript
var snappy = require('snappy.js')
  // compressed is a snappy-compressed buffer
  , raw = snappy.uncompress(compressed)

console.log('original data:' + raw.toString())
```

## API

*  __uncompress__(compressed) is a synchronous function, taking the input (a Buffer) and returns the output (as a buffer) decompressed.

* __uncompressedLength__(compressed) is a synchronous function, taking the input (a Buffer) and returns the size of the decompressed data.

* __isValidCompressed__(compressed) is a synchronous function, taking the input (a Buffer) and returns _true_ if it's valid compressed data and _false_ otherwise.

## Licence

Copyright (c) 2013 David Björklund

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
