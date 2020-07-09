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
    if (node===matchEl) chars.match = true 
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
    var chars = {count:0}
    matchRange (el, chars, matchEl)
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
