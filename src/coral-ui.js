// ============================================
// UIFactory
// ============================================
function UIFactory (opts) {
  opts = opts || {}
  var xs = window.coral
  var rf_range = document.createRange()
  var rf_counter = 0 // used for 'symbol'
  var rf_listeners = {}
  var rf_key = 0
  const rf_registry = {
    '': {
      update: function () {
        var _s = this.state
        var slots = this.slots || {}
        var slot = slots[_s.dataslot || 'default']
        if (!slot) return 'done'
        if (!_s.datasrc) return 'done'
        var dc = ('datactx' in _s) ? this.dot(_s.datactx).value : this
        var dl = ('datasrc' in _s) ? this.dot(_s.datasrc).value : this
        var gk = _s.genkey
        if (Array.isArray(dl) && dl.length === 0 && dl.keys().length === 0) dl = null
        var gen = (dl && slot) || slots.empty || { text: '<div> </div>' }
        var key = _s.datakey; var uk
        if (!Array.isArray(dl) && !_s.dataobj) dl = [dl]
        if (slots.header) this.html(-1, slots.header.script ? slots.header.script(dc) : slots.header.text)
        // var hm = this.__.hmap || {}; dc.__hmap__ = hm
        /*
        if (this.name=='article-comments')
          this.name=this.name
        if (this.name=='article')
          this.name=this.name
        if (this.rootEl.classList.contains('tag-list'))
          this.name=this.name
        */
        //for (var i = 0; i < dl.length; i++) {
        for (var i in dl) {
          var t = typeof (dl[i])
          if (dl[i]) uk = key === undefined ? dl[i].__key__ : dl[i][key]
          if (gk && uk === undefined && t === 'object') uk = xs.privateprop(dl[i], '__key__', 'k' + rf_key++)
          var row = gen.script ? gen.script(dl[i], i, dc) : gen.text
          this.html(uk || i, row)
        }
        // delete dc.__hmap__
        if (slots.footer) this.html(-2, slots.footer.script ? slots.footer.script(dc) : slots.footer.text)
      }
    }
  }

  function coralWarn () { console.error(arguments) }
  function coralError () { console.error(arguments); throw Error('CORAL FAULT') }
  function alwaysobj (rf, n) { rf[n] = rf[n] || {}; return rf[n] }

  // ============================================
  // dom
  // ============================================
  function run (arg) {
    var d = (arg || document)
    var r = []
    var rels = d.querySelectorAll('[coral]')
    for (var i = 0; i < rels.length; i++) {
      if (!rels[i].coral) {
        var rr = UIDOM(rels[i], d.coral)
        publishLF(rr, 'mount')
        if (rr) rr.render_()
        r.push(rr)
      } else rels[i].coral.render_()
    }
    return r
  }

  function parseScript (attrBag, c) {
    try {
      var type = c.getAttribute('type')
      var args = type.match(/\(([^)]*)\)/); args = args ? args[1] : ''
      var ftext = c.innerHTML.trim()
      var props = attrBag.props = attrBag.props || {}

      if (ftext) {
        switch (type.split('(')[0].trim()) {
          case 'coral-method': alwaysobj(attrBag, 'methods')[c.getAttribute('name') || 'default'] = new Function(args, ftext); break
          // case 'coral-listener': alwaysobj(attrBag, 'listeners')[c.getAttribute('name') || 'default'] = new Function(args, ftext); break
          case 'coral-observer': alwaysobj(attrBag, 'observers')[c.getAttribute('name') || 'default'] = new Function(args, ftext); break
          case 'coral-function': c.coralScript = new Function(args, ftext); break
          case 'coral-template': c.coralScript = templateEngine(args, ftext); break
          default:
            var p = type.split('coral-s-')[1]
            if (p) { try { ftext = JSON.parse(ftext) } catch (err) {} props[p.trim()] = ftext; return true }
            coralWarn('unknown coral slot type', type)
            break
        }
      }
    } catch (err) { coralWarn('coral-slot script parsing ERROR:', ftext || c.type, c, err) }
  }

  function UIDOM (el, parentCoral) {
    if (!el) return null
    var coralName = el.getAttribute('coral')
    try {
      var attrBag = getAttributes(el)
      var cloneEl = el.cloneNode(true) // deep copy
      if (cloneEl) {
        attrBag = attrBag || {}
        if (cloneEl.children) {
          for (var i = 0; i < cloneEl.children.length; i++) {
            var slots = alwaysobj(attrBag, 'slots')
            var c = cloneEl.children[i]
            var ga = c.getAttribute
            var attr = (ga && ga.call(c, 'coral-slot')) || 'default'
            if (c.nodeName === 'SCRIPT' && c.type.indexOf('coral-') === 0) {
              if (parseScript(attrBag, c)) continue
            }
            var sa = slots[attr] = slots[attr] || []
            sa.push(c)
            sa.text = (sa.text || '') + (ga ? c.outerHTML : c.state) // convenience
            if (!('el' in sa)) sa.el = c // convenience
            if (!('script' in sa) && c.coralScript) sa.script = c.coralScript // convenience
          }
        }
      }

      return mount(el, coralName, attrBag, parentCoral)
    } catch (err) {
      coralWarn('UI failed to mount: ', coralName, el, err)
    }
    return null
  }

  function publishLF (coral, lf) { return coral.lifecycle && coral.lifecycle[lf] && coral.lifecycle[lf].call(coral) }

  function getAttributes (el) {
    var attrBag
    var attrlist = el.attributes
    for (var i = 0; i < attrlist.length; i++) {
      var attr = attrlist[i]
      var n = attr.name + ''
      if (n.indexOf('coral-s') === 0) {
        attrBag = attrBag || { }
        var val = attr.value
        var spl = n[7] // whatever the character is... use two of those to split - 6 is len of 'coral-s'
        var ev = val.split(spl + spl); val = ev[0]; ev = ev[1]
        var p = n.substring(8) // 8 is len of 'coral-sX' (note the 'X')
        var d = determineDataBinding(p, val)
        try { val = JSON.parse(val) } catch (err) {}
        if (!d) alwaysobj(attrBag, 'props')[p] = val; else alwaysobj(attrBag, 'bind')[p] = d
        if (ev) alwaysobj(attrBag, 'events')[p] = ev
      } else if (n.indexOf('coral-on-') === 0) {
        var lis = n.substring(9)
        attrBag = attrBag || { }
        alwaysobj(attrBag, 'listeners')[lis] = attr.value
      }
    }
    return attrBag
  }

  function determineDataBinding (k, v) {
    if (v[0] !== '~') return false
    var s = v.split('~')
    return { prop: s[1], selector: (s.length < 2) ? '^' : s[2] }
  }

  function templateGenerator (args, templateString) {
    return new Function(args, 'return `' + templateString + '`;')
  }

  function templateGeneratorES5 (args, templateString) {
    templateString = templateString.split('\n').join('\\\n').replace(/"/g, '\\"') // multiline and escape double quotes and slashes
    return new Function(args, 'var f=function (_, exp) {return eval(exp)}; f.bind(this); return "' + templateString + '".replace(/\\${(.*?)}/g, f)')
  }

  function mount (el, name, localData, parentCoral) {
    localData = localData || {}
    if (!rf_registry[name]) coralError('UI NOT registered: ', name)

    // make UI
    var defaultData = rf_registry[name]
    var coral = new opts.use(name, el, defaultData, localData)
    el.setAttribute('coral-stage', 'mounted')

    // register listeners
    if (coral.listeners) {
      var al = []
      var rl = coral.listeners
      for (var k in rl) {
        al.push(k)
        var ev = k.split('.')
        var e = ev[0]
        if (!rf_listeners[e]) { // we only need to add it once
          var eli = listenerFactory(e)
          if (ev[1] === 'local') {
            al[e] = rl[e + '.local']
            el.addEventListener(e, eli, false)
          } else {
            rf_listeners[e] = eli
            document.addEventListener(e, eli, false)
          }
        }
        rl[e] = rl[k]
        if (rl[ev[1]] === 'stop') rl[e].coralStop = true
      }
      coral.listeners = al // keep the tag so we know we had listeners - but they are source from the registry
    }

    return coral
  }

  function listenerFactory (type) {
    return function (event) {
      var el = (event.detail && event.detail.coralEmitRootEl) || event.target; var rr
      var evattr = 'coral-on-' + type
      var handlers = []
      while (el) {
        if (el.getAttribute) {
          var evvalue = el.getAttribute(evattr)
          if (!evvalue) {
            evvalue = el.getAttribute(evattr + '.stop')
            if (evvalue) evvalue.stop = true
          }
          if (evvalue) handlers.push(evvalue.trim())
          var coral = el.coral
          if (!event.coral) event.coral = coral
          if (coral && handlers.length) { // parse the handler for the event
            for (var i = 0; i < handlers.length; i++) {
              var ev = handlers[i]
              var fn = ev
              /*
              var func = function (event) { eval(fn) }
              try { func.call(coral, event) } catch (err) { coralWarn('coral-event-Error') }
              /* // old syntax - you do do prop(value)
              */
              var parseArgs = function (str) {
                var argsets = str.match(/\(([^)]*)\)/)
                return (argsets && argsets[1]) || ''
              }
              var args = parseArgs(fn)
              if (args) {
                args = args.split(',')
                fn = fn.split('(')[0]
                var idx = args.indexOf('$event') // allow substition
                if (idx >= 0) args[idx] = event
              }
              var f = coral.dot(fn); var rval
              if (f.obj !== undefined) {
                if (isfunction(f.value)) rval = f.value.apply(f.obj, args || [event])
                else coral.dot(fn, args[0])
                if (rval === 'stop' || ev.stop) return
              }
            }
          }
          var rn = coral && coral.name
          var eh = ((coral || {}).listeners || {})[type] || ((rf_registry[rn] || {}).listeners || {})[type]
          if (eh) {
            if (eh.call(coral, event) === 'stop' || eh.coralStop) { return } // hmm - should we support bubbling?
          }
        }
        el = el.parentNode
      }
    }
  }

  function register (inname, coralData, superCoral) {
    var name = (inname[0] === '*') ? inname.substring(1) : inname
    superCoral = superCoral || ''
    coralData.state = arrtoobj(coralData.state, undefined)
    if (rf_registry[name]) { if (inname === name) coralError('UI already registered: ' + name); return }
    if (!rf_registry[superCoral]) coralError('Super Coral NOT registered: ' + superCoral)
    rf_registry[name] = xs.assign({}, rf_registry[superCoral], coralData)
    rf_registry[name].name = name
    rf_registry[name].super = superCoral
    return true
  }

  // ============================================
  // UI - helpers
  // ============================================
  function resolveEl (el, ctx) { if (typeof (el) !== 'string') return el; return resolveEl(ctx || document).querySelector(el) }
  function isfunction (obj) { return !!(obj && obj.constructor && obj.call && obj.apply) }
  function arrtoobj (arr, v) { if (!Array.isArray(arr)) return arr; var o = {}; for (var i = 0; i < arr.length; i++) o[arr[i]] = (arguments.length <= 1 ? true : v); return o }
  function cif (o, props, o1, o2) {
    for (var i = 0; i < props.length; i++) {
      var p = props[i]
      var np = (p in o2) ? o2[p] : o1[p]
      if (np === undefined) continue
      o[p] = xs.assign({}, o1[p], o2[p])
    }
  }

  // ============================================
  // UI - constructor
  // ============================================
  function UI (name, rootEl, setup, localSetup) {
    setup = setup || {}
    localSetup = localSetup || {}
    var rf = this
    var _ = this.__ = {}
    cif(_, ['update', 'bind'], setup, localSetup)
    cif(this, ['methods', 'observers', 'listeners', 'data', 'mutate', 'lifecycle'], setup, localSetup) // intentional shallow copies
    if ('shared' in setup) this.shared = setup.shared
    if (setup.events || localSetup.events) _.events = xs.assign({}, arrtoobj(setup.events), localSetup.events)
    if (setup.decorators || localSetup.decorators) _.decorators = xs.assign({}, arrtoobj(setup.decorators), arrtoobj(localSetup.decorators))
    if (setup.slots || localSetup.slots) xs.assign(alwaysobj(this, 'slots'), setup.slots, localSetup.slots)
    if ('super' in setup) this.super = rf_registry[setup.super]

    var sh = this.methods; if (sh) for (var k in sh) sh[k] = isfunction(sh[k]) ? sh[k].bind(rf) : sh[k] // bind to coral

    this.name = name
    this.rootEl = rootEl
    rootEl.coral = this
    _.obsf = UI.prototype.react.bind(rf)
    var _s = this.state = xs.observe({}, _.obsf) // public as well -- our main "react" core
    xs.assign(_s, _.decorators, setup.state, localSetup.props) // make our state
    // for (k in this.observers) if (!(k in _s)) _s[k] = undefined
    for (k in _.bind) doDataBind(this, 'state.' + k, _.bind[k].selector, _.bind[k].prop)
    xs.observe(_s) // trigger observers
    this.sym = '$' + rf_counter++
    return this
  }
  UI.prototype.unmount = function () {
    publishLF(this, 'umnount')
    var _ = this.__ || {}
    xs.unobserve(this.state, _.obsf)
    if (_.bind) {
      for (var k in _.bind) {
        var b = _.bind[k]
        if (b.obsf) xs.unobserve(b.sp.obj, b.obsf)
      }
    }
  }

  // ============================================
  // react
  // ============================================
  function regexprep (o) { var s = ''; for (var k in o) { s += ':xs:' + k + '\n' }; return s }
  UI.prototype.react = function (updates) { // core event engine
    updates.coral = this
    var _ = this.__
    var status
    var p = updates.root// = updates.path.split('.')[0]//updates.path ? updates.path.split('.')[0] : updates.prop
    var _obs = this.observers
    var _ev = _.events
    var rx = _.proprx = _.proprx || ((_obs ? regexprep(_obs) : '') + (_ev ? regexprep(_ev) : ''))
    if (rx) {
      var str = '(:xs:((' + updates.path/* .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') */.replace(/\./g, '\\.)|(\\*\\.))*((') + ')|(\\*)))\n'
      var regx = new RegExp(str, 'g')
      var m = rx.match(regx)
      if (m) {
        var mp = m[0]
        for (var i = 1; i < m.length; i++) if (m[i].length > mp.length) mp = m[i]
        p = mp.substring(4, mp.length - 1) // skipe the ':xs:
      }
    }
    var op = _obs && _obs[p]
    if (op) { // observers
      if (isfunction(op)) status = op.call(this, updates)
      else {
        if (!updates.path && (updates.action === 'set' || updates.action === 'add')) {
          var o = this.dot(op)
          if (isfunction(o.value)) o.value.call(this)
          else o.obj[o.prop] = updates.value
        }
      }
    }
    if (_ev && _ev[p]) { // events
      var e = _.name + '.' + (_ev[p] === true ? p : _ev[p])
      emit(this.rootEl, e, updates)
    }

    var mstatus
    if (updates.value === updates.prev) return
    if (this.mutate) mstatus = this.mutate.call(this, updates)
    var _d = _.decorators
    if (!this.sym) return // we are still constructing
    if (status !== 'done' && mstatus !== 'done' && (!_d || (!_d[p] && !_d[mp]))) this.rerender() // re-render
  }
  UI.prototype.observe = function (k, cb) { var _o = alwaysobj(this, 'observers'); _o[k] = cb; this.__.obsrx = null }
  UI.prototype.decorate = function (k, set) { var _d = alwaysobj(this, 'decorators'); _d[k] = (set !== false && set !== 0) }
  UI.prototype.events = function (k, set) { var _e = alwaysobj(this.__, 'events'); _e[k] = (set !== false && set !== 0 && set); this.__.evrx = null }
  UI.prototype.watch = function (k, o) { this.state[k] = o; this.state.__observe__() }
  UI.prototype.bind = function (k, sel, copyk, ctx) { doDataBind(this, k, sel, copyk, ctx, true) }
  // UI.prototype.bindForce = function (k, sel, copyk, ctx) { doDataBind(this, k, sel, copyk, ctx, true) }
  UI.prototype.emit = function (ev, detail) { emit(this.rootEl, ev, detail) }
  function loadData (datapath, url, opts) { // this must be UI
    var rf = this
    var xhrc = alwaysobj(this.__, 'xhrc')
    if (xhrc[datapath]) xhrc[datapath].abort()
    opts = opts || {}
    var xhr = opts.xhr || new XMLHttpRequest()
    /* if (!opts.xhr || opts.responseType) // either it's new or it's passed in
    { xhr.responseType = opts.responseType || 'json' } */
    xhr.onerror = function (err) { console.log('CORAL HTTP LOAD FAIL', err, url); emit(rf.rootEl, 'coralLoadDataFail', { url: url, xhr: xhr, err: err }) }
    xhr.onload = function (ev) {
      if (xhr.readyState !== 4) return
      delete xhrc[datapath]
      if (this.status >= 200 && this.status < 300) {
        var res = this.response
        try { res = JSON.parse(res) } catch (err) {}
        if (opts.sanitize) res = sanitize(res)
        rf.dot(datapath, res)
      } else if (this.status) { xhr.onerror(ev) }
    }
    xhrc[datapath] = xhr
    xhr.open(opts.method || 'GET', url, true)
    var b = opts.body
    for (var h in (opts.headers || {})) xhr.setRequestHeader(h, opts.headers[h])
    xhr.send(b ? (typeof (b) === 'string' ? '' : JSON.stringify(b)) : null)
    return xhr
  }
  function loadHTML (datapath, url) { // this must be UI
    var rf = this
    var htmc = alwaysobj(this.__, 'htmc')
    if (document.readyState !== 'loading') {
      var script = document.createElement('script')
      script.src = url
      document.getElementsByTagName('head')[0].appendChild(script)
    } else {
      document.write('<script src="' + url + '"></script')
      script = document.getElementsByTagName('script')
      script = script[script.length - 1]
    }
    var curc = htmc[datapath] = (htmc[datapath] || 0) + 1
    script.onerror = function (err) { console.log('CORAL SCRIPT LOAD', err); script.parentNode.removeChild(script); emit(rf.rootEl, 'coralLoadHTMLFail', { url: url, script: script, err: err }) }
    script.coralCB = function (data) { if (htmc[datapath] === curc) rf.dot(datapath, data) }
    if (!document.currentScript) window.rf_script = script
    return script
  }

  function realizeSource (refobj, copyprop) {
    var pp = copyprop.split('.')
    var sp = xs.dot(refobj, pp)
    if (sp.obj) return sp
    var fp = pp; var oc = refobj
    for (var i = 0; i < fp.length; i++) {
      var nc = oc[fp[i]]; if (nc === undefined || nc === null || typeof (nc) !== 'object') oc[fp[i]] = (i == fp.length - 1 ? undefined : {}); oc = oc[fp[i]]
    }
    return xs.dot(refobj, pp)
  }

  function jsonp (str, rf, proppath) {
    var ind = str.indexOf('{JSONP}')
    if (ind < 0) return str
    var fname = 'jsonp_rf_' + rf_counter++
    window[fname] = function (data) {
      rf.dot(proppath, data)
      delete window[fname]
    }
    return str.replace('{JSONP}', fname)
  }
  function looseNode (el) { var r = el && el.getRootNode(); return r && r !== document && r.nodeName !== '#document-fragment' }
  /* function findParentCoral (rf, count) {
    var el = rf && rf.rootEl
    while (rf && el) {
      if (count-- == 0) return rf
      do el = el.parentNode; while (el && !el.coral)
      rf = el.coral
    }
    return null
  } */
  function doDataBind (rf, proppath, sel, copyprop, selctx, force) {
    var refobj, sp
    sel = sel || '^'
    var _ = rf.__
    var _b = alwaysobj(_, 'bind')
    var _bp = alwaysobj(_b, proppath)
    copyprop = copyprop || proppath
    if (!force && _bp.proppath === proppath && _bp.selector === sel && _bp.prop === copyprop && !_bp.copy) return
    switch (sel[0]) {
      case '^':
        refobj = rf.rootEl
        var which = sel.substring(1) | 0; while (which--) refObj = refObj.parentElement
        refobj = refobj && refobj.coral
        if (!refobj) coralError('unable to find parent to state bind', rf, proppath)
        sp = realizeSource(refobj, copyprop)
        break
      case '#':
      case '.':
      case '[':
        var el = (selctx || document).querySelector(sel)
        refobj = el && el.coral
        if (!refobj) coralError('unable to locate coral for bind', selctx, copyprop)
        sp = realizeSource(refobj, copyprop)
        break
      default:
        var els = sel.split('$')
        _b[proppath] = { proppath: proppath, selector: sel, prop: copyprop }
        switch (els[1]) {
          case 'data':
          case 'html':
          case 'json-raw': loadData.call(rf, proppath, els[2], selctx); break
          case 'json': loadData.call(rf, proppath, els[2], xs.assign({ sanitize: true }, selctx || {})); break
          case 'jsonp': els[2] = jsonp(els[2], rf, proppath) // fall through
          case 'js': loadHTML.call(rf, proppath, els[2]); break
          default:
            coralError('unknown data bind: ' + proppath + ': ' + sel)
        }
        sp = realizeSource(rf, copyprop)
        if (copyprop === proppath) return
        break
        // fall through
    }

    // /var dp = dot(rf, proppath)
    var dp = realizeSource(rf, proppath)
    if (!dp.obj) coralError('state bind not found: ' + proppath)
    if (_bp.copy) { dp.obj[dp.prop] = sp.obj[sp.prop]; return }

    var f = function (u) { if (looseNode(rf.rootEl)) { rf.unmount(); return } rf.react(u) }
    if (sp.obj !== refobj.state) {
      xs.observe(refobj.state, function (updates) {
        // to handldle the nested case
        if (_b[proppath].copy || looseNode(rf.rootEl)) return
        if (updates.action == 'set' && copyprop.indexOf(updates.path) === 6) { // 6 = "state."
          _b[proppath].copy = true
          doDataBind(rf, proppath, sel, copyprop, selctx)
          _b[proppath].copy = false
        }
      })
    }
    var obsf = xs.alias(dp.obj, dp.prop, sp.obj, sp.prop, f)
    _b[proppath] = { proppath: proppath, selector: sel, prop: copyprop, sp: sp, unobs: obsf }
  }

  // ============================================
  // render
  // ============================================
  UI.prototype.render_ = render
  UI.prototype.render = function () { xs.tick(this.sym + '_rr', this, render) }
  function render () {
    if (this !== this.rootEl.coral) return // shit.
    publishLF(this, 'beforeRender')
    // var t = new Date()
    var rel = this.rootEl
    if (looseNode(rel)) { this.unmount(); return }
    var update = this.__.update
    if (update) {
      var fc = this.__.fcounter
      if (fc) this.htmlBegin()
      fc = this.__.fcounter //  reset it
      var res = update.call(this, this.slots) || ''
      if (this.__.harr && res !== 'done') this.htmlEnd()
      else {
        if (typeof (res) === 'string') {
          if (res !== 'done') rel.innerHTML = res // a way to "out"
        } else {
          rel.innerHTML = ''
          if (Array.isArray(res)) res.forEach(function (e) { rel.appendChild(e) })
          else rel.appendChild(res)
        }
        run(rel) // hydrate nested components
      }
      // if (rel.parentNode.classList.contains('container')) { console.log('render', new Date() - t) }
    }
    this.__.renderflag = 0
    publishLF(this, 'afterRender')
  }
  UI.prototype.rerender = function () {
    this.__.renderflag = (this.__.renderflag || 0) + 1
    xs.tick(this.sym + '_rr', this, rerender, true)
  }
  function rerender () {
    if (this.__.renderflag === 0) return
    var sel = saveSelection(this.rootEl)
    render.call(this)
    sel()
    this.__.renderflag = 0
  }
  function getAttachPoint (el) {
    switch (el.nodeName) {
      case 'TABLE': return (el.childNodes && el.childNodes[0]) || el
      default: return el
    }
  }
  function hash (str) {
    // if (typeof (str) === 'object') str = JSON.stringify(str)
    if (!str) { return 0 }
    var hash = 0; var len = str.length
    for (var i = 0; i < len; i++) {
      hash = hash * 31 + str.charCodeAt(i)
      hash = hash & hash
    }
    return hash
  }
  UI.prototype.htmlBegin = function (forceClean) {
  if (!this.__.harr || forceClean || this.__.hroot !== this.rootEl) {
      this.__.hmap = {}
      this.__.hgeneration = -1
    }
    this.__.hroot = this.rootEl
    this.__.harr = []
    this.__.harr.html = ''
    this.__.harr.htmlIdx = 0
    this.__.harr.wmap = new WeakMap()
    this.__.hgeneration++
    this.__.fcounter = 0
  }
  /*
  function replaceNode (c, nch) {
    var p = c.previousSibling
    var pn = p || c.parentNode
    if (!c.getAttribute && 0) { c.nodeValue = nch } else { c.outerHTML = nch }
    return p ? p.nextSibling : pn.childNodes[0]
  }
*/
  const rf_tagvalue = {
    'INPUT': true,
    'TEXTAREA': true
  }
  function copyAttributes (c, n) {
    // try {
    var a = {}; var at
    var na = n.attributes; var nal = na.length
    if (rf_tagvalue[c.nodeName] && c.value !== n.value) { 
      c.value = n.value 
    } // for textarea and input
    for (var i = 0; i < nal; i++) {
      at = na[i]; a[at.name] = true
      if (c.getAttribute(at.name) !== at.value) {
        c.setAttribute(at.name, at.value)
      }
    }
    var ca = c.attributes; var cal = ca.length
    if (cal === nal) return true
    for (i = cal - 1; i >= 0; i--) {
      at = ca[i]; if (a[at.name]) continue
      c.removeAttribute(at.name)
    }
    return true
    // } catch (err) { return false }
  }
  function mergeNode (c, n) {
    if (!c) return n
    if (!n) { return n }
    if (n.coral) {
      var oc = c.coral
      c.coral = n.coral
      c.coral.rootEl = c
      /* if (oc) {
        xs.assign (c.coral.state, oc.state)
        c.coral.data = oc.data
      } */
    } else c.coral = null
    if (c.nodeType === 3 && n.nodeType === 3 && c.nodeValue !== n.nodeValue) {
      c.nodeValue = n.nodeValue
      return c
    }
    if ((c.nodeName !== n.nodeName) || (!copyAttributes(c, n))) {
      c.parentNode.replaceChild(n, c)
      return n
    }
    var cc = c.childNodes
    var nc = n.childNodes
    if (cc.length || nc.length) {
      var i
      var il = i = Math.min(cc.length, nc.length)
      while (il < cc.length) c.removeChild(cc[i])
      while (il < nc.length) c.appendChild(nc[i])
      while (--i >= 0) {
        var ccn = cc[i]
        var ncn = nc[i]
        if (ccn.nodeType === 3 && ncn.nodeType === 3) {
          if (ccn.nodeValue !== ncn.nodeValue) { 
            ccn.nodeValue = ncn.nodeValue 
          }
          continue
        }
        if (ccn.isEqualNode(ncn)) continue
        if (ccn.nodeName !== ncn.nodeName || !mergeNode(ccn, ncn)) {
          c.replaceChild(ncn, ccn)
        }
      }
    }
    return c
  }

  UI.prototype.htmlUpdate = function (idx, id, htmlGen) {
    var _ = this.__
    var hm = _.hmap
    if (!hm) return
    var hsh = hash(htmlGen)
    id = (id === undefined || id === null) ? hsh : id
    if (!(id in hm)) coralError('updating non-existent element')
    if (hm[id].hsh === hsh && idx === hm[id].idx) return
    var root = getAttachPoint(this.rootEl)
    var c = hm[id].el
    if (!c.getAttribute) { if (c.nodeValue !== htmlGen) c.nodeValue = htmlGen; return } // cheat
    hm[id].el = mergeNode(root.childNodes[idx], hydrate(root, htmlGen).firstChild)
    hm[id].hsh = hsh
    hm[id].idx = idx
  }

  UI.prototype.htmlEnd = function () {
    var _ = this.__
    var genid = _.hgeneration
    var fl = this.__.fcounter
    var prev = null
    if (fl === 0) {
      this.htmlBegin(true) // reset
      this.rootEl.innerHTML = ''
      return
    }
    if (genid === 0) this.rootEl.innerHTML = '' // do this first
    var ha = _.harr
    var hm = _.hmap
    var hta = ''
    if (!ha) return
    for (var k in hm) { // delete untouched
      var hc = hm[k]
      if (hc.generation === genid) continue
      if (hc.el && hc.el.parentNode) hc.el.parentNode.removeChild(hc.el)
      delete hm[k]
    }

    var root = getAttachPoint(this.rootEl)
    var div = document.createElement(root.nodeName)

    if (ha.html) {
      // root.innerHTML = ha.html; run(root); return
      div = hydrate(root, ha.html)
      run(div) // hydrate nested components
      ha.html = ''
    }

    var cnt = 0
    for (var i = 0; i < fl; i++) {
      hc = ha[i]
      var c = hc.el
      var h = hc.h
      // if (typeof (h) === 'object') h = h.html()
      if (typeof (h) === 'number') {
        var n = div.childNodes[hc.h - cnt]
        n = mergeNode(c, n)
        if (n !== c) {
          hc.el = c = n
          cnt++
        }
      } else if (h) {
        if (/* 0 && */i >= root.childNodes.length) hta += h
        else hc.el = c = hydrate(root, h).firstChild
      }
      hc.idx = i
      hc.h = ''
      if (c) {
        hc.el = c
        ha.wmap.set(c, i)
        if (c.parentNode !== root || c.previousSibling !== prev) { // clean up placement
          if (prev) {
            root.insertBefore(c, prev.nextSibling)
          } else if (!root.childNodes || root.childNodes[0] !== c) {
            root.insertBefore(c, root.childNodes && root.childNodes[0])
          }
        }
        prev = c
      }
    }
    ha.length = fl

    var rcl = root.childNodes.length
    if (hta) {
      root.insertAdjacentHTML('beforeend', hta) // end insert
      run(root) // hydrate nested components
    }
    root = getAttachPoint(this.rootEl)
    if (root && ha.length !== root.childNodes.length) {
      console.error('inconsistent count - must be 1 html() entity for hmtl()')
    }
    for (i = rcl; i < ha.length; i++) { ha[i].el = root.childNodes[i]; ha.wmap.set(ha[i].el, i) }
    return 'done'
  }

  UI.prototype.htmlFromIdx = function (idx) {
    var root = getAttachPoint(this.rootEl)
    return root.childNodes[idx]
  }
  UI.prototype.htmlChild = function (el) {
    while (el.parentNode !== this.rootEl) el = el.parentNode
    return el
  }
  UI.prototype.htmlToIdx = function (el) {
    while (el.parentNode !== this.rootEl) el = el.parentNode
    var v = this.__.harr.wmap.get(el)
    return v === undefined ? -1 : v
  }
  function hydrate (type, h) {
    rf_range.selectNode(type)
    var el = rf_range.createContextualFragment(h)
    return type.nodeName === 'TBODY' ? el.childNodes[0] : el
  }
  UI.prototype.html = function (id, htmlGen, force) {
    if (!this.__.harr) this.htmlBegin()
    var _ = this.__
    var ha = _.harr
    var hm = _.hmap
    var idx = _.fcounter++
    var genid = _.hgeneration
    var hsh = hash(htmlGen); var hc
    id = (id === undefined || id === null) ? hsh : id
    if (hm[id] && hm[id].generation === genid) {
      id = '__' + idx + '__'
    }
    if (hm[id]) {
      hc = hm[id]
      if (hc.generation === genid) { coralError('duplicate html() id') }
      hc.generation = genid
      ha[idx] = hc // set the position
      if (hc.el && !hc.el.parentNode) hc.el = null
      if (hc.el && hc.hsh === hsh && !force && !hc.el.__coral_dirty__) return
      if (hc.el && hc.el.__coral_dirty__) delete hc.el.__coral_dirty__
      hc.h = ha.htmlIdx++
      ha.html += htmlGen
      hc.hsh = hsh
    } else {
      hc = { h: htmlGen, hsh: hsh, idx: idx, id: id, generation: genid, el: null }
      ha.splice(idx, 0, hc)
      hm[id] = hc
    }
  }

  UI.prototype.dot = function (path, value) {
    var v = xs.dot(this, path)
    if (arguments.length > 1) {
      if (!v.obj) throw Error('chain path missing')
      v.obj[v.prop] = value
    }
    return v
  }
  UI.prototype.styleBag = function (e, s) {
    var rel = e instanceof Node ? e : this.rootEl
    if (rel === this.rootEl) s = e
    var hsh = hash(JSON.stringify(s))
    if (rel.__xs__style === hsh) return
    for (var k in s) rel.style[k] = s[k]
    rel.__xs__style = hsh
  }

  // ============================================
  // utilities
  // ============================================
  function getChildIndex (node) { return [].indexOf.call(node.parentNode.childNodes, node) }
  function saveSelection (rootEl) { // save the text selection (call the ret() as func to retore)
    var ael = document.activeElement
    if (ael) {
      var startPosition = ael.selectionStart
      var endPosition = ael.selectionEnd
      var aeindex = []
      while (ael && ael !== rootEl && ael.parentNode) {
        aeindex.push(getChildIndex(ael))
        ael = ael.parentNode
      }
      if (!ael || !ael.parentNode) ael = null
    }
    return function () {
      if (ael) {
        ael = rootEl
        while (ael && aeindex.length) {
          var ind = aeindex.pop()
          ael = ael.childNodes[ind]
        }
        if (ael) {
          if (ael.focus) ael.focus()
          try {
            ael.selectionStart = startPosition
            ael.selectionEnd = endPosition
          } catch (err) {}
        }
      }
    }
  }

  function createCSS (name, rules) {
    var style = document.getElementById('__coral_styles__')
    if (!style) {
      style = document.createElement('style')
      style.id = '__coral_styles__'; style.type = 'text/css'
      document.getElementsByTagName('head')[0].appendChild(style)
    }
    var sheet = style.sheet
    sheet.insertRule(name + '{' + rules + '}', 0)
  }

  // createCSS('coral-helper', 'display:none;')

  var rf_s
  function sanitize (str) {
    if (typeof (str) === 'object') {
      for (var k in str) {
        switch (typeof (str[k])) {
          case 'string':
          case 'object':
            str[k] = str[k] ? sanitize(str[k]) : str[k] // to handle null etc
          default: break
        }
      }
      return str
    }
    rf_s = rf_s || document.createElement('div')
    rf_s.textContent = str
    return rf_s.innerHTML
  }
  function emit (el, ev, detail) {
    el = resolveEl(el); detail = detail || {}
    if (el) { detail.coralEmitRootEl = el }
    document.dispatchEvent(new CustomEvent(ev, { detail: detail }))
  }

  function ready (cb) {
    if (document.readyState === 'complete' ||
      (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
      cb()
    } else {
      document.addEventListener('DOMContentLoaded', cb)
    }
  }
  if (opts.autorun) {
    ready(function () {
      run()
    })
  }

  opts.use = opts.use || UI
  var templateEngine = document.currentScript ? templateGenerator : templateGeneratorES5 // proxy for literal support

  // ============================================
  // exports
  // ============================================
  return {
    register: register,
    mount: mount,
    run: run,
    template: templateEngine,
    hydrate: hydrate,
    ready: ready,
    emit: emit,
    sanitize: sanitize,
    cssRule: createCSS,
    styleBag: UI.prototype.styleBag,
    registry: function (name) { return name ? rf_registry[name] : rf_registry },
    find: function (a, ctx) { a = this.findAll(a, ctx); return a ? a[0] : null },
    findAll: function (a, ctx) { a = [].slice.call((ctx || document).querySelectorAll(a)); var j = 0; if (a) for (var i = 0; i < a.length; i++) { a[j] = a[i].coral; j += a[j] ? 1 : 0 } return j ? (a.length = j, a) : null }
  }
}

window.coral.ui = UIFactory({ autorun: true })

// ============================================
// clientSideInclude ()
// ============================================
;(function () {
  var coral = window.coral = window.coral || {}; coral.ui = coral.ui || {}
  coral.ui.loadScript = function (url, cb, asCSS) {
    if (document.querySelector('script[url="' + (url) + '"]')) { if (cb) cb(true); return }
    if (asCSS) {
      var s = document.createElement('link')
      s.setAttribute('rel', 'stylesheet')
      s.setAttribute('type', 'text/css')
      s.setAttribute('href', url)
    } else {
      var s = document.createElement('script')
      s.src = url
      s.setAttribute('url', url)
    }
    s.onload = function () { cb(false) }
    document.getElementsByTagName('head')[0].appendChild(s)
    // setTimeout (()=>document.getElementsByTagName('head')[0].appendChild(s), 200000)
  }
  coral.ui.clientSideInclude = function (data) {
    function isfunction (obj) { return !!(obj && obj.constructor && obj.call && obj.apply) }
    if (isfunction(data)) data = data.toString().split('\n').slice(1, -1).join('\n')
    var dsc = document.currentScript || window.rf_script
    if (!dsc) { // IE11 support
      dsc = document.getElementsByTagName('script')
      dsc = dsc[dsc.length - 1]
    }
    if (window.rf_script) window.rf_script = null
    var cb = dsc.coralCB
    if (cb === undefined) dsc.outerHTML = data
    else cb(data)
    if (dsc.parentNode) dsc.parentNode.removeChild(dsc)
  }
})()
