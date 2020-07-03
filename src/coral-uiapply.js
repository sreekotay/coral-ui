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

  function findEl (node, sel) {
    var w = sel[0]
    w = isdigit(w) ? 'num' : w
    switch (w) {
      case 'num':
        var n = sel.split('.')
        for (var i = 0; i < n[i]; i++) {
          node = node.childNodes[n[i]]
          if (!node) return null
        }
        return node
        break
      case '^':
        var i = sel.substring(1) | 0
        while (i) node = node.parentNode
        return node
        break
      default: return node.querySelector(sel)
    }
  }
  function last () { return this[this.length - 1] }
  UIApply.prototype._mapper = function (u, rootEl, rootO, cEl, o, path) {
    cEl = cEl || rootEl
    path = path || ''
    o = {}
    rootO = rootO || o
    for (var k in u) {
      var uk = u[k]
      var sel = Array.isArray(uk) ? uk[0] : uk
      var el = typeof (sel) === 'number' ? cEl.childNodes[sel] : findEl(cEl, sel)
      if (!el) {
        console.error(rootEl, cEl)
        throw Error('selector ' + sel + ' not found for "' + k + '"')
      }
      var rp = rootO[path + k] = getChildPath(rootEl, el)
      rp.tel = el
      rp.last = last
      rp.path = k.split('.')
      if (sel !== uk) {
        var uk1 = uk[1]
        if (typeof (uk1) === 'object') { rp.ui = this._mapper(uk1, rootEl, rootO, el, o, path + k + '.') } else rp.func = this.funcmap.prop[path + k] = typeof (uk1) === 'string' ? uk1.split('.') : uk1
      }
    }
    return o
  }

  UIApply.prototype.prep = function (root, html, uimap) {
    this.clear()
    html = html.replace(/\>(\t|\s|\n|\r)*\</g, '><').trim()
    var f = this.fragment = coral.ui.hydrate(root, html)
    this.uimap = this._mapper(uimap, f)
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
  // hydrate - initial
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
    for (var i = 0; i < pa.length; i++) {
      if (!el) { debugger }
      el = el.childNodes[pa[i] + (offsets[i] || 0)]
    }
    return el
  }

  // ==========================================================
  // element modify
  // ==========================================================
  function isdigit (str) { var c = str.charCodeAt(0); return c > 47 && c < 58 }
  function isfunction (obj) { return !!(obj && obj.constructor && obj.call && obj.apply) }
  function changeEl (el, value, func) {
    // if (value === 1) debugger;
    if (func) {
      if (0 && isfunction(func)) func(el, value)
      else {
        var v = coral.dot(el, func)
        if (isfunction(v.value)) v.value.call(v.obj, value)
        else if (v.obj && v.value !== value) v.obj[v.prop] = value
      }
      return
    }
    if (el.nodeType === 3) { el.nodeValue = value } else if (el.nodeName === 'TEXTAREA' || el.nodeName == 'INPUT') { el.value = value } else {
      if (el.childNodes.length === 1 && el.firstChild.nodeType === 3) {
        if (el.firstChild.nodeValue !== value) { el.firstChild.nodeValue = value }
      } else if (el.textContent !== value) { el.textContent = value }
    }
  }

  function callElFunc (el, path, value, f) {
    f = f ? (f.prop[path] || f.name[el.nodeName] || f.type[el.nodeType]) : null
    changeEl(el, value, f)
  }

  // ==========================================================
  // data apply
  // ==========================================================
  function insertAfter (newNode, afterNode) {
    afterNode.parentNode.insertBefore(newNode, afterNode.nextSibling)
  }
  function applier (ui, rootEl, o, path, offsets) {
    offsets = offsets || []
    var u = ui.uimap
    var f = ui.funcmap
    if (Array.isArray(o)) {
      var au = u[path]; if (!au) return
      var pel = pathEl(rootEl, au, offsets); if (!pel) return
      var aindex = au.last()
      var arrEl = pel.arrEl = pel.arrEl || [pel]
      pel = pel.parentNode
      if (o.length) {
        for (var i = 0; i < o.length; i++) {
          if (i >= arrEl.length || arrEl[0].nodeType === '#comment') {
            var el = au.tel.cloneNode(true)
            if (i) {
              insertAfter(el, arrEl[i - 1])
            } else {
              insertAfter(el, arrEl[0])
              pel.removeChild(arrEl[0])
            }
            arrEl[i] = el
          }
          var e = o[i]
          if (typeof (e) === 'object') {
            offsets = offsets.slice()
            offsets[au.length - 1] = i
            applier(ui, rootEl, e, path, offsets)
          } else {
            callElFunc(arrEl[i], path, e, f)
          }
        }
        while (o.length < arrEl.length) {
          pel.removeChild(arrEl[arrEl.length - 1])
          arrEl.length--
        }
      } else if (arrEl.length > 1 || arrEl[0].nodeName !== '#comment') {
        var ce = document.createComment(' ')
        pel.insertBefore(ce, arrEl[0])
        for (var i = 0; i < arrEl.length; i++) pel.removeChild(arrEl[i])
        arrEl = [ce]
      }

      return
    }

    var op = path
    path = (path && path + '.') || ''
    for (var k in o) {
      var ok = o[k]
      var pk = path + k

      if ((k | 0) == k) {
        var uop = u[op]; if (!uop) continue
        if (typeof (ok) === 'object') {
          offsets = offsets.slice()
          // offsets[uop.length - 1] = k
          applier(ui, rootEl, ok, op, offsets)
          continue
        }
        var el = pathEl(rootEl, uop, offsets)
        if (el && el.arrEl) {
          callElFunc(el.arrEl[k], op, ok, f)
          continue
        }
      }

      if (typeof (ok) === 'object') { applier(ui, rootEl, ok, pk, offsets); continue }
      if (!u[pk]) continue
      var el = pathEl(rootEl, u[pk], offsets)
      if (el) {
        if (el.arrEl) applier(ui, rootEl, [ok], pk, offsets)
        else callElFunc(el, pk, ok, f)
      }
    }
  }

  UIApply.prototype.data = function (rootEl, o, path, offsets) {
    if (!rootEl.childNodes.length) this.hydrate(rootEl)
    applier(this, rootEl, o, path, offsets)
    return this
  }

  // ==========================================================
  // element modify
  // ==========================================================
  UIApply.prototype.react = function (el, state) {
    var ui = this
    var u = ui.uimap
    coral.observe(state, function (updates) {
      var o = {}
      o[updates.prop] = updates.value

      var offsets = []
      var c = updates.chain
      var path = ''
      if (!c) return
      for (var i = 0; i < c.length; i++) {
        var ci = c[i]
        if (Array.isArray(ci.o)) {
          if (!u[path]) return
          offsets[u[path].length - 1] = ci.p | 0
        } else {
          if (updates.action !== 'set') { o = {}; o[ci.p] = updates.obj; pp = '' + (path || '') }
          path = (path ? path + '.' : '') + ci.p 
        }
      }
      ui.data(el, o, updates.action === 'set' ? path : pp, offsets)
      /*
      if (1) return
      var dp = updates.dotpath.split('.')
      var offsets = []
      var path = ''
      var l = 0
      var pp
      for (var i = 0; i < dp.length; i++) {
        var dpi = dp[i]
        if ((dpi | 0) == dp[i]) {
          if (u[path]) {
            offsets[u[path].length - 1] = dpi | 0
          }
        } else {
          l++
          if (updates.action !== 'set') { o = {}; o[dpi] = updates.obj; pp = '' + (path || '') }
          path = (path ? path + '.' : '') + dpi
        }
      }
      ui.data(el, o, updates.action === 'set' ? path : pp, offsets)
      // console.log(updates)
      */
    })
  }

  window.coral = window.coral || {}
  window.coral.uiapply = UIApply
})()
