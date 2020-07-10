var virtualBinder = function (rootEl) {
  var parent = document.body
  if (rootEl.coralVirtual) return rootEl.coralVirtual

  var gcs = window.getComputedStyle(rootEl)
  var props = {
    paddingLeft: toPX(gcs.paddingLeft),
    paddingRight: toPX(gcs.paddingRight),
    paddingTop: toPX(gcs.paddingTop),
    paddingBottom: toPX(gcs.paddingBottom),
    height: rootEl.style.height
  }

  function bounds (el) {
    var st = el.style
    var reset
    if (st.display === 'none') {
      reset = st.display
      st.display = st.coralDisplay || 'block'
    }
    var r = el.getBoundingClientRect()
    if (reset) st.display = reset
    return r
  }

  function update () {
    var els = rootEl.children; if (!els.length) return
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
    var vis = coral.dot.array(els, 'style.display')
    if (t >= b || l >= r) {
      return
    }
    rootEl.style.height = rr.height + 'px'
    rootEl.style.paddingTop = (props.paddingTop) + 'px'
    rootEl.style.paddingBottom = (props.paddingBottom) + 'px'

    var tr, br
    for (var i = 0; i < vis.length; i++) {
      if (vis[i].value !== 'none' && !tr) tr = els[i].getBoundingClientRect()
      else if (vis[i].value === 'none' && !br && i) br = els[i - 1].getBoundingClientRect()
    }
    //if (tr && tr.top <= t+props.paddingTop && br && br.bottom>=b+ props.paddingTop) return

    coral.dot.arrayApply(els, 'style.display', 'none')
    var y = 0
    var marginTop = 0
    var marginBottom = 0
    var h = 0
    for (var i = 0; i < els.length; i++) {
      var el = els[i]
      var er = bounds(el)
      var show = false
      if (marginTop + er.bottom <= t +  props.paddingTop) { marginTop += er.height } 
      else if (marginTop + er.top >= b +  props.paddingTop) { marginBottom += er.height } 
      else { h += er.height; show = true }
      el.style.display = show ? 'block' : 'none'
      console.log (i, y|0, marginTop|0, h|0, marginBottom|0, el.style.display )
      y += er.height
      if (marginBottom>0) break;
    }
    rootEl.style.paddingTop = (props.paddingTop + marginTop) + 'px'
    rootEl.style.paddingBottom = (props.paddingBottom + marginBottom) + 'px'
    if (props.height) rootEl.style.height = props.height; else rootEl.style.removeProperty('height')
  }

  rootEl.coralVirtual = {
    parent: function (p) { if (p !== undefined) parent = p; return parent },
    update: update
  }
  return rootEl.coralVirtual
}
