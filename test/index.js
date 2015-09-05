// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

var fs = require('fs')
var path = require('path')
var pegjs = require('pegjs')
var expect = require('chai').expect

var eachNode = require('../')

function test (grammar, expected) {
  var pass = function (ast) {
    var index = 0
    var parents = {}
    eachNode(ast, function (node, parent) {
      var actualNode = shallowCopy(node)
      expect(actualNode).to.have.property('location').and.to.be.an('object')
      delete actualNode.location

      var data = expected[index]
      var expectedNode = data[0]
      var parentId = data[1]
      var expectedParent = (parentId === null ? null : parents[parentId])

      if (data.length === 4) {
        var nodeId = data[3]
        parents[nodeId] = node
        var keyToRemove = data[2]
        expect(actualNode).to.have.property(keyToRemove)
        delete actualNode[keyToRemove]
      }

      expect(actualNode).to.deep.equal(expectedNode)
      expect(parent).to.equal(expectedParent)

      index++
    })
    expect(index).to.equal(expected.length)
  }

  var plugin = {
    use: function (config) {
      config.passes.transform.unshift(pass)
    }
  }

  pegjs.buildParser(grammar, {plugins: [plugin], output: 'source'})
}

function read (file) {
  return fs.readFileSync(path.join('test', file)).toString()
}

function shallowCopy (obj) {
  var copy = {}
  Object.keys(obj).forEach(function (key) {
    copy[key] = obj[key]
  })
  return copy
}

describe('eachNode', function () {
  it('is a function', function () {
    expect(eachNode).to.be.a('function')
  })

  it('runs the callback with the node and all its subnodes', function () {
    test(read('grammar.pegjs'), JSON.parse(read('grammar.nodes.json')))
  })

  it('allows to pass an initial parent', function () {
    var initialParent = {}
    var subNode = {}
    var startNode = {expression: subNode}
    var index = 0
    eachNode(startNode, function (node, parent) {
      switch (index) {
        case 0:
          expect(node).to.equal(startNode)
          expect(parent).to.equal(initialParent)
          break
        case 1:
          expect(node).to.equal(subNode)
          expect(parent).to.equal(startNode)
          break
        default:
          expect(index).to.be.below(2)
      }
      index++
    }, initialParent)
  })
})
