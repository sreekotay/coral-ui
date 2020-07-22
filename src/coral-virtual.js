var virtualBinder = function (rootEl, children, parent) {
  parent = parent || document.body
  if (rootEl.coralVirtual) return rootEl.coralVirtual

  var defheight = 10
  var heights = []
  var gcs = window.getComputedStyle(rootEl)
  var props = {
    paddingLeft: toPX(gcs.paddingLeft),
    paddingRight: toPX(gcs.paddingRight),
    paddingTop: toPX(gcs.paddingTop),
    paddingBottom: toPX(gcs.paddingBottom),
    height: rootEl.style.height
  }

  function genrow (row) {
    var h = ''
    for (var i = 0; i < row.length; i++) {
      h += '<div style="padding:8px; border: 1px solid black">' + row[i] + '</div>'
    }
    var el = document.createElement('div')
    el.innerHTML = h
    el.style.display = 'flex'
    return el
  }

  rootEl.addEventListener('scroll', function (e) {
    update()
  })

  var pause = false
  function update () {
    if (pause) return
    props.height = rootEl.style.height
    var els = children; if (!els.length) return
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
    /*
    var vis = coral.dot.array(els, 'style.display')
    */
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
      /*
      var st = el.style
      var reset
      if (st.display === 'none') {
        reset = st.display
        st.display = st.coralDisplay || 'block'
      }
      var r = el.getBoundingClientRect()
      if (reset) st.display = reset
      return r
      */
    }

    /*
    var tr, br
    for (var i = 0; i < vis.length; i++) {
      if (vis[i].value !== 'none' && !tr) tr = els[i].getBoundingClientRect()
      else if (vis[i].value === 'none' && !br && i) br = els[i - 1].getBoundingClientRect()
    }
    */
    // if (tr && tr.top <= t+props.paddingTop && br && br.bottom>=b+ props.paddingTop) return

    // coral.dot.arrayApply(els, 'style.display', 'none')
    var scrollLeft = rootEl.scrollLeft
    var scrollTop = rootEl.scrollTop
    var y = -scrollTop
    var marginTop = 0
    var marginBottom = 0
    var h = 0
    var be = rootEl.be
    if (!rootEl.be) {
      rootEl.style.position = 'relative'
      rootEl.be = be = document.createElement('div')
      rootEl.append(be)
      be.style.height = defheight * els.length + 'px'
    }
    while (rootEl.children.length > 1) rootEl.removeChild(rootEl.children[1])
    for (var i = 0; i < els.length; i++) {
      var row = els[i]
      var er = bounds(row)
      var show = false
      if (marginTop + y + er.height <= 0 + props.paddingTop) { }// marginTop += er.height }
      else if (marginTop + y >= b - t + props.paddingTop) { }// marginBottom += er.height }
      else { h += er.height; show = true }

      // el.style.display = show ? 'block' : 'none'
      if (show) {
        var el = genrow(row)
        el.style.position = 'absolute'
        el.style.top = y + scrollTop + 'px'
        el.style.left = 0
        rootEl.append(el)
        y += el.getBoundingClientRect().height
      }
      // console.log (i, y|0, marginTop|0, h|0, marginBottom|0, el.style.display )
      // y += er.height
      else y += defheight
      // if (marginBottom>0) break;
    }
    // rootEl.style.paddingTop = (props.paddingTop + marginTop) + 'px'
    // rootEl.style.paddingBottom = (props.paddingBottom + marginBottom) + 'px'
    if (props.height) rootEl.style.height = props.height; else rootEl.style.removeProperty('height')
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
