pegjs-each-node [![Build Status](https://travis-ci.org/lydell/pegjs-each-node.png?branch=master)](https://travis-ci.org/lydell/pegjs-each-node)
===============

`npm install pegjs-each-node`

```js
var eachNode = require("pegjs-each-node")

eachNode(startNode, function(node) {
  // This function will be run once with `startNode` itself, and then once for
  // each of its subnodes.
  console.log(node.type)
})
```

License
=======

[The X11 (“MIT”) License](LICENSE).
