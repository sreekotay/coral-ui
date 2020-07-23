var virtualBinder = function (rootEl, children, parent) {
  parent = parent || document.body
  if (rootEl.coralVirtual) return rootEl.coralVirtual

  var defheight = 20
  var cached = []
  var rowdata = []
  var gcs = window.getComputedStyle(rootEl)
  var props = {
    paddingLeft: toPX(gcs.paddingLeft),
    paddingRight: toPX(gcs.paddingRight),
    paddingTop: toPX(gcs.paddingTop),
    paddingBottom: toPX(gcs.paddingBottom),
    height: rootEl.style.height
  }

  function scrollTracker (eventType, x, y) {
    if (eventType !== 'track') console.log(eventType, x, y)
    if (eventType === 'start') {
      scrollTracker.scrollTop = rootEl.scrollTop
      scrollTracker.scrollLeft = rootEl.scrollLeft
    } else if (eventType === 'track') {
      rootEl.scrollTop = scrollTracker.scrollTop - y
      rootEl.scrollLeft = scrollTracker.scrollLeft - x
    }
  }

  var imp
  if (1) {
    imp = new Impetus({
      source: rootEl.nextElementSibling,
      update: scrollTracker
    })
  }
  if (0 && window.ScrollSensor) {
    const scrollSensor = new ScrollSensor({
      element: rootEl.nextElementSibling,
      options: {
        // maxScrollLeft: rootEl.scrollWidth - rootEl.clientWidth,
        // maxScrollTop: rootEl.scrollHeight - rootEl.clientHeight,
        mouseMoveIsEnable: false,
        mouseWheelInertiaXDeceleration: 5000,
        mouseWheelInertiaYDeceleration: 5000,
        mouseMoveInertiaXDeceleration: 5000,
        mouseMoveInertiaYDeceleration: 5000,
        touchInertiaXDeceleration: 5000,
        touchInertiaYDeceleration: 5000
      }
    })
    scrollSensor.on('scroll', event => {
      console.log(event)
      rootEl.scrollTop = event.scrollTop
      rootEl.scrollLeft = event.scrollLeft
    })
  }

  cached.circular = 100

  function genrow (row) {
    var h = ''
    for (var i = 0; i < row.length; i++) {
      h += '<div style="white-space:nowrap;background-color:red;padding:4px; border-top: 4px solid black; border-left: 8px solid black">' +
            '<div style="overflow:visible;border:1px solid white; margin:2px">' +
            row[i] +
            '</div>' +
            '</div>'
    }
    var el = document.createElement('div')
    el.innerHTML = h
    el.style.display = 'flex'
    return el
  }

  rootEl.addEventListener('scroll', function (e) {
    // console.time('update scroll')
    update()
    // console.timeEnd('update scroll')
    // e.stopPropagation()
  })

  var pause = false
  function update (retry) {
    if (pause) return
    props.height = rootEl.style.height
    var data = children; if (!data.length) return
    var rr = rootEl.getBoundingClientRect()
    var pr = parent.getBoundingClientRect()
    var l = Math.max(rr.left, pr.left)
    var t = Math.max(rr.top, pr.top)
    var r = Math.min(rr.right, pr.right)
    var b = Math.min(rr.bottom, pr.bottom)
    l = Math.max(l, 0)
    t = Math.max(t, 0)
    r = Math.min(r, window.screen.width)
    b = Math.min(b, window.screen.height)
    if (t >= b || l >= r) {
      return
    }
    rootEl.style.height = rr.height + 'px'
    rootEl.style.paddingTop = (props.paddingTop) + 'px'
    rootEl.style.paddingBottom = (props.paddingBottom) + 'px'

    function bounds (el) {
      return {
        left: 0, top: 0, bottom: defheight, right: r - l, width: r - l, height: defheight
      }
    }

    var scrollLeft = rootEl.scrollLeft
    var scrollTop = rootEl.scrollTop
    var y = -scrollTop
    var marginTop = 0
    var marginBottom = 0
    var h = 0
    var be = rootEl.be
    if (!rootEl.be) {
      rootEl.classList.add('cui-manual')
      // rootEl.style.position = 'relative'
      rootEl.be = be = document.createElement('div')
      rootEl.append(be)
      be.style.position = 'relative'
      be.style.padding = 0
      be.style.border = 'none'
      be.style.height = defheight * data.length + 'px'
    }
    // while (rootEl.children.length > 1) rootEl.removeChild(rootEl.children[1])
    var ndh = 0
    var ndhc = 0
    var rel = rootEl.nextElementSibling
    // /be.style.minWidth = 'initial'//('min-width')
    for (var i = 0; i < data.length; i++) {
      var rd = rowdata[i]
      var row = data[i]
      var er = rd || bounds(row)
      var show = false
      if (y + er.height <= 0 + props.paddingTop) { marginTop += er.height } else if (y >= b - t + props.paddingTop) { marginBottom += er.height } else { h += er.height; show = true }

      // el.style.display = show ? 'block' : 'none'
      var el = circularArray(cached, i)
      if (show) {
        if (!el) {
          el = genrow(row)
          rel.append(el)
          var pel = circularArray(cached, i, el)
          if (pel && pel.parentNode) rel.removeChild(pel)
        } else if (el.parenteNode !== rel) {
          rel.appendChild(el)
        }
        if (retry) adjustWidths(el, retry)
        // el.style.position = 'absolute'
        var cels = el.children
        for (var j = 0; j < cels.length; j++) {
          cels[j].style.minWidth = 'initial'// cels[j].style.removeProperty('min-width')
          if (i === 0) cels[j].style.borderTop = 'none'
          if (j === 0) cels[j].style.borderLeft = 'none'
        }
        er = rowdata[i] = grect(el)// el.getBoundingClientRect()
        el.style.top = y /* + scrollTop */ + 'px'
        el.style.left = -scrollLeft + 'px'
      } else if (el) {
        if (el.parentNode) rel.removeChild(el)
      }
      var eh = (er.height + 0.0) | 0
      y += eh
      if (show) {
        ndh += eh
        ndhc++
      }
    }
    ndh = ndhc ? (ndh / ndhc) : defheight
    var widths = []
    be.style.height = y + scrollTop + 'px'
    rel.style.right = (rootEl.offsetWidth - rootEl.clientWidth) + 'px'
    rel.style.bottom = (rootEl.offsetHeight - rootEl.clientHeight) + 'px'
    var nw = normalizeWidths(rel, retry || widths)
    // console.log('width', nw)
    be.style.minWidth = (nw - 1 * cellrectwidth(rootEl)) + 'px'
    rootEl.scrollLeft = scrollLeft
    if (props.height) rootEl.style.height = props.height; else rootEl.style.removeProperty('height')
    if (defheight !== ndh) {
      defheight = ndh
      console.log('----------- retry height ---------')
      if (!retry) return update(widths)
    }
    if (!retry && nw > r - l) {
      // update (true)
      // console.log('----------- retry width ---------')
      // return update(widths)
    }
  }

  function adjustWidths (el, widths) {
    var cels = el.children
    if (!cels || !cels.length) return
    for (var i = 0; i < cels.length; i++) {
      cels[i].style.minWidth = widths[i] + 'px'
    }
  }
  function normalizeWidths (rel, widths) {
    var els = rel.children
    var mw = widths || []
    for (var j = 0; j < els.length; j++) {
      var cels = els[j].children
      if (!cels || !cels.length) continue
      for (var i = 0; i < cels.length; i++) {
        mw[i] = Math.max(mw[i] || 0, cels[i].getBoundingClientRect().width)
      }
    }
    var x = 0
    for (var i = 0; i < mw.length; i++) {
      x += mw[i] + 1
      mw[i] = ((mw[i] - cellrectwidth(cels[i]) - 0.99) | 0)
    }
    for (var j = 0; j < els.length; j++) adjustWidths(els[j], mw)
    return x
  }
  function cellrectwidth (el) {
    var gcs = window.getComputedStyle(el)
    var hp = toPX(gcs.paddingLeft) + toPX(gcs.paddingRight)
    if (1) return el.offsetWidth - el.clientWidth + hp
    var w = el.offsetWidth - hp
    var vp = toPX(gcs.paddingTop) + toPX(gcs.paddingBottom)
    var h = el.offsetHeight - vp
    return {
      left: 0, top: 0, bottom: h, right: w, width: w, height: h
    }
  }

  function grect (el) {
    var cb = el.getBoundingClientRect()
    return {
      left: cb.left, top: cb.top, bottom: cb.botton, right: cb.right, width: cb.width, height: cb.height
    }
  }

  function circularArray (arr, i, v) {
    var ci = i % (arr.circular || i)
    if (v === undefined) {
      v = arr[ci]
      return v && v.childIndex === i ? v : undefined
    }
    var p = arr[ci]
    arr[ci] = v
    arr[ci].childIndex = i
    return p
  }

  rootEl.coralVirtual = {
    parent: function (p) { if (p !== undefined) parent = p; return parent },
    update: update,
    pause: function (p) { pause = p }
  }
  return rootEl.coralVirtual
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

  // https://github.com/chrisbateman/impetus - MIT license - NOTE: modified!!! includes "reset"
/*
The MIT License (MIT)

Copyright (c) 2014 Chris Bateman

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
;(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory)
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module)
  } else {
    var mod = {
      exports: {}
    }
    factory(mod.exports, mod)
    global.Impetus = mod.exports
  }
})(this, function (exports, module) {
  'use strict'

  function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

  var stopThresholdDefault = 0.3
  var bounceDeceleration = 0.04
  var bounceAcceleration = 0.11

  // fixes weird safari 10 bug where preventDefault is prevented
  // @see https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356
  window.addEventListener('touchmove', function () {})

  var Impetus = function Impetus (_ref) {
    var _ref$source = _ref.source
    var sourceEl = _ref$source === undefined ? document : _ref$source
    var updateCallback = _ref.update
    var _ref$multiplier = _ref.multiplier
    var multiplier = _ref$multiplier === undefined ? 2 : _ref$multiplier
    var _ref$friction = _ref.friction
    var friction = _ref$friction === undefined ? 0.92 : _ref$friction
    var initialValues = _ref.initialValues
    var boundX = _ref.boundX
    var boundY = _ref.boundY
    var _ref$bounce = _ref.bounce
    var bounce = _ref$bounce === undefined ? true : _ref$bounce
    var reset = _ref.reset || true

    _classCallCheck(this, Impetus)

    var boundXmin, boundXmax, boundYmin, boundYmax, pointerLastX, pointerLastY, pointerCurrentX, pointerCurrentY, pointerId, decVelX, decVelY
    var targetX = 0
    var targetY = 0
    var stopThreshold = stopThresholdDefault * multiplier
    var ticking = false
    var pointerActive = false
    var paused = false
    var decelerating = false
    var trackingPoints = [];

    /**
       * Initialize instance
       */
    (function init () {
      sourceEl = typeof sourceEl === 'string' ? document.querySelector(sourceEl) : sourceEl
      if (!sourceEl) {
        throw new Error('IMPETUS: source not found.')
      }

      if (!updateCallback) {
        throw new Error('IMPETUS: update function not defined.')
      }

      if (initialValues) {
        if (initialValues[0]) {
          targetX = initialValues[0]
        }
        if (initialValues[1]) {
          targetY = initialValues[1]
        }
        resetPosition(true)
        callUpdateCallback()
        resetPosition()
      }

      // Initialize bound values
      if (boundX) {
        boundXmin = boundX[0]
        boundXmax = boundX[1]
      }
      if (boundY) {
        boundYmin = boundY[0]
        boundYmax = boundY[1]
      }

      sourceEl.addEventListener('touchstart', onDown)
      sourceEl.addEventListener('touchmove', onMove, getPassiveSupported() ? { passive: false } : false)
      sourceEl.addEventListener('touchend', onUp)
      sourceEl.addEventListener('touchcancel', stopTracking)
      // sourceEl.addEventListener('mousedown', onDown)
    })()

    /**
       * In edge cases where you may need to
       * reinstanciate Impetus on the same sourceEl
       * this will remove the previous event listeners
       */
    this.destroy = function () {
      sourceEl.removeEventListener('touchstart', onDown)
      // sourceEl.removeEventListener('mousedown', onDown)

      cleanUpRuntimeEvents()

      // however it won't "destroy" a reference
      // to instance if you'd like to do that
      // it returns null as a convinience.
      // ex: `instance = instance.destroy();`
      return null
    }

    /**
       * Disable movement processing
       * @public
       */
    this.pause = function () {
      cleanUpRuntimeEvents()

      pointerActive = false
      paused = true
    }

    /**
       * Enable movement processing
       * @public
       */
    this.resume = function () {
      paused = false
    }

    /**
       * Update the current x and y values
       * @public
       * @param {Number} x
       * @param {Number} y
       */
    this.setValues = function (x, y) {
      if (typeof x === 'number') {
        targetX = x
      }
      if (typeof y === 'number') {
        targetY = y
      }
    }

    /**
       * Update the multiplier value
       * @public
       * @param {Number} val
       */
    this.setMultiplier = function (val) {
      multiplier = val
      stopThreshold = stopThresholdDefault * multiplier
    }

    /**
       * Update boundX value
       * @public
       * @param {Number[]} boundX
       */
    this.setBoundX = function (boundX) {
      boundXmin = boundX[0]
      boundXmax = boundX[1]
    }

    /**
       * Update boundY value
       * @public
       * @param {Number[]} boundY
       */
    this.setBoundY = function (boundY) {
      boundYmin = boundY[0]
      boundYmax = boundY[1]
    }

    /**
       * Removes all events set by this instance during runtime
       */
    function cleanUpRuntimeEvents () {
      // Remove all touch events added during 'onDown' as well.
      document.removeEventListener('touchmove', onMove, getPassiveSupported() ? { passive: false } : false)
      document.removeEventListener('touchend', onUp)
      document.removeEventListener('touchcancel', stopTracking)
      // document.removeEventListener('mousemove', onMove, getPassiveSupported() ? { passive: false } : false)
      // document.removeEventListener('mouseup', onUp)
    }

    /**
       * Add all required runtime events
       */
    function addRuntimeEvents () {
      cleanUpRuntimeEvents()

      // @see https://developers.google.com/web/updates/2017/01/scrolling-intervention
      document.addEventListener('touchmove', onMove, getPassiveSupported() ? { passive: false } : false)
      document.addEventListener('touchend', onUp)
      document.addEventListener('touchcancel', stopTracking)
      // document.addEventListener('mousemove', onMove, getPassiveSupported() ? { passive: false } : false)
      // document.addEventListener('mouseup', onUp)
    }

    /**
       * Executes the update function
       */
    function callUpdateCallback () {
      updateCallback.call(sourceEl, 'track', targetX, targetY)
    }

    /**
       * Creates a custom normalized event object from touch and mouse events
       * @param  {Event} ev
       * @returns {Object} with x, y, and id properties
       */
    function normalizeEvent (ev) {
      if (ev.type === 'touchmove' || ev.type === 'touchstart' || ev.type === 'touchend') {
        var touch = ev.targetTouches[0] || ev.changedTouches[0]
        return {
          x: touch.clientX,
          y: touch.clientY,
          id: touch.identifier
        }
      } else {
        // mouse events
        return {
          x: ev.clientX,
          y: ev.clientY,
          id: null
        }
      }
    }

    function evStop (ev) { 
      ev.stopPropagation() 
      ev.preventDefault()
    }

    /**
       * Initializes movement tracking
       * @param  {Object} ev Normalized event
       */
    function onDown (ev) {
      var event = normalizeEvent(ev)
      if (!pointerActive && !paused) {
        pointerActive = true
        decelerating = false
        pointerId = event.id

        pointerLastX = pointerCurrentX = event.x
        pointerLastY = pointerCurrentY = event.y
        trackingPoints = []
        addTrackingPoint(pointerLastX, pointerLastY)

        addRuntimeEvents()
      }
      resetPosition(true)
      evStop(ev)
    }

    /**
       * Handles move events
       * @param  {Object} ev Normalized event
       */
    function onMove (ev) {
      ev.preventDefault()
      var event = normalizeEvent(ev)

      if (pointerActive && event.id === pointerId) {
        pointerCurrentX = event.x
        pointerCurrentY = event.y
        addTrackingPoint(pointerLastX, pointerLastY)
        requestTick()
      }
    }

    /**
       * Handles up/end events
       * @param {Object} ev Normalized event
       */
    function onUp (ev) {
      var event = normalizeEvent(ev)
      console.log('up-----')

      if (pointerActive && event.id === pointerId) {
        stopTracking()
      } else resetPosition()
      evStop(ev)
    }

    /**
       * Stops movement tracking, starts animation
       */
    function stopTracking () {
      pointerActive = false
      addTrackingPoint(pointerLastX, pointerLastY)
      startDecelAnim()

      cleanUpRuntimeEvents()
    }

    /**
       * Records movement for the last 100ms
       * @param {number} x
       * @param {number} y [description]
       */
    function addTrackingPoint (x, y) {
      var time = Date.now()
      while (trackingPoints.length > 0) {
        if (time - trackingPoints[0].time <= 100) {
          break
        }
        trackingPoints.shift()
      }

      trackingPoints.push({ x: x, y: y, time: time })
    }

    /**
       * Calculate new values, call update function
       */
    function updateAndRender () {
      var pointerChangeX = pointerCurrentX - pointerLastX
      var pointerChangeY = pointerCurrentY - pointerLastY

      targetX += pointerChangeX * multiplier
      targetY += pointerChangeY * multiplier

      if (bounce) {
        var diff = checkBounds()
        if (diff.x !== 0) {
          targetX -= pointerChangeX * dragOutOfBoundsMultiplier(diff.x) * multiplier
        }
        if (diff.y !== 0) {
          targetY -= pointerChangeY * dragOutOfBoundsMultiplier(diff.y) * multiplier
        }
      } else {
        checkBounds(true)
      }

      callUpdateCallback()

      pointerLastX = pointerCurrentX
      pointerLastY = pointerCurrentY
      ticking = false
    }

    /**
       * Returns a value from around 0.5 to 1, based on distance
       * @param {Number} val
       */
    function dragOutOfBoundsMultiplier (val) {
      return 0.000005 * Math.pow(val, 2) + 0.0001 * val + 0.55
    }

    /**
       * prevents animating faster than current framerate
       */
    function requestTick () {
      if (!ticking) {
        requestAnimFrame(updateAndRender)
      }
      ticking = true
    }

    /**
       * Determine position relative to bounds
       * @param {Boolean} restrict Whether to restrict target to bounds
       */
    function checkBounds (restrict) {
      var xDiff = 0
      var yDiff = 0

      if (boundXmin !== undefined && targetX < boundXmin) {
        xDiff = boundXmin - targetX
      } else if (boundXmax !== undefined && targetX > boundXmax) {
        xDiff = boundXmax - targetX
      }

      if (boundYmin !== undefined && targetY < boundYmin) {
        yDiff = boundYmin - targetY
      } else if (boundYmax !== undefined && targetY > boundYmax) {
        yDiff = boundYmax - targetY
      }

      if (restrict) {
        if (xDiff !== 0) {
          targetX = xDiff > 0 ? boundXmin : boundXmax
        }
        if (yDiff !== 0) {
          targetY = yDiff > 0 ? boundYmin : boundYmax
        }
      }

      return {
        x: xDiff,
        y: yDiff,
        inBounds: xDiff === 0 && yDiff === 0
      }
    }

    /**
     * resets position to default
     */
    function resetPosition (first) {
      if (reset) {
        targetX = 0
        targetY = 0
      }
      updateCallback.call(sourceEl, first ? 'start' : 'end')
    }

    /**
       * Initialize animation of values coming to a stop
       */
    function startDecelAnim () {
      var firstPoint = trackingPoints[0]
      var lastPoint = trackingPoints[trackingPoints.length - 1]

      var xOffset = lastPoint.x - firstPoint.x
      var yOffset = lastPoint.y - firstPoint.y
      var timeOffset = lastPoint.time - firstPoint.time

      var D = timeOffset / 15 / multiplier

      decVelX = xOffset / D || 0 // prevent NaN
      decVelY = yOffset / D || 0

      var diff = checkBounds()

      if (Math.abs(decVelX) > 1 || Math.abs(decVelY) > 1 || !diff.inBounds) {
        decelerating = true
        requestAnimFrame(stepDecelAnim)
      } else resetPosition()
    }

    /**
       * Animates values slowing down
       */
    function stepDecelAnim () {
      if (!decelerating) {
        return
      }

      decVelX *= friction
      decVelY *= friction

      targetX += decVelX
      targetY += decVelY

      var diff = checkBounds()

      if (Math.abs(decVelX) > stopThreshold || Math.abs(decVelY) > stopThreshold || !diff.inBounds) {
        if (bounce) {
          var reboundAdjust = 2.5

          if (diff.x !== 0) {
            if (diff.x * decVelX <= 0) {
              decVelX += diff.x * bounceDeceleration
            } else {
              var adjust = diff.x > 0 ? reboundAdjust : -reboundAdjust
              decVelX = (diff.x + adjust) * bounceAcceleration
            }
          }
          if (diff.y !== 0) {
            if (diff.y * decVelY <= 0) {
              decVelY += diff.y * bounceDeceleration
            } else {
              var adjust = diff.y > 0 ? reboundAdjust : -reboundAdjust
              decVelY = (diff.y + adjust) * bounceAcceleration
            }
          }
        } else {
          if (diff.x !== 0) {
            if (diff.x > 0) {
              targetX = boundXmin
            } else {
              targetX = boundXmax
            }
            decVelX = 0
          }
          if (diff.y !== 0) {
            if (diff.y > 0) {
              targetY = boundYmin
            } else {
              targetY = boundYmax
            }
            decVelY = 0
          }
        }

        callUpdateCallback()

        requestAnimFrame(stepDecelAnim)
      } else {
        decelerating = false
        resetPosition()
      }
    }
  }

  /**
   * @see http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
   */

  module.exports = Impetus
  var requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  })()

  function getPassiveSupported () {
    var passiveSupported = false

    try {
      var options = Object.defineProperty({}, 'passive', {
        get: function get () {
          passiveSupported = true
        }
      })

      window.addEventListener('test', null, options)
    } catch (err) {}

    getPassiveSupported = function () {
      return passiveSupported
    }
    return passiveSupported
  }
})
