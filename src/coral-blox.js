
// ======================================================================
// coral.ui.DOM
// ======================================================================
;(function (world) {
  var xs = world.coral.ui.DOM = world.coral.ui.DOM || {}
  function cedType (el) { return el.getAttribute && el.getAttribute('coral-blox') }
  function typeOfDOM (el) { return (el && cedType(el)) || (!el || (inlinetag[el.nodeName]) ? 'inline' : el.nodeName) }
  function insertAfter (newNode, existingNode) { existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling) }
  function flatterDOM (rootEl, p, opts) {
    if (1 && opts.keepAttributes && rootEl.hasAttribute && rootEl.hasAttribute('coral-editor')) { // skip it
      var els = rootEl.childNodes
      for (var i = 0; i < els.length; i++) flatterDOM(els[i], rootEl, opts)
      return
    }

    var type = type || (p && typeOfDOM(p))
    var els = rootEl.childNodes
    var custom = elemtags[cedType(rootEl)] || {}
    var ctag = containstagok[rootEl.nodeName] || custom.contains || {}
    var rt = typeOfDOM(rootEl)
    if (!els) return
    for (i = 0; i < els.length; i++) {
      var ep = el
      var el = els[i]
      var et = typeOfDOM(el)
      if (literaltags[et]) continue
      if (!type) type = et
      if (el.firstChild) flatterDOM(el, nestedtag[el.nodeName] ? null : (p || rootEl), opts)
      if (ep && combinableEls(ep, el)) {
        ep.textContent += el.textContent
        rootEl.removeChild(el)
        i--; el = ep // rewind
        continue
      }
      var split = (et !== 'inline' || type === 'inline') && et !== type && !ctag[et]
      split = split || (et === 'inline' && p && rootEl !== p && i && rt === 'inline' && !ctag[et])

      if (split) {
        if (el.parentNode !== p && p) {
          var pp; var lastEl = rootEl
          do {
            if (et === 'inline' && (el.nodeValue || el.firstChild)) {
              if (!pp) {
                pp = rootEl.cloneNode(false)
                insertAfter(pp, lastEl)
                lastEl = pp
              }
              pp.appendChild(el)
            } else {
              insertAfter(el, lastEl)
              pp = null
              lastEl = el
            }
            el = els[i]
            et = typeOfDOM(el)
          } while (el)
          return
        }
      }
    }
  }

  function combinableEls (el1, el2) {
    if (typeOfDOM(el1) !== 'inline' || el1.nodeName !== el2.nodeName || el1.nodeName === 'BR') return false
    if (el1.children) { if (el1.children.length > 1 || (el1.firstChild && el1.firstChild.nodeType !== 3)) return false }
    if (el2.children) { if (el2.children.length > 1 || (el2.firstChild && el2.firstChild.nodeType !== 3)) return false }
    var a1 = el1.attributes
    var a2 = el2.attributes
    if (a1) {
      if (a1.length !== a2.length) return false
      for (var i = 0; i < a1.length; i++) if (a1[i].value !== el2.getAttribute(a1[i].name)) return false
    }
    return true
  }

  function cleanDOM (rootEl, opts) {
    if (!rootEl || !rootEl.childNodes) {
      debugger
      return
    }
    var els = rootEl.childNodes
    var modified = false
    for (var i = els.length - 1; i >= 0; i--) {
      var el = els[i]
      // if (keepAttributes && el.hasAttribute && el.hasAttribute('coral-editor')) continue
      if (el.firstChild) modified = cleanDOM(el, opts) || modified
      modified = (!!transformNode(el, opts)) || modified
    }
    return modified
  }

  function getBlockFromDOM (rootEl, depth) {
    if (!rootEl) return null
    if (typeof (rootEl) === 'string') { var d = document.createElement('p'); d.innerHTML = rootEl; rootEl = d }
    var b = b || { }
    if (rootEl.nodeType !== 3) {
      b.type = // [typeOfDOM(rootEl).toLowerCase()]
      [((rootEl.getAttribute && rootEl.getAttribute('coral-blox')) || rootEl.nodeName).toLowerCase()]
    }
    if (rootEl.coralBloxID) b.id = rootEl.coralBloxID
    if (b.type === 'inline') { debugger }

    var custom = elemtags[cedType(rootEl)]
    if (custom) return custom.toBlock.call(bloxcall, rootEl, { type: b.type })

    depth = depth || 0
    if (b.type && b.type[0] === 'br' && depth === 0) { b.type = ['p']; b.data = '\n'; return b }
    if (b.type && b.type[0] === 'span' && depth === 0) { b.type = ['p'] }

    var els = rootEl.childNodes
    getAttributesFromDOM(rootEl, b)
    if (!els || !els.length) { b.data = rootEl.nodeValue || ''; return b }
    if (els[0].nodeType === 3 && els.length === 1) { b.data = els[0].nodeValue || ''; return b }
    var t = typeOfDOM(rootEl)
    for (var i = 0; i < els.length; i++) {
      var ib = getBlockFromDOM(els[i], depth + 1)
      if (els.length === 1 && ib.data &&
          typeOfDOM(els[i]) === 'inline' && t === 'inline') { // combine children
        for (var k in ib) {
          if (k === 'type') {
            for (var kk in ib[k]) {
              var tt = ib[k][kk]
              if (b[k].indexOf(tt) < 0) b[k].push(tt)
            }
          } else b[k] = ib[k]
        }
        return b
      }
      var iarr = b.items = b.items || []
      iarr[i] = ib
    }
    if ((b.items && b.data) || !b.data) delete b.data
    return b
  }

  function getArrayFromDOM (rootEl, doNodes, depth) {
    depth = (depth || 0) + 1
    if (typeof (rootEl) === 'string') { var d = document.createElement('div'); d.innerHTML = rootEl; rootEl = d }
    var arr = arr || []
    var els = rootEl.childNodes// doNodes ? rootEl.childNodes : rootEl.children
    if (!els) return arr
    var pb
    var pel
    for (var i = 0; i < els.length; i++) {
      var el = els[i]
      if (!doNodes && el.nodeType === 3 && !el.textContent.trim()) continue
      var b = getBlockFromDOM(el, depth)
      if (b.type && !inlinetag[b.type[0].toUpperCase()]) {
        pb = null
        arr.push(b)
      } else {
        if (!pb) {
          pb = b
          if (!pb.items) {
            pel = document.createElement('p')
            rootEl.insertBefore(pel, el)
            pel.append(el)
            pb = {
              type: ['p'],
              items: []
            }
          }
          arr.push(pb)
        } else {
          pel.append(el)
          i--
        }
        pb.items.push(b)
      }
    }
    return arr
  }

  function getAttributesFromDOM (el, b) {
    var attr
    var ea = el.attributes
    if (!ea) return b
    for (var i = 0; i < ea.length; i++) {
      var name = ea[i].name
      if (!attrok[name] && name !== 'style') continue
      attr = attr || {}
      attr[name] = ea[i].value
    }
    if (attr) b[b.type] = attr
    return b
  }

  var escstr = { '&': '&amp;', '<': '&lt;', '>': '&gt;' }
  function attrString (at, arr) {
    var h = ''
    if (arr) { for (var i in arr) { var k = arr[i]; if (at[k]) h += k + '="' + at[k].replace(/"/g, '\\"') + '"'; return h } }
    for (var k in at) h += k + '="' + at[k].replace(/"/g, '\\"') + '"'; return h
  }

  function escapeHTML (str) { return str.replace(/&|<|>/g, function (m) { return escstr[m] || '' }) }
  function toHTML (b, edit, depth) {
    if (typeof (b) !== 'object' || b === null) return b || ''
    if (Array.isArray(b)) {
      h = ''; for (var i = 0; i < b.length; i++) h += toHTML(b[i], edit, depth)
      return h
    }
    depth = depth || 0
    var h = ''
    var t = (b.type !== '#text' && b.type) || (depth === 0 && 'p')
    var closeTag = ''
    if (t) {
      for (var i = 0; i < t.length - 1; i++) {
        h += '<' + t[i]
        if (b[t[i]]) h += ' ' + attrString(b[t[i]])
        h += '>'
        closeTag = '</' + t[i] + '>' + closeTag
      }
      t = t[i]
      var custom = elemtags[t]
      if (custom) return h + custom.toHTML.call(bloxcall, b, edit) + closeTag

      h += '<' + t
      if (b[t]) h += ' ' + attrString(b[t])
      if (depth === 0) {
        if (edit === 2) h += ' coral-editor'
        else h += ' contenteditable=true coral-on-keydown=methods.keydown'
      }
      h += '>'
      if (voidtags[t]) return h
    }

    if (b.data) h += escapeHTML(b.data)
    else if (b.items) for (i = 0; i < b.items.length; i++) h += toHTML(b.items[i], edit, depth + 1)
    if (t) h += '</' + t + '>' + closeTag
    return h
  }

  function combineBlocks (b, bd) {
    var custom = elemtags[b.type]
    if (custom) return custom.combineBlocks && custom.combineBlocks(b, bd)
    if (b.data) {
      b.items = [b.data]
      delete b.data
    } else if (!b.items) b.items = []
    if (bd.data) b.items.push(bd.data)
    else b.items = b.items.concat(bd.items)
    return true
  }

  var removeAllAttributes = function (el) {
    if (!el.hasAttribute) return
    var s = coral.dot.keysFromArray(el.style, ['width', 'height', 'textAlign', 'color'])
    if (s.width.value) el.setAttribute('width', toPX(s.width.value))
    if (s.height.value) el.setAttribute('height', toPX(s.height.value))
    var attr = el.attributes
    for (var i = attr.length - 1; i >= 0; i--) {
      var name = attr[i].name
      if (attrok[name] && name !== 'width') continue
      if (name.indexOf('coral-editor-') >= 0) continue
      el.removeAttribute(name)
    }
    if (el.nodeName !== 'A' && s.color.value && s.color.value[0] === '#' && s.color.value !== '#000000') el.style.color = s.color.value
    if (s.textAlign.value && s.textAlign.value !== 'start') el.style.textAlign = s.textAlign.value
  }

  function swapNode (el, newType, newContents) {
    if (el.nodeName === newType.toUpperCase()) return el
    var d = document.createElement(newType)
    d.innerHTML = newContents || el.innerHTML || el.nodeValue
    el.parentNode.replaceChild(d, el)
    return d
  }

  function transformNode (el, opts) {
    var en = el.nodeName
    var gcs = el.hasAttribute && el.hasAttribute('style') ? el.style : null // window.getComputedStyle(el) : null
    var invis = gcs && (gcs.display === 'none' || gcs.visibility === 'hidden' || parseFloat(gcs.opacity) <= 0.01)
    var tc = el.textContent
    var empty = (!inlinetag[en] && !emptyok[en] && !tc)
    var nonempty = el.firstChild && ((el.firstChild.innerHTML && el.firstChild.innerHTML.trim()) || emptyok[el.firstChild.nodeName])
    empty = empty || (!inlinetag[en] && en !== 'P' && !el.textContent.trim()) || (el.nodeType === 3 && !el.textContent.trim() && !el.parentNode.nextSibling && !el.parentNode.previouSibling)
    var remove = deletetag[en] || ((!nonempty || nonempty === '&nbsp;') && empty && !emptyok[en] && !voidtags[en.toLowerCase()] && !el.nodeValue && (!opts.keepAttributes || en !== 'P')) // empty or one we don't want
    remove = remove || (el.classList && el.classList.contains('Apple-interchange-newline'))
    if (invis || remove || (opts.inlineOnly && !inlinetag[en])) {
      el.parentNode.removeChild(el)
      return
    }
    var nel
    var ctag = containstagok[el.parentNode.nodeName] || {}
    var custcontains = (elemtags[cedType(el.parentNode)] || {}).contains || {}
    if (en === 'B' || (en !== 'A' && inlinetag[en] && gcs && parseInt(gcs.fontWeight) > 500)) nel = swapNode(el, 'strong')
    else if (en === 'I' || (en !== 'A' && inlinetag[en] && gcs && gcs.fontStyle == 'italic')) nel = swapNode(el, 'em')
    else if (el.nodeType !== 3 && !tagok[en] && !elemtags[cedType(el)] &&
             !ctag[en] && !custcontains[en]) nel = swapNode(el, 'p')
    if (!opts.keepAttributes) removeAllAttributes(nel || el)
    return nel
  }
  function copyAttributesFromEl (b, el, warray) {
    if (!el) return
    for (var i = 0; i < warray.length; i++) {
      var which = warray[i]
      var v = el.getAttribute(which)
      if (v && v !== 'null') b[which] = v
    }
  }

  var bloxcall = {
    'readAttr': copyAttributesFromEl,
    'attrString': attrString,
    'toBlocks': getArrayFromDOM,
    'toBlock': getBlockFromDOM,
    'toHTML': toHTML,
    'esc': function (s) { return s.replace(/"/g, '\\"') }

  }

  var elemtags = {
    'cui-ed-youtube': {
      contains: { IFRAME: true, inline: true, INPUT: true, P: true, DIV: true },
      toHTML: function (b, edit) {
        return '<div coral-editor coral-blox=cui-ed-youtube>' +
               '<iframe width="480" height="270" src="https://www.youtube.com/embed/M3r2XDceM6A?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
               '</div>'
      }
    },
    'cui-ed-image': {
      contains: { IMG: true, CAPTION: true, inline: true, INPUT: true, P: true, DIV: true },
      attr: { src: true, width: true, height: true, caption: true },
      toHTML: function (b, edit) {
        return '<div coral-blox=cui-ed-image><img ' + this.attrString(b, ['src', 'width', 'height']) + '>' +
               '<p coral-editor-src class="cui-editor-focus" contenteditable=true>' + this.esc(b.src || '') + '</p>' +
               '<div coral-editor coral-editor-controls contenteditable=true>' + // <input class="cui-editor-focus">' +
               this.toHTML(b.caption, 2) + '</div></div>'
      },
      toBlock: function (rootEl, b) {
        var img = rootEl.querySelector('img')
        var caption = rootEl.querySelector('[coral-editor-controls]')
        var input = rootEl.querySelector('[coral-editor-src]')
        copyAttributesFromEl(b, img, ['src', 'width', 'height'])
        if (input && input.textContent) img.src = input.textContent
        if (caption) {
          coral.ui.DOM.clean(caption, { keepAttributes: true })
          b.caption = this.toBlocks(caption, true, 1)
        }
        return b
      }
    }
  }

  var literaltags = { 'pre': true, 'code': true }
  var deletetag = { '#comment': true, META: true, LINK: true, STYLE: true }
  var inlinetag = { 'STRONG': true, 'B': true, 'I': true, 'EM': true, 'S': true, 'BR': true, 'A': true, 'SPAN': true, 'IMG': false, 'CODE': true, '#text': true }
  var attrok = { 'href': true, 'coral-editor': true, 'src': true, 'href': true, 'url': true, 'width': true, 'height': true, 'coral-blox': true, 'align': true, 'colspan': true }
  var tagok = { 'BLOCK': true, 'HEADER': true, 'FOOTER': true, 'BR': true, 'P': true, 'PRE': true, 'ARTICLE': true, 'VIDEO': true, 'IMG': true, 'H1': true, 'H2': true, 'H3': true, 'H4': true, 'H5': true, '#text': true }
  coral.assign(tagok, { 'SPAN': true, 'A': true, 'STRONG': true, 'I': true, 'S': true, 'LI': true, 'UL': true, 'OL': true, 'TABLE': true, 'TH': true, 'TBODY': true })
  coral.assign(tagok, { 'THEAD': true, 'TR': true, 'TD': true, 'CODE': true, 'MARK': true, 'STRONG': true, 'EM': true, 'BLOCKQUOTE': true, 'HR': true, 'CAPTION': true })
  coral.assign(tagok, { 'FIGURE': true, 'SECTION': true, 'FIGCAPTION': true, 'OEMBED': true, 'DETAILS': true })
  var voidtags = { 'img': true, 'input': true, 'br': true, 'hr': true, 'embed': true, 'link': true, 'source': true }
  var emptytag = { 'P': true }
  var emptyok = { 'BR': true, 'IMG': true, 'VIDEO': true, 'OEMBED': true, 'IFRAME': true }
  var nestedtag = { 'TD': true }
  var containstagok = {
    OL_: { LI: true },
    UL_: { LI: true },
    THEAD: { TR: true, TD: true, TH: true },
    TABLE: { THEAD: true, TR: true, TBODY: true },
    TBODY: { TR: true, TD: true, TH: true },
    TD: { LI: true, P: true, OL: true, UL: true },
    TH: { TD: true },
    TR: { TH: true, TD: true },
    FIGURE: { FIGCAPTION: true },
    BLOCKQUOTE: { P: true }
  }

  xs.clean = function (el, opts, verb) {
    if (typeof (opts) !== 'object') opts = { keepAttributes: opts }
    var ret = (!verb || verb == 'clean') && cleanDOM(el, opts)
    if (!verb || verb == 'flatten') flatterDOM(el, null, opts)
    return ((!verb || verb == 'clean') && cleanDOM(el, opts)) || ret
  }
  xs.toBlock = getBlockFromDOM
  xs.toBlocks = getArrayFromDOM
  xs.toHTML = toHTML
  xs.combineBlocks = combineBlocks
  xs.escapeHTML = escapeHTML
})(this)

// ======================================================================
// coral.ui.select
// ======================================================================
;(function (world) {
  var xs = world.coral.ui.select = {}

  function _getElemSelectCoords (el) {
    var rr = el && el.getClientRects()
    if (rr && rr.length > 0) {
      rect = rr[0]
      rect.height = 20
      rect.width = 0
      return rect
    }
  }

  function getSelectionCoords (range) {
    var rect
    var sel = window.getSelection()
    range = range || (sel.anchorNode && sel.getRangeAt(0))
    if (!range) return _getElemSelectCoords(document.activeElement)
    if (sel.anchorNode && sel.anchorNode.nodeType !== 3) return sel.anchorNode.getBoundingClientRect()
    if (range.getClientRects) {
      range = range.cloneRange()
      // range.collapse(true)
      var rr = range.getClientRects()
      if (rr.length > 0) rect = rr[0]
    }
    if (range.startOffset === 0 && range.collapsed &&
      range.startContainer && range.startContainer.getClientRects) {
      rect = _getElemSelectCoords()
    }
    // Fall back to inserting a temporary element
    if (!rect) {
      var span = document.createElement('span')
      if (span.getClientRects) {
        // Ensure span has dimensions and position by
        // adding a zero-width space character
        span.appendChild(document.createTextNode('\u200b'))
        range.insertNode(span)
        rect = span.getClientRects()[0]
        var spanParent = span.parentNode
        spanParent.removeChild(span)

        // Glue any broken text nodes back together
        spanParent.normalize()
      }
    }
    if (!rect) return _getElemSelectCoords(document.activeElement)
    return rect
  }
  function testSelectionCoords (el, dirString, slop) {
    var rect = el.getBoundingClientRect(el)
    var pos = getSelectionCoords()
    switch (dirString) {
      case 'ArrowUp':
        return pos.top <= rect.top + slop ? -1 : 0
      case 'ArrowDown':
        return pos.top + pos.height >= rect.top + rect.height - slop ? 1 : 0
    }
  }

  function matchNode (node, match) { return node === match || node.nodeName === match }
  function findNextNode (node, match, parent) {
    var n = node
    if (matchNode(n, match)) return n
    if (!n.firstChild) {
      do {
        if (n === parent) return null
        if (n.nextSibling) { n = n.nextSibling; break }
        n = n.parentNode
      } while (n && !matchNode(n, match))
    }
    if (n) while (n.firstChild && !matchNode(n, match)) n = n.firstChild
    return (n && match && !matchNode(n, match)) ? findNextNode(n, match) : n
  }
  window.findNextNode = findNextNode
  function createRange (node, chars, range, looping) {
    if (!range) {
      range = document.createRange()
      var start = range.startContainer
      // range.selectNode(node)
      // range.setStart(node, 0)
    }

    if (chars.start === 0) {
      if (!node) {
        console.error ('DAMMIT SREE - createRange')
        debugger
        return
      }
      if (node.nodeType !== 3 && chars.firstText) { node = findNextNode(node, '#text') || node }
      range.selectNode(node)
      range.setStart(node, chars.start)
      chars.start = -1
    }
    if (chars.end === 0) {
      range.setEnd(node, chars.end)
      chars.end = -1
    }
    if (node && (chars.start > 0 || chars.end > 0)) {
      if (node.nodeType === Node.TEXT_NODE) {
        chars.setcount = (chars.setcount || 0) + node.textContent.length
        chars.lastNode = node
        var nextnode
        if (node.textContent.length < chars.start) {
          chars.start -= node.textContent.length
        } else if (chars.start >= 0) {
          if (chars.startNode && chars.startNode !== node) nextnode = findNextNode(node, chars.startNode)
          else if (chars.setcount < chars.count) nextnode = findNextNode(node)
          if (nextnode) {
            chars.start -= node.textContent.length
            chars.end -= node.textContent.length
            if (chars.start < 0) chars.start = 0
            if (chars.end < 0) chars.end = 0
          }
          range.selectNode(nextnode || node)
          range.setStart(nextnode || node, chars.start)
          chars.start = -1
        }
        if (node.textContent.length < chars.end) {
          chars.end -= node.textContent.length
        } else if (chars.end >= 0) {
          chars.end = Math.min(chars.end, (nextnode || node).textContent.length)
          range.setEnd(nextnode || node, chars.end)
          chars.end = -1
        }
      } else {
        for (var lp = 0; lp < node.childNodes.length; lp++) {
          range = createRange(node.childNodes[lp], chars, range)

          if (chars.start <= 0 && chars.end <= 0) {
            break
          }
        }
      }
    }
    if (start === range.startContainer && !looping) { return createRange(node, { start: 0, end: 0 }, null, true) }
    return range
  };

  function setCurrentCursorPosition (inchars, el, nofocus) {
    console.log('select ---------- SETCURPOS', inchars, el)
    if (inchars === null) inchars = {}
    inchars = coral.assign({}, inchars)
    var selection = window.getSelection()
    var chars = { start: inchars || 0, end: inchars || 0, count: 0 }
    if (typeof (inchars) === 'object') { chars.startNode = inchars.startNode; chars.start = inchars.start || 0, chars.end = inchars.end || 0, chars.count = inchars.count || 0 }
    if (chars.start < 0) chars.start = 1024 * 1024 * 1024
    if (chars.end < 0) chars.end = 1024 * 1024 * 1024
    if (!('start' in chars)) return
    el = el || inchars.el
    var range = createRange(el, chars)
    if (range) {
      if (chars.lastNode) {
        if (chars.start > 0) { range.selectNode(chars.lastNode); range.setStart(chars.lastNode, chars.lastNode.textContent.length) }
        if (chars.end > 0) { range.setEnd(chars.lastNode, chars.lastNode.textContent.length) }
      }
      selection.removeAllRanges()
      selection.addRange(range)
    }
    if (inchars && inchars.els && inchars.els.length && el === inchars.el) {
      // setTimeout(function () {
      var els = inchars.els
      var a = {}
      for (var i = 0; i < els.length; i++) a[els[i]] = true
      els = inchars.el.children
      for (var i = 0; i < els.length; i++) els[i].classList.toggle('selected', a[i] || false)
      if (el.coral) el.coral.preserveSelection = true
      // }, 0)
    }
    if (!nofocus && el && el !== document.activeElement && el.focus) {
      if (0 && (typeof (inchars) !== 'object' || !inchars.fallback) && !chars.startNode) {
        var nel = findNextNode(el, '#text')
        if (nel && 1) {
          var chars = { start: inchars || 0, end: inchars || 0, count: 0 }
          if (typeof (inchars) === 'object') { chars.startNode = inchars.startNode; chars.start = inchars.start || 0, chars.end = inchars.end || 0, chars.count = inchars.count || 0 }
          if (chars.start < 0) chars.start = 1024 * 1024 * 1024
          if (chars.end < 0) chars.end = 1024 * 1024 * 1024
          return setCurrentCursorPosition(chars, nel)
        }
      }
      console.log('-------- FOCUS ----------', el)
      el.focus()
    }
    return chars
  };

  function readRange (node, chars, range) {
    if (!range) {
      return null
    }

    if (node === range.anchorNode) {
      chars.start = chars.count + range.anchorOffset
      chars.startNode = node
    }
    if (node === range.extentNode) {
      chars.end = chars.count + range.extentOffset
      chars.endNode = node
    }
    if (node && (!chars.startNode || !chars.endNode)) {
      if (node.nodeType === Node.TEXT_NODE) {
        chars.count += node.textContent.length
      } else {
        for (var lp = 0; lp < node.childNodes.length; lp++) {
          range = readRange(node.childNodes[lp], chars, range)
          if (chars.startNode && chars.endNode) {
            break
          }
        }
      }
    }

    return range
  }

  function matchRange (node, chars, matchEl) {
    if (!matchEl || !node) return
    if (node === matchEl) chars.match = true
    if (chars.match) return

    if (node.nodeType === Node.TEXT_NODE) {
      chars.count += node.textContent.length
    } else {
      for (var lp = 0; lp < node.childNodes.length; lp++) {
        matchRange(node.childNodes[lp], chars, matchEl)
        if (chars.match) break
      }
    }
  }
  function getMatchRange (el, matchEl) {
    var chars = { count: 0 }
    matchRange(el, chars, matchEl)
    return chars
  }

  function getChildIndex (node) { return [].indexOf.call(node.parentNode.childNodes, node) }
  function getChildIndexRoot (root, node) {
    while (node && node.parentNode !== root) node = node.parentNode
    return { el: node, idx: node ? getChildIndex(node) : -1 }
  }
  function getCurrentCursorPosition (el) {
    var sel = window.getSelection()
    var chars = { count: 0 }
    var ael = document.activeElement
    if (ael && sel && sel && sel.anchorNode) {
      if (!ael.contains(sel.anchorNode)) {
        var asel = getMatchRange(el, ael)
        if (asel.match) {
          asel.start = asel.end = asel.count
          asel.el = asel.el
          asel.startNode = ael
          return asel
        }
      }
      range = readRange(el || sel.anchorNode, chars, sel)
      if (!('end' in chars) && ('start' in chars)) chars.end = chars.start // we might not have extents
      chars.el = el || sel.anchorNode
    }
    var qel = (chars.el || el)
    if (qel && qel.querySelectorAll) {
      var els = qel.querySelectorAll('.selected')
      if (els.length) {
        var a = chars.els = []
        for (var i = 0; i < els.length; i++) a[i] = getChildIndexRoot(qel, els[i]).idx
        chars.el = qel
      }
    }
    return chars
  }

  function getLineBreaks (el, all) {
    var l = el.innerText
    var b = []
    var y
    var range = xs.get()
    for (var i = 0; i < l.length; i++) {
      setCurrentCursorPosition(i, el, true)
      var r = getSelectionCoords()
      if (all || y !== r.top) {
        y = r.top
        b.push(i)
      }
    }
    xs.set(range)
    return b
  }

  xs.get = getCurrentCursorPosition
  xs.set = setCurrentCursorPosition
  xs.test = testSelectionCoords
  xs.coords = getSelectionCoords
  xs.match = getMatchRange
  xs.breaks = getLineBreaks
})(this)

function drawRects (rrArr) {
  var el = drawRects.el
  if (!el) {
    el = drawRects.el = document.createElement('div')
    el.setAttribute('style', 'position:absolute; background-color:rgba(255,255,0,0.5); top:0; left:0;z-index:1000; pointer-events:none')
    document.body.appendChild(el)
  }

  el.innerHTML = ''
  for (var i = 0; i < rrArr.length; i++) {
    var rr = rrArr[i].rect || rrArr[i]
    var rel = el.cloneNode(false)
    rel.style.top = rr.top + 'px'
    rel.style.height = (rr.bottom - rr.top) + 'px'
    rel.style.left = rr.left + 'px'
    rel.style.width = (rr.right - rr.left) + 'px'
    el.appendChild(rel)
  }
}

function UISelect (el, start, end) {
  this.el = el
  this.count = 0
  this.rects = []
  if (start !== undefined) {
    this.start = start
    this.end = end === undefined ? start : end
  }
  return this
}

UISelect.prototype.addRect = function (rr, idx, offset, node) {
  var info = this
  if (rr) {
    rr = {
      left: rr.left + window.pageXOffset,
      top: rr.top + window.pageYOffset,
      right: rr.right + window.pageXOffset,
      bottom: rr.bottom + window.pageYOffset
    }
  }
  if (!info.breaks) {
    info.breaks = []
    info.rr = rr
  } else {
    if (!rr || rr.top >= info.rr.bottom - 1 || rr.right < info.rr.left) {
      var il = info.breaks.length
      var midbreak = false
      var pb = il && info.breaks[il - 1]
      if (node && pb && pb.node === node) { midbreak = true }
      info.breaks.push({
        startRectIndex: info.breaks.length ? info.breaks[info.breaks.length - 1].endRectIndex : 0,
        endRectIndex: info.rects.length,
        startIndex: info.breaks.length ? info.breaks[info.breaks.length - 1].endIndex : 0,
        endIndex: idx,
        rect: info.rr,
        offset: offset,
        idx: idx,
        midbreak: midbreak,
        node: info.rects.node,
        line: info.breaks.length })
      info.rr = coral.assign({}, rr)
      if (!rr) return
    }
    info.rr.top = Math.min(rr.top, info.rr.top)
    info.rr.bottom = Math.max(rr.bottom, info.rr.bottom)
    info.rr.left = Math.min(rr.left, info.rr.left)
    info.rr.right = Math.max(rr.right, info.rr.right)
  }
  info.rects.node = node
  info.rects.push({ idx: idx, node: node, offset: offset, rect: rr })
}

UISelect.prototype.charFromPoint = function (x, y) {
  var rrArr = (x === undefined && this.breaks) ? this.breaks : this.rects
  var start = 0
  var end = rrArr.length
  if (1 && x !== undefined) {
    var rbox = this.charFromPoint(undefined, y)
    if (!rbox) return null
    start = rbox.startRectIndex
    end = rbox.endRectIndex
  }

  for (var i = end - 1; i >= start; i--) {
    var rr = rrArr[i].rect
    if ((x === undefined || (x >= rr.left && x < rr.right)) &&
        (y === undefined || (y >= rr.top && y < rr.bottom))) return rrArr[i]
  }
  return rbox
}

function testRange (node, info) {
  var first = !info
  info = info || new UISelect(node)
  info.range = info.range || document.createRange()
  if (!node) return

  if (node.nodeType === Node.TEXT_NODE) {
    var tcl = node.textContent.length
    for (var i = 0; i < tcl; i++) {
      info.range.setStart(node, i)
      info.range.setEnd(node, i + 1)
      /* if (i < tc.length - 2) info.range.setEnd(node, i + 1)
      else info.range.setEnd(findNextNode(node), 0) */
      var rr = info.range.getBoundingClientRect()
      rr.el = node
      info.addRect(rr, info.count + i, i, node)
    }
    info.count += tcl
  } else {
    var els = node.childNodes
    if (els && els.length) {
      for (i = 0; i < els.length; i++) testRange(els[i], info)
    } else {
      info.range.setStart(node, 0)
      info.range.setEnd(findNextNode(node), 0)
      // info.range.setEnd(node, 1)
      rr = node.getBoundingClientRect()
      rr.el = node
      info.addRect(rr, info.count, 0, node)
    }
  }
  if (first) info.addRect(null, info.count, 0)
  return info
}

function nodeMatch (node, match, info) {
  // return node
  if (!match) return node
  var n = node
  while (n !== match && n) n = findNextNode(node, match, info.el)
  return n || node
}

function selectRange (node, start, end, select, match) {
  var uis = new UISelect(node, start, end)
  if (select === 2) uis.select = true
  uis.matchStart = match
  var range = setRange(node, uis)
  if (range && select) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(range.range)
    var n = range.startNode
    while (n && !n.focus) n = n.parentNode
    if (n) n.focus()
  }
  return range
}

function setRange (node, info) {
  var first = !info.range
  info.range = info.range || document.createRange()
  if (!node) return

  if ((info.select && (!node.childNodes || !node.childNodes.length)) || node.nodeType === Node.TEXT_NODE) {
    var tcl = node.textContent.length
    var nc = info.count + tcl
    if (!info.startNode && nc >= info.start) {
      info.startOffset = info.start - info.count
      info.startNode = nodeMatch(node, info.startOffset === tcl && info.matchStart, info)
      if (info.startNode !== node) info.startOffset = 0
    }
    if (info.startNode && !info.endNode && nc >= info.end) {
      if (info.select) {
        while (!node.textContent && info.start === info.end) { node = findNextNode(node, null, info.el) || node }
      }
      info.endOffset = info.end - info.count
      info.endNode = nodeMatch(node, info.endOffset === tcl && (info.matchEnd || info.matchStart), info)
      if (info.endNode !== node) info.endOffset = 0
    }
    info.count = nc
  }

  if (1) {
    var els = node.childNodes
    if (els && els.length) {
      for (var i = 0; i < els.length; i++) setRange(els[i], info)
    } else {
    }
  }

  if (first) {
    if (!info.startNode) info.startNode = node
    if (!info.endNode) info.endNode = findNextNode(node)
    info.range.selectNode(info.startNode)
    info.range.setStart(info.startNode, info.startOffset || 0)
    info.range.setEnd(info.endNode, info.endOffset || 0)
  }
  return info
}

function trange () {
  trange.tr = testRange(coral.ui.find('*').rootEl)
  // drawRects(trange.tr.breaks)
  return trange.tr
}

function testSetSelection (tr, x, y, anchorSelect) {
  var rout = tr.charFromPoint(x, y) // || tr.charFromPoint(undefined, y)
  if (!rout) return

  // console.log(rout.node)
  drawRects([rout])
  var adder = x < (rout.rect.left + rout.rect.right) / 2 ? 0 : 1
  var idx = rout.idx
  node = tr.el
  // coral.ui.select.set({ startNode: rout.node, start: rout.idx + adder, end: rout.idx + adder, el: tr.el })
  if ('line' in rout) {
    if (!adder && rout.line) {
      idx = tr.breaks[rout.line - 1].idx
    }
    if (adder && idx > 0) {
      var ch = tr.el.textContent.charAt(idx - 1)
      if (!ch.trim() || ch === '-') { idx -= 1 }
    }
  }
  if (anchorSelect === undefined || anchorSelect === false) anchorSelect = idx
  var rin = selectRange(node, Math.min(idx, anchorSelect), Math.max(anchorSelect, idx), 2, rout.node)
  if (trange.lastpos !== idx) {
    trange.lastpos = idx
    // console.log ('pos', idx, rin.range)
  }
  return
  document.getSelection().removeAllRanges()
  document.getSelection().addRange(rin.range)
}
window.addEventListener('mousemove', function (event) {
  if (trange.tr && trange.track) {
    var x = event.pageX
    var y = event.pageY
    testSetSelection(trange.tr, x, y)
  }
})
