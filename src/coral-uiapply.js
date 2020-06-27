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

  function last () { return this[this.length - 1] }
  function mapper (u, rootEl, rootO, cEl, o, path) {
    cEl = cEl || rootEl
    path = path || ''
    o = {}
    rootO = rootO || o
    for (var k in u) {
      var uk = u[k]
      var sel = Array.isArray(uk) ? uk[0] : uk
      var el = typeof (sel) === 'number' ? cEl.childNodes[sel] : cEl.querySelector(sel)
      if (!el) {
        console.error(rootEl, cEl)
        throw Error('selector ' + sel + ' not found for "' + k + '"')
      }
      var rp = rootO[path + k] = getChildPath(rootEl, el)
      rp.tel = el
      rp.last = last
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
    for (var i = 0; i < pa.length; i++) {
      if (!el) { debugger }
      el = el.childNodes[pa[i] + (offsets[i] || 0)]
    }
    return el
  }

  function isdigit (str) { var c = str.charCodeAt(0); return c > 47 && c < 58 }
  function isfunction (obj) { return !!(obj && obj.constructor && obj.call && obj.apply) }
  function changeEl (el, value, func) {
    // if (value === 1) debugger;
    if (func) {
      if (isfunction(func)) func(el, value)
      else {
        var v = coral.dot(el, func)
        if (isfunction(v.value)) v.value.call(v.obj, value)
        else if (v.obj) v.obj[v.prop] = value
      }
      return
    }
    if (el.nodeType === 3) el.nodeValue = value
    else if (el.nodeName === 'TEXTAREA' || el.nodeName == 'INPUT') el.value = value
    else el.textContent = value
  }

  function callElFunc (el, path, value, f) {
    f = f ? (f.prop[path] || f.name[el.nodeName] || f.type[el.nodeType]) : null
    changeEl(el, value, f)
  }

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

      return/*
      var inc = au.tel.childNodes.length
      var pel = pathEl(rootEl, au, offsets); if (!pel) return
      for (var i = 0; i < o.length; i++) {
        var e = o[i]
        for (var j = 0; j < (inc || 1); j++) {
          if (pel.childNodes.length <= cl++) {
            pel.appendChild(inc
              ? au.tel.childNodes[j].cloneNode(true)
              : document.createTextNode(''))
          }
        }
        if (typeof (e) === 'object') {
          offsets[au.length] = i * (inc || 1)
          applier(ui, rootEl, e, path, offsets)
        } else {
          callElFunc(pel.childNodes[i * (inc || 1)], path, e, f)
          for (var j = 1; j < inc; j++) callElFunc(pel.childNodes[i * (inc || 1) + j], path, '', f)
        }
      }
      while (pel.childNodes.length > cl) pel.removeChild(pel.childNodes[pel.childNodes.length - 1])
      return
      */
    }

    var op = path
    path = (path && path + '.') || ''
    for (var k in o) {
      var ok = o[k]
      var pk = path + k

      if ((k | 0) == k) {
        var upk = u[op]; if (!upk) continue
        if (typeof (ok) === 'object') {
          offsets = offsets.slice()
          // offsets[upk.length - 1] = k
          applier(ui, rootEl, ok, op, offsets) 
          continue
        }
        var el = pathEl(rootEl, upk, offsets)
        if (el && el.arrEl) {
          callElFunc(el.arrEl[k], op, ok, f)
          continue
        }
      }

      if (typeof (ok) === 'object') { applier(ui, rootEl, ok, pk, offsets); continue }
      var upk = u[pk]; if (!upk) continue
      var el = pathEl(rootEl, upk, offsets)
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

  UIApply.prototype.react = function (el, state) {
    var ui = this
    coral.observe(state, function (updates) {
      //        if (updates.action !== 'set') return
      var o = {}
      o[updates.prop] = updates.value
      var dp = updates.dotpath.split('.')
      var offsets = []
      var path = ''
      var l = 0
      var pp
      for (var i = 0; i < dp.length; i++) {
        var dpi = dp[i]
        if ((dpi | 0) == dp[i]) offsets[l - 1] = dpi | 0
        else {
          l++
          if (updates.action !== 'set') { o = {}; o[dpi] = updates.obj; pp = '' + (path || '') }
          path = (path ? path + '.' : '') + dpi
        }
      }
      ui.data(el, o, updates.action === 'set' ? path : pp, offsets)
      //console.log(updates)
    })
  }

  window.coral = window.coral || {}
  window.coral.uiapply = UIApply
})()
