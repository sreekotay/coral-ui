!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=3)}([function(t,e){(function(){function t(r,o,i,s){if(!(r instanceof Node)&&(!r&&this.__xs__&&(r=this),r)){var c=!!r.__xs__;i&&(s=s&&s.concat()||[]).push(i),o=a(o,r,s);var f=n(r);if(!f.skip){var d=f.v;for(var p in d)p in r||(delete d[p],l("delete",r,p,null,null));for(p in r)c&&!(p in d)&&l("add",r,p,r[p],null),e(r,p,o,s);return Array.isArray(r)&&function(e,r){if(e.__xs__.arrhelpers)return;e.__xs__.arrhelpers=!0;for(var n=function(r){u(e,r,(function(){var e=this,n=e.__xs__;n.pause=!0;var o=Array.prototype[r].apply(e,arguments);return n.pause=!1,h(n.s,e,(function(){t(e)})),l(r,e,arguments,e,null),o}))},o=["pop","push","shift","unshift","splice","reverse","sort"],i=0;i<o.length;i++)n(o[i])}(r),r.__observe__||void 0!==s||void 0!==i||u(r,"__observe__",t),r}}}function e(e,r,o,i){var s=n(e),c=s.v;o!==e&&(o=a(o,e));var u=e[r];if(!(r in c)){c[r]=u;Object.defineProperty(e,r,{get:function(){return c[r]},set:function(n){var a=c[r];return c[r]=n,"object"!=typeof n||null===n||n.__xs__||h(s.s,e,(function(){t(n,o,{o:e,p:r},i)})),l("set",e,r,n,a),n},enumerable:!0,configurable:!0})}"object"==typeof u&&t(u,o,{o:e,p:r},i)}var r=0;function n(t){t.__xs__||u(t,"__xs__",{s:"@"+r++,v:{},h:[]});return t.__xs__}var o,i=0;function a(t,e,r){return t!==e&&t?(t="object"==typeof t?n(t).h:[{rootobj:e,f:t,path:r,s:"#"+i++}],function(t,e,r){if(t===e)return;for(var n=r?void 0:"",o=0;o<e.length;o++){var i=e[o].s;t[i]||(void 0===n&&(n=r.reduce((function(t,e){return t+(t&&".")+e.p}),"")),t[i]=!0,t.push({f:e[o].f,s:e[o].s,path:r,dotpath:n,root:r?r[0].p:void 0}))}}(n(e).h,t,r),e):e}function s(t){if(t===this.obj)return this.prop;for(var e=this.chain,r=0;r<e.length;r++)if(e[r].o===t)return e[r].p;return null}function l(t,e,r,n,o){var i=e.__xs__;if(i&&i.h&&!i.pause)for(var a=i.h,l=0;l<a.length;l++){var c=a[l],u={rootobj:c.rootobj,obj:e,action:t,prop:r,value:n,prev:o,chain:c.path,root:c.root||r,dotpath:c.dotpath||"",path:c.dotpath?c.dotpath+"."+r:r,find:s};c.f.call(e,u)}}function c(t,e){if(void 0===e)return t;if("object"!=typeof e||null===e)return e;var r=Object.prototype.toString.call(e);if("[object RegExp]"===r||"[object Date]"===r||e instanceof Node)return e;if("[object Array]"===r){"[object Array]"!==Object.prototype.toString.call(t)&&(t=[]);var n=[];for(var o in e)o in t||(n[o]=e[o]);for(o in n)t[o]=n[o];return t}for(var i in"object"!=typeof t&&(t={}),e)t[i]=c(t[i],e[i]);return t}function u(t,e,r,n){return Object.defineProperty(t,e,{value:r,enumerable:!1,configurable:!0,writable:!!n}),r}var f={"@":{}};function d(){o=null;var t=f;f={"@":{}};var e=t["@"];for(var r in t["@"]=null,e)e[r]&&e[r].f.call(e[r].o,e[r].o);for(r in t)t[r]&&t[r].f.call(t[r].o,t[r].o)}function h(t,e,r){("@"===t[0]?f["@"]:f)[t]={f:r,o:e},o||(o=setTimeout(d,0))}var p=window.coral=window.coral||{};p.observe=t,p.unobserve=function t(e,r){if(e.__xs__){for(var n=e.__xs__.h,o=n.length-1;o>=0;o--){n[o].f===r&&n.splice(o,1)}for(var i in e)"object"==typeof i&&null!==i&&t(i[e],r)}},p.alias=function(t,e,r,n,o){if(t===r&&e===n)return null;var i=function(r){r.chain&&r.chain.length&&r.chain[0].p===n?(1===r.chain.length&&t[e]!==r.obj&&(t[e]=r.obj),r.chain[0].p=e,o(r),r.chain[0].p=n):r.chain||r.prop!==n||(r.value!==t[e]&&(t[e]=r.value),r.prop=r.path=r.root=e,o(r),r.prop=r.path=r.root=n)};if(r instanceof Node){t[e]=r[n],t.__observer__||p.observe(t);var a=Object.getOwnPropertyDescriptor(t,e);return Object.defineProperty(t,e,{get:function(){return r[n]},set:function(t){return r[n]=t,a.set(t)},enumerable:!0,configurable:!0}),null}n in r||(r[n]=r[n]),p.observe(r,i),t[e]=r[n],p.observe(t);var s=Object.getOwnPropertyDescriptor(r,n),l=s.get,c=s.set;return Object.defineProperty(t,e,{get:l,set:c,enumerable:!0,configurable:!0}),i},p.assign=function(){for(var t=arguments,e=0,r=t[0];++e<t.length;)r=c(r,t[e]);return r},p.tick=h,p.dot=function(t,e){"string"==typeof e&&(e=e.split("."));for(var r=e.length,n=0;n<r;n++){var o=e[n],i=t;if((!(t=i[o])||"object"!=typeof t)&&(n+1<r||!(o in i)))return{last:{obj:i,prop:o}}}return{value:t,obj:i,prop:o}},p.privateprop=u}).call(this)},function(t,e){var r;window.coral.ui=function(t){t=t||{};var e=window.coral,r=document.createRange(),n=0,o={},i=0;const a={"":{update:function(){var t=this.state,r=this.slots||{},n=r[t.dataslot||"default"];if(!n)return"done";if(!t.datasrc)return"done";var o="datactx"in t?this.dot(t.datactx).value:this,a="datasrc"in t?this.dot(t.datasrc).value:this,s=t.genkey;Array.isArray(a)&&0===a.length&&(a=null);var l,c=a&&n||r.empty||{text:"<div> </div>"},u=t.datakey;Array.isArray(a)||(a=[a]),r.header&&this.html(-1,r.header.script?r.header.script(o):r.header.text);for(var f=0;f<a.length;f++){var d=typeof a[f];a[f]&&(l=void 0===u?a[f].__key__:a[f][u]),s&&void 0===l&&"object"===d&&(l=e.privateprop(a[f],"__key__","k"+i++));var h=c.script?c.script(a[f],f,o):c.text;this.html(l||f,h)}r.footer&&this.html(-2,r.footer.script?r.footer(o):r.footer.text)}}};function s(){console.error(arguments)}function l(){throw console.error(arguments),Error("CORAL FAULT")}function c(t,e){return t[e]=t[e]||{},t[e]}function u(t){for(var e=t||document,r=[],n=e.querySelectorAll("[coral]"),o=0;o<n.length;o++)if(n[o].coral)n[o].coral.render_();else{var i=d(n[o],e.coral);h(i,"mount"),i&&i.render_(),r.push(i)}return r}function f(t,e){try{var r=e.getAttribute("type"),n=r.match(/\(([^)]*)\)/);n=n?n[1]:"";var o=e.innerHTML.trim(),i=t.props=t.props||{};if(o)switch(r.split("(")[0].trim()){case"coral-method":c(t,"methods")[e.getAttribute("name")||"default"]=new Function(n,o);break;case"coral-observer":c(t,"observers")[e.getAttribute("name")||"default"]=new Function(n,o);break;case"coral-function":e.coralScript=new Function(n,o);break;case"coral-template":e.coralScript=I(n,o);break;default:var a=r.split("coral-s-")[1];if(a){try{o=JSON.parse(o)}catch(t){}return i[a.trim()]=o,!0}s("unknown coral slot type",r)}}catch(t){s("coral-slot script parsing ERROR:",o||e.type,e,t)}}function d(t,e){if(!t)return null;var r=t.getAttribute("coral");try{var n=function(t){for(var e,r=t.attributes,n=0;n<r.length;n++){var o=r[n],i=o.name+"";if(0===i.indexOf("coral-s")){e=e||{};var a=o.value,s=i[7],l=a.split(s+s);a=l[0],l=l[1];var u=i.substring(8),f=p(u,a);try{a=JSON.parse(a)}catch(t){}f?c(e,"bind")[u]=f:c(e,"props")[u]=a,l&&(c(e,"events")[u]=l)}else if(0===i.indexOf("coral-on-")){var d=i.substring(9);c(e=e||{},"listeners")[d]=o.value}}return e}(t),o=t.cloneNode(!0);if(o&&(n=n||{},o.children))for(var i=0;i<o.children.length;i++){var a=c(n,"slots"),l=o.children[i],u=l.getAttribute,d=u&&u.call(l,"coral-slot")||"default";if("SCRIPT"!==l.nodeName||0!==l.type.indexOf("coral-")||!f(n,l)){var h=a[d]=a[d]||[];h.push(l),h.text=(h.text||"")+(u?l.outerHTML:l.state),"el"in h||(h.el=l),!("script"in h)&&l.coralScript&&(h.script=l.coralScript)}}return v(t,r,n,e)}catch(e){s("UI failed to mount: ",r,t,e)}return null}function h(t,e){return t.lifecycle&&t.lifecycle[e]&&t.lifecycle[e].call(t)}function p(t,e){if("~"!==e[0])return!1;var r=e.split("~");return{prop:r[1],selector:r.length<2?"^":r[2]}}function v(e,r,n,i){n=n||{},a[r]||l("UI NOT registered: ",r);var s=a[r],c=new t.use(r,e,s,n);if(e.setAttribute("coral-stage","mounted"),c.listeners){var u=[],f=c.listeners;for(var d in f){u.push(d);var h=d.split("."),p=h[0];o[p]||(o[p]=_(p),document.addEventListener(p,o[p],!1)),f[p]=f[d],"stop"===f[h[1]]&&(f[p].coralStop=!0)}c.listeners=u}return c}function _(t){return function(e){for(var r,n,o=e.detail&&e.detail.coralEmitRootEl||e.target,i="coral-on-"+t,s=[];o;){if(o.getAttribute){var l=o.getAttribute(i);l||(l=o.getAttribute(i+".stop"))&&(l.stop=!0),l&&s.push(l.trim());var c=o.coral;if(e.coral||(e.coral=c),c&&s.length)for(var u=0;u<s.length;u++){var f=s[u],d=f,h=(n=void 0,(n=d.match(/\(([^)]*)\)/))&&n[1]||"");if(h){h=h.split(","),d=d.split("(")[0];var p=h.indexOf("$event");p>=0&&(h[p]=e)}var v,_=c.dot(d);if(void 0!==_.value&&(m(_.value)?v=_.value.apply(_.obj,h||[e]):c.dot(d,h[0]),"stop"===v||f.stop))return}var b=c&&c.name;if(a[b]&&(r=a[b]).listeners&&r.listeners[t]&&("stop"===r.listeners[t].call(c,e)||r.listeners[t].coralStop))return}o=o.parentNode}}}function m(t){return!!(t&&t.constructor&&t.call&&t.apply)}function b(t,e){if(!Array.isArray(t))return t;for(var r={},n=0;n<t.length;n++)r[t[n]]=arguments.length<=1||e;return r}function g(t,r,n,o){for(var i=0;i<r.length;i++){var a=r[i];void 0!==(a in o?o[a]:n[a])&&(t[a]=e.assign({},n[a],o[a]))}}function y(t,r,o,i){o=o||{},i=i||{};var s=this.__={};g(s,["update","bind"],o,i),g(this,["methods","observers","listeners","data","mutate","lifecycle"],o,i),"shared"in o&&(this.shared=o.shared),(o.events||i.events)&&(s.events=e.assign({},b(o.events),i.events)),(o.decorators||i.decorators)&&(s.decorators=e.assign({},b(o.decorators),b(i.decorators))),(o.slots||i.slots)&&e.assign(c(this,"slots"),o.slots,i.slots),"super"in o&&(this.super=a[o.super]);var l=this.methods;if(l)for(var u in l)l[u]=m(l[u])?l[u].bind(this):l[u];this.name=t,this.rootEl=r,r.coral=this,s.obsf=y.prototype.react.bind(this);var f=this.state=e.observe({},s.obsf);for(u in e.assign(f,s.decorators,o.state,i.props),s.bind)A(this,"state."+u,s.bind[u].selector,s.bind[u].prop);return e.observe(f),this.sym="$"+n++,this}function N(t){var e="";for(var r in t)e+=":xs:"+r+"\n";return e}function x(t,e,r){var n=this,o=c(this.__,"xhrc");o[t]&&o[t].abort();var i=(r=r||{}).xhr||new XMLHttpRequest;i.onerror=function(t){console.log("CORAL HTTP LOAD FAIL",t,e),P(n.rootEl,"coralLoadDataFail",{url:e,xhr:i,err:t})},i.onload=function(e){if(4===i.readyState)if(delete o[t],this.status>=200&&this.status<300){var a=this.response;try{a=JSON.parse(a)}catch(t){}r.sanitize&&(a=B(a)),n.dot(t,a)}else this.status&&i.onerror(e)},o[t]=i,i.open(r.method||"GET",e,!0);var a=r.body;for(var s in r.headers||{})i.setRequestHeader(s,r.headers[s]);return i.send(a?"string"==typeof a?"":JSON.stringify(a):null),i}function j(t,e){var r=this,n=c(this.__,"htmc");if("loading"!==document.readyState){var o=document.createElement("script");o.src=e,document.getElementsByTagName("head")[0].appendChild(o)}else document.write('<script src="'+e+'"></script'),o=(o=document.getElementsByTagName("script"))[o.length-1];var i=n[t]=(n[t]||0)+1;return o.onerror=function(t){console.log("CORAL SCRIPT LOAD",t),o.parentNode.removeChild(o),P(r.rootEl,"coralLoadHTMLFail",{url:e,script:o,err:t})},o.coralCB=function(e){n[t]===i&&r.dot(t,e)},document.currentScript||(window.rf_script=o),o}function E(t,r){var n=r.split("."),o=e.dot(t,n);if(o.obj)return o;for(var i=n,a=t,s=0;s<i.length;s++){var l=a[i[s]];null!=l&&"object"==typeof l||(a[i[s]]=s==i.length-1?void 0:{}),a=a[i[s]]}return e.dot(t,n)}function w(t){var e=t&&t.getRootNode();return e&&e!==document&&"#document-fragment"!==e.nodeName}function A(t,r,o,i,a,s){var u,f;o=o||"^";var d=c(t.__,"bind"),h=c(d,r);if(i=i||r,s||h.proppath!==r||h.selector!==o||h.prop!==i||h.copy){switch(o[0]){case"^":(u=function(t,e){for(var r=t&&t.rootEl;t&&r;){if(0==e--)return t;do{r=r.parentNode}while(r&&!r.coral);t=r.coral}return null}(t,0|o.substring(1)))||l("unable to find parent to state bind",t,r),f=E(u,i);break;case"#":case".":case"[":var p=(a||document).querySelector(o);(u=p&&p.coral)||l("unable to locate coral for bind"),f=E(u,i);break;default:var v=o.split("$");switch(d[r]={proppath:r,selector:o,prop:i},v[1]){case"data":case"html":case"json-raw":x.call(t,r,v[2],a);break;case"json":x.call(t,r,v[2],e.assign({sanitize:!0},a||{}));break;case"jsonp":v[2]=function(t,e,r){if(t.indexOf("{JSONP}")<0)return t;var o="jsonp_rf_"+n++;return window[o]=function(t){e.dot(r,t),delete window[o]},t.replace("{JSONP}",o)}(v[2],t,r);case"js":j.call(t,r,v[2]);break;default:l("unknown data bind: "+r+": "+o)}if(f=E(t,i),i===r)return}var _=E(t,r);if(_.obj||l("state bind not found: "+r),h.copy)_.obj[_.prop]=f.obj[f.prop];else{f.obj!==u.state&&e.observe(u.state,(function(e){d[r].copy||w(t.rootEl)||"set"==e.action&&6===i.indexOf(e.path)&&(d[r].copy=!0,A(t,r,o,i,a),d[r].copy=!1)}));var m=e.alias(_.obj,_.prop,f.obj,f.prop,(function(e){w(t.rootEl)?t.unmount():t.react(e)}));d[r]={proppath:r,selector:o,prop:i,sp:f,unobs:m}}}}function S(){if(this===this.rootEl.coral){h(this,"beforeRender");var t=this.rootEl;if(w(t))this.unmount();else{var e=this.__.update;if(e){var r=this.__.fcounter;r&&this.htmlBegin(),r=this.__.fcounter;var n=e.call(this,this.slots)||"";this.__.harr?this.htmlEnd():("string"==typeof n?"done"!==n&&(t.innerHTML=n):(t.innerHTML="",Array.isArray(n)?n.forEach((function(e){t.appendChild(e)})):t.appendChild(n)),u(t))}h(this,"afterRender")}}}function O(){if(0!==this.__.renderflag){var t=function(t){var e=document.activeElement;if(e)for(var r=e.selectionStart,n=e.selectionEnd,o=[];e&&e!==t&&e.parentNode;)o.push((i=e,[].indexOf.call(i.parentNode.childNodes,i))),e=e.parentNode;var i;return function(){if(e){for(e=t;e&&o.length;){var i=o.pop();e=e.childNodes[i]}if(e){e.focus&&e.focus();try{e.selectionStart=r,e.selectionEnd=n}catch(t){}}}}}(this.rootEl);S.call(this),t(),this.__.renderflag=0}}function T(t){switch(t.nodeName){case"TABLE":return t.childNodes&&t.childNodes[0]||t;default:return t}}function C(t){if(!t)return 0;for(var e=0,r=t.length,n=0;n<r;n++)e=31*e+t.charCodeAt(n),e&=e;return e}y.prototype.unmount=function(){h(this,"umnount");var t=this.__||{};if(e.unobserve(this.state,t.obsf),t.bind)for(var r in t.bind){var n=t.bind[r];n.obsf&&e.unobserve(n.sp.obj,n.obsf)}},y.prototype.react=function(t){t.coral=this;var e,r=this.__,n=t.root,o=this.observers,i=r.events,a=r.proprx=r.proprx||(o?N(o):"")+(i?N(i):"");if(a){var s="(:xs:(("+t.path.replace(/\./g,"\\.)|(\\*\\.))*((")+")|(\\*)))\n",l=new RegExp(s,"g"),c=a.match(l);if(c){for(var u=c[0],f=1;f<c.length;f++)c[f].length>u.length&&(u=c[f]);n=u.substring(4,u.length-1)}}var d,h=o&&o[n];if(h)if(m(h))e=h.call(this,t);else if(!t.path&&("set"===t.action||"add"===t.action)){var p=this.dot(h);m(p.value)?p.value.call(this):p.obj[p.prop]=t.value}if(i&&i[n]){var v=r.name+"."+(!0===i[n]?n:i[n]);P(this.rootEl,v,t)}if(t.value!==t.prev){this.mutate&&(d=this.mutate.call(this,t));var _=r.decorators;this.sym&&("done"===e||"done"===d||_&&(_[n]||_[u])||this.rerender())}},y.prototype.observe=function(t,e){c(this,"observers")[t]=e,this.__.obsrx=null},y.prototype.decorate=function(t,e){c(this,"decorators")[t]=!1!==e&&0!==e},y.prototype.events=function(t,e){c(this.__,"events")[t]=!1!==e&&0!==e&&e,this.__.evrx=null},y.prototype.watch=function(t,e){this.state[t]=e,this.state.__observe__()},y.prototype.bind=function(t,e,r,n){A(this,t,e,r,n,!0)},y.prototype.emit=function(t,e){P(this.rootEl,t,e)},y.prototype.render_=S,y.prototype.render=function(){e.tick(this.sym+"_rr",this,S)},y.prototype.rerender=function(){this.__.renderflag=(this.__.renderflag||0)+1,e.tick(this.sym+"_rr",this,O,!0)},y.prototype.htmlBegin=function(t){this.__.harr&&!t&&this.__.hroot===this.rootEl||(this.__.hmap={},this.__.hgeneration=-1),this.__.hroot=this.rootEl,this.__.harr=[],this.__.harr.html="",this.__.harr.htmlIdx=0,this.__.harr.wmap=new WeakMap,this.__.hgeneration++,this.__.fcounter=0};const L={INPUT:!0,TEXTAREA:!0};function k(t,e){if(!t)return e;if(!e)return e;if(e.coral){t.coral;t.coral=e.coral,t.coral.rootEl=t}else t.coral=null;if(3===t.nodeType&&3===e.nodeType)return t.nodeValue=e.nodeValue,t;if(t.nodeName!==e.nodeName||!function(t,e){var r,n={},o=e.attributes,i=o.length;L[t.nodeName]&&t.value!==e.value&&(t.value=e.value);for(var a=0;a<i;a++)n[(r=o[a]).name]=!0,t.getAttribute(r.name)!==r.value&&t.setAttribute(r.name,r.value);var s=t.attributes,l=s.length;if(l===i)return!0;for(a=l-1;a>=0;a--)n[(r=s[a]).name]||t.removeAttribute(r.name);return!0}(t,e))return t.parentNode.replaceChild(e,t),e;var r=t.childNodes,n=e.childNodes;if(r.length||n.length){for(var o,i=o=Math.min(r.length,n.length);i<r.length;)t.removeChild(r[o]);for(;i<n.length;)t.appendChild(n[o]);for(;--o>=0;){var a=r[o],s=n[o];3!==a.nodeType||3!==s.nodeType?a.isEqualNode(s)||a.nodeName===s.nodeName&&k(a,s)||t.replaceChild(s,a):a.nodeValue!==s.nodeValue&&(a.nodeValue=s.nodeValue)}}return t}function R(t,e){r.selectNode(t);var n=r.createContextualFragment(e);return"TBODY"===t.nodeName?n.childNodes[0]:n}var M;function B(t){if("object"==typeof t){for(var e in t)switch(typeof t[e]){case"string":case"object":t[e]=t[e]?B(t[e]):t[e]}return t}return(M=M||document.createElement("div")).textContent=t,M.innerHTML}function P(t,e,r){r=r||{},(t=function t(e,r){return"string"!=typeof e?e:t(r||document).querySelector(e)}(t))&&(r.coralEmitRootEl=t),document.dispatchEvent(new CustomEvent(e,{detail:r}))}function H(t){"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?t():document.addEventListener("DOMContentLoaded",t)}y.prototype.htmlUpdate=function(t,e,r){var n=this.__.hmap;if(n){var o=C(r);if((e=null==e?o:e)in n||l("updating non-existent element"),n[e].hsh!==o||t!==n[e].idx){var i=T(this.rootEl),a=n[e].el;a.getAttribute?(n[e].el=k(i.childNodes[t],R(i,r).firstChild),n[e].hsh=o,n[e].idx=t):a.nodeValue!==r&&(a.nodeValue=r)}}},y.prototype.htmlEnd=function(){var t=this.__,e=t.hgeneration,r=this.__.fcounter,n=null;if(0===r)return this.htmlBegin(!0),void(this.rootEl.innerHTML="");0===e&&(this.rootEl.innerHTML="");var o=t.harr,i=t.hmap,a="";if(o){for(var s in i){var l=i[s];l.generation!==e&&(l.el&&l.el.parentNode.removeChild(l.el),delete i[s])}var c=T(this.rootEl),f=document.createElement(c.nodeName);o.html&&(u(f=R(c,o.html)),o.html="");for(var d=0,h=0;h<r;h++){var p=(l=o[h]).el,v=l.h;if("number"==typeof v){var _=f.childNodes[l.h-d];(_=k(p,_))!==p&&(l.el=p=_,d++)}else v&&(h>=c.childNodes.length?a+=v:l.el=p=R(c,v).firstChild);l.idx=h,l.h="",p&&(l.el=p,o.wmap.set(p,h),p.parentNode===c&&p.previousSibling===n||(n?c.insertBefore(p,n.nextSibling):c.childNodes&&c.childNodes[0]===p||c.insertBefore(p,c.childNodes&&c.childNodes[0])),n=p)}o.length=r;var m=c.childNodes.length;for(a&&(c.insertAdjacentHTML("beforeend",a),u(c)),(c=T(this.rootEl))&&o.length!==c.childNodes.length&&console.error("inconsistent count - must be 1 html() entity for hmtl()"),h=m;h<o.length;h++)o[h].el=c.childNodes[h],o.wmap.set(o[h].el,h);return"done"}},y.prototype.htmlFromIdx=function(t){return T(this.rootEl).childNodes[t]},y.prototype.htmlChild=function(t){for(;t.parentNode!==this.rootEl;)t=t.parentNode;return t},y.prototype.htmlToIdx=function(t){for(;t.parentNode!==this.rootEl;)t=t.parentNode;var e=this.__.harr.wmap.get(t);return void 0===e?-1:e},y.prototype.html=function(t,e){this.__.harr||this.htmlBegin();var r,n=this.__,o=n.harr,i=n.hmap,a=n.fcounter++,s=n.hgeneration,c=C(e);if(i[t=null==t?c:t]){if((r=i[t]).generation===s&&l("duplicate html() id"),r.generation=s,o[a]=r,r.el&&!r.el.parentNode&&(r.el=null),r.el&&r.hsh===c)return;r.h=o.htmlIdx++,o.html+=e,r.hsh=c}else r={h:e,hsh:c,idx:a,id:t,generation:s,el:null},o.splice(a,0,r),i[t]=r},y.prototype.dot=function(t,r){var n=e.dot(this,t);if(arguments.length>1){if(!n.obj)throw Error("chain path missing");n.obj[n.prop]=r}return n},y.prototype.styleBag=function(t,e){var r=t instanceof Node?t:this.rootEl;r===this.rootEl&&(e=t);var n=C(JSON.stringify(e));if(r.__xs__style!==n){for(var o in e)r.style[o]=e[o];r.__xs__style=n}},t.autorun&&H((function(){u()})),t.use=t.use||y;var I=document.currentScript?function(t,e){return new Function(t,"return `"+e+"`;")}:function(t,e){return e=e.split("\n").join("\\\n").replace(/"/g,'\\"'),new Function(t,'var f=function (_, exp) {return eval(exp)}; f.bind(this); return "'+e+'".replace(/\\${(.*?)}/g, f)')};return{register:function(t,r,n){var o="*"===t[0]?t.substring(1):t;if(n=n||"",r.state=b(r.state,void 0),!a[o])return a[n]||l("Super Coral NOT registered: "+n),a[o]=e.assign({},a[n],r),a[o].name=o,a[o].super=n,!0;t===o&&l("UI already registered: "+o)},mount:v,run:u,template:I,hydrate:R,ready:H,emit:P,sanitize:B,styleBag:y.prototype.styleBag,registry:function(t){return t?a[t]:a},find:function(t,e){return(t=this.findAll(t,e))?t[0]:null},findAll:function(t,e){var r=0;if(t=[].slice.call((e||document).querySelectorAll(t)))for(var n=0;n<t.length;n++)t[r]=t[n].coral,r+=t[r]?1:0;return r?(t.length=r,t):null}}}({autorun:!0}),(r=window.coral=window.coral||{}).ui=r.ui||{},r.ui.loadScript=function(t,e){if(document.querySelector('script[url="'+t+'"]'))e&&e(!0);else{var r=document.createElement("script");r.src=t,r.setAttribute("url",t),r.onload=function(){e(!1)},document.getElementsByTagName("head")[0].appendChild(r)}},r.ui.clientSideInclude=function(t){var e;(e=t)&&e.constructor&&e.call&&e.apply&&(t=t.toString().split("\n").slice(1,-1).join("\n"));var r=document.currentScript||window.rf_script;r||(r=(r=document.getElementsByTagName("script"))[r.length-1]),window.rf_script&&(window.rf_script=null);var n=r.coralCB;void 0===n?r.outerHTML=t:n(t),r.parentNode&&r.parentNode.removeChild(r)}},,function(t,e,r){r(0),t.exports=r(1)}]);
//# sourceMappingURL=coral-ui-min.js.map