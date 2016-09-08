**DEPRECATED.** Use `peg.compiler.visitor` added in [PEG.js 0.10.0] instead.

[PEG.js 0.10.0]: https://github.com/pegjs/pegjs/blob/4a49e910ac6b57c9cd2362f997ac24df529fcebb/CHANGELOG.md#minor-changes


pegjs-each-node [![Build Status](https://travis-ci.org/lydell/pegjs-each-node.svg?branch=master)](https://travis-ci.org/lydell/pegjs-each-node)
===============

`npm install pegjs-each-node`

```js
var eachNode = require('pegjs-each-node')

eachNode(startNode, function(node, parent) {
  // This function will be run once with `startNode` itself, and then once for
  // each of its subnodes.
  console.log(node.type)

  // During the first run (when `node` is `startNode`), `parent` is null. (Or
  // you may pass `parent` as the third argument to `eachNode`). Then `parent`
  // is the node that contains `node`.
})
```

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

License
=======

[The X11 (“MIT”) License](LICENSE).
