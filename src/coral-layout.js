(function () {
  // ====================================
  var coral = window.coral = window.coral || {}
  var xs = coral.layout = {}

  function createCSS (name, rules) {
    var style = document.getElementById ('__dynamic_styles__')
    if (!style) {
      style = document.createElement('style');
      style.id = '__dynamic_styles__'; style.type = 'text/css'
      document.getElementsByTagName('head')[0].appendChild(style)
    }
    var sheet = style.sheet
    sheet.insertRule(name + '{' + rules + '}', 0)
  }

  createCSS ('cuil-base', 'position:absolute;')
  
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


  xs.apply = function (o) { for (var k in o) if (this[k] !== o[k]) this[k] = o[k] }

})();