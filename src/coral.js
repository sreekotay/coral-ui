// ===================================================================================
//
//  coral.q()       .... function (selector) || (elem, selector) || (array)
//       .f()       .... function (dotpath) || (dotpath, setvalue) || (func, 'dotpath')
//       .q(...).o  .... property - alias to first item in arry
//
//  coral.dot()
//  coral.t()
//
// ===================================================================================

(function () {
  var xs = window.coral = window.coral || {}

  // ====================================
  // ==================================== dot --- dotpath
  // ====================================
  function dot (obj, spl) {
    if (typeof (path) === 'string') path = path.split('.')
    var l = path.length
    for (var i = 0; i < l; i++) {
      var k = path[i]; var o = obj; obj = o[k]
      if ((!obj || typeof (obj) !== 'object') && ((i + 1 < l) || (!(k in o)))) return { last: { obj: o, prop: k } }
    }
    return { value: obj, obj: o, prop: k }
  }
  xs.dot = dot

  // ====================================
  // ==================================== q --- query
  // ====================================
  var limited = /^(#?[\w-]+|\.[\w-.]+)$/
  var dotspace = /\./g
  var slice = [].slice
  xs.q = function (ctx, selector) {
    var a
    if (typeof (ctx) === 'object' && !(ctx instanceof Node)) a = ctx
    else {
      if (!selector) { selector = ctx; ctx = document }
      if (limited.test(selector)) {
        switch (selector[0]) {
          case '#': a = [document.getElementById(selector.substr(1))]; break
          case '.': a = slice.call(ctx.getElementsByClassName(selector.substr(1).replace(dotspace, ' '))); break
          default: a = slice.call(ctx.getElementsByTagName(selector))
        }
      } else a = slice.call(ctx.querySelectorAll(selector))
    }
    a.f = _xsf
    Object.defineProperty(a, 'o', { get: function () { return a[0] } })
    return a
  }

  // ====================================
  // ==================================== .f () --- function
  // ====================================
  function isfunction (obj) { return !!(obj && obj.constructor && obj.call && obj.apply) }
  function _xsf (path, value) {
    var arr = this; var spl
    if (arguments.length === 1) {
      if (typeof (path) !== 'string') throw ('path must be a string')
      spl = path.split('.')
      return function () {
        var arg = arguments
        var al = arr.length
        var aout = []
        for (var i = 0; i < al; i++) {
          var v = dot(arr[i], spl)
          if (isfunction(v.value)) aout.push(v.value.apply(v.obj, arg))
          else if (arg.length > 0 && v.obj) aout.push(v.obj[v.prop] = arg[0]) // assign (=) is intentional
          else aout.push(v.value)
        }
        return aout
      }
    } else if (isfunction(path)) {
      if (typeof (value) !== 'string') throw ('value must be the path')
      var f = path; path = value
      spl = path.split('.')
      return function () {
        var al = arr.length
        for (var i = 0; i < al; i++) {
          var v = dot(arr[i], spl)
          if (v.value && typeof (v.value) === 'object') f.apply(v.value, arguments)
        }
        return arr
      }
    } else {
      spl = path.split('.')
      var al = arr.length
      for (var i = 0; i < al; i++) {
        var v = dot(arr[i], spl)
        if (v.obj) v.obj[v.prop] = value
      }
    }
    return this
  }

  // ====================================
  // ==================================== .tweens
  // ====================================
  var tweens = {
    linear: 't',
    quad: 't*t',
    cube: 't*t*t',
    quart: 't*t*t*t',
    quint: 't*t*t*t*t',
    sin: '-Math.cos(t*Math.PI/2)+1',
    expo: 'Math.pow(2,10*(t/d-1))',
    circ: '-(Math.sqrt(1-t*t)-1)'
  }

  function gentweener (f) {
    var t = {}
    t.in = 'return ' + f
    t.out = 't=1-t;' + 'return 1-(' + f + ')'
    t.inout = 't*=2;if(t<1) return 0.5*(' + f + '); t-=2; return 1-0.5*Math.abs(' + f + ')'
    for (var k in t) t[k] = new Function('t', t[k])
    return t
  }

  (function () { for (var t in tweens) tweens[t] = gentweener(tweens[t]) })()

  // ====================================
  // ==================================== .T --- new T()
  // ====================================
  function Tweener (start, end, duration, tween, cb) {
    this.t1 = Date.now()
    this.d = duration
    this.b = start
    this.c = (end - start)
    this.tween = tween
    this.cb = cb
    this.done = false
  }
  Tweener.prototype.reset = function () {
    this.t1 = Date.now()
    this.done = false
  }
  Tweener.prototype.get = function () {
    var t2 = Date.now()
    var t = (t2 - this.t1) / this.d
    if (t > 1) {
      switch (this.type) {
        case 'repeat': t = t % 1; break
        case 'loop': t = t % 2; if (t > 1) t = 2 - t; break
        default: t = 1; break
      }
    }
    this.v = (t < 1 ? this.tween(t) : 1) * this.c + this.b
    return this.v
  }
  xs.tweens = tweens
  xs.T = Tweener

  xs.apply = function (o) { for (var k in o) if (this[k] !== o[k]) this[k] = o[k] }

  // ====================================
  // ====================================  HTML parser
  // ====================================
  var autoclose = ['<html', '<head', '<body', '<p', '<dt', '<dd', '<li', '<option',
    '<thead', '<th', '<tbody', '<tr', '<td', '<tfoot', '<colgroup',
    '<h1', '<h2', '<h3', '<h4', '<h5', '<h6', '<a', '<i', '<b', '<s', '<button', '<video']
  var noclose = ['<!', '<img', '<input', '<br', '<meta', '<area', '<base', '<input', '<col', '<hr', '<embed', '<link', '<param', '<track', '<wbr', '<source']
  var nocloseend
  function arrtoobj_ (arr) { var o = {}; for (var i = 0; i < arr.length; i++) o[arr[i]] = true; return o }
  function filltags () {
    autoclose = arrtoobj_(autoclose)
    noclose = arrtoobj_(noclose)
    nocloseend = {}; for (var k in noclose) nocloseend[k[0] + '/' + k.substring(1)] = true
  }
  function pushel (f, t) {
    if (!f) {
      f = f
      return
    }
    var td = t && t.trim()
    if (!td) return f
    var tag = (td[0] === '<') && td.split(' ')[0]
    if (tag) tag = tag.toLowerCase()
    if (tag[1]=='!') tag = tag.substring(0, 2)
    // tag = tag && tag.split('/')[0] // ugh for self-closing - skip for now
    var el = { d: t, p: f.p, tag: tag, c: null } // el
    if (el.d[0] !== '<' || noclose[tag]) { // add it
      f.push(el)
      return f
    }
    if (el.d[1] === '/') {
      if (nocloseend[tag]) return f // skip it if it's a no-op
      return f.p // pop parent
    }
    var ac = autoclose[tag]
    if (ac && f.tag === tag) f = f.p // check autoclose
    el.c = [] // new parent
    el.c.p = f
    el.c.tag = tag
    f.push(el)
    return el.c
  }
  /* =========================
    [
      [c...c]  .tag = tag
               .d = data
               .p = parent
               .c = [] children
    ]
      ========================= */
  xs.parseHTML = function (s, mode) {
    if (!nocloseend) filltags()
    s = s.split('</')
    var f = []
    var r = f
    for (var i = 0; i < s.length; i++) {
      var t = (((i > 0) ? '</' : '') + s[i]).split('>')
      for (var j = 0; j < t.length; j++) {
        var tt = (mode === 'ws') ? t[j] : t[j].trim()
        if (!tt || tt[0] === '<') {
          if (tt) f = pushel(f, tt)
          continue
        }
        tt = tt.split('<')
        f = pushel(f, tt[0])
        f = pushel(f, tt[1] && ('<' + tt[1].trim()))
      }
    }
    return r // root
  }

  xs.createCSS = function (name, rules) {
    var style = document.getElementById('__dynamic_styles__')
    if (!style) {
      style = document.createElement('style')
      style.id = '__dynamic_styles__'; style.type = 'text/css'
      document.getElementsByTagName('head')[0].appendChild(style)
    }
    var sheet = style.sheet
    sheet.insertRule(name + '{' + rules + '}', 0)
  }
})()

  /*
  function hcopy (c, n) {
    c.tag = n.tag
    c.d = n.d
    c.c = n.c
    c.el = n.el
  }
  function hcopyAttributes (c, n) {
    try {
      var ca = c.a
      var na = n.a
      for (var a in na) {
        if (ca[a] !== na[a]) {
          if (rf_tagvalue[c.nodeName] && a === 'value') {
            c.value = na[a]
          }
          ca[a] = na[a]
          c.el.setAttribute(a, ca[a])
        }
      }
      for (a in ca) {
        if (!(a in na)) {
          delete ca[a]
          c.el.removeAttribute(a)
        }
      }
      return true
    } catch (err) {
      console.error(err)
    }
    return false
  }
  function hmergeAttempt (c, n) {
    if (!c.tag && !n.tag) {
      if (c.d !== n.d) {
        c.d = n.d
        c.el.nodeValue = n.el.nodeValue
      }
      return true
    }
    if (c.tag !== n.tag || !hcopyAttributes(c, n)) {
      return false
    }

    // copy attributes
    if (!c.el || !n.el) { debugger}

    if ((c.c && c.c.length) || (n.c && n.c.length)) {
      var i
      var cc = (c.c && c.c[0] && c.c) || []; var cce = c.el.childNodes
      var nc = (n.c && n.c[0] && n.c) || []; var nce = n.el.childNodes
      var il = i = Math.min(cc.length, nc.length)
      while (il < cce.length) c.el.removeChild(cce[i])
      while (il < nce.length) c.el.appendChild(nce[i])
      c.c.length = n.c.length
      while (--i >= 0) {
        var ccn = cc[i]; ccn.el = cce[i]
        var ncn = nc[i]; ncn.el = nce[i]
        if (!ccn.tag && !ncn.tag) { if (ccn.d !== ncn.d) { ccn.d = ncn.d; ccn.el.nodeValue = ncn.el.nodeValue } continue }
        if (ccn.tag !== ncn.tag || !hmergeAttempt(ccn, ncn)) {
          c.el.replaceChild(ncn.el, ccn.el)
          hcopy(ccn, ncn)
        }
      }
    }
    return true
  }

  function hmerge (c, n) {
    if (c.tag !== n.tag || !hmergeAttempt(c, n)) {
      c.el.parentNode.replaceChild(n.el, c.el)
      hcopy(c, n)
      return n
    }
    return c
  }
  function HTAG (t, data) {
    var p = HTAG.prototype
    this.tag = t
    this.a = p.a
    this.c = p.c
    this.d = data
  }
  HTAG.prototype.a = function (o) {
    this.a = o; this.a[0] = true; return this
  }
  HTAG.prototype.c = function (c) {
    this.c = c; return this
  }
  HTAG.prototype.html = function () {
    if (!this.tag) return this.d
    var a = this.a; var attrs = ''
    if (a && a[0]) {
      for (var k in a) {
        if (k !== '0') { attrs += ' ' + k + '="' + a[k].replace(/"/, '\\"') + '"' }
      }
    }
    var c = this.c; var chtml = ''
    if (c && c[0]) for (var i = 0; i < c.length; i++) chtml += c[i].html()
    return '<' + this.tag + attrs + '>' + chtml +
           '</' + this.tag + '>'
  }

  UI.prototype.htag = function (t) { return new HTAG(t) }
  UI.prototype.hdata = function (d) { return new HTAG(false, d) }
*/