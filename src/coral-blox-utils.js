function generateUID () {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0
  var secondPart = (Math.random() * 46656) | 0
  firstPart = ('000' + firstPart.toString(36)).slice(-3)
  secondPart = ('000' + secondPart.toString(36)).slice(-3)
  return firstPart + secondPart
}

function startDragRectangle (sx, sy) {
  var o = { sx: sx, sy: sy, el: document.createElement('div') }
  var s = {}
  o.el.setAttribute('style', 'position:fixed; z-index:1000; background-color:rgba(0,0,0,0.3); pointer-events:none')
  document.body.appendChild(o.el)
  o.move = function (x, y) {
    s = {
      left: Math.min(x, sx) + 'px',
      width: Math.abs(x - sx) + 'px',
      top: Math.min(y, sy) + 'px',
      height: Math.abs(y - sy) + 'px'
    }
    coral.dot.keysApply(o.el.style, s)
    return o
  }
  o.end = function () {
    o.el.parentNode.removeChild(o.el)
  }
  o.rect = s
  o.move(sx, sy)
  return o
}

var toPX = (function () {
  var PIXELS_PER_INCH = 96

  var defaults = {
    'ch': 8,
    'ex': 7.15625,
    'em': 16,
    'rem': 16,
    'in': PIXELS_PER_INCH,
    'cm': PIXELS_PER_INCH / 2.54,
    'mm': PIXELS_PER_INCH / 25.4,
    'pt': PIXELS_PER_INCH / 72,
    'pc': PIXELS_PER_INCH / 6,
    'px': 1
  }

  function parseUnit (str, out) {
    if (!out) out = [ 0, '' ]
    var num = parseFloat(str, 10)
    out[0] = num
    out[1] = str.match(/[\d.\-\+]*\s*(.*)/)[1] || ''
    return out
  }

  function toPX (str) {
    if (!str && str !== 0) return null

    if (defaults[str]) return defaults[str]

    // detect number of units
    var parts = parseUnit(str)
    if (!isNaN(parts[0])) {
      if (parts[1]) {
        var px = toPX(parts[1])
        return typeof px === 'number' ? parts[0] * px : null
      } else {
        return parts[0]
      }
    }

    return null
  }
  return toPX
})()

function getChildIndex (node) { return [].indexOf.call(node.parentNode.childNodes, node) }
function getChildIndexRoot (root, node) {
  while (node && node.parentNode !== root) node = node.parentNode
  return { el: node, idx: node ? getChildIndex(node) : -1 }
}
/*
 * Undo.js - A undo/redo framework for JavaScript
 *
 * http://jzaefferer.github.com/undo
 *
 * Copyright (c) 2011 Jörn Zaefferer
 *
 * MIT licensed.
 */
;(function () {
  // based on Backbone.js' inherits
  var ctor = function () {}
  var inherits = function (parent, protoProps) {
    var child

    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor
    } else {
      child = function () { return parent.apply(this, arguments) }
    }

    ctor.prototype = parent.prototype
    child.prototype = new ctor()

    if (protoProps) extend(child.prototype, protoProps)

    child.prototype.constructor = child
    child.__super__ = parent.prototype
    return child
  }

  function extend (target, ref) {
    var name, value
    for (name in ref) {
      value = ref[name]
      if (value !== undefined) {
        target[ name ] = value
      }
    }
    return target
  };

  var Undo = {
    version: '0.1.15'
  }

  Undo.Stack = function () {
    this.commands = []
    this.stackPosition = -1
    this.savePosition = -1
  }

  extend(Undo.Stack.prototype, {
    execute: function (command) {
      this._clearRedo()
      command.execute()
      this.commands.push(command)
      this.stackPosition++
      this.changed()
    },
    undo: function () {
      if (!this.canUndo()) {
        console.error("Can't undo")
        return
      }
      this.commands[this.stackPosition].undo()
      this.stackPosition--
      this.changed()
    },
    canUndo: function () {
      return this.stackPosition >= 0
    },
    redo: function () {
      if (!this.canRedo()) {
        console.error("Can't redo")
        return
      }
      this.stackPosition++
      this.commands[this.stackPosition].redo()
      this.changed()
    },
    canRedo: function () {
      return this.stackPosition < this.commands.length - 1
    },
    save: function () {
      this.savePosition = this.stackPosition
      this.changed()
    },
    dirty: function () {
      return this.stackPosition != this.savePosition
    },
    _clearRedo: function () {
      // TODO there's probably a more efficient way for this
      this.commands = this.commands.slice(0, this.stackPosition + 1)
    },
    changed: function () {
      // do nothing, override
    }
  })

  Undo.Command = function (name) {
    this.name = name
  }

  var up = new Error('override me!')

  extend(Undo.Command.prototype, {
    execute: function () {
      throw up
    },
    undo: function () {
      throw up
    },
    redo: function () {
      this.execute()
    }
  })

  Undo.Command.extend = function (protoProps) {
    var child = inherits(this, protoProps)
    child.extend = Undo.Command.extend
    return child
  }

  // AMD support
  if (typeof define === 'function' && define.amd) {
    // Define as an anonymous module
    define(Undo)
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Undo
  } else {
    this.Undo = Undo
  }
}).call(this)

var EditCommand = Undo.Command.extend({
  constructor: function (textarea, oldValue, newValue) {
    this.textarea = textarea
    this.oldValue = oldValue
    this.newValue = newValue
  },
  execute: function () {},
  undo: function () {
    this.apply(this.oldValue)
  },

  redo: function () {
    this.apply(this.newValue)
  }
})
function toJSON (a) {
  return JSON.stringify(a)
}
EditCommand.prototype.apply = function (o, inel) {
  if (!EditCommand.blocked) EditCommand.blocked = true
  var el = inel || this.textarea
  console.log('Undo ------ APPLYING')
  var _b = el.coral.state.blocks
  jsonpatch.applyPatch(_b, jsonpatch.deepClone(o))
  o.state(jsonpatch.deepClone(_b))
  _b.splice(0, 0)
  if (!o.selection) { o.selection = coral.ui.select.get(el) }
  el.coral.render_()
  if (o.selection) coral.ui.select.set(o.selection, el)
}

if (window.xs_socket) {
  var ws = xs_socket.message()
  var wsRoom = ws.sub('default')
  var wsSig = Math.random()
}

function Undoer (rootEl) {
  var stack = new Undo.Stack()
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
  var priordoc = [{ data: '' }]// '[]'

  var select = function () {
    if (EditCommand.blocked) return
    priordoc.lastSelect = coral.ui.select.get(rootEl)
  }
  Undoer.diff = function diff (o, n) {
    var ol = o.length
    var nl = n.length
    var l = Math.min(ol, nl)
    var pre = ''
    for (var s = 0; s < l && n[s] === o[s]; s++) pre += n[s]
    if (s === l) {
      return {
        pos: l,
        del: o.substring(l),
        ins: n.substring(l)
      }
    }
    var post = ''
    for (var e = 0; e < l && n[nl - 1 - e] === o[ol - 1 - e]; e++) post += n[nl - 1 - e] // reversed but correct

    var r = {
      pos: s,
      del: o.substring(s, ol - e),
      ins: n.substring(s, nl - e)
    }

    return r
  }

  function preppatch (p, obj) {
    if (p.length !== 1 && p[0].op !== 'replace') return null
    var path = p[0].path.split('/')
    var repl = { '~0': '/', '~1': '~' }
    path.shift()
    for (var i = 0; i < path.length; i++) path[i] = path[i].replace(/~0|~1/g, function (m) { return repl[m] })
    var dv = coral.dot(obj, path)
    var delta = Undoer.diff(p[0].value, dv.value)
    return {
      path: path,
      delta: delta
    }
  }

  function pubstate (patchRedo, patchUndo) {
    var diff = null//preppatch(patchUndo, rootEl.coral.state.blocks)
    if (diff) wsRoom.pub({ diff: diff, sig: wsSig })
    else wsRoom.pub({ patch: patchRedo, sig: wsSig })
  }

  var skipSelect = false
  function pushwholestate (nopub) {
    console.time()
    var patchRedo = jsonpatch.compare(priordoc, rootEl.coral.state.blocks)
    var patchUndo = jsonpatch.compare(rootEl.coral.state.blocks, priordoc)
    if (patchRedo.length) {
      patchUndo.selection = (!skipSelect && priordoc.lastSelect) || priordoc.selection
      patchRedo.selection = coral.ui.select.get(rootEl)
      patchUndo.state = patchRedo.state = funcs.state.bind(this)

      var cmds = stack.commands
      if (cmds.length && stack.stackPosition + 1 === cmds.length) {
        var oldRedo = cmds[cmds.length - 1].newValue
        var oldUndo = cmds[cmds.length - 1].oldValue
        if (patchRedo.length === 1 && patchRedo[0].op === 'replace' &&
            oldRedo.length === 1 && oldRedo[0].op === 'replace' &&
            patchRedo[0].path === oldRedo[0].path) {
          var diffs = Undoer.diff(oldRedo[0].value, patchRedo[0].value)
          if (diffs.ins.length + diffs.del.length === 1 &&
              diffs.ins + diffs.del !== ' ') {
            oldRedo[0].value = patchRedo[0].value
            oldRedo.selection = patchRedo.selection
            // oldUndo[0].value = patchUndo[0].value
            // oldUndo.selection = patchUndo.selection
            if (wsRoom && !nopub) pubstate(patchRedo, oldRedo)
            // priordoc.lastSelect = null
            skipSelect = true
            return
          }
        }
      }

      skipSelect = false
      stack.execute(new EditCommand(rootEl, patchUndo, patchRedo))
      if (test++) {
        if (wsRoom && !nopub) pubstate(patchRedo, patchUndo)
      }
      jsonpatch.applyPatch(priordoc, jsonpatch.deepClone(patchRedo))
      priordoc.selection = patchRedo.selection
    }
    console.timeEnd()
    console.log('undo ---- captured')
  }
  var th = this
  var test = 0
  if (wsRoom) {
    wsRoom.on(function (msg) {
      if (msg.subject !== 'message') return
      var patchdo = msg.message
      if (!patchdo) return
      if (!patchdo.sig) return
      if (patchdo.sig === wsSig) return
      if (true) {
        EditCommand.blocked = true
        // jsonpatch.applyPatch(rootEl.coral.state.blocks, patchdo.patch)
        if (patchdo.patch) jsonpatch.applyPatch(rootEl.coral.state.blocks, patchdo.patch)
        else if (patchdo.diff) {
          var d = patchdo.diff
          var dv = coral.dot(rootEl.coral.state.blocks, d.path)
          if (dv && dv.obj) {
            var s = dv.value
            if (d.delta.ins) s = s.substring(0, d.delta.pos) + d.delta.ins + s.substring(d.delta.pos)
            else s = s.substring(0, d.delta.pos) + s.substring(d.delta.pos + d.delta.del.length)
            dv.apply(s)
          }
        }

        rootEl.coral.state.blocks.splice(0, 0)
        var selection = coral.ui.select.get(rootEl)
        rootEl.coral.render_()
        if (selection) coral.ui.select.set(selection, rootEl)
      } else {
        patchdo.patch.state = function () {}// funcs.state.bind(th)
        EditCommand.prototype.apply(patchdo.patch, rootEl)
      }
      pushwholestate(true)
    })
  }
  var react = function (mutations) {
    if (mutations.length === 2) {
      if (mutations[0].type === mutations[1].type && mutations[0].type === 'childList' &&
          mutations[0].addedNodes.length === mutations[1].removedNodes.length && mutations[1].removedNodes.length === 1 &&
          mutations[0].addedNodes[0] === mutations[1].removedNodes[0]) { return }
    }
    // console.log('UNDO ---- react', mutations)
    if (EditCommand.blocked) {
      console.log('undo ---- blocked undo capture')
      if (EditCommand.blocked === true) EditCommand.blocked = false
      return
    }
    var fullRead = false
    var list = {}
    for (var i = 0; i < mutations.length; i++) {
      var m = mutations[i]
      if (m.type !== 'characterData') { fullRead = true; break } else {
        var idx = getChildIndexRoot(rootEl, m.target).idx
        list[idx] = true
      }
    }
    if (fullRead) rootEl.coral.methods.readFromDOM()
    else for (var k in list) rootEl.coral.methods.readFromDOM(false, k)
    pushwholestate()
  }
  var observer = new MutationObserver(react)
  observer.observe(rootEl, {
    atttributeFilter: [],
    childList: true,
    characterData: true,
    characterDataOldValue: true,
    subtree: true
  })

  var funcs = {
    undo: stack.undo.bind(stack),
    redo: stack.redo.bind(stack),
    stack: stack,
    react: react,
    push: pushwholestate,
    prior: priordoc,
    select: select,
    state: function (state) { if (state !== undefined) priordoc = state; return priordoc },
    block: function (status) { if (status !== undefined) EditCommand.blocked = status; return EditCommand.blocked }

  }
  return funcs
}
