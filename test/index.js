// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

var fs     = require("fs")
var path   = require("path")
var pegjs  = require("pegjs")
var expect = require("chai").expect

var eachNode = require("../")


function test(grammar, expected) {
  var pass = function(ast) {
    var index = 0
    eachNode(ast, function(node) {
      node = shallowCopy(node)

      var data = expected[index]
      var expectedNode = data[0]

      if (data.length === 2) {
        var keyToRemove = data[1]
        expect(node).to.have.property(keyToRemove)
        delete node[keyToRemove]
      }

      expect(node).to.deep.equal(expectedNode)

      index++
    })
    expect(index).to.equal(expected.length)
  }

  var plugin = {
    use: function(config) {
      config.passes.transform.unshift(pass)
    }
  }

  pegjs.buildParser(grammar, {plugins: [plugin], output: "source"})
}

function read(file) {
  return fs.readFileSync(path.join("test", file)).toString()
}

function shallowCopy(obj) {
  var copy = {}
  Object.keys(obj).forEach(function(key) {
    copy[key] = obj[key]
  })
  return copy
}


describe("eachNode", function() {

  it("is a function", function() {
    expect(eachNode).to.be.a("function")
  })


  it("runs the callback with the node and all its subnodes", function() {
    test(read("grammar.pegjs"), JSON.parse(read("grammar.nodes.json")))
  })

})
