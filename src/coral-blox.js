// ======================================================================
// coral.ui.DOM
// ======================================================================
;(function (world) {
  var xs = world.coral.ui.DOM = world.coral.ui.DOM || {}
  function typeOfDOM (el) { return (!el || inlinetag[el.nodeName]) ? 'inline' : el.nodeName }
  function insertAfter (newNode, existingNode) { existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling) }
  function flatterDOM (rootEl, p, type) {
    type = type || typeOfDOM(p)
    var els = rootEl.childNodes
    var ctag = containstagok[rootEl.nodeName] || {}
    var rt = typeOfDOM(rootEl)
    if (!els) return
    for (var i = 0; i < els.length; i++) {
      var ep = el
      var el = els[i]
      var et = typeOfDOM(el)
      if (el.firstChild) flatterDOM(el, nestedtag[el.nodeName] ? el : (p || rootEl))
      // if (ep && ep.nodeType === 3 && el.nodeType === 3) {
      if (ep && combinableEls(ep, el)) {
        ep.textContent += el.textContent
        i--
        rootEl.removeChild(el)
        el = ep
        continue
      }
      if (el.nodeName === 'I') { et = et }
      var split = (et !== 'inline' || type === 'inline') && et !== type && !ctag[et]
      split = split || (et === 'inline' && p && rootEl !== p && i && rt === 'inline')

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
    if (typeOfDOM(el1) !== 'inline' || el1.nodeName !== el2.nodeName) return false
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

  function cleanDOM (rootEl) {
    var els = rootEl.childNodes; if (!els) return
    var modified = false
    for (var i = els.length - 1; i >= 0; i--) {
      var el = els[i]
      if (el.firstChild) modified = cleanDOM(el) || modified
      modified = (!!transformNode(el)) || modified
      // if (el) removeAllAttributes(el)
    }
    return modified
  }

  function getAttributesFromDOM (el, b) {
    var attr
    var ea = el.attributes
    if (!ea) return b
    for (var i = 0; i < ea.length; i++) {
      if (!attrok[ea[i].name]) continue
      attr = attr || {}
      attr[ea[i].name] = ea[i].value
    }
    if (attr) b[b.type] = attr
    return b
  }

  function getBlockFromDOM (rootEl, b) {
    if (typeof (rootEl) === 'string') { var d = document.createElement('div'); d.innerHTML = rootEl; rootEl = d }
    b = b || { }
    if (rootEl.nodeType !== 3) b.type = [((rootEl.getAttribute && rootEl.getAttribute('coral-blox')) || rootEl.nodeName).toLowerCase()]
    if (rootEl.coralBloxID) b.id = rootEl.coralBloxID
    var els = rootEl.childNodes
    getAttributesFromDOM(rootEl, b)
    if (!els || !els.length) { b.data = rootEl.nodeValue || ''; return b }
    if (els[0].nodeType === 3 && els.length === 1) { b.data = els[0].nodeValue || ''; return b }
    var t = typeOfDOM(rootEl)
    for (var i = 0; i < els.length; i++) {
      var ib = getBlockFromDOM(els[i])
      if (els.length === 1 && ib.data &&
          typeOfDOM(els[i]) === 'inline' && t === 'inline') { // combine children
        for (var k in ib) {
          if (k === 'type') b[k] = b[k].concat(ib[k])
          else b[k] = ib[k]
        }
        return b
      }
      var iarr = b.items = b.items || []
      iarr[i] = ib
    }
    if (b.items && b.data) delete b.data
    return b
  }

  function getArrayFromDOM (rootEl, arr) {
    if (typeof (rootEl) === 'string') { var d = document.createElement('div'); d.innerHTML = rootEl; rootEl = d }
    arr = arr || []
    var els = rootEl.children
    for (var i = 0; i < els.length; i++) {
      var b = getBlockFromDOM(els[i])
      arr[i] = b
    }
    return arr
  }

  function attrString (at) { var h = ''; for (var k in at) h += k + '="' + at[k].replace(/"/g, '\\"') + '"'; return h }
  function htmlFromBlock (b, edit, depth) {
    depth = depth || 0
    var h = ''
    var t = (b.type !== '#text' && b.type) || (depth === 0 && 'p')
    var closeTag = ''
    if (t) {
      for (var i = 0; i < t.length - 1; i++) {
        h += '<' + t[i] + '>'
        closeTag = '</' + t[i] + '>' + closeTag
      }
      t = t[i]
      h += '<' + t
      if (b[t]) h += ' ' + attrString(b[t])
      h += ' contenteditable=true>'
      if (voidtags[t]) return h
    }
    if (b.data) h += b.data
    else if (b.items) for (i = 0; i < b.items.length; i++) h += htmlFromBlock(b.items[i], edit, depth + 1)
    if (t) h += '</' + t + '>' + closeTag
    return h
  }

  var removeAllAttributes = function (el) {
    if (!el.hasAttribute) return
    var s = coral.dot.keysFromArray(el.style, ['width', 'height', 'textAlign', 'color'])
    if (s.width.value) el.setAttribute('width', toPX(s.width.value))
    if (s.height.value) el.setAttribute('height', toPX(s.width.value))
    for (var i = el.attributes.length - 1; i >= 0; i--) {
      if (attrok[el.attributes[i].name]) continue
      el.removeAttribute(el.attributes[i].name)
    }
    if (el.nodeName !== 'A' && s.color.value) el.style.color = s.color.value
    if (s.textAlign.value) el.style.textAlign = s.textAlign.value
  }

  function swapNode (el, newType, newContents) {
    var d = document.createElement(newType)
    d.innerHTML = newContents || el.innerHTML || el.nodeValue
    el.parentNode.replaceChild(d, el)
    return d
  }

  function transformNode (el) {
    var gcs = el.hasAttribute && el.hasAttribute('style') ? el.style : null // window.getComputedStyle(el) : null
    var invis = gcs && (gcs.display === 'none' || gcs.visibility === 'hidden' || parseFloat(gcs.opacity) <= 0.01)
    var remove = deletetag[el.nodeName] || (!el.firstChild && !emptyok[el.nodeName] && !el.nodeValue) // empty or one we don't want
    if (invis || remove) {
      el.parentNode.removeChild(el)
      return
    }
    var nel
    if (el.nodeName == 'B' || (gcs && parseInt(gcs.fontWeight) > 500)) nel = swapNode(el, 'strong')
    else if (el.nodeName == 'I' || (gcs && gcs.fontStyle == 'italic')) nel = swapNode(el, 'em')
    else if (el.nodeType !== 3 && !tagok[el.nodeName]) nel = swapNode(el, 'block')
    removeAllAttributes(nel || el)
    return nel
  }

  var voidtags = { 'img': true, 'input': true, 'br': true, 'hr': true, 'embed': true, 'link': true, 'source': true }
  var emptytag = { 'STRONG': true, 'EM': true, 'S': true, 'P': false }
  var emptyok = { 'BR': true, 'IMG': true, 'VIDEO': true, 'O-EMBED': true }
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
  var deletetag = { '#comment': true }
  var inlinetag = { 'STRONG': true, 'B': true, 'I': true, 'EM': true, 'S': true, 'P': false, 'BR': true, 'A': true, 'SPAN': true, 'BLOCK': false, 'IMG': false, 'CODE': true, '#text': true }
  var attrok = { 'src': true, 'href': true, 'url': true, 'coral-modified': true, 'width': true, 'height': true, 'coral-blox': true, 'align': true, 'colspan': true }
  var tagok = { 'BR': true, 'P': true, 'PRE': true, 'ARTICLE': true, 'VIDEO': true, 'IMG': true, 'H1': true, 'H2': true, 'H3': true, 'H4': true, 'H5': true, '#text': true }
  coral.assign(tagok, { 'SPAN': true, 'A': true, 'STRONG': true, 'I': true, 'S': true, 'LI': true, 'UL': true, 'OL': true, 'TABLE': true, 'TH': true, 'TBODY': true })
  coral.assign(tagok, { 'THEAD': true, 'TR': true, 'TD': true, 'CODE': true, 'MARK': true, 'STRONG': true, 'EM': true, 'BLOCKQUOTE': true, 'HR': true })
  coral.assign(tagok, { 'FIGURE': true, 'SECTION': true, 'FIGCAPTION': true, 'OEMBED': true, 'DETAILS': true })

  xs.clean = function (el) { flatterDOM(el); return cleanDOM(el) }
  xs.toBlock = getBlockFromDOM
  xs.toBlocks = getArrayFromDOM
  xs.blockToHTML = htmlFromBlock
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

  function createRange (node, chars, range, looping) {
    if (!range) {
      range = document.createRange()
      var start = range.startContainer
      // range.selectNode(node)
      // range.setStart(node, 0)
    }

    if (chars.start === 0) {
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
        chars.lastNode = node
        if (node.textContent.length < chars.start) {
          chars.start -= node.textContent.length
        } else if (chars.start >= 0) {
          range.selectNode(node)
          range.setStart(node, chars.start)
          chars.start = -1
        }
        if (node.textContent.length < chars.end) {
          chars.end -= node.textContent.length
        } else if (chars.end >= 0) {
          range.setEnd(node, chars.end)
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
    if (start === range.startContainer && !looping) {
      return createRange(node, { start: 0, end: 0 }, null, true)
    }
    return range
  };

  function setCurrentCursorPosition (inchars, el) {
    console.log('select ---------- SETCURPOS', inchars, el)
    if (inchars === null) inchars = {}
    var selection = window.getSelection()
    var chars = { start: inchars || 0, end: inchars || 0 }
    if (typeof (inchars) === 'object') { chars.start = inchars.start || 0, chars.end = inchars.end || 0 }
    if (chars.start < 0) chars.start = 1024 * 1024 * 1024
    if (chars.end < 0) chars.end = 1024 * 1024 * 1024
    if (!('start' in chars)) return
    el = el || inchars.el
    if (el && el !== document.activeElement && el.focus) el.focus()
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
      setTimeout(function () {
        var els = inchars.els
        var a = {}
        for (var i = 0; i < els.length; i++) a[els[i]] = true
        els = inchars.el.children
        for (var i = 0; i < els.length; i++) els[i].classList.toggle('selected', a[i] || false)
        if (el.coral) el.coral.preserveSelection = true
      }, 0)
    }
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
    if (sel && sel.anchorNode) {
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
      }
    }
    return chars
  }

  function getLineBreaks (el) {
    var l = el.innerText
    var b = []
    var y
    var range = saveSelection()
    for (var i = 0; i < l.length; i++) {
      setCurrentCursorPosition(i, el)
      var r = getSelectionCoords()
      if (y !== r.top) {
        y = r.top
        b.push(i)
      }
    }
    restoreSelection(range)
    return b
  }

  xs.get = getCurrentCursorPosition
  xs.set = setCurrentCursorPosition
  xs.test = testSelectionCoords
  xs.coords = getSelectionCoords
  xs.match = getMatchRange
})(this)
