;(function () {
  // ==========================================================
  // constructor
  // ==========================================================
  function UIApply () {
    this.fragment = {}
    this.els = new WeakMap()
    this.uimap = {}
    this.funcmap = { name: {}, prop: {}, type: {} }
  }

  // ==========================================================
  // prep
  // ==========================================================
  function getChildIndex (node) { return [].indexOf.call(node.parentNode.childNodes, node) }
  function getChildPath (d, node) {
    var a = []
    do {
      a.push(getChildIndex(node))
      node = node.parentNode
    } while (node && d !== node)
    return a.reverse()
  }

  function mapper (u, rootEl, rootO, cEl, o, path) {
    cEl = cEl || rootEl
    path = path || ''
    o = {}
    rootO = rootO || o
    for (var k in u) {
      var uk = u[k]
      var sel = Array.isArray(uk) ? uk[0] : uk
      var el = typeof (sel) === 'number' ? cEl.childNodes[sel] : cEl.querySelector(sel)
      if (!el) throw Error(sel, ' not found')
      var rp = rootO[path + k] = getChildPath(rootEl, el); rp.tel = el
      //  ar p = o[k] = getChildPath (cEl, el); p.tel = el
      if (sel !== uk) {
        rp.ui = mapper(uk[1], rootEl, rootO, el, o, path + k + '.')
      // p.ui = mapper (uk[1], cEl)
      }
    }
    return o
  }

  UIApply.prototype.prep = function (root, html, uimap) {
    this.clear()
    html = html.replace(/\>(\t|\s|\n|\r)*\</g, '><')
    var f = this.fragment = coral.ui.hydrate(root, html)
    this.uimap = mapper(uimap, f)
    return this
  }

  // ==========================================================
  // clear
  // ==========================================================
  function clearmap (u) {
    for (var k in u) {
      var uk = u[k]
      if (k === 'children') clearmap(uk)
      if (uk.el && uk.el.parentNode) uk.el.parentNode.removeChild(uk.el)
    }
  }

  UIApply.prototype.clear = function () {
    this.fragment = undefined
    clearmap(this.uimap)
    this.uimap = {}
  }

  // ==========================================================
  // data apply
  // ==========================================================
  function elbind (el, u) {
    for (var k in u) {
      var uk = u[k]
      if (k === 'ui') elbind(el, uk)
      else uk.el = pathEl(el, uk)
    }
  }
  UIApply.prototype.hydrate = function (rootEl) {
    var e = this.fragment
    for (var i = 0; i < e.childNodes.length; i++) { rootEl.appendChild(e.childNodes[i].cloneNode(true)) }
    elbind(rootEl, this.uimap)
  }

  function pathEl (el, pa, offsets) {
    offsets = offsets || []
    for (var i = 0; i < pa.length; i++) { el = el.childNodes[pa[i] + (offsets[i] || 0)] }
    return el
  }
  function changeEl (el, value, func) {
    if (func) { 
      if (typeof (func) === 'string') coral.dot (el, func, value)
      else func(el, value)
      return 
    }
    if (el.nodeName === 'TEXTAREA' || el.nodeName == 'INPUT') el.value = value
    else if (!el.firstChild) el.appendChild(document.createTextNode(value))
    else el.firstChild.nodeValue = value
  }

  function callElFunc (el, path, value, f) {
    f = f ? (f.prop[path] || f.name[el.nodeName] || f.type[el.nodeType]) : null
    changeEl(el, value, f)
  }

  function applier (ui, rootEl, o, path, offsets) {
    offsets = offsets || []
    var u = ui.uimap
    var f = ui.funcmap
    if (Array.isArray(o)) {
      var au = u[path]; if (!au) return
      var inc = au.tel.childNodes.length
      var pel = pathEl(rootEl, au, offsets); if (!pel) return
      var cl = 0
      for (var i = 0; i < o.length; i++) {
        var e = o[i]
        for (var j = 0; j < (inc || 1); j++) {
          if (pel.childNodes.length <= cl++) { pel.appendChild(inc ? au.tel.childNodes[j].cloneNode(true) : document.createElement('span')) }
        }
        if (typeof (e) === 'object') {
          offsets[au.length] = i * (inc || 1)
          applier(ui, rootEl, e, path, offsets)
        } else callElFunc(pel.childNodes[i * (inc || 1)], path, e, f)
      }
      while (cl > pel.childNodes.length) pel.removeChild(pel.childNodes[pel.childNodes.length - 1])
      return
    }
    path = (path && path + '.') || ''
    for (var k in o) {
      var ok = o[k]
      var pk = path + k
      if (typeof (ok) === 'object') { applier(ui, rootEl, ok, pk, offsets); continue }
      var upk = u[pk]; if (!upk) continue

      var el = /* upk.el || */pathEl(rootEl, upk, offsets)
      if (el) callElFunc(el, pk, ok, f)
    }
  }

  UIApply.prototype.data = function (rootEl, o, path, offsets) {
    if (!rootEl.childNodes.length) this.hydrate(rootEl)
    applier(this, rootEl, o, path, offsets)
    return this
  }

  window.coral = window.coral || {}
  window.coral.uiapply = UIApply
})()
