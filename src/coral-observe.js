;(function () {
  // ===================================
  // observer
  // ===================================
  function objectObserver (obj, handler, ctxobj, path) {
    if (obj instanceof Node) return
    if (!obj && this.__xs__) obj = this // called via obj.__observe__()
    if (!obj) return
    var sendAdd = !!obj.__xs__

    // only one watcher
    if (ctxobj) {
      path = (path && path.concat()) || []
      path.push(ctxobj)
    }
    handler = attach(handler, obj, path)

    // do the work
    var _obj = values(obj)
    if (_obj.skip) return
    var v = _obj.v
    for (var p in v) {
      if (p in obj) continue
      delete v[p]
      trigger('delete', obj, p, null, null)
    }
    for (p in obj) {
      if (sendAdd && !(p in v)) trigger('add', obj, p, obj[p], null)
      propertyObserver(obj, p, handler, path)
    }

    if (Array.isArray(obj)) arrayObserver(obj, handler)
    if (!obj.__observe__ && path === undefined && ctxobj === undefined) privateprop(obj, '__observe__', objectObserver)
    return obj
  }

  function arrayObserver (arr, handler) {
    if (arr.__xs__.arrhelpers) return
    arr.__xs__.arrhelpers = true
    var mbind = function (method) {
      var mf = function () {
        var o = this; var _o = o.__xs__
        _o.pause = true; var n = Array.prototype[method].apply(o, arguments); _o.pause = false
        tick(_o.s, o, function () { objectObserver(o) })
        trigger(method, o, arguments, o, null)
        return n
      }
      privateprop(arr, method, mf)
    }
    var m = ['pop', 'push', 'shift', 'unshift', 'splice', 'reverse', 'sort']
    for (var i = 0; i < m.length; i++) mbind(m[i])
  }

  function propertyObserver (obj, p, handler, path) {
    var _obj = values(obj)
    var v = _obj.v
    if (handler !== obj) handler = attach(handler, obj)
    var pv = obj[p]
    if (!(p in v)) { // already done
      v[p] = pv
      var gf = function () { return v[p] }
      var sf = function (n) {
        var o = v[p]; v[p] = n
        if (typeof (n) === 'object' && n !== null && !n.__xs__) { tick(_obj.s, obj, function () { objectObserver(n, handler, { o: obj, p: p }, path) }, true) }
        trigger('set', obj, p, n, o)
        return n
      }
      Object.defineProperty(obj, p, { get: gf, set: sf, enumerable: true, configurable: true })
    }
    if (typeof (pv) === 'object') objectObserver(pv, handler, { o: obj, p: p }, path)
  }

  function objectUnobserver (obj, handler) {
    if (!obj.__xs__) return
    var h = obj.__xs__.h
    for (var i = h.length - 1; i >= 0; i--) {
      var ha = h[i]
      if (ha.f === handler) {
        h.splice(i, 1)
      }
    }
    for (var p in obj) if (typeof (p) === 'object' && p !== null) objectUnobserver(p[obj], handler)
  }

  // ===================================
  // internals
  // ===================================
  var __gidcounter = 0
  function values (obj) {
    if (!obj.__xs__) {
      var _w = {
        s: '@' + __gidcounter++,
        v: {}, // values for the object
        h: [] // handlers // but don't allocate them if not needed
        /* p: {}, // array of property symbols */
      }
      privateprop(obj, '__xs__', _w)
    }
    return obj.__xs__
  }

  var __ghsymbol = 0
  function attach (handler, obj, path) {
    if (handler === obj || !handler) return obj
    if (typeof (handler) === 'object') handler = values(handler).h
    else handler = [{ rootobj: obj, f: handler, path: path, s: '#' + __ghsymbol++ }]

    handlerMerge(values(obj).h, handler, path)
    return obj
  }

  function handlerMerge (a, b, path) { // modifies original array
    if (a === b) return
    var dotpath = path ? undefined : ''
    for (var i = 0; i < b.length; i++) {
      var bs = b[i].s
      if (!a[bs]) {
        if (dotpath === undefined) dotpath = path.reduce(function (p, n) { return p + (p && '.') + n.p }, '')
        a[bs] = true
        a.push({ f: b[i].f, s: b[i].s, path: path, dotpath: dotpath, root: path ? path[0].p : undefined })
      }
    }
  }

  // ===================================
  // notification
  // ===================================
  function chainfind (obj) { // for events
    if (obj === this.obj) return this.prop
    var uc = this.chain
    for (var i = 0; i < uc.length; i++) if (uc[i].o === obj) return uc[i].p
    return null
  }

  function trigger (action, obj, p, n, o) {
    var _obj = obj.__xs__
    if (!_obj || !_obj.h || _obj.pause) return
    var h = _obj.h
    for (var i = 0; i < h.length; i++) {
      var ha = h[i]
      var upd = {
        rootobj: ha.rootobj,
        obj: obj,
        action: action,
        prop: p,
        value: n,
        prev: o,
        chain: ha.path,
        root: ha.root || p,
        dotpath: ha.dotpath || '',
        path: ha.dotpath ? ha.dotpath + '.' + p : p,
        find: chainfind
      }
      ha.f.call(obj, upd)
    }
  }

  // ===================================
  // alias
  // ===================================
  function alias (obsobj, obsp, refobj, refp, listener) {
    if (obsobj === refobj && obsp === refp) return null
    var reflect = function (updates) {
      if (updates.chain && updates.chain.length && updates.chain[0].p === refp) {
        if (updates.chain.length === 1 && obsobj[obsp] !== updates.obj) obsobj[obsp] = updates.obj
        updates.chain[0].p = obsp // alias it
        listener(updates)
        updates.chain[0].p = refp // set it back
      } else if (!updates.chain && updates.prop === refp) {
        if (updates.value !== obsobj[obsp]) { obsobj[obsp] = updates.value }
        updates.prop = updates.path = updates.root = obsp // alias it
        listener(updates)
        updates.prop = updates.path = updates.root = refp
      }
    }
    if (refobj instanceof Node) {
      // if (!(obsp in obsobj))
      obsobj[obsp] = refobj[refp] // "realize" it
      if (!obsobj.__observer__) xs.observe(obsobj)
      var objpd = Object.getOwnPropertyDescriptor(obsobj, obsp)
      /*
      switch (refp) {
        case 'value': {
          refobj.addEventListener ('input', function() {
            console.log(refobj[refp])
            obsobj[obsp] = refobj[refp]
          })
        }
      }
*/
      Object.defineProperty(obsobj, obsp, {
        get: function () { return refobj[refp] },
        set: function (v) { refobj[refp] = v; return objpd.set(v) },
        enumerable: true,
        configurable: true })
      return null
    }
    if (!(refp in refobj)) refobj[refp] = refobj[refp] // "realize" it
    xs.observe(refobj, reflect)
    obsobj[obsp] = refobj[refp] // copy the initial
    xs.observe(obsobj)

    // below makes it two way
    var refpd = Object.getOwnPropertyDescriptor(refobj, refp)
    var gf = refpd.get
    var sf = refpd.set
    Object.defineProperty(obsobj, obsp, { get: gf, set: sf, enumerable: true, configurable: true })

    return reflect
  }

  // ==============
  // helper stuff
  // ==============
  function isfunction (obj) { return !!(obj && obj.constructor && obj.call && obj.apply) }
  function dotapply (value) { var v = this.obj[this.prop]; isfunction(v) ? v.apply(this.obj, Array.isArray(value) ? value : [value]) : this.obj[this.prop] = value }
  function doterror (value) { console.error('property not found', this, value) }
  function ppath (p) { if (typeof (p) === 'string') p = p.split('.'); return p }
  function dot (obj, path) {
    path = ppath(path)
    var l = path.length
    for (var i = 0; i < l; i++) {
      var k = path[i]; var o = obj; obj = o[k]
      if ((!obj || typeof (obj) !== 'object') && ((i + 1 < l) || (false/*! (k in o) */))) return { last: { obj: o, prop: k }, apply: doterror }
    }
    return { value: obj, obj: o, prop: k, apply: dotapply }
  }
  dot.array = function (arr, path) { path = ppath(path); var v = []; for (var i = 0; i < arr.length; i++) v.push(dot(arr[i], path)); return v }
  dot.arrayApply = function (arr, path, value) { path = ppath(path); for (var i = 0; i < arr.length; i++) dot(arr[i], path).apply(value) }
  dot.arrayKeysApply = function (arr, keys) { for (var i = 0; i < arr.length; i++) dot.keysApply(arr[i], keys) }
  dot.keysApply = function (obj, keys) { for (var k in keys) dot(obj, k).apply(keys[k]) }
  dot.keysFromArray = function (obj, arrOfKeys) { var o = {}; var aok = arrOfKeys; for (var k in aok) o[aok[k]] = dot(obj, aok[k]); return o }

  function deepcopy (a, b) {
    if (b === undefined) return a
    if (typeof (b) !== 'object' || b === null) return b
    var bt = Object.prototype.toString.call(b)
    if (bt === '[object RegExp]' || bt === '[object Date]' || b instanceof Node) return b
    if (bt === '[object Array]') {
      if (Object.prototype.toString.call(a) !== '[object Array]') a = [] // should we FORCE to array?
      var c = []
      /*
      for (var i in b) { if (!(i in a)) c[i] = b[i] }
      for (i in c) a[i] = c[i]
      */
      /*
      for (var i in b) { if (!(i in a)) c[i] = deepcopy(c[i], b[i]) }
      for (i in c) a[i] = deepcopy(a[i], c[i])
      */

      for (var i = 0; i < b.length; i++) if (a.indexOf(b[i]) < 0) c.push(deepcopy(b[i]))
      a = a.concat(c)
      var d = {}
      for (i in b) { if (!(i in a)) d[i] = deepcopy(d[i], b[i]) }
      for (i in d) a[i] = deepcopy(a[i], d[i])
      return a
    }
    if (typeof (a) !== 'object') a = {}
    for (var k in b) a[k] = deepcopy(a[k], b[k])
    return a
  }
  // function objclone () { var a = arguments; var al = -1; var o = {}; while (++al < a.length) o = objmerge(o, a[al]); return o }
  function objassign () { var a = arguments; var al = 0; var o = a[0]; while (++al < a.length) o = deepcopy(o, a[al]); return o }
  function privateprop (o, k, v, writable) { Object.defineProperty(o, k, { value: v, enumerable: false, configurable: true, writable: !!writable }); return v }

  var __gobt; var __gob = { '@': {} }
  function resolveTick () {
    __gobt = null; var gob = __gob; __gob = { '@': {} }
    var g = gob['@']; gob['@'] = null
    for (var k in g) { if (g[k]) g[k].f.call(g[k].o, g[k].o) }
    for (k in gob) { if (gob[k]) gob[k].f.call(gob[k].o, gob[k].o) }
  }
  function tick (_s, o, f) {
    var g = (_s[0] === '@') ? __gob['@'] : __gob
    g[_s] = { f: f, o: o }
    if (!__gobt) __gobt = setTimeout(resolveTick, 0)
  }
  /*
  function tick (_s, o, f, delay) {
    // delay = true
    // f.call(o, o); return true;
    var g
    if (_s[0] === '@') g = __gob['@']; else g = __gob
    if (__gobt) {
      if (!(_s in g) && !delay) {
        f.call(o, o)
        g[_s] = null
      } else g[_s] = { f: f, o: o }
      return false
    }
    if (!delay) f.call(o, o)
    else g[_s] = { f: f, o: o }
    __gobt = setTimeout(resolveTick, 0)
    return true
  }
  */

  // export
  var xs = window.coral = window.coral || {}
  xs.observe = objectObserver
  xs.unobserve = objectUnobserver
  xs.alias = alias
  xs.assign = objassign
  xs.tick = tick
  xs.dot = dot
  xs.privateprop = privateprop
}).call(this)
