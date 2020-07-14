function generateUID () {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0
  var secondPart = (Math.random() * 46656) | 0
  firstPart = ('000' + firstPart.toString(36)).slice(-3)
  secondPart = ('000' + secondPart.toString(36)).slice(-3)
  return firstPart + secondPart
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
      //priordoc =  jsonpatch.deepClone(rootEl.coral.state.blocks)
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
   //console.log('UNDO ---- react', mutations)
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

var VirtualJoystick	= function (opts) {
  opts			= opts			|| {}
  this._container		= opts.container	|| document.body
  this._strokeStyle	= opts.strokeStyle	|| 'cyan'
  this._stickEl		= opts.stickElement	|| this._buildJoystickStick()
  this._baseEl		= opts.baseElement	|| this._buildJoystickBase()
  this._mouseSupport	= opts.mouseSupport !== undefined ? opts.mouseSupport : false
  this._stationaryBase	= opts.stationaryBase || false
  this._baseX		= this._stickX = opts.baseX || 0
  this._baseY		= this._stickY = opts.baseY || 0
  this._limitStickTravel	= opts.limitStickTravel || false
  this._stickRadius	= opts.stickRadius !== undefined ? opts.stickRadius : 100
  this._useCssTransform	= opts.useCssTransform !== undefined ? opts.useCssTransform : false

  this._container.style.position	= 'relative'

  this._container.appendChild(this._baseEl)
  this._baseEl.style.position	= 'absolute'
  this._baseEl.style.display	= 'none'
  this._container.appendChild(this._stickEl)
  this._stickEl.style.position	= 'absolute'
  this._stickEl.style.display	= 'none'

  this._pressed	= false
  this._touchIdx	= null

  if (this._stationaryBase === true) {
    this._baseEl.style.display	= ''
    this._baseEl.style.left		= (this._baseX - this._baseEl.width / 2) + 'px'
    this._baseEl.style.top		= (this._baseY - this._baseEl.height / 2) + 'px'
  }

  this._transform	= this._useCssTransform ? this._getTransformProperty() : false
  this._has3d	= this._check3D()

  var __bind	= function (fn, me) { return function () { return fn.apply(me, arguments) } }
  this._$onTouchStart	= __bind(this._onTouchStart, this)
  this._$onTouchEnd	= __bind(this._onTouchEnd, this)
  this._$onTouchMove	= __bind(this._onTouchMove, this)
  this._container.addEventListener('touchstart', this._$onTouchStart, false)
  this._container.addEventListener('touchend', this._$onTouchEnd, false)
  this._container.addEventListener('touchmove', this._$onTouchMove, false)
  if (this._mouseSupport) {
    this._$onMouseDown	= __bind(this._onMouseDown, this)
    this._$onMouseUp	= __bind(this._onMouseUp, this)
    this._$onMouseMove	= __bind(this._onMouseMove, this)
    this._container.addEventListener('mousedown', this._$onMouseDown, false)
    this._container.addEventListener('mouseup', this._$onMouseUp, false)
    this._container.addEventListener('mousemove', this._$onMouseMove, false)
  }
}

VirtualJoystick.prototype.destroy	= function () {
  this._container.removeChild(this._baseEl)
  this._container.removeChild(this._stickEl)

  this._container.removeEventListener('touchstart', this._$onTouchStart, false)
  this._container.removeEventListener('touchend', this._$onTouchEnd, false)
  this._container.removeEventListener('touchmove', this._$onTouchMove, false)
  if (this._mouseSupport) {
    this._container.removeEventListener('mouseup', this._$onMouseUp, false)
    this._container.removeEventListener('mousedown', this._$onMouseDown, false)
    this._container.removeEventListener('mousemove', this._$onMouseMove, false)
  }
}

/**
 * @returns {Boolean} true if touchscreen is currently available, false otherwise
*/
VirtualJoystick.touchScreenAvailable	= function () {
  return 'createTouch' in document
}

/**
 * microevents.js - https://github.com/jeromeetienne/microevent.js
*/
;(function (destObj) {
  destObj.addEventListener	= function (event, fct) {
    if (this._events === undefined) 	this._events	= {}
    this._events[event] = this._events[event]	|| []
    this._events[event].push(fct)
    return fct
  }
  destObj.removeEventListener	= function (event, fct) {
    if (this._events === undefined) 	this._events	= {}
    if (event in this._events === false)	return
    this._events[event].splice(this._events[event].indexOf(fct), 1)
  }
  destObj.dispatchEvent		= function (event /* , args... */) {
    if (this._events === undefined) 	this._events	= {}
    if (this._events[event] === undefined)	return
    var tmpArray	= this._events[event].slice()
    for (var i = 0; i < tmpArray.length; i++) {
      var result	= tmpArray[i].apply(this, Array.prototype.slice.call(arguments, 1))
      if (result !== undefined)	return result
    }
    return undefined
  }
})(VirtualJoystick.prototype)

/// ///////////////////////////////////////////////////////////////////////////////
//										//
/// ///////////////////////////////////////////////////////////////////////////////

VirtualJoystick.prototype.deltaX	= function () { return this._stickX - this._baseX	}
VirtualJoystick.prototype.deltaY	= function () { return this._stickY - this._baseY	}

VirtualJoystick.prototype.up	= function () {
  if (this._pressed === false)	return false
  var deltaX	= this.deltaX()
  var deltaY	= this.deltaY()
  if (deltaY >= 0)				return false
  if (Math.abs(deltaX) > 2 * Math.abs(deltaY))	return false
  return true
}
VirtualJoystick.prototype.down	= function () {
  if (this._pressed === false)	return false
  var deltaX	= this.deltaX()
  var deltaY	= this.deltaY()
  if (deltaY <= 0)				return false
  if (Math.abs(deltaX) > 2 * Math.abs(deltaY))	return false
  return true
}
VirtualJoystick.prototype.right	= function () {
  if (this._pressed === false)	return false
  var deltaX	= this.deltaX()
  var deltaY	= this.deltaY()
  if (deltaX <= 0)				return false
  if (Math.abs(deltaY) > 2 * Math.abs(deltaX))	return false
  return true
}
VirtualJoystick.prototype.left	= function () {
  if (this._pressed === false)	return false
  var deltaX	= this.deltaX()
  var deltaY	= this.deltaY()
  if (deltaX >= 0)				return false
  if (Math.abs(deltaY) > 2 * Math.abs(deltaX))	return false
  return true
}

/// ///////////////////////////////////////////////////////////////////////////////
//										//
/// ///////////////////////////////////////////////////////////////////////////////

VirtualJoystick.prototype._onUp	= function () {
  this._pressed	= false
  this._stickEl.style.display	= 'none'

  if (this._stationaryBase == false) {
    this._baseEl.style.display	= 'none'

    this._baseX	= this._baseY	= 0
    this._stickX	= this._stickY	= 0
  }
}

VirtualJoystick.prototype._onDown	= function (x, y) {
  this._pressed	= true
  if (this._stationaryBase == false) {
    this._baseX	= x
    this._baseY	= y
    this._baseEl.style.display	= ''
    this._move(this._baseEl.style, (this._baseX - this._baseEl.width / 2), (this._baseY - this._baseEl.height / 2))
  }

  this._stickX	= x
  this._stickY	= y

  if (this._limitStickTravel === true) {
    var deltaX	= this.deltaX()
    var deltaY	= this.deltaY()
    var stickDistance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))
    if (stickDistance > this._stickRadius) {
      var stickNormalizedX = deltaX / stickDistance
      var stickNormalizedY = deltaY / stickDistance

      this._stickX = stickNormalizedX * this._stickRadius + this._baseX
      this._stickY = stickNormalizedY * this._stickRadius + this._baseY
    }
  }

  this._stickEl.style.display	= ''
  this._move(this._stickEl.style, (this._stickX - this._stickEl.width / 2), (this._stickY - this._stickEl.height / 2))
}

VirtualJoystick.prototype._onMove	= function (x, y) {
  if (this._pressed === true) {
    this._stickX	= x
    this._stickY	= y

    if (this._limitStickTravel === true) {
      var deltaX	= this.deltaX()
      var deltaY	= this.deltaY()
      var stickDistance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))
      if (stickDistance > this._stickRadius) {
        var stickNormalizedX = deltaX / stickDistance
        var stickNormalizedY = deltaY / stickDistance

        this._stickX = stickNormalizedX * this._stickRadius + this._baseX
        this._stickY = stickNormalizedY * this._stickRadius + this._baseY
      }
    }

        	this._move(this._stickEl.style, (this._stickX - this._stickEl.width / 2), (this._stickY - this._stickEl.height / 2))
  }
}

/// ///////////////////////////////////////////////////////////////////////////////
//		bind touch events (and mouse events for debug)			//
/// ///////////////////////////////////////////////////////////////////////////////

VirtualJoystick.prototype._onMouseUp	= function (event) {
  return this._onUp()
}

VirtualJoystick.prototype._onMouseDown	= function (event) {
  event.preventDefault()
  var x	= event.clientX
  var y	= event.clientY
  return this._onDown(x, y)
}

VirtualJoystick.prototype._onMouseMove	= function (event) {
  var x	= event.clientX
  var y	= event.clientY
  return this._onMove(x, y)
}

/// ///////////////////////////////////////////////////////////////////////////////
//		comment								//
/// ///////////////////////////////////////////////////////////////////////////////

VirtualJoystick.prototype._onTouchStart	= function (event) {
  // if there is already a touch inprogress do nothing
  if (this._touchIdx !== null)	return

  // notify event for validation
  var isValid	= this.dispatchEvent('touchStartValidation', event)
  if (isValid === false)	return

  // dispatch touchStart
  this.dispatchEvent('touchStart', event)

  event.preventDefault()
  // get the first who changed
  var touch	= event.changedTouches[0]
  // set the touchIdx of this joystick
  this._touchIdx	= touch.identifier

  // forward the action
  var x		= touch.pageX
  var y		= touch.pageY
  return this._onDown(x, y)
}

VirtualJoystick.prototype._onTouchEnd	= function (event) {
  // if there is no touch in progress, do nothing
  if (this._touchIdx === null)	return

  // dispatch touchEnd
  this.dispatchEvent('touchEnd', event)

  // try to find our touch event
  var touchList	= event.changedTouches
  for (var i = 0; i < touchList.length && touchList[i].identifier !== this._touchIdx; i++);
  // if touch event isnt found,
  if (i === touchList.length)	return

  // reset touchIdx - mark it as no-touch-in-progress
  this._touchIdx	= null

  // ??????
  // no preventDefault to get click event on ios
  event.preventDefault()

  return this._onUp()
}

VirtualJoystick.prototype._onTouchMove	= function (event) {
  // if there is no touch in progress, do nothing
  if (this._touchIdx === null)	return

  // try to find our touch event
  var touchList	= event.changedTouches
  for (var i = 0; i < touchList.length && touchList[i].identifier !== this._touchIdx; i++);
  // if touch event with the proper identifier isnt found, do nothing
  if (i === touchList.length)	return
  var touch	= touchList[i]

  event.preventDefault()

  var x		= touch.pageX
  var y		= touch.pageY
  return this._onMove(x, y)
}

/// ///////////////////////////////////////////////////////////////////////////////
//		build default stickEl and baseEl				//
/// ///////////////////////////////////////////////////////////////////////////////

/**
 * build the canvas for joystick base
 */
VirtualJoystick.prototype._buildJoystickBase	= function () {
  var canvas	= document.createElement('canvas')
  canvas.width	= 126
  canvas.height	= 126

  var ctx		= canvas.getContext('2d')
  ctx.beginPath()
  ctx.strokeStyle = this._strokeStyle
  ctx.lineWidth	= 6
  ctx.arc(canvas.width / 2, canvas.width / 2, 40, 0, Math.PI * 2, true)
  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle	= this._strokeStyle
  ctx.lineWidth	= 2
  ctx.arc(canvas.width / 2, canvas.width / 2, 60, 0, Math.PI * 2, true)
  ctx.stroke()

  return canvas
}

/**
 * build the canvas for joystick stick
 */
VirtualJoystick.prototype._buildJoystickStick	= function () {
  var canvas	= document.createElement('canvas')
  canvas.width	= 86
  canvas.height	= 86
  var ctx		= canvas.getContext('2d')
  ctx.beginPath()
  ctx.strokeStyle	= this._strokeStyle
  ctx.lineWidth	= 6
  ctx.arc(canvas.width / 2, canvas.width / 2, 40, 0, Math.PI * 2, true)
  ctx.stroke()
  return canvas
}

/// ///////////////////////////////////////////////////////////////////////////////
//		move using translate3d method with fallback to translate > 'top' and 'left'
//      modified from https://github.com/component/translate and dependents
/// ///////////////////////////////////////////////////////////////////////////////

VirtualJoystick.prototype._move = function (style, x, y) {
  if (this._transform) {
    if (this._has3d) {
      style[this._transform] = 'translate3d(' + x + 'px,' + y + 'px, 0)'
    } else {
      style[this._transform] = 'translate(' + x + 'px,' + y + 'px)'
    }
  } else {
    style.left = x + 'px'
    style.top = y + 'px'
  }
}

VirtualJoystick.prototype._getTransformProperty = function () {
  var styles = [
    'webkitTransform',
    'MozTransform',
    'msTransform',
    'OTransform',
    'transform'
  ]

  var el = document.createElement('p')
  var style

  for (var i = 0; i < styles.length; i++) {
    style = styles[i]
    if (el.style[style] != null) {
      return style
      break
    }
  }
}

VirtualJoystick.prototype._check3D = function () {
  var prop = this._getTransformProperty()
  // IE8<= doesn't have `getComputedStyle`
  if (!prop || !window.getComputedStyle) return module.exports = false

  var map = {
    webkitTransform: '-webkit-transform',
    OTransform: '-o-transform',
    msTransform: '-ms-transform',
    MozTransform: '-moz-transform',
    transform: 'transform'
  }

  // from: https://gist.github.com/lorenzopolidori/3794226
  var el = document.createElement('div')
  el.style[prop] = 'translate3d(1px,1px,1px)'
  document.body.insertBefore(el, null)
  var val = getComputedStyle(el).getPropertyValue(map[prop])
  document.body.removeChild(el)
  var exports = val != null && val.length && val != 'none'
  return exports
}
