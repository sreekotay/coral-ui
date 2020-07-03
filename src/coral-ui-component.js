
coral.ui.register('*cui-links', {
  state: {
    datasrc: 'state.links',
    links: []
  },
  slots: {
    default: {
      script: function (a) { return coral.ui.template('d', '<a class="btn" href="${d[1]}" class="active">${d[0]}</a>')(a) }
    }
  }
})

coral.ui.register('*cui', {
  update: function () {
    var ts = this.slots || { default: { text: 'EMPTY' } }
    this.html(1, ts.default.script ? ts.default.script(this.state) : ts.default.text)
  }
})

coral.ui.register('*cui-editor-js', {
  update: function () {
    var p = this.state.page
    if (!p) return 'EMPTY'
    var b = p.blocks
    for (var i = 0; i < b.length; i++) {
      var t
      var e = b[i]
      var d = e.data
      var h = ''
      switch (e.type) {
        case 'header':
          t = 'h' + d.level
          h = '<' + t + '>' + d.text + '</' + t + '>'
          break
        case 'paragraph':
          h = '<p>' + d.text + '</p>'
          break
        case 'delimiter':
          h = '<hr>'
          break
        case 'list':
          h += d.style !== 'unordered' ? '<ol>' : '<ul>'
          for (var j = 0; j < d.items.length; j++) h += '<li>' + d.items[j] + '</li>'
          h += d.style !== 'unordered' ? '</ol>' : '</ul>'
          break
        case 'image':
          h = '<div class="img"><img src="' + d.url + '">' + (d.caption ? '<span>' + d.cpation + '</span>' : '') + '</div>'
          break
      }
      if (h) this.html(i, h)
    }
  }
})

coral.ui.register('cui-hamburger', {
  state: {
    always: false
  },
  update: function () {
    if (!this.state.always) { this.rootEl.classList.add('cui-wide-hide') } else {
      this.emit('expand', { expandclass: 'cui-wide-always', expand: true })
      this.emit('expand', { expandclass: 'cui-wide-show', expand: false })
    }
    this.html(0, '<button class="hamburger hamburger--vortex" style="padding:0" type="button">' +
                  '<span class="hamburger-box"><span class="hamburger-inner"></span></span>' +
                  '</button>')
  },
  listeners: {
    click: function (event) {
      var el = this.rootEl.querySelector('.hamburger')
      el.classList.toggle('is-active')
      this.emit('expand', { expand: el.classList.contains('is-active') })
    }
  }
})

coral.ui.register('*cui-row', {
  update: function () {
    var ts = this.slots || { default: { text: 'EMPTY' } }
    this.rootEl.classList.add('cui-horizontal')
    this.html(0, '<div style="flex-grow:1"></div>')
    this.html(1, ts.default.script ? ts.default.script(this.state) : ts.default.text)
    this.html(2, '<div style="flex-grow:1"></div>')
  },
  lifecycle: {
    afterRender: function () {
      // this.rootEl.classList.add('coral-sticky')
      coralStickyScroll.apply(this.rootEl)
    }
  }
})

// ===============================================
// utils
// ===============================================
function coralStickyScroll (event, el) {
  var els = (el || document).getElementsByClassName('coral-sticky')
  var parmap = new WeakMap()
  var data = []
  for (var i = 0; i < els.length; i++) {
    var el = els[i]
    var pel = clippedParent(el.parentNode)
    var startY = parmap.get(pel) | 0
    var d = {
      startY: startY,
      pel: pel,
      eof: el.getBoundingClientRect(),
      pof: pel.getBoundingClientRect()
    }
    parmap.set(pel, startY + d.eof.height + heightMargin(el))
    data.push(d)
  }
  for (var i = 0; i < els.length; i++) {
    var d = data[i]
    var el = els[i]
    var pel = d.pel
    var eof = d.eof
    var pof = d.pof
    var startY = d.startY
    var endY = parmap.get(pel)

    var ael = verifyAfterElement(el, eof)
    var offx = el.getAttribute('coral-sticky-x') | 0
    var offy = el.getAttribute('coral-sticky-y') | 0
    var nposx = Math.min(Math.max(pof.leftt, offx), pof.right - eof.width)
    var nposy = Math.min(Math.max(0, pof.top, offy) + topAdjust(el) + startY, pof.bottom - (endY - startY) + topAdjust(el))// - bottomAdjust(el))
    var aof
    if (ael.style.display === 'none') {
      if (eof.top < nposy) {
        ael.style.display = 'block'
        if (!el.stickyInfo) {
          var es = el.stickyInfo = {}
          es.position = el.style.position
          es.zIndex = el.style.zIndex
          es.top = el.style.top
          es.width = el.style.width
          es.left = el.style.left
          es.height = el.style.height
        }
        el.style.position = 'fixed'
        el.style.width = eof.width - widthAdjust(el)
        // el.style.height = eof.height
        el.style.zIndex = 1000
        el.classList.add('coral-stuck')
        var cl = el.getAttribute('coral-sticky-class')
        if (cl) el.classList.add.apply(el.classList, cl.split(' '))
        aof = ael.getBoundingClientRect()
        ael.style.margin = window.getComputedStyle(el).margin
        ael.style.width = eof.width
      }
    } else {
      aof = ael.getBoundingClientRect()
      if (aof.top >= nposy) {
        ael.style.display = 'none'
        var es = el.stickyInfo
        var elsty = el.style
        elsty.position = es.position
        elsty.zIndex = es.zIndex
        elsty.top = es.top
        elsty.width = es.width
        elsty.left = es.left
        elsty.height = es.height
        el.classList.remove('coral-stuck')
        var cl = el.getAttribute('coral-sticky-class')
        if (cl) el.classList.remove.apply(el.classList, cl.split(' '))
      }
    }
    if (ael.style.display !== 'none') {
      if (el.style.left !== nposx) el.style.left = nposx
      if (el.style.top !== nposy) el.style.top = nposy - topAdjust(el)
      if (aof) {
      //  el.style.width = aof.width- widthAdjust(el)
      }
      // if (aof) el.style.height = aof.height
    }
  }
}
coralStickyScroll.listener = function (event) {
  coralStickyScroll(event)
  return
  if (!coralStickyScroll.ticking) {
    coralStickyScroll(event)
    coralStickyScroll.ticking = false
    /*
    window.requestAnimationFrame(function() {
      coralStickyScroll.ticking = false;
      coralStickyScroll()
    }); */
    coralStickyScroll.ticking = true
  }
}
coralStickyScroll.apply = function (el) {
  if (!coralStickyScroll.resize) {
    coralStickyScroll.resize = window.addEventListener('resize', coralStickyScroll.listener)
  }
  coralStickyScroll.wm = coralStickyScroll.wm || new WeakMap()
  var els = el ? (Array.isArray(el) ? el : [el]) : document.getElementsByClassName('coral-sticky')
  for (var i = 0; i < els.length; i++) {
    var el = els[i]
    while (el) {
      if (!coralStickyScroll.wm.has(el)) {
        coralStickyScroll.wm.set(el)
        el.addEventListener('scroll', coralStickyScroll.listener)
        // if (el !== window) window.addResizeListener(el, coralStickyScroll.listener)
      }

      el = el.parentNode
      if (el === document.body) el = window
    }
  }
  coralStickyScroll(null, el)
}

function verifyAfterElement (el, eof) {
  var a = el.previousSibling
  if (!a || !a.coralHolder) {
    var d = document.createElement('div')
    d.setAttribute('style', 'padding:0;margin:0;border:none;display:none;')
    d.coralHolder = true
    el.parentNode.insertBefore(d, el)
    a = d
  }
  if (!eof) eof = el.getBoundingClientRect()
  // a.style.width = eof.width
  a.style.height = eof.height
  return a
}
function topAdjust (el) {
  var cs = window.getComputedStyle(el)
  return parseInt(cs.marginTop)
}
function bottomAdjust (el) {
  var cs = window.getComputedStyle(el)
  return parseInt(cs.marginBottom)
}
function widthAdjust (el) {
  var cs = window.getComputedStyle(el)
  return parseInt(cs.borderLeftWidth) + parseInt(cs.borderRightWidth) + parseInt(cs.paddingLeft) + parseInt(cs.paddingRight)
}
function widthMargin (el) {
  var cs = window.getComputedStyle(el)
  return parseInt(cs.marginLeft) + parseInt(cs.marginRight)
}
function heightMargin (el) {
  var cs = window.getComputedStyle(el)
  return parseInt(cs.marginTop) + parseInt(cs.marginBottom)
}
function clippedParent (el) {
  var iel = el
  do {
    if (!el.style) break
    if (el.style.overflow) return el
    el = el.parentNode
  } while (el)
  return document.body
}

(function () {
  var attachEvent = document.attachEvent
  var isIE = navigator.userAgent.match(/Trident/)
  var requestFrame = window.requestAnimationFrame
  var cancelFrame = window.cancelAnimationFrame

  function resizeListener (e) {
    var win = e.target || e.srcElement
    if (win.__resizeRAF__) cancelFrame(win.__resizeRAF__)
    win.__resizeRAF__ = requestFrame(function () {
      var trigger = win.__resizeTrigger__
      trigger.__resizeListeners__.forEach(function (fn) {
        fn.call(trigger, e)
      })
    })
  }

  function objectLoad (e) {
    this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
    this.contentDocument.defaultView.addEventListener('resize', resizeListener)
  }

  window.addResizeListener = function (element, fn) {
    if (!element.__resizeListeners__) {
      element.__resizeListeners__ = []
      if (attachEvent) {
        element.__resizeTrigger__ = element
        element.attachEvent('onresize', resizeListener)
      } else {
        if (getComputedStyle(element).position == 'static') element.style.position = 'relative'
        var obj = element.__resizeTrigger__ = document.createElement('object')
        obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;')
        obj.__resizeElement__ = element
        obj.onload = objectLoad
        obj.type = 'text/html'
        if (isIE) element.appendChild(obj)
        obj.data = 'about:blank'
        if (!isIE) {
          var sdom = element// .attachShadow({mode:'open'});
          sdom.appendChild(obj)
        }
      }
    }
    element.__resizeListeners__.push(fn)
  }

  window.removeResizeListener = function (element, fn) {
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
    if (!element.__resizeListeners__.length) {
      if (attachEvent) element.detachEvent('onresize', resizeListener)
      else {
        element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', resizeListener)
        element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__)
      }
    }
  }
})()

coralStickyScroll.apply()
