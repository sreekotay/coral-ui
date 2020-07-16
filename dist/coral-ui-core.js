!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([,function(t,e){var r;window.coral.ui=function(t){t=t||{};var e=window.coral,r=document.createRange(),n=0,o={},i=0;const a={"":{update:function(){var t=this.state,r=this.slots||{},n=r[t.dataslot||"default"];if(!n)return"done";if(!t.datasrc)return"done";var o="datactx"in t?this.dot(t.datactx).value:this,a="datasrc"in t?this.dot(t.datasrc).value:this,s=t.genkey;Array.isArray(a)&&0===a.length&&0===a.keys().length&&(a=null);var l,c=a&&n||r.empty||{text:"<div> </div>"},u=t.datakey;for(var d in Array.isArray(a)||t.dataobj||(a=[a]),r.header&&this.html(-1,r.header.script?r.header.script(o):r.header.text),a){var h=typeof a[d];a[d]&&(l=void 0===u?a[d].__key__:a[d][u]),s&&void 0===l&&"object"===h&&(l=e.privateprop(a[d],"__key__","k"+i++));var f=c.script?c.script(a[d],d,o):c.text;this.html(l||d,f)}r.footer&&this.html(-2,r.footer.script?r.footer.script(o):r.footer.text)}}};function s(){console.error(arguments)}function l(){throw console.error(arguments),Error("CORAL FAULT")}function c(t,e){return t[e]=t[e]||{},t[e]}function u(t){for(var e=t||document,r=[],n=e.querySelectorAll("[coral]"),o=0;o<n.length;o++)if(n[o].coral)n[o].coral.render_();else{var i=h(n[o],e.coral);f(i,"mount"),i&&i.render_(),r.push(i)}return r}function d(t,e){try{var r=e.getAttribute("type"),n=r.match(/\(([^)]*)\)/);n=n?n[1]:"";var o=e.innerHTML.trim(),i=t.props=t.props||{};if(o)switch(r.split("(")[0].trim()){case"coral-method":c(t,"methods")[e.getAttribute("name")||"default"]=new Function(n,o);break;case"coral-observer":c(t,"observers")[e.getAttribute("name")||"default"]=new Function(n,o);break;case"coral-function":e.coralScript=new Function(n,o);break;case"coral-template":e.coralScript=F(n,o);break;default:var a=r.split("coral-s-")[1];if(a){try{o=JSON.parse(o)}catch(t){}return i[a.trim()]=o,!0}s("unknown coral slot type",r)}}catch(t){s("coral-slot script parsing ERROR:",o||e.type,e,t)}}function h(t,e){if(!t)return null;var r=t.getAttribute("coral");try{var n=function(t){for(var e,r=t.attributes,n=0;n<r.length;n++){var o=r[n],i=o.name+"";if(0===i.indexOf("coral-s")){e=e||{};var a=o.value,s=i[7],l=a.split(s+s);a=l[0],l=l[1];var u=i.substring(8),d=p(u,a);try{a=JSON.parse(a)}catch(t){}d?c(e,"bind")[u]=d:c(e,"props")[u]=a,l&&(c(e,"events")[u]=l)}else if(0===i.indexOf("coral-on-")){var h=i.substring(9);c(e=e||{},"listeners")[h]=o.value}}return e}(t),o=t.cloneNode(!0);if(o&&(n=n||{},o.children))for(var i=0;i<o.children.length;i++){var a=c(n,"slots"),l=o.children[i],u=l.getAttribute,h=u&&u.call(l,"coral-slot")||"default";if("SCRIPT"!==l.nodeName||0!==l.type.indexOf("coral-")||!d(n,l)){var f=a[h]=a[h]||[];f.push(l),f.text=(f.text||"")+(u?l.outerHTML:l.state),"el"in f||(f.el=l),!("script"in f)&&l.coralScript&&(f.script=l.coralScript)}}return v(t,r,n,e)}catch(e){s("UI failed to mount: ",r,t,e)}return null}function f(t,e){return t.lifecycle&&t.lifecycle[e]&&t.lifecycle[e].call(t)}function p(t,e){if("~"!==e[0])return!1;var r=e.split("~");return{prop:r[1],selector:r.length<2?"^":r[2]}}function v(e,r,n,i){n=n||{},a[r]||l("UI NOT registered: ",r);var s=a[r],c=new t.use(r,e,s,n);if(e.setAttribute("coral-stage","mounted"),c.listeners){var u=[],d=c.listeners;for(var h in d){u.push(h);var f=h.split("."),p=f[0];if(!o[p]){var v=m(p);"local"===f[1]?(u[p]=d[p+".local"],e.addEventListener(p,v,!1)):(o[p]=v,document.addEventListener(p,v,!1))}d[p]=d[h],"stop"===d[f[1]]&&(d[p].coralStop=!0)}c.listeners=u}return c}function m(t){return function(e){for(var r,n=e.detail&&e.detail.coralEmitRootEl||e.target,o="coral-on-"+t,i=[];n;){if(n.getAttribute){var s=n.getAttribute(o);s||(s=n.getAttribute(o+".stop"))&&(s.stop=!0),s&&i.push(s.trim());var l=n.coral;if(e.coral||(e.coral=l),l&&i.length)for(var c=0;c<i.length;c++){var u=i[c],d=u,h=(r=void 0,(r=d.match(/\(([^)]*)\)/))&&r[1]||"");if(h){h=h.split(","),d=d.split("(")[0];var f=h.indexOf("$event");f>=0&&(h[f]=e)}var p,v=l.dot(d);if(void 0!==v.obj&&(_(v.value)?p=v.value.apply(v.obj,h||[e]):l.dot(d,h[0]),"stop"===p||u.stop))return}var m=l&&l.name,g=((l||{}).listeners||{})[t]||((a[m]||{}).listeners||{})[t];if(g&&("stop"===g.call(l,e)||g.coralStop))return}n=n.parentNode}}}function _(t){return!!(t&&t.constructor&&t.call&&t.apply)}function g(t,e){if(!Array.isArray(t))return t;for(var r={},n=0;n<t.length;n++)r[t[n]]=arguments.length<=1||e;return r}function y(t,r,n,o){for(var i=0;i<r.length;i++){var a=r[i];void 0!==(a in o?o[a]:n[a])&&(t[a]=e.assign({},n[a],o[a]))}}function b(t,r,o,i){o=o||{},i=i||{};var s=this.__={};y(s,["update","bind"],o,i),y(this,["methods","observers","listeners","data","mutate","lifecycle"],o,i),"shared"in o&&(this.shared=o.shared),(o.events||i.events)&&(s.events=e.assign({},g(o.events),i.events)),(o.decorators||i.decorators)&&(s.decorators=e.assign({},g(o.decorators),g(i.decorators))),(o.slots||i.slots)&&e.assign(c(this,"slots"),o.slots,i.slots),"super"in o&&(this.super=a[o.super]);var l=this.methods;if(l)for(var u in l)l[u]=_(l[u])?l[u].bind(this):l[u];this.name=t,this.rootEl=r,r.coral=this,s.obsf=b.prototype.react.bind(this);var d=this.state=e.observe({},s.obsf);for(u in e.assign(d,s.decorators,o.state,i.props),s.bind)S(this,"state."+u,s.bind[u].selector,s.bind[u].prop);return e.observe(d),this.sym="$"+n++,this}function N(t){var e="";for(var r in t)e+=":xs:"+r+"\n";return e}function E(t,e,r){var n=this,o=c(this.__,"xhrc");o[t]&&o[t].abort();var i=(r=r||{}).xhr||new XMLHttpRequest;i.onerror=function(t){console.log("CORAL HTTP LOAD FAIL",t,e),H(n.rootEl,"coralLoadDataFail",{url:e,xhr:i,err:t})},i.onload=function(e){if(4===i.readyState)if(delete o[t],this.status>=200&&this.status<300){var a=this.response;try{a=JSON.parse(a)}catch(t){}r.sanitize&&(a=M(a)),n.dot(t,a)}else this.status&&i.onerror(e)},o[t]=i,i.open(r.method||"GET",e,!0);var a=r.body;for(var s in r.headers||{})i.setRequestHeader(s,r.headers[s]);return i.send(a?"string"==typeof a?"":JSON.stringify(a):null),i}function x(t,e){var r=this,n=c(this.__,"htmc");if("loading"!==document.readyState){var o=document.createElement("script");o.src=e,document.getElementsByTagName("head")[0].appendChild(o)}else document.write('<script src="'+e+'"></script'),o=(o=document.getElementsByTagName("script"))[o.length-1];var i=n[t]=(n[t]||0)+1;return o.onerror=function(t){console.log("CORAL SCRIPT LOAD",t),o.parentNode.removeChild(o),H(r.rootEl,"coralLoadHTMLFail",{url:e,script:o,err:t})},o.coralCB=function(e){n[t]===i&&r.dot(t,e)},document.currentScript||(window.rf_script=o),o}function w(t,r){var n=r.split("."),o=e.dot(t,n);if(o.obj)return o;for(var i=n,a=t,s=0;s<i.length;s++){var l=a[i[s]];null!=l&&"object"==typeof l||(a[i[s]]=s==i.length-1?void 0:{}),a=a[i[s]]}return e.dot(t,n)}function A(t){var e=t&&t.getRootNode();return e&&e!==document&&"#document-fragment"!==e.nodeName}function S(t,r,o,i,a,s){var u,d;o=o||"^";var h=c(t.__,"bind"),f=c(h,r);if(i=i||r,s||f.proppath!==r||f.selector!==o||f.prop!==i||f.copy){switch(o[0]){case"^":u=t.rootEl;for(var p=0|o.substring(1);p--;)refObj=refObj.parentElement;(u=u&&u.coral)||l("unable to find parent to state bind",t,r),d=w(u,i);break;case"#":case".":case"[":var v=(a||document).querySelector(o);(u=v&&v.coral)||l("unable to locate coral for bind",a,i),d=w(u,i);break;default:var m=o.split("$");switch(h[r]={proppath:r,selector:o,prop:i},m[1]){case"data":case"html":case"json-raw":E.call(t,r,m[2],a);break;case"json":E.call(t,r,m[2],e.assign({sanitize:!0},a||{}));break;case"jsonp":m[2]=function(t,e,r){if(t.indexOf("{JSONP}")<0)return t;var o="jsonp_rf_"+n++;return window[o]=function(t){e.dot(r,t),delete window[o]},t.replace("{JSONP}",o)}(m[2],t,r);case"js":x.call(t,r,m[2]);break;default:l("unknown data bind: "+r+": "+o)}if(d=w(t,i),i===r)return}var _=w(t,r);if(_.obj||l("state bind not found: "+r),f.copy)_.obj[_.prop]=d.obj[d.prop];else{d.obj!==u.state&&e.observe(u.state,(function(e){h[r].copy||A(t.rootEl)||"set"==e.action&&6===i.indexOf(e.path)&&(h[r].copy=!0,S(t,r,o,i,a),h[r].copy=!1)}));var g=e.alias(_.obj,_.prop,d.obj,d.prop,(function(e){A(t.rootEl)?t.unmount():t.react(e)}));h[r]={proppath:r,selector:o,prop:i,sp:d,unobs:g}}}}function j(){if(this===this.rootEl.coral){f(this,"beforeRender");var t=this.rootEl;if(A(t))this.unmount();else{var e=this.__.update;if(e){var r=this.__.fcounter;r&&this.htmlBegin(),r=this.__.fcounter;var n=e.call(this,this.slots)||"";this.__.harr&&"done"!==n?this.htmlEnd():("string"==typeof n?"done"!==n&&(t.innerHTML=n):(t.innerHTML="",Array.isArray(n)?n.forEach((function(e){t.appendChild(e)})):t.appendChild(n)),u(t))}this.__.renderflag=0,f(this,"afterRender")}}}function T(){if(0!==this.__.renderflag){var t=function(t){var e=document.activeElement;if(e){for(var r=e.selectionStart,n=e.selectionEnd,o=[];e&&e!==t&&e.parentNode;)o.push((i=e,[].indexOf.call(i.parentNode.childNodes,i))),e=e.parentNode;e&&e.parentNode||(e=null)}var i;return function(){if(e){for(e=t;e&&o.length;){var i=o.pop();e=e.childNodes[i]}if(e){e.focus&&e.focus();try{e.selectionStart=r,e.selectionEnd=n}catch(t){}}}}}(this.rootEl);j.call(this),t(),this.__.renderflag=0}}function O(t){switch(t.nodeName){case"TABLE":return t.childNodes&&t.childNodes[0]||t;default:return t}}function C(t){if(!t)return 0;for(var e=0,r=t.length,n=0;n<r;n++)e=31*e+t.charCodeAt(n),e&=e;return e}b.prototype.unmount=function(){f(this,"umnount");var t=this.__||{};if(e.unobserve(this.state,t.obsf),t.bind)for(var r in t.bind){var n=t.bind[r];n.obsf&&e.unobserve(n.sp.obj,n.obsf)}},b.prototype.react=function(t){t.coral=this;var e,r=this.__,n=t.root,o=this.observers,i=r.events,a=r.proprx=r.proprx||(o?N(o):"")+(i?N(i):"");if(a){var s="(:xs:(("+t.path.replace(/\./g,"\\.)|(\\*\\.))*((")+")|(\\*)))\n",l=new RegExp(s,"g"),c=a.match(l);if(c){for(var u=c[0],d=1;d<c.length;d++)c[d].length>u.length&&(u=c[d]);n=u.substring(4,u.length-1)}}var h,f=o&&o[n];if(f)if(_(f))e=f.call(this,t);else if(!t.path&&("set"===t.action||"add"===t.action)){var p=this.dot(f);_(p.value)?p.value.call(this):p.obj[p.prop]=t.value}if(i&&i[n]){var v=r.name+"."+(!0===i[n]?n:i[n]);H(this.rootEl,v,t)}if(t.value!==t.prev){this.mutate&&(h=this.mutate.call(this,t));var m=r.decorators;this.sym&&("done"===e||"done"===h||m&&(m[n]||m[u])||this.rerender())}},b.prototype.observe=function(t,e){c(this,"observers")[t]=e,this.__.obsrx=null},b.prototype.decorate=function(t,e){c(this,"decorators")[t]=!1!==e&&0!==e},b.prototype.events=function(t,e){c(this.__,"events")[t]=!1!==e&&0!==e&&e,this.__.evrx=null},b.prototype.watch=function(t,e){this.state[t]=e,this.state.__observe__()},b.prototype.bind=function(t,e,r,n){S(this,t,e,r,n,!0)},b.prototype.emit=function(t,e){H(this.rootEl,t,e)},b.prototype.render_=j,b.prototype.render=function(){e.tick(this.sym+"_rr",this,j)},b.prototype.rerender=function(){this.__.renderflag=(this.__.renderflag||0)+1,e.tick(this.sym+"_rr",this,T,!0)},b.prototype.htmlBegin=function(t){this.__.harr&&!t&&this.__.hroot===this.rootEl||(this.__.hmap={},this.__.hgeneration=-1),this.__.hroot=this.rootEl,this.__.harr=[],this.__.harr.html="",this.__.harr.htmlIdx=0,this.__.harr.wmap=new WeakMap,this.__.hgeneration++,this.__.fcounter=0};const L={INPUT:!0,TEXTAREA:!0};function k(t,e){if(!t)return e;if(!e)return e;if(e.coral){t.coral;t.coral=e.coral,t.coral.rootEl=t}else t.coral=null;if(3===t.nodeType&&3===e.nodeType&&t.nodeValue!==e.nodeValue)return t.nodeValue=e.nodeValue,t;if(t.nodeName!==e.nodeName||!function(t,e){var r,n={},o=e.attributes,i=o.length;L[t.nodeName]&&t.value!==e.value&&(t.value=e.value);for(var a=0;a<i;a++)n[(r=o[a]).name]=!0,t.getAttribute(r.name)!==r.value&&t.setAttribute(r.name,r.value);var s=t.attributes,l=s.length;if(l===i)return!0;for(a=l-1;a>=0;a--)n[(r=s[a]).name]||t.removeAttribute(r.name);return!0}(t,e))return t.parentNode.replaceChild(e,t),e;var r=t.childNodes,n=e.childNodes;if(r.length||n.length){for(var o,i=o=Math.min(r.length,n.length);i<r.length;)t.removeChild(r[o]);for(;i<n.length;)t.appendChild(n[o]);for(;--o>=0;){var a=r[o],s=n[o];3!==a.nodeType||3!==s.nodeType?a.isEqualNode(s)||a.nodeName===s.nodeName&&k(a,s)||t.replaceChild(s,a):a.nodeValue!==s.nodeValue&&(a.nodeValue=s.nodeValue)}}return t}function R(t,e){r.selectNode(t);var n=r.createContextualFragment(e);return"TBODY"===t.nodeName?n.childNodes[0]:n}var B;function M(t){if("object"==typeof t){for(var e in t)switch(typeof t[e]){case"string":case"object":t[e]=t[e]?M(t[e]):t[e]}return t}return(B=B||document.createElement("div")).textContent=t,B.innerHTML}function H(t,e,r){r=r||{},(t=function t(e,r){return"string"!=typeof e?e:t(r||document).querySelector(e)}(t))&&(r.coralEmitRootEl=t),document.dispatchEvent(new CustomEvent(e,{detail:r}))}function I(t){"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?t():document.addEventListener("DOMContentLoaded",t)}b.prototype.htmlUpdate=function(t,e,r){var n=this.__.hmap;if(n){var o=C(r);if((e=null==e?o:e)in n||l("updating non-existent element"),n[e].hsh!==o||t!==n[e].idx){var i=O(this.rootEl),a=n[e].el;a.getAttribute?(n[e].el=k(i.childNodes[t],R(i,r).firstChild),n[e].hsh=o,n[e].idx=t):a.nodeValue!==r&&(a.nodeValue=r)}}},b.prototype.htmlEnd=function(){var t=this.__,e=t.hgeneration,r=this.__.fcounter,n=null;if(0===r)return this.htmlBegin(!0),void(this.rootEl.innerHTML="");0===e&&(this.rootEl.innerHTML="");var o=t.harr,i=t.hmap,a="";if(o){for(var s in i){var l=i[s];l.generation!==e&&(l.el&&l.el.parentNode&&l.el.parentNode.removeChild(l.el),delete i[s])}var c=O(this.rootEl),d=document.createElement(c.nodeName);o.html&&(u(d=R(c,o.html)),o.html="");for(var h=0,f=0;f<r;f++){var p=(l=o[f]).el,v=l.h;if("number"==typeof v){var m=d.childNodes[l.h-h];(m=k(p,m))!==p&&(l.el=p=m,h++)}else v&&(f>=c.childNodes.length?a+=v:l.el=p=R(c,v).firstChild);l.idx=f,l.h="",p&&(l.el=p,o.wmap.set(p,f),p.parentNode===c&&p.previousSibling===n||(n?c.insertBefore(p,n.nextSibling):c.childNodes&&c.childNodes[0]===p||c.insertBefore(p,c.childNodes&&c.childNodes[0])),n=p)}o.length=r;var _=c.childNodes.length;for(a&&(c.insertAdjacentHTML("beforeend",a),u(c)),(c=O(this.rootEl))&&o.length!==c.childNodes.length&&console.error("inconsistent count - must be 1 html() entity for hmtl()"),f=_;f<o.length;f++)o[f].el=c.childNodes[f],o.wmap.set(o[f].el,f);return"done"}},b.prototype.htmlFromIdx=function(t){return O(this.rootEl).childNodes[t]},b.prototype.htmlChild=function(t){for(;t.parentNode!==this.rootEl;)t=t.parentNode;return t},b.prototype.htmlToIdx=function(t){for(;t.parentNode!==this.rootEl;)t=t.parentNode;var e=this.__.harr.wmap.get(t);return void 0===e?-1:e},b.prototype.html=function(t,e,r){this.__.harr||this.htmlBegin();var n,o=this.__,i=o.harr,a=o.hmap,s=o.fcounter++,c=o.hgeneration,u=C(e);if(a[t=null==t?u:t]&&a[t].generation===c&&(t="__"+s+"__"),a[t]){if((n=a[t]).generation===c&&l("duplicate html() id"),n.generation=c,i[s]=n,n.el&&!n.el.parentNode&&(n.el=null),n.el&&n.hsh===u&&!r&&!n.el.__coral_dirty__)return;n.el&&n.el.__coral_dirty__&&delete n.el.__coral_dirty__,n.h=i.htmlIdx++,i.html+=e,n.hsh=u}else n={h:e,hsh:u,idx:s,id:t,generation:c,el:null},i.splice(s,0,n),a[t]=n},b.prototype.dot=function(t,r){var n=e.dot(this,t);if(arguments.length>1){if(!n.obj)throw Error("chain path missing");n.obj[n.prop]=r}return n},b.prototype.styleBag=function(t,e){var r=t instanceof Node?t:this.rootEl;r===this.rootEl&&(e=t);var n=C(JSON.stringify(e));if(r.__xs__style!==n){for(var o in e)r.style[o]=e[o];r.__xs__style=n}},t.autorun&&I((function(){u()})),t.use=t.use||b;var F=document.currentScript?function(t,e){return new Function(t,"return `"+e+"`;")}:function(t,e){return e=e.split("\n").join("\\\n").replace(/"/g,'\\"'),new Function(t,'var f=function (_, exp) {return eval(exp)}; f.bind(this); return "'+e+'".replace(/\\${(.*?)}/g, f)')};return{register:function(t,r,n){var o="*"===t[0]?t.substring(1):t;if(n=n||"",r.state=g(r.state,void 0),!a[o])return a[n]||l("Super Coral NOT registered: "+n),a[o]=e.assign({},a[n],r),a[o].name=o,a[o].super=n,!0;t===o&&l("UI already registered: "+o)},mount:v,run:u,template:F,hydrate:R,ready:I,emit:H,sanitize:M,cssRule:function(t,e){var r=document.getElementById("__coral_styles__");r||((r=document.createElement("style")).id="__coral_styles__",r.type="text/css",document.getElementsByTagName("head")[0].appendChild(r)),r.sheet.insertRule(t+"{"+e+"}",0)},styleBag:b.prototype.styleBag,registry:function(t){return t?a[t]:a},find:function(t,e){return(t=this.findAll(t,e))?t[0]:null},findAll:function(t,e){var r=0;if(t=[].slice.call((e||document).querySelectorAll(t)))for(var n=0;n<t.length;n++)t[r]=t[n].coral,r+=t[r]?1:0;return r?(t.length=r,t):null}}}({autorun:!0}),(r=window.coral=window.coral||{}).ui=r.ui||{},r.ui.loadScript=function(t,e,r){var n;document.querySelector('script[url="'+t+'"]')?e&&e(!0):(r?((n=document.createElement("link")).setAttribute("rel","stylesheet"),n.setAttribute("type","text/css"),n.setAttribute("href",t)):((n=document.createElement("script")).src=t,n.setAttribute("url",t)),n.onload=function(){e(!1)},document.getElementsByTagName("head")[0].appendChild(n))},r.ui.clientSideInclude=function(t){var e;(e=t)&&e.constructor&&e.call&&e.apply&&(t=t.toString().split("\n").slice(1,-1).join("\n"));var r=document.currentScript||window.rf_script;r||(r=(r=document.getElementsByTagName("script"))[r.length-1]),window.rf_script&&(window.rf_script=null);var n=r.coralCB;void 0===n?r.outerHTML=t:n(t),r.parentNode&&r.parentNode.removeChild(r)}}]);
//# sourceMappingURL=coral-ui-core.js.map