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

  function scrollTracker (ev, eventType, x, y) {
   // if (eventType === 'move') console.log(eventType, x, y)
    if (eventType === 'down') {
      scrollTracker.scrollTop = rootEl.scrollTop
      scrollTracker.scrollLeft = rootEl.scrollLeft
    } else if (eventType === 'move') {
      rootEl.scrollTop = scrollTracker.scrollTop - y
      rootEl.scrollLeft = scrollTracker.scrollLeft - x
    }
  }

  var imp
  if (0) {
    imp = new Impetus({
      source: rootEl.nextElementSibling,
      update: scrollTracker
    })
  }
  trackIt({ el: rootEl.nextElementSibling, update: scrollTracker })
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

function trackIt (opts) {
  var touchEl = opts.el
  var tit = trackIt
  var tracking
  var velocity, timestamp, frame, offset, reference, ticker, amplitude, target
  var timeConstant = 325
  var tickerCount = 0
  var multipler = 1

  offset = 0
  function down (e) {
    console.log(velocity)
    tracking = tit.cleanEvent(e)
    reference = tracking.y
    velocity = amplitude = 0
    offset = 0
    frame = offset
    timestamp = Date.now()
    clearInterval(ticker)
    tickerCount = 0
    ticker = setInterval(track, 100)

    tit.stopEvent(e)
    opts.update(e, 'down')
  }

  function scroll(x, y) {
    offset = y
    opts.update(null, 'move', x, y)
  }

  function autoScroll () {
    var elapsed, delta

    if (amplitude) {
      elapsed = Date.now() - timestamp
      delta = -amplitude * Math.exp(-elapsed / timeConstant)
      if (delta > 0.5 || delta < -0.5) {
        scroll (0, target + delta)
        requestAnimationFrame(autoScroll)
      } else {
        scroll (0, target)
        velocity = 0
      }
    }
  }

  function track (el) {
    var now, elapsed, delta, v
    tickerCount ++

    now = Date.now()
    elapsed = el || now - timestamp
    timestamp = now
    delta = offset - frame
    frame = offset

    v = 1000 * delta / (1 + elapsed)
    velocity = 0.8 * v + 0.2 * velocity
    //velocity = -500
  }

  function up (e) {
    tracking = null
    tit.stopEvent(e)
    clearInterval(ticker)
    if (!tickerCount) track(100)
    if (velocity > 10 || velocity < -10) {
      amplitude = 0.8 * velocity
      target = Math.round(offset + amplitude)
      timestamp = Date.now()
      requestAnimationFrame(autoScroll)
    }
    opts.update(e, 'up')
  }

  function move (e) {
    // console.log('----- move ----', e)
    if (tracking) {
      var moved = tit.cleanEvent(e)
      var delta = moved.y - reference
      if (delta > 2 || delta < -2) {
        reference = moved.y
        //scroll(offset + delta)
      }
      scroll (moved.x - tracking.x, moved.y - tracking.y)
      tit.stopEvent(e)
    }
  }

  function cancel (e) {
    console.log('----- cancel ----', e)
  }

  touchEl.addEventListener('touchstart', down)
  touchEl.addEventListener('touchend', up)
  touchEl.addEventListener('touchmove', move)
  touchEl.addEventListener('touchcancel', cancel)
}

trackIt.cleanEvent = function (e) {
  if (e.type === 'touchmove' || e.type === 'touchstart' || e.type === 'touchend') {
    var t = e.targetTouches[0] || e.changedTouches[0]
    return { x: t.clientX, y: t.clientY, id: t.identifier }
  }
  return { x: e.clientX, y: e.clientY, id: null }
}
trackIt.stopEvent = function (e) {
  e.preventDefault()
  e.stopPropagation()
}

