!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([,,,,function(e,t,n){n(5),n(6),e.exports=n(7)},function(e,t,n){!function(e){var t=e.coral.ui.DOM=e.coral.ui.DOM||{};function n(e){return e.getAttribute&&e.getAttribute("coral-blox")}function r(e){return e&&n(e)||(!e||O[e.nodeName]?"inline":e.nodeName)}function o(e,t){t.parentNode.insertBefore(e,t.nextSibling)}function i(e,t){if("inline"!==r(e)||e.nodeName!==t.nodeName||"BR"===e.nodeName)return!1;if(e.children&&(e.children.length>1||e.firstChild&&3!==e.firstChild.nodeType))return!1;if(t.children&&(t.children.length>1||t.firstChild&&3!==t.firstChild.nodeType))return!1;var n=e.attributes,o=t.attributes;if(n){if(n.length!==o.length)return!1;for(var i=0;i<n.length;i++)if(n[i].value!==t.getAttribute(n[i].name))return!1}return!0}function a(e,t){var n=e.childNodes;if(n){for(var r=!1,o=n.length-1;o>=0;o--){var i=n[o];i.firstChild&&(r=a(i,t)||r),r=!!h(i,t)||r}return r}}function c(e,t){if(!e)return null;if("string"==typeof e){var o=document.createElement("div");o.innerHTML=e,e=o}var i=i||{};3!==e.nodeType&&(i.type=[(e.getAttribute&&e.getAttribute("coral-blox")||e.nodeName).toLowerCase()]),e.coralBloxID&&(i.id=e.coralBloxID),i.type;var a=y[n(e)];if(a)return a.toBlock.call(m,e,{type:i.type});if(t=t||0,i.type&&"br"===i.type[0]&&0===t)return i.type=["p"],i.data="\n",i;var s=e.childNodes;if(function(e,t){var n,r=e.attributes;if(!r)return t;for(var o=0;o<r.length;o++){var i=r[o].name;(b[i]||"style"===i)&&((n=n||{})[i]=r[o].value)}n&&(t[t.type]=n)}(e,i),!s||!s.length)return i.data=e.nodeValue||"",i;if(3===s[0].nodeType&&1===s.length)return i.data=s[0].nodeValue||"",i;for(var u=r(e),l=0;l<s.length;l++){var d=c(s[l],t+1);if(1===s.length&&d.data&&"inline"===r(s[l])&&"inline"===u){for(var f in d)if("type"===f)for(var p in d[f]){var h=d[f][p];i[f].indexOf(h)<0&&i[f].push(h)}else i[f]=d[f];return i}(i.items=i.items||[])[l]=d}return(i.items&&i.data||!i.data)&&delete i.data,i}function s(e,t){if("string"==typeof e){var n=document.createElement("div");n.innerHTML=e,e=n}var r=r||[],o=t?e.childNodes:e.children;if(!o)return r;for(var i=0;i<o.length;i++){var a=c(o[i]);r[i]=a}return r}var u={"&":"&amp;","<":"&lt;",">":"&gt;"};function l(e,t){var n="";if(t)for(var r in t){return e[o=t[r]]&&(n+=o+'="'+e[o].replace(/"/g,'\\"')+'"'),n}for(var o in e)n+=o+'="'+e[o].replace(/"/g,'\\"')+'"';return n}function d(e){return e.replace(/&|<|>/g,(function(e){return u[e]||""}))}function f(e,t,n){if("object"!=typeof e||null===e)return e||"";if(Array.isArray(e)){o="";for(var r=0;r<e.length;r++)o+=f(e[r],t,n);return o}n=n||0;var o="",i="#text"!==e.type&&e.type||0===n&&"p",a="";if(i){for(r=0;r<i.length-1;r++)o+="<"+i[r],e[i[r]]&&(o+=" "+l(e[i[r]])),o+=">",a="</"+i[r]+">"+a;i=i[r];var c=y[i];if(c)return o+c.toHTML.call(m,e,t)+a;if(o+="<"+i,e[i]&&(o+=" "+l(e[i])),0===n&&(o+=2===t?" coral-editor":" contenteditable=true coral-on-keydown=methods.keydown"),o+=">",E[i])return o}if(e.data)o+=d(e.data);else if(e.items)for(r=0;r<e.items.length;r++)o+=f(e.items[r],t,n+1);return i&&(o+="</"+i+">"+a),o}function p(e,t,n){if(e.nodeName===t.toUpperCase())return e;var r=document.createElement(t);return r.innerHTML=n||e.innerHTML||e.nodeValue,e.parentNode.replaceChild(r,e),r}function h(e,t){var r=e.nodeName,o=e.hasAttribute&&e.hasAttribute("style")?e.style:null,i=o&&("none"===o.display||"hidden"===o.visibility||parseFloat(o.opacity)<=.01),a=e.textContent,c=!O[r]&&!A[r]&&!a,s=e.firstChild&&(e.firstChild.innerHTML&&e.firstChild.innerHTML.trim()||A[e.firstChild.nodeName]);c=c||!O[r]&&"P"!==r&&!e.textContent.trim()||3===e.nodeType&&!e.textContent.trim()&&!e.parentNode.nextSibling&&!e.parentNode.previouSibling;var u=w[r]||(!s||"&nbsp;"===s)&&c&&!A[r]&&!E[r.toLowerCase()]&&!e.nodeValue&&(!t||"P"!==r);if(u=u||e.classList&&e.classList.contains("Apple-interchange-newline"),!i&&!u){var l,d=T[e.parentNode.nodeName]||{},f=(y[n(e.parentNode)]||{}).contains||{};return"B"===r||"A"!==r&&O[r]&&o&&parseInt(o.fontWeight)>500?l=p(e,"strong"):"I"===r||"A"!==r&&O[r]&&o&&"italic"==o.fontStyle?l=p(e,"em"):3===e.nodeType||N[r]||y[n(e)]||d[r]||f[r]||(l=p(e,"p")),t||function(e){if(e.hasAttribute){var t=coral.dot.keysFromArray(e.style,["width","height","textAlign","color"]);t.width.value&&e.setAttribute("width",toPX(t.width.value)),t.height.value&&e.setAttribute("height",toPX(t.height.value));for(var n=e.attributes,r=n.length-1;r>=0;r--){var o=n[r].name;b[o]||(o.indexOf("coral-editor-")>=0||e.removeAttribute(o))}"A"!==e.nodeName&&t.color.value&&"#"===t.color.value[0]&&"#000000"!==t.color.value&&(e.style.color=t.color.value),t.textAlign.value&&"start"!==t.textAlign.value&&(e.style.textAlign=t.textAlign.value)}}(l||e),l}e.parentNode.removeChild(e)}function v(e,t,n){if(t)for(var r=0;r<n.length;r++){var o=n[r],i=t.getAttribute(o);i&&"null"!==i&&(e[o]=i)}}var m={readAttr:v,attrString:l,toBlocks:s,toBlock:c,toHTML:f,esc:function(e){return e.replace(/"/g,'\\"')}},y={"cui-ed-oembed":{contains:{IFRAME:!0,inline:!0,INPUT:!0,P:!0,DIV:!0},toHTML:function(e,t){return'<div coral-editor coral-blox=cui-ed-oembed><iframe width="480" height="270" src="https://www.youtube.com/embed/M3r2XDceM6A?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'}},"cui-ed-image":{contains:{IMG:!0,CAPTION:!0,inline:!0,INPUT:!0,P:!0,DIV:!0},attr:{src:!0,width:!0,height:!0,caption:!0},toHTML:function(e,t){return"<div coral-blox=cui-ed-image><img "+this.attrString(e,["src","width","height"])+'><p coral-editor-src class="cui-editor-focus" contenteditable=true>'+this.esc(e.src||"")+"</p><div coral-editor-controls contenteditable=true>"+this.toHTML(e.caption,2)+"</div></div>"},toBlock:function(e,t){var n=e.querySelector("img"),r=e.querySelector("[coral-editor-controls]"),o=e.querySelector("[coral-editor-src]");if(v(t,n,["src","width","height"]),o&&o.textContent&&(n.src=o.textContent),r){var i=r;coral.ui.DOM.clean(i,!0),t.caption=this.toBlocks(i,!0)}return t}}},g={pre:!0,code:!0},w={"#comment":!0,META:!0,LINK:!0,STYLE:!0},O={STRONG:!0,B:!0,I:!0,EM:!0,S:!0,BR:!0,A:!0,SPAN:!0,IMG:!1,CODE:!0,"#text":!0},b={href:!0,"coral-editor":!0,src:!0,href:!0,url:!0,width:!0,height:!0,"coral-blox":!0,align:!0,colspan:!0},N={BLOCK:!0,HEADER:!0,FOOTER:!0,BR:!0,P:!0,PRE:!0,ARTICLE:!0,VIDEO:!0,IMG:!0,H1:!0,H2:!0,H3:!0,H4:!0,H5:!0,"#text":!0};coral.assign(N,{SPAN:!0,A:!0,STRONG:!0,I:!0,S:!0,LI:!0,UL:!0,OL:!0,TABLE:!0,TH:!0,TBODY:!0}),coral.assign(N,{THEAD:!0,TR:!0,TD:!0,CODE:!0,MARK:!0,STRONG:!0,EM:!0,BLOCKQUOTE:!0,HR:!0,CAPTION:!0}),coral.assign(N,{FIGURE:!0,SECTION:!0,FIGCAPTION:!0,OEMBED:!0,DETAILS:!0});var E={img:!0,input:!0,br:!0,hr:!0,embed:!0,link:!0,source:!0},A={BR:!0,IMG:!0,VIDEO:!0,OEMBED:!0,IFRAME:!0},P={TD:!0},T={OL_:{LI:!0},UL_:{LI:!0},THEAD:{TR:!0,TD:!0,TH:!0},TABLE:{THEAD:!0,TR:!0,TBODY:!0},TBODY:{TR:!0,TD:!0,TH:!0},TD:{LI:!0,P:!0,OL:!0,UL:!0},TH:{TD:!0},TR:{TH:!0,TD:!0},FIGURE:{FIGCAPTION:!0},BLOCKQUOTE:{P:!0}};t.clean=function(e,t,c){var s=(!c||"clean"==c)&&a(e,t);return c&&"flatten"!=c||function e(t,a,c){if(c&&t.hasAttribute&&t.hasAttribute("coral-editor"))for(var s=t.childNodes,u=0;u<s.length;u++)e(s[u],t,c);else{var l=l||a&&r(a),d=(s=t.childNodes,y[n(t)]||{}),f=T[t.nodeName]||d.contains||{},p=r(t);if(s)for(u=0;u<s.length;u++){var h=v,v=s[u],m=r(v);if(!g[m])if(l||(l=m),v.firstChild&&e(v,P[v.nodeName]?t:a||t,c),h&&i(h,v))h.textContent+=v.textContent,u--,t.removeChild(v),v=h;else{var w=("inline"!==m||"inline"===l)&&m!==l&&!f[m];if((w=w||"inline"===m&&a&&t!==a&&u&&"inline"===p&&!f[m])&&v.parentNode!==a&&a){var O,b=t;do{"inline"===m&&(v.nodeValue||v.firstChild)?(O||(o(O=t.cloneNode(!1),b),b=O),O.appendChild(v)):(o(v,b),O=null,b=v),m=r(v=s[u])}while(v);return}}}}}(e,null,t),(!c||"clean"==c)&&a(e,t)||s},t.toBlock=c,t.toBlocks=s,t.toHTML=f,t.combineBlocks=function(e,t){var n=y[e.type];return n?n.combineBlocks&&n.combineBlocks(e,t):(e.data?(e.items=[e.data],delete e.data):e.items||(e.items=[]),t.data?e.items.push(t.data):e.items=e.items.concat(t.items),!0)},t.escapeHTML=d}(this),function(e){var t=e.coral.ui.select={};function n(e){var t=e&&e.getClientRects();if(t&&t.length>0)return rect=t[0],rect.height=20,rect.width=0,rect}function r(e){var t,r=window.getSelection();if(!(e=e||r.anchorNode&&r.getRangeAt(0)))return n(document.activeElement);if(r.anchorNode&&3!==r.anchorNode.nodeType)return r.anchorNode.getBoundingClientRect();if(e.getClientRects){var o=(e=e.cloneRange()).getClientRects();o.length>0&&(t=o[0])}if(0===e.startOffset&&e.collapsed&&e.startContainer&&e.startContainer.getClientRects&&(t=n()),!t){var i=document.createElement("span");if(i.getClientRects){i.appendChild(document.createTextNode("​")),e.insertNode(i),t=i.getClientRects()[0];var a=i.parentNode;a.removeChild(i),a.normalize()}}return t||n(document.activeElement)}function o(e,t){return e===t||e.nodeName===t}function i(e,t){var n=e;if(o(n,t))return n;if(!n.firstChild)do{if(n.nextSibling){n=n.nextSibling;break}n=n.parentNode}while(n&&!o(n,t));if(n)for(;n.firstChild&&!o(n,t);)n=n.firstChild;return n&&t&&!o(n,t)?i(n,t):n}function a(e,t,n){console.log("select ---------- SETCURPOS",e,t),null===e&&(e={});var r=window.getSelection(),o={start:e||0,end:e||0,count:0};if("object"==typeof e&&(o.startNode=e.startNode,o.start=e.start||0,o.end=e.end||0,o.count=e.count||0),o.start<0&&(o.start=1073741824),o.end<0&&(o.end=1073741824),"start"in o){var a=function e(t,n,r,o){if(!r)var a=(r=document.createRange()).startContainer;var c;if(0===n.start&&(r.selectNode(t),r.setStart(t,n.start),n.start=-1),0===n.end&&(r.setEnd(t,n.end),n.end=-1),t&&(n.start>0||n.end>0))if(t.nodeType===Node.TEXT_NODE)n.setcount=(n.setcount||0)+t.textContent.length,n.lastNode=t,t.textContent.length<n.start?n.start-=t.textContent.length:n.start>=0&&(n.startNode&&n.startNode!==t?c=i(t,n.startNode):n.setcount<n.count&&(c=i(t)),c&&(n.start-=t.textContent.length,n.end-=t.textContent.length,n.start<0&&(n.start=0),n.end<0&&(n.end=0)),r.selectNode(c||t),r.setStart(c||t,n.start),n.start=-1),t.textContent.length<n.end?n.end-=t.textContent.length:n.end>=0&&(n.end=Math.min(n.end,(c||t).textContent.length),r.setEnd(c||t,n.end),n.end=-1);else for(var s=0;s<t.childNodes.length&&(r=e(t.childNodes[s],n,r),!(n.start<=0&&n.end<=0));s++);return a!==r.startContainer||o?r:e(t,{start:0,end:0},null,!0)}(t=t||e.el,o);if(a&&(o.lastNode&&(o.start>0&&(a.selectNode(o.lastNode),a.setStart(o.lastNode,o.lastNode.textContent.length)),o.end>0&&a.setEnd(o.lastNode,o.lastNode.textContent.length)),r.removeAllRanges(),r.addRange(a)),e&&e.els&&e.els.length&&t===e.el){for(var c=e.els,s={},u=0;u<c.length;u++)s[c[u]]=!0;c=e.el.children;for(u=0;u<c.length;u++)c[u].classList.toggle("selected",s[u]||!1);t.coral&&(t.coral.preserveSelection=!0)}if(!n&&t&&t!==document.activeElement&&t.focus)console.log("-------- FOCUS ----------",t),t.focus();return o}}function c(e,t){var n={count:0};return function e(t,n,r){if(r&&t&&(t===r&&(n.match=!0),!n.match))if(t.nodeType===Node.TEXT_NODE)n.count+=t.textContent.length;else for(var o=0;o<t.childNodes.length&&(e(t.childNodes[o],n,r),!n.match);o++);}(e,n,t),n}function s(e){return[].indexOf.call(e.parentNode.childNodes,e)}function u(e,t){for(;t&&t.parentNode!==e;)t=t.parentNode;return{el:t,idx:t?s(t):-1}}window.findNextNode=i,t.get=function(e){var t=window.getSelection(),n={count:0},r=document.activeElement;if(r&&t&&t&&t.anchorNode){if(!r.contains(t.anchorNode)){var o=c(e,r);if(o.match)return o.start=o.end=o.count,o.el=o.el,o.startNode=r,o}range=function e(t,n,r){if(!r)return null;if(t===r.anchorNode&&(n.start=n.count+r.anchorOffset,n.startNode=t),t===r.extentNode&&(n.end=n.count+r.extentOffset,n.endNode=t),t&&(!n.startNode||!n.endNode))if(t.nodeType===Node.TEXT_NODE)n.count+=t.textContent.length;else for(var o=0;o<t.childNodes.length&&(r=e(t.childNodes[o],n,r),!n.startNode||!n.endNode);o++);return r}(e||t.anchorNode,n,t),!("end"in n)&&"start"in n&&(n.end=n.start),n.el=e||t.anchorNode}var i=n.el||e;if(i&&i.querySelectorAll){var a=i.querySelectorAll(".selected");if(a.length){for(var s=n.els=[],l=0;l<a.length;l++)s[l]=u(i,a[l]).idx;n.el=i}}return n},t.set=a,t.test=function(e,t,n){var o=e.getBoundingClientRect(e),i=r();switch(t){case"ArrowUp":return i.top<=o.top+n?-1:0;case"ArrowDown":return i.top+i.height>=o.top+o.height-n?1:0}},t.coords=r,t.match=c,t.breaks=function(e,n){for(var o,i=e.innerText,c=[],s=t.get(),u=0;u<i.length;u++){a(u,e,!0);var l=r();(n||o!==l.top)&&(o=l.top,c.push(u))}return t.set(s),c}}(this)},function(e,t,n){var r,o;var i;i={ch:8,ex:7.15625,em:16,rem:16,in:96,cm:96/2.54,mm:96/25.4,pt:96/72,pc:16,px:1};(function(){var i=function(){};function a(e,t){var n,r;for(n in t)void 0!==(r=t[n])&&(e[n]=r);return e}var c={version:"0.1.15",Stack:function(){this.commands=[],this.stackPosition=-1,this.savePosition=-1}};a(c.Stack.prototype,{execute:function(e){this._clearRedo(),e.execute(),this.commands.push(e),this.stackPosition++,this.changed()},undo:function(){this.canUndo()?(this.commands[this.stackPosition].undo(),this.stackPosition--,this.changed()):console.error("Can't undo")},canUndo:function(){return this.stackPosition>=0},redo:function(){this.canRedo()?(this.stackPosition++,this.commands[this.stackPosition].redo(),this.changed()):console.error("Can't redo")},canRedo:function(){return this.stackPosition<this.commands.length-1},save:function(){this.savePosition=this.stackPosition,this.changed()},dirty:function(){return this.stackPosition!=this.savePosition},_clearRedo:function(){this.commands=this.commands.slice(0,this.stackPosition+1)},changed:function(){}}),c.Command=function(e){this.name=e};var s=new Error("override me!");a(c.Command.prototype,{execute:function(){throw s},undo:function(){throw s},redo:function(){this.execute()}}),c.Command.extend=function(e){var t=function(e,t){var n;return n=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return e.apply(this,arguments)},i.prototype=e.prototype,n.prototype=new i,t&&a(n.prototype,t),n.prototype.constructor=n,n.__super__=e.prototype,n}(this,e);return t.extend=c.Command.extend,t},void 0===(o="function"==typeof(r=c)?r.call(t,n,t,e):r)||(e.exports=o)}).call(this);var a=Undo.Command.extend({constructor:function(e,t,n){this.textarea=e,this.oldValue=t,this.newValue=n},execute:function(){},undo:function(){this.apply(this.oldValue)},redo:function(){this.apply(this.newValue)}});a.prototype.apply=function(e){a.blocked||(a.blocked=!0);var t=this.textarea;console.log("Undo ------ APPLYING");var n=t.coral.state.blocks;jsonpatch.applyPatch(n,jsonpatch.deepClone(e)),e.state(jsonpatch.deepClone(n)),n.splice(0,0),t.coral.render_(),coral.ui.select.set(e.selection,t)};let c=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'],s=c.join(","),u="undefined"==typeof Element?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector;function l(e,t){t=t||{};let n,r,o=[],i=[],a=e.querySelectorAll(s);t.includeContainer&&u.call(e,s)&&(a=Array.prototype.slice.apply(a),a.unshift(e));for(let e=0;e<a.length;e++)n=a[e],d(n)&&(r=h(n),0===r?o.push(n):i.push({documentOrder:e,tabIndex:r,node:n}));return i.sort(v).map(e=>e.node).concat(o)}function d(e){return!(!f(e)||function(e){return function(e){return m(e)&&"radio"===e.type}(e)&&!function(e){if(!e.name)return!0;let t=function(e){for(let t=0;t<e.length;t++)if(e[t].checked)return e[t]}(e.ownerDocument.querySelectorAll('input[type="radio"][name="'+e.name+'"]'));return!t||t===e}(e)}(e)||h(e)<0)}function f(e){return!(e.disabled||function(e){return m(e)&&"hidden"===e.type}(e)||function(e){return null===e.offsetParent||"hidden"===getComputedStyle(e).visibility}(e))}l.isTabbable=function(e){if(!e)throw new Error("No node provided");if(!1===u.call(e,s))return!1;return d(e)},l.isFocusable=function(e){if(!e)throw new Error("No node provided");if(!1===u.call(e,p))return!1;return f(e)};let p=c.concat("iframe").join(",");function h(e){let t=parseInt(e.getAttribute("tabindex"),10);return isNaN(t)?function(e){return"true"===e.contentEditable}(e)?0:e.tabIndex:t}function v(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex}function m(e){return"INPUT"===e.tagName}},function(e,t){
/*! fast-json-patch, version: 3.0.0-1 */
!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){
/*!
 * https://github.com/Starcounter-Jack/JSON-Patch
 * (c) 2017 Joachim Wester
 * MIT license
 */
var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=Object.prototype.hasOwnProperty;function i(e,t){return o.call(e,t)}function a(e){if(Array.isArray(e)){for(var t=new Array(e.length),n=0;n<t.length;n++)t[n]=""+n;return t}if(Object.keys)return Object.keys(e);t=[];for(var r in e)i(e,r)&&t.push(r);return t}function c(e){return-1===e.indexOf("/")&&-1===e.indexOf("~")?e:e.replace(/~/g,"~0").replace(/\//g,"~1")}function s(e,t){var n;for(var r in e)if(i(e,r)){if(e[r]===t)return c(r)+"/";if("object"==typeof e[r]&&""!=(n=s(e[r],t)))return c(r)+"/"+n}return""}function u(e,t){var n=[e];for(var r in t){var o="object"==typeof t[r]?JSON.stringify(t[r],null,2):t[r];void 0!==o&&n.push(r+": "+o)}return n.join("\n")}t.hasOwnProperty=i,t._objectKeys=a,t._deepClone=function(e){switch(typeof e){case"object":return JSON.parse(JSON.stringify(e));case"undefined":return null;default:return e}},t.isInteger=function(e){for(var t,n=0,r=e.length;n<r;){if(!((t=e.charCodeAt(n))>=48&&t<=57))return!1;n++}return!0},t.escapePathComponent=c,t.unescapePathComponent=function(e){return e.replace(/~1/g,"/").replace(/~0/g,"~")},t._getPathRecursive=s,t.getPath=function(e,t){if(e===t)return"/";var n=s(e,t);if(""===n)throw new Error("Object not found in root");return"/"+n},t.hasUndefined=function e(t){if(void 0===t)return!0;if(t)if(Array.isArray(t)){for(var n=0,r=t.length;n<r;n++)if(e(t[n]))return!0}else if("object"==typeof t){var o=a(t),i=o.length;for(n=0;n<i;n++)if(e(t[o[n]]))return!0}return!1};var l=function(e){function t(t,n,r,o,i){var a=this.constructor,c=e.call(this,u(t,{name:n,index:r,operation:o,tree:i}))||this;return c.name=n,c.index=r,c.operation=o,c.tree=i,Object.setPrototypeOf(c,a.prototype),c.message=u(t,{name:n,index:r,operation:o,tree:i}),c}return r(t,e),t}(Error);t.PatchError=l},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);t.JsonPatchError=r.PatchError,t.deepClone=r._deepClone;var o={add:function(e,t,n){return e[t]=this.value,{newDocument:n}},remove:function(e,t,n){var r=e[t];return delete e[t],{newDocument:n,removed:r}},replace:function(e,t,n){var r=e[t];return e[t]=this.value,{newDocument:n,removed:r}},move:function(e,t,n){var o=a(n,this.path);o&&(o=r._deepClone(o));var i=c(n,{op:"remove",path:this.from}).removed;return c(n,{op:"add",path:this.path,value:i}),{newDocument:n,removed:o}},copy:function(e,t,n){var o=a(n,this.from);return c(n,{op:"add",path:this.path,value:r._deepClone(o)}),{newDocument:n}},test:function(e,t,n){return{newDocument:n,test:d(e[t],this.value)}},_get:function(e,t,n){return this.value=e[t],{newDocument:n}}},i={add:function(e,t,n){return r.isInteger(t)?e.splice(t,0,this.value):e[t]=this.value,{newDocument:n,index:t}},remove:function(e,t,n){return{newDocument:n,removed:e.splice(t,1)[0]}},replace:function(e,t,n){var r=e[t];return e[t]=this.value,{newDocument:n,removed:r}},move:o.move,copy:o.copy,test:o.test,_get:o._get};function a(e,t){if(""==t)return e;var n={op:"_get",path:t};return c(e,n),n.value}function c(e,n,c,s,l,f){if(void 0===c&&(c=!1),void 0===s&&(s=!0),void 0===l&&(l=!0),void 0===f&&(f=0),c&&("function"==typeof c?c(n,0,e,n.path):u(n,0)),""===n.path){var p={newDocument:e};if("add"===n.op)return p.newDocument=n.value,p;if("replace"===n.op)return p.newDocument=n.value,p.removed=e,p;if("move"===n.op||"copy"===n.op)return p.newDocument=a(e,n.from),"move"===n.op&&(p.removed=e),p;if("test"===n.op){if(p.test=d(e,n.value),!1===p.test)throw new t.JsonPatchError("Test operation failed","TEST_OPERATION_FAILED",f,n,e);return p.newDocument=e,p}if("remove"===n.op)return p.removed=e,p.newDocument=null,p;if("_get"===n.op)return n.value=e,p;if(c)throw new t.JsonPatchError("Operation `op` property is not one of operations defined in RFC-6902","OPERATION_OP_INVALID",f,n,e);return p}s||(e=r._deepClone(e));var h=(n.path||"").split("/"),v=e,m=1,y=h.length,g=void 0,w=void 0,O=void 0;for(O="function"==typeof c?c:u;;){if(w=h[m],l&&"__proto__"==w)throw new TypeError("JSON-Patch: modifying `__proto__` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README");if(c&&void 0===g&&(void 0===v[w]?g=h.slice(0,m).join("/"):m==y-1&&(g=n.path),void 0!==g&&O(n,0,e,g)),m++,Array.isArray(v)){if("-"===w)w=v.length;else{if(c&&!r.isInteger(w))throw new t.JsonPatchError("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index","OPERATION_PATH_ILLEGAL_ARRAY_INDEX",f,n,e);r.isInteger(w)&&(w=~~w)}if(m>=y){if(c&&"add"===n.op&&w>v.length)throw new t.JsonPatchError("The specified index MUST NOT be greater than the number of elements in the array","OPERATION_VALUE_OUT_OF_BOUNDS",f,n,e);if(!1===(p=i[n.op].call(n,v,w,e)).test)throw new t.JsonPatchError("Test operation failed","TEST_OPERATION_FAILED",f,n,e);return p}}else if(w&&-1!=w.indexOf("~")&&(w=r.unescapePathComponent(w)),m>=y){if(!1===(p=o[n.op].call(n,v,w,e)).test)throw new t.JsonPatchError("Test operation failed","TEST_OPERATION_FAILED",f,n,e);return p}if(v=v[w],m<y&&(!v||"object"!=typeof v))throw new t.JsonPatchError("Cannot perform operation at the desired path","OPERATION_PATH_UNRESOLVABLE",f,n,e)}}function s(e,n,o,i,a){if(void 0===i&&(i=!0),void 0===a&&(a=!0),o&&!Array.isArray(n))throw new t.JsonPatchError("Patch sequence must be an array","SEQUENCE_NOT_AN_ARRAY");i||(e=r._deepClone(e));for(var s=new Array(n.length),u=0,l=n.length;u<l;u++)s[u]=c(e,n[u],o,!0,a,u),e=s[u].newDocument;return s.newDocument=e,s}function u(e,n,i,a){if("object"!=typeof e||null===e||Array.isArray(e))throw new t.JsonPatchError("Operation is not an object","OPERATION_NOT_AN_OBJECT",n,e,i);if(!o[e.op])throw new t.JsonPatchError("Operation `op` property is not one of operations defined in RFC-6902","OPERATION_OP_INVALID",n,e,i);if("string"!=typeof e.path)throw new t.JsonPatchError("Operation `path` property is not a string","OPERATION_PATH_INVALID",n,e,i);if(0!==e.path.indexOf("/")&&e.path.length>0)throw new t.JsonPatchError('Operation `path` property must start with "/"',"OPERATION_PATH_INVALID",n,e,i);if(("move"===e.op||"copy"===e.op)&&"string"!=typeof e.from)throw new t.JsonPatchError("Operation `from` property is not present (applicable in `move` and `copy` operations)","OPERATION_FROM_REQUIRED",n,e,i);if(("add"===e.op||"replace"===e.op||"test"===e.op)&&void 0===e.value)throw new t.JsonPatchError("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)","OPERATION_VALUE_REQUIRED",n,e,i);if(("add"===e.op||"replace"===e.op||"test"===e.op)&&r.hasUndefined(e.value))throw new t.JsonPatchError("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)","OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED",n,e,i);if(i)if("add"==e.op){var c=e.path.split("/").length,s=a.split("/").length;if(c!==s+1&&c!==s)throw new t.JsonPatchError("Cannot perform an `add` operation at the desired path","OPERATION_PATH_CANNOT_ADD",n,e,i)}else if("replace"===e.op||"remove"===e.op||"_get"===e.op){if(e.path!==a)throw new t.JsonPatchError("Cannot perform the operation at a path that does not exist","OPERATION_PATH_UNRESOLVABLE",n,e,i)}else if("move"===e.op||"copy"===e.op){var u=l([{op:"_get",path:e.from,value:void 0}],i);if(u&&"OPERATION_PATH_UNRESOLVABLE"===u.name)throw new t.JsonPatchError("Cannot perform the operation from a path that does not exist","OPERATION_FROM_UNRESOLVABLE",n,e,i)}}function l(e,n,o){try{if(!Array.isArray(e))throw new t.JsonPatchError("Patch sequence must be an array","SEQUENCE_NOT_AN_ARRAY");if(n)s(r._deepClone(n),r._deepClone(e),o||!0);else{o=o||u;for(var i=0;i<e.length;i++)o(e[i],i,n,void 0)}}catch(e){if(e instanceof t.JsonPatchError)return e;throw e}}function d(e,t){if(e===t)return!0;if(e&&t&&"object"==typeof e&&"object"==typeof t){var n,r,o,i=Array.isArray(e),a=Array.isArray(t);if(i&&a){if((r=e.length)!=t.length)return!1;for(n=r;0!=n--;)if(!d(e[n],t[n]))return!1;return!0}if(i!=a)return!1;var c=Object.keys(e);if((r=c.length)!==Object.keys(t).length)return!1;for(n=r;0!=n--;)if(!t.hasOwnProperty(c[n]))return!1;for(n=r;0!=n--;)if(!d(e[o=c[n]],t[o]))return!1;return!0}return e!=e&&t!=t}t.getValueByPointer=a,t.applyOperation=c,t.applyPatch=s,t.applyReducer=function(e,n,r){var o=c(e,n);if(!1===o.test)throw new t.JsonPatchError("Test operation failed","TEST_OPERATION_FAILED",r,n,e);return o.newDocument},t.validator=u,t.validate=l,t._areEquals=d},function(e,t,n){var r=n(1);Object.assign(t,r);var o=n(3);Object.assign(t,o);var i=n(0);t.JsonPatchError=i.PatchError,t.deepClone=i._deepClone,t.escapePathComponent=i.escapePathComponent,t.unescapePathComponent=i.unescapePathComponent},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});
/*!
 * https://github.com/Starcounter-Jack/JSON-Patch
 * (c) 2017 Joachim Wester
 * MIT license
 */
var r=n(0),o=n(1),i=new WeakMap,a=function(e){this.observers=new Map,this.obj=e},c=function(e,t){this.callback=e,this.observer=t};function s(e,t){void 0===t&&(t=!1);var n=i.get(e.object);u(n.value,e.object,e.patches,"",t),e.patches.length&&o.applyPatch(n.value,e.patches);var r=e.patches;return r.length>0&&(e.patches=[],e.callback&&e.callback(r)),r}function u(e,t,n,o,i){if(t!==e){"function"==typeof t.toJSON&&(t=t.toJSON());for(var a=r._objectKeys(t),c=r._objectKeys(e),s=!1,l=c.length-1;l>=0;l--){var d=e[p=c[l]];if(!r.hasOwnProperty(t,p)||void 0===t[p]&&void 0!==d&&!1===Array.isArray(t))Array.isArray(e)===Array.isArray(t)?(i&&n.push({op:"test",path:o+"/"+r.escapePathComponent(p),value:r._deepClone(d)}),n.push({op:"remove",path:o+"/"+r.escapePathComponent(p)}),s=!0):(i&&n.push({op:"test",path:o,value:e}),n.push({op:"replace",path:o,value:t}),!0);else{var f=t[p];"object"==typeof d&&null!=d&&"object"==typeof f&&null!=f?u(d,f,n,o+"/"+r.escapePathComponent(p),i):d!==f&&(!0,i&&n.push({op:"test",path:o+"/"+r.escapePathComponent(p),value:r._deepClone(d)}),n.push({op:"replace",path:o+"/"+r.escapePathComponent(p),value:r._deepClone(f)}))}}if(s||a.length!=c.length)for(l=0;l<a.length;l++){var p=a[l];r.hasOwnProperty(e,p)||void 0===t[p]||n.push({op:"add",path:o+"/"+r.escapePathComponent(p),value:r._deepClone(t[p])})}}}t.unobserve=function(e,t){t.unobserve()},t.observe=function(e,t){var n,o=function(e){return i.get(e)}(e);if(o){var u=function(e,t){return e.observers.get(t)}(o,t);n=u&&u.observer}else o=new a(e),i.set(e,o);if(n)return n;if(n={},o.value=r._deepClone(e),t){n.callback=t,n.next=null;var l=function(){s(n)},d=function(){clearTimeout(n.next),n.next=setTimeout(l)};"undefined"!=typeof window&&(window.addEventListener("mouseup",d),window.addEventListener("keyup",d),window.addEventListener("mousedown",d),window.addEventListener("keydown",d),window.addEventListener("change",d))}return n.patches=[],n.object=e,n.unobserve=function(){s(n),clearTimeout(n.next),function(e,t){e.observers.delete(t.callback)}(o,n),"undefined"!=typeof window&&(window.removeEventListener("mouseup",d),window.removeEventListener("keyup",d),window.removeEventListener("mousedown",d),window.removeEventListener("keydown",d),window.removeEventListener("change",d))},o.observers.set(t,new c(t,n)),n},t.generate=s,t.compare=function(e,t,n){void 0===n&&(n=!1);var r=[];return u(e,t,r,"",n),r}}])}]);
//# sourceMappingURL=coral-blox-min.js.map