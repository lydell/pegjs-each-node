// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

function eachNode(node, callback) {
  callback(node)
  var children = node.alternatives || node.elements || node.rules
  if (children) {
    children.forEach(function(child) {
      eachNode(child, callback)
    })
  } else if (node.expression) {
    eachNode(node.expression, callback)
  }
}

module.exports = eachNode
