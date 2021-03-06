var virtualBinder = function (rootEl, children, parent) {
  parent = parent || document.body
  if (rootEl.coralVirtual) return rootEl.coralVirtual

  var defheight = 30
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

  function scrollTracker (ev, eventType, x, y) {
    // if (eventType === 'move') console.log(eventType, x, y)
    if (eventType === 'down') {
      scrollTracker.scrollTop = rootEl.scrollTop
      scrollTracker.scrollLeft = rootEl.scrollLeft
    } else if (eventType === 'move') {
      rootEl.scrollTop = scrollTracker.scrollTop - y
      rootEl.scrollLeft = scrollTracker.scrollLeft - x
      // if (y >= 0 && rootEl.clientHeight + rootEl.scrollTop + 1 >= rootEl.scrollHeight) { return true }
      // if (y <= 0 && rootEl.scrollTop <= 0) { return true }
    }
  }

  var imp
  if (0) {
    imp = new Impetus({
      source: rootEl.nextElementSibling,
      update: scrollTracker
    })
  }
  velocityIt(rootEl.nextElementSibling, scrollTracker)
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
      rootEl.scrollTop = event.scrollTop
      rootEl.scrollLeft = event.scrollLeft
    })
  }

  cached.circular = 100

  function genrow (row) {
    var h = ''
    for (var i = 0; i < row.length; i++) {
      h += '<div style="white-space:nowrap;background-color:green;padding:4px; border-top: 4px solid black; border-left: 8px solid black">' +
            '<div contenteditable=true style="overflow:visible;border:1px solid white; margin:2px">' +
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
    console.time('update scroll')
    update()
    console.timeEnd('update scroll')
    e.stopPropagation()
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
    var grc = 0
    // /be.style.minWidth = 'initial'//('min-width')
    if (true) {
      for (var i = 0; i < data.length; i++) {
        var rd = rowdata[i]
        var row = data[i]
        var er = rd || bounds(row)
        var show = false
        if (y + er.height <= 0 + props.paddingTop) { marginTop += er.height } else if (y >= b - t + props.paddingTop) { marginBottom += er.height } else { h += er.height; show = true }

        // el.style.display = show ? 'block' : 'none'
        var el = circularArray(cached, i)
        if (show && true) {
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
          // cels[j].style.minHeight = 'initial'// cels[j].style.removeProperty('min-width')
            cels[j].style.minWidth = 'initial'// cels[j].style.removeProperty('min-width')
            if (i === 0) cels[j].style.borderTop = 'none'
            if (j === 0) cels[j].style.borderLeft = 'none'
          }
          er = rowdata[i] = grect(el)// el.getBoundingClientRect()
          el.style.top = y /* + scrollTop */ + 'px'
          el.style.left = -scrollLeft + 'px'
          grc++
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
    } else {
      ndh = y = data.length * defheight
      ndc = data.length
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
    console.log('grc', grc)
  }

  function adjustWidths (el, widths, cr) {
    var cels = el.children
    if (!cels || !cels.length) return
    var x = 0
    for (var i = 0; i < cels.length; i++) {
      cels[i].style.left = x + 'px'
      cels[i].style.minWidth = (widths[i] - cr[i]) + 'px'
      x += widths[i]
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
    var cr = []
    for (var i = 0; i < mw.length; i++) {
      cr[i] = cellrectwidth(cels[i])
      // mw[i] = ((mw[i] + cr[i]) | 0)
      x += mw[i] + 2
    }
    // x += 8
    for (var j = 0; j < els.length; j++) adjustWidths(els[j], mw, cr)
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
    var els = el.children
    var r
    for (var i = 0; i < els.length; i++) {
      var ecb = els[i].getBoundingClientRect()
      if (r) {
        r.right = Math.max(r.right, ecb.right)
        r.left = Math.min(r.left, ecb.left)
        r.bottom = Math.max(r.bottom, ecb.bottom)
        r.top = Math.min(r.top, ecb.top)
      } else {
        r = {}
        r.right = ecb.right
        r.left = ecb.left
        r.bottom = ecb.bottom
        r.top = ecb.top
      }
    }
    r.width = r.right - r.left
    r.height = r.bottom - r.top
    return r
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

function velocityIt (container, update) {
  var FRICTION_COEFF = 0.95
  var BOUNCE = 0.2

  // var handle = document.querySelector('#handle')
  var bounds = container.getBoundingClientRect()
  // var radius = handle.offsetWidth / 2

  var dragging = false
  var mouse = { x: 0, y: 0 }
  var position = { x: 0, y: 0 }
  var previous = { x: position.x, y: position.y } // in case position is initialised at non-zero values
  var velocity = { x: 0, y: 0 }
  var start = { x: 0, y: 0 }
  var xmultiplier = 1
  var ymultiplier = 1

  function step () {
    requestAnimationFrame(step)

    if (Math.abs(velocity.x) < 1 && Math.abs(velocity.y) < 1 && !dragging) return

    if (dragging) {
      previous.x = position.x
      previous.y = position.y

      position.x = mouse.x
      position.y = mouse.y

      velocity.x = (position.x - previous.x)
      velocity.y = (position.y - previous.y)
    } else {
      position.x += velocity.x * xmultiplier
      position.y += velocity.y * ymultiplier

      velocity.x *= FRICTION_COEFF
      velocity.y *= FRICTION_COEFF
    }

    /*

    if (position.x > bounds.width - radius) {
      velocity.x *= -BOUNCE
      position.x = bounds.width - radius
    }

    if (position.x < radius) {
      velocity.x *= -BOUNCE
      position.x = radius
    }

    if (position.y > bounds.height - radius) {
      velocity.y *= -BOUNCE
      position.y = bounds.height - radius
    }

    if (position.y < radius) {
      velocity.y *= -BOUNCE
      position.y = radius
    }
*/
    // could use css transforms
    // handle.style.left = position.x + 'px'
    // handle.style.top = position.y + 'px'
    console.log(velocity.y)
    if (update(null, 'move', position.x - start.x, position.y - start.y)) {
      dragging = false
      velocity.x = velocity.y = 0
    }
  }

  // attach to handle instead to init drag only when grabbing the handle
  container.addEventListener('touchstart', function (event) {
    var e = trackIt.cleanEvent(event)
    console.log('touchdown')
    var yv = Math.abs(velocity.y)
    ymultiplier = 1// yv > 10 ? yv / 2 : 1
    console.log(ymultiplier)

    start.x = mouse.x = position.x = previous.x = e.x
    start.y = mouse.y = position.y = previous.y = e.y
    dragging = true
    update(e, 'down', 0, 0)
  })
  document.addEventListener('touchend', function (e) { dragging = false; update(e, 'up') })
  document.addEventListener('touchmove', function (event) {
    if (!dragging) return
    var e = trackIt.cleanEvent(event)
    mouse.x = e.x // - bounds.left
    mouse.y = e.y // - bounds.top
  })

  step()
}

// =================================================================================================
//
// from https://stackoverflow.com/questions/11974262/how-to-clone-or-re-dispatch-dom-events
//
// =================================================================================================
var allModifiers = ['Alt', 'AltGraph', 'CapsLock', 'Control',
  'Meta', 'NumLock', 'Scroll', 'Shift', 'Win']
function redispatchEvent (original, newtarget) {
  if (typeof Event === 'function') {
    var eventCopy = new original.constructor(original.type, original)
  } else {
    // Internet Explorer
    var eventType = original.constructor.name
    var eventCopy = document.createEvent(eventType)
    if (original.getModifierState) {
      var modifiersList = allModifiers.filter(
        original.getModifierState,
        original
      ).join(' ')
    }

    if (eventType === 'MouseEvent') {
      original.initMouseEvent(
        original.type, original.bubbles, original.cancelable,
        original.view, original.detail, original.screenX, original.screenY,
        original.clientX, original.clientY, original.ctrlKey,
        original.altKey, original.shiftKey, original.metaKey,
        original.button, original.relatedTarget
      )
    }
    if (eventType === 'DragEvent') {
      original.initDragEvent(
        original.type, original.bubbles, original.cancelable,
        original.view, original.detail, original.screenX, original.screenY,
        original.clientX, original.clientY, original.ctrlKey,
        original.altKey, original.shiftKey, original.metaKey,
        original.button, original.relatedTarget, original.dataTransfer
      )
    }
    if (eventType === 'WheelEvent') {
      original.initWheelEvent(
        original.detail, original.screenX, original.screenY,
        original.clientX, original.clientY, original.button,
        original.relatedTarget, modifiersList,
        original.deltaX, original.deltaY, original.deltaZ, original.deltaMode
      )
    }
    if (eventType === 'PointerEvent') {
      original.initPointerEvent(
        original.type, original.bubbles, original.cancelable,
        original.view, original.detail, original.screenX, original.screenY,
        original.clientX, original.clientY, original.ctrlKey,
        original.altKey, original.shiftKey, original.metaKey,
        original.button, original.relatedTarget,
        original.offsetX, original.offsetY, original.width, original.height,
        original.pressure, original.rotation,
        original.tiltX, original.tiltY,
        original.pointerId, original.pointerType,
        original.timeStamp, original.isPrimary
      )
    }
    if (eventType === 'TouchEvent') {
      original.initTouchEvent(
        original.type, original.bubbles, original.cancelable,
        original.view, original.detail, original.screenX, original.screenY,
        original.clientX, original.clientY, original.ctrlKey,
        original.altKey, original.shiftKey, original.metaKey,
        original.touches, original.targetTouches, original.changedTouches,
        original.scale, original.rotation
      )
    }
    if (eventType === 'TextEvent') {
      original.initTextEvent(
        original.type, original.bubbles, original.cancelable,
        original.view,
        original.data, original.inputMethod, original.locale
      )
    }
    if (eventType === 'CompositionEvent') {
      original.initTextEvent(
        original.type, original.bubbles, original.cancelable,
        original.view,
        original.data, original.inputMethod, original.locale
      )
    }
    if (eventType === 'KeyboardEvent') {
      original.initKeyboardEvent(
        original.type, original.bubbles, original.cancelable,
        original.view, original.char, original.key,
        original.location, modifiersList, original.repeat
      )
    }
    if (eventType === 'InputEvent' || eventType === 'UIEvent') {
      original.initUIEvent(
        original.type, original.bubbles, original.cancelable,
        original.view, original.detail
      )
    }
    if (eventType === 'FocusEvent') {
      original.initFocusEvent(
        original.type, original.bubbles, original.cancelable,
        original.view, original.detail, original.relatedTarget
      )
    }
  }

  newtarget.dispatchEvent(eventCopy)
  if (eventCopy.defaultPrevented) original.preventDefault()
}
