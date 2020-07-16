function generateUID () {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0
  var secondPart = (Math.random() * 46656) | 0
  firstPart = ('000' + firstPart.toString(36)).slice(-3)
  secondPart = ('000' + secondPart.toString(36)).slice(-3)
  return firstPart + secondPart
}

function startDrag (sx, sy) {
  var o = { sx: sx, sy: sy, el: document.createElement('div') }
  var s = {}
  o.el.setAttribute('style', 'position:fixed; z-index:1000; background-color:rgba(0,0,0,0.3); pointer-events:null')
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
EditCommand.prototype.apply = function (o) {
  if (!EditCommand.blocked) EditCommand.blocked = true
  var el = this.textarea
  console.log('Undo ------ APPLYING')
  /*
  var els = el.children
  for (var ki in o) {
    var k = ki | 0
    if (ki != k) continue
    if (!els[k]) {
      el.appendChild (document.createElement('div'))
    }
    els[k].innerHTML = o[k] || ''
  }
  if ('blocksLength' in o) while (els.length > o.blocksLength) el.removeChild(els[els.length - 1])
  el.coral.methods.readFromDOM() */
  var _b = el.coral.state.blocks
  if (0) {
    var bs = JSON.stringify(_b)
    var ss = coral.diffApply(o, bs)
    _b = el.coral.state.blocks = JSON.parse(ss)
    o.state(JSON.stringify(_b))
  } else {
    jsonpatch.applyPatch(_b, jsonpatch.deepClone(o))
    o.state(jsonpatch.deepClone(_b))
  }
  _b.splice(0, 0)
  if (0) {
    for (var ki in o) {
      var k = ki | 0
      if (ki != k) continue
      _b[k] = _b[k] || {}
      _b[k].data = o[k] || ''
    }
    if ('blocksLength' in o) { _b.length = o.blocksLength; _b.splice(0, 0) }
  }
  el.coral.render_()
  coral.ui.select.set(o.selection, el)
}

function Undoer (rootEl) {
  var stack = new Undo.Stack()
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
  var priordoc = [{ data: '' }]// '[]'

  var select = function () {
    if (EditCommand.blocked) return
    priordoc.selection = coral.ui.select.get(rootEl)
  }

  function pushwholestate () {
    if (0) {
      if (typeof (priordoc) !== 'string') priordoc = JSON.stringify(priordoc)
      var newdoc = JSON.stringify(rootEl.coral.state.blocks)
      var patchRedo = coral.diff(priordoc, newdoc)
      if (!patchRedo) return
      var patchUndo = coral.diff(newdoc, priordoc)
      patchUndo.selection = priordoc.selection
      patchRedo.selection = priordoc.selection = coral.ui.select.get(rootEl)
      patchUndo.state = patchRedo.state = funcs.state.bind(this)
      stack.execute(new EditCommand(rootEl, patchUndo, patchRedo))
      priordoc = coral.diffApply(patchRedo, priordoc, newdoc)
      if (1) return
    }

    var patchRedo = jsonpatch.compare(priordoc, rootEl.coral.state.blocks)
    var patchUndo = jsonpatch.compare(rootEl.coral.state.blocks, priordoc)
    if (patchRedo.length) {
      console.time()
      patchUndo.selection = priordoc.selection
      patchRedo.selection = priordoc.selection = coral.ui.select.get(rootEl)
      patchUndo.state = patchRedo.state = funcs.state.bind(this)
      stack.execute(new EditCommand(rootEl, patchUndo, patchRedo))
      // priordoc =  jsonpatch.deepClone(rootEl.coral.state.blocks)
      jsonpatch.applyPatch(priordoc, jsonpatch.deepClone(patchRedo))
      console.timeEnd()
      console.log('undo ---- captured')
    }
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
    select: select,
    state: function (state) { if (state !== undefined) priordoc = state; return priordoc },
    block: function (status) { if (status !== undefined) EditCommand.blocked = status; return EditCommand.blocked }

  }
  return funcs
}

let candidateSelectors = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])'
]
let candidateSelector = candidateSelectors.join(',')

let matches =
  typeof Element === 'undefined'
    ? function () {}
    : Element.prototype.matches ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector

function tabbable (el, options) {
  options = options || {}

  let regularTabbables = []
  let orderedTabbables = []

  let candidates = el.querySelectorAll(candidateSelector)

  if (options.includeContainer) {
    if (matches.call(el, candidateSelector)) {
      candidates = Array.prototype.slice.apply(candidates)
      candidates.unshift(el)
    }
  }

  let candidate
  let candidateTabindex
  for (let i = 0; i < candidates.length; i++) {
    candidate = candidates[i]

    if (!isNodeMatchingSelectorTabbable(candidate)) {
      continue
    }

    candidateTabindex = getTabindex(candidate)
    if (candidateTabindex === 0) {
      regularTabbables.push(candidate)
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate
      })
    }
  }

  let tabbableNodes = orderedTabbables
    .sort(sortOrderedTabbables)
    .map(a => a.node)
    .concat(regularTabbables)

  return tabbableNodes
}

tabbable.isTabbable = isTabbable
tabbable.isFocusable = isFocusable

function isNodeMatchingSelectorTabbable (node) {
  if (
    !isNodeMatchingSelectorFocusable(node) ||
    isNonTabbableRadio(node) ||
    getTabindex(node) < 0
  ) {
    return false
  }
  return true
}

function isTabbable (node) {
  if (!node) {
    throw new Error('No node provided')
  }
  if (matches.call(node, candidateSelector) === false) {
    return false
  }
  return isNodeMatchingSelectorTabbable(node)
}

function isNodeMatchingSelectorFocusable (node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node)) {
    return false
  }
  return true
}

let focusableCandidateSelector = candidateSelectors.concat('iframe').join(',')
function isFocusable (node) {
  if (!node) {
    throw new Error('No node provided')
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false
  }
  return isNodeMatchingSelectorFocusable(node)
}

function getTabindex (node) {
  let tabindexAttr = parseInt(node.getAttribute('tabindex'), 10)
  if (!isNaN(tabindexAttr)) {
    return tabindexAttr
  }
  // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  if (isContentEditable(node)) {
    return 0
  }
  return node.tabIndex
}

function sortOrderedTabbables (a, b) {
  return a.tabIndex === b.tabIndex
    ? a.documentOrder - b.documentOrder
    : a.tabIndex - b.tabIndex
}

function isContentEditable (node) {
  return node.contentEditable === 'true'
}

function isInput (node) {
  return node.tagName === 'INPUT'
}

function isHiddenInput (node) {
  return isInput(node) && node.type === 'hidden'
}

function isRadio (node) {
  return isInput(node) && node.type === 'radio'
}

function isNonTabbableRadio (node) {
  return isRadio(node) && !isTabbableRadio(node)
}

function getCheckedRadio (nodes) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      return nodes[i]
    }
  }
}

function isTabbableRadio (node) {
  if (!node.name) {
    return true
  }
  // This won't account for the edge case where you have radio groups with the same
  // in separate forms on the same page.
  let radioSet = node.ownerDocument.querySelectorAll(
    'input[type="radio"][name="' + node.name + '"]'
  )
  let checked = getCheckedRadio(radioSet)
  return !checked || checked === node
}

function isHidden (node) {
  // offsetParent being null will allow detecting cases where an element is invisible or inside an invisible element,
  // as long as the element does not use position: fixed. For them, their visibility has to be checked directly as well.
  return (
    node.offsetParent === null || getComputedStyle(node).visibility === 'hidden'
  )
}