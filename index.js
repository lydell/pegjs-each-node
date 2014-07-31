// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

function eachNode(node, callback, parent) {
  callback(node, parent || null)
  var children = node.alternatives || node.elements || node.rules
  if (children) {
    children.forEach(function(child) {
      eachNode(child, callback, node)
    })
  } else if (node.expression) {
    eachNode(node.expression, callback, node)
  }
}

module.exports = eachNode
