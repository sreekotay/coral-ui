!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t){(function(){function e(r,o,i,s){if(!(r instanceof Node)&&(!r&&this.__xs__&&(r=this),r)){var u=!!r.__xs__;i&&(s=s&&s.concat()||[]).push(i),o=a(o,r,s);var f=n(r);if(!f.skip){var h=f.v;for(var d in h)d in r||(delete h[d],l("delete",r,d,null,null));for(d in r)u&&!(d in h)&&l("add",r,d,r[d],null),t(r,d,o,s);return Array.isArray(r)&&function(t,r){if(t.__xs__.arrhelpers)return;t.__xs__.arrhelpers=!0;for(var n=function(r){c(t,r,(function(){var t=this,n=t.__xs__;n.pause=!0;var o=Array.prototype[r].apply(t,arguments);return n.pause=!1,p(n.s,t,(function(){e(t)})),l(r,t,arguments,t,null),o}))},o=["pop","push","shift","unshift","splice","reverse","sort"],i=0;i<o.length;i++)n(o[i])}(r),r.__observe__||void 0!==s||void 0!==i||c(r,"__observe__",e),r}}}function t(t,r,o,i){var s=n(t),u=s.v;o!==t&&(o=a(o,t));var c=t[r];if(!(r in u)){u[r]=c;Object.defineProperty(t,r,{get:function(){return u[r]},set:function(n){var a=u[r];return u[r]=n,"object"!=typeof n||null===n||n.__xs__||p(s.s,t,(function(){e(n,o,{o:t,p:r},i)}),!0),l("set",t,r,n,a),n},enumerable:!0,configurable:!0})}"object"==typeof c&&e(c,o,{o:t,p:r},i)}var r=0;function n(e){e.__xs__||c(e,"__xs__",{s:"@"+r++,v:{},h:[]});return e.__xs__}var o,i=0;function a(e,t,r){return e!==t&&e?(e="object"==typeof e?n(e).h:[{rootobj:t,f:e,path:r,s:"#"+i++}],function(e,t,r){if(e===t)return;for(var n=r?void 0:"",o=0;o<t.length;o++){var i=t[o].s;e[i]||(void 0===n&&(n=r.reduce((function(e,t){return e+(e&&".")+t.p}),"")),e[i]=!0,e.push({f:t[o].f,s:t[o].s,path:r,dotpath:n,root:r?r[0].p:void 0}))}}(n(t).h,e,r),t):t}function s(e){if(e===this.obj)return this.prop;for(var t=this.chain,r=0;r<t.length;r++)if(t[r].o===e)return t[r].p;return null}function l(e,t,r,n,o){var i=t.__xs__;if(i&&i.h&&!i.pause)for(var a=i.h,l=0;l<a.length;l++){var u=a[l],c={rootobj:u.rootobj,obj:t,action:e,prop:r,value:n,prev:o,chain:u.path,root:u.root||r,path:u.dotpath?u.dotpath+"."+r:r,find:s};u.f.call(t,c)}}function u(e,t){if(void 0===t)return e;if("object"!=typeof t||null===t)return t;var r=Object.prototype.toString.call(t);if("[object RegExp]"===r||"[object Date]"===r||t instanceof Node)return t;if("[object Array]"===r){"[object Array]"!==Object.prototype.toString.call(e)&&(e=[]);var n=[];for(var o in t)o in e||(n[o]=t[o]);for(o in n)e[o]=n[o];return e}for(var i in"object"!=typeof e&&(e={}),t)e[i]=u(e[i],t[i]);return e}function c(e,t,r,n){return Object.defineProperty(e,t,{value:r,enumerable:!1,configurable:!0,writable:!!n}),r}var f={"@":{}};function h(){o=null;var e=f;f={"@":{}};var t=e["@"];for(var r in e["@"]=null,t)t[r]&&t[r].f.call(t[r].o,t[r].o);for(r in e)e[r]&&e[r].f.call(e[r].o,e[r].o)}function p(e,t,r,n){var i;return i="@"===e[0]?f["@"]:f,o?(e in i||n?i[e]={f:r,o:t}:(r.call(t,t),i[e]=null),!1):(n?i[e]={f:r,o:t}:r.call(t,t),o=setTimeout(h,0),!0)}var d=window;d.xs=d.xs||{},d.xs.observe=e,d.xs.unobserve=function e(t,r){if(t.__xs__){for(var n=t.__xs__.h,o=n.length-1;o>=0;o--){n[o].f===r&&n.splice(o,1)}for(var i in t)"object"==typeof i&&null!==i&&e(i[t],r)}},d.xs.alias=function(e,t,r,n,o){var i=function(r){r.chain&&r.chain.length&&r.chain[0].p===n?(1===r.chain.length&&e[t]!==r.obj&&(e[t]=r.obj),r.chain[0].p=t,o(r),r.chain[0].p=n):r.chain||r.prop!==n||(r.value!==e[t]&&(e[t]=r.value),r.prop=r.path=r.root=t,o(r),r.prop=r.path=r.root=n)};if(r instanceof Node){t in e||(e[t]=e[t]),e.__observer__||xs.observe(e);var a=Object.getOwnPropertyDescriptor(e,t);return Object.defineProperty(e,t,{get:function(){return r[n]},set:function(e){return r[n]=e,a.set(e)},enumerable:!0,configurable:!0}),null}n in r||(r[n]=r[n]),xs.observe(r,i),e[t]=r[n],xs.observe(e);var s=Object.getOwnPropertyDescriptor(r,n),l=s.get,u=s.set;return Object.defineProperty(e,t,{get:l,set:u,enumerable:!0,configurable:!0}),i},d.xs.assign=function(){for(var e=arguments,t=0,r=e[0];++t<e.length;)r=u(r,e[t]);return r},d.xs.clone=function(){for(var e=arguments,t=-1,r={};++t<e.length;)r=u(r,e[t]);return r},d.xs.tick=p,d.xs.privateprop=c}).call(this)},function(e,t,r){!function(){var e=null;window.reeferHTML=function(t){var r;(r=t)&&r.constructor&&r.call&&r.apply&&(t=t.toString().split("\n").slice(1,-1).join("\n"));var n=document.currentScript;n||(n=e),n||(n=(n=document.getElementsByTagName("script"))[n.length-1]),e=null;var o=n.reefCB;void 0===o?n.outerHTML=t:o(t),n.parentNode&&n.parentNode.removeChild(n)}}(),ReeferFactory=function(e){e=e||{};var t=document.createRange(),r=0,n={},o=0;const i={"":{template:function(){var e=this.slots||{};if(e.default){if(!this.data.datasrc)return"done";var t,r=this.data,n="datactx"in r?this.dot(r.datactx).value:{},i="datasrc"in r?this.dot(r.datasrc).value:this,a=this.data.genkey,s=i&&e[r.dataslot||"default"]||e.empty&&e.empty.text||{text:"<div> </div>"},l=r.datakey;Array.isArray(i)||(i=[i]),e.header&&this.html(-1,e.header.script?e.header(n):e.header.text);var u=this.__.hmap||{};n.__hmap__=u;for(var c=0;c<i.length;c++){var f=typeof i[c];i[c]&&(t=void 0===l?i[c].__key__:i[c][l]),a&&void 0===t&&"object"===f&&(t=xs.privateprop(i[c],"__key__","k"+o++));var h=s.script?s.script(i[c],c,n):s.text;this.html(t||c,h)}delete n.__hmap__,e.footer&&this.html(-2,e.footer.script?e.footer(n):e.footer.text)}}}};function a(){console.error(arguments)}function s(){throw console.error(arguments),Error("REEF FAULT")}function l(e,t){return e[t]=e[t]||{},e[t]}function u(e){for(var t=e||document,r=[],n=t.querySelectorAll(":not([reef-stage])[reef]"),o=0;o<n.length;o++)if(!n[o].reef){var i=c(n[o],t.reef);f(i,"mount"),i&&i.render_(),r.push(i)}return r}function c(e,t){if(!e)return null;var r=e.getAttribute("reef");try{var n=function(e){for(var t,r=e.attributes,n=0;n<r.length;n++){var o=r[n],i=o.name+"";if(0===i.indexOf("reef-p")){t=t||{};var a=o.value,s=i[6],u=a.split(s+s);a=u[0],u=u[1];var c=i.substring(7),f=h(c,a);try{a=JSON.parse(a)}catch(e){}f?l(t,"bind")[c]=f:l(t,"props")[c]=a,u&&(l(t,"events")[c]=u)}else if(0===i.indexOf("reef@")){var p=i.substring(5);l(t=t||{},"listeners")[p]=o.value}}return t}(e),o=e.cloneNode(!0);if(o&&(n=n||{},o.children))for(var i=0;i<o.children.length;i++){var s=l(n,"slots"),u=o.children[i],c=u.getAttribute,f=c&&c.call(u,"reef-slot")||"default",d=s[f]=s[f]||[];if(d.push(u),d.text=(d.text||"")+(c?u.outerHTML:u.data),"SCRIPT"===u.nodeName&&0===u.type.indexOf("reef-")){try{var v=u.getAttribute("type"),_=v.match(/\(([^)]*)\)/);_=_?_[1]:"";var m=u.innerHTML.trim();if(m)switch(v.split("(")[0].trim()){case"reef-function":u.reefScript=new Function(_,m);break;case"reef-template":u.reefScript=B(_,m);break;default:a("unknown reef slot type")}}catch(e){a("reef-slot script parsing ERROR:",m||u.type,u,e)}"el"in d||(d.el=u),!("script"in d)&&u.reefScript&&(d.script=u.reefScript)}}return p(e,r,n,t)}catch(t){a("Reefer failed to mount: ",r,e,t)}return null}function f(e,t){return e.lifecycle&&e.lifecycle[t]&&e.lifecycle[t].call(e)}function h(e,t){if("~"!==t[0])return!1;var r=t.split("~");return{prop:r[1],selector:r.length<2?"^":r[2]}}function p(t,r,o,a){o=o||{},i[r]||s("Reefer NOT registered: ",r);var l=i[r],u=t.reef=new e.use(t,l,o);if(u.name=r,t.setAttribute("reef-stage","mounted"),u.listeners){var c=u.listeners;for(var f in c){var h=f.split("@"),p=h[0];n[p]||(n[p]=d(p),document.addEventListener(p,n[p],!1)),c[p]=c[f],"stop"===c[h[1]]&&(c[p].reefStop=!0)}u.listeners=null}return u}function d(e){return function(t){for(var r,n,o=t.detail&&t.detail.reefEmitRootEl||t.target,a="reef@"+e,s=[];o;){var l=o.getAttribute&&o.getAttribute(a);l&&(l=l.split("@"),s.push(l));var u=o.reef;if(t.reef||(t.reef=u),u&&s.length)for(var c=0;c<s.length;c++){var f=s[c],h=f[0].trim(),p=(n=void 0,(n=h.match(/\(([^)]*)\)/))&&n[1]||"");if(p){p=p.split(","),h=h.split("(")[0];var d=p.indexOf("$event");d>=0&&(p[d]=t)}var _,m=u.dot(h);if(void 0!==m.value&&(v(m.value)?_=m.value.apply(m.obj,p||[t]):u.dot(h,p[0]),"stop"===_||"stop"===f[1]))return}var g=u&&u.name;if(i[g]&&(r=i[g]).listeners&&r.listeners[e]&&("stop"===r.listeners[e].call(u,t)||r.listeners[e].reefStop))return;o=o.parentNode}}}function v(e){return!!(e&&e.constructor&&e.call&&e.apply)}function _(e,t){if(!Array.isArray(e))return e;for(var r={},n=0;n<e.length;n++)r[e[n]]=arguments.length<=1||t;return r}function m(e,t,r,n){for(var o=0;o<t.length;o++){var i=t[o];void 0!==(i in n?n[i]:r[i])&&(e[i]=xs.clone(r[i],n[i]))}}function g(e,t,n){t=t||{},n=n||{};var o=this.__={};m(o,["template","update","bind"],t,n),m(this,["methods","observers","listeners","mutate","lifecycle"],t,n),"shared"in t&&(this.shared=t.shared),(t.events||n.events)&&(o.events=xs.assign({},_(t.events),n.events)),(t.decorators||n.decorators)&&(o.decorators=xs.assign({},_(t.decorators),_(n.decorators))),(t.slots||n.slots)&&xs.assign(l(this,"slots"),t.slots,n.slots),"super"in t&&(this.super=i[t.super]);var a=this.methods;if(a)for(var s in a)a[s]=v(a[s])?a[s].bind(this):a[s];this.rootEl=e,o.obsf=g.prototype.react.bind(this);var u=this.data=xs.observe({},o.obsf);for(s in xs.assign(u,o.decorators,t.data,n.props),o.bind)E(this,"data."+s,o.bind[s].selector,o.bind[s].prop);return xs.observe(u),this.sym="$"+r++,this}function b(e){var t="";for(var r in e)t+=":xs:"+r+"\n";return t}function y(e,t,r){var n=this,o=(r=r||{}).xhr||new XMLHttpRequest;return o.onerror=function(e){console.log("REEF HTTP LOAD",e),M(n.rootEl,"reefLoadDataFail",{url:t})},o.onload=function(t){if(200===this.status){var i=this.response;try{i=JSON.parse(i)}catch(e){}r.sanitize&&(i=C(i)),n.dot(e,i)}else this.status&&o.onerror(t)},o.open(r.method||"GET",t,!0),o.send(null),o}function x(e,t){var r=this;if("loading"!==document.readyState){var n=document.createElement("script");n.src=t,document.getElementsByTagName("head")[0].appendChild(n)}else document.write('<script src="'+t+'"></script'),n=(n=document.getElementsByTagName("script"))[n.length-1];return n.onerror=function(e){console.log("REEF SCRIPT LOAD",e),n.parentNode.removeChild(n),M(r.rootEl,"reefLoadHTMLFail",{url:t})},n.reefCB=function(t){r.dot(e,t)},rf_script=n,n}function j(e,t){var r=t.split(".");if(sp=R(e,r),sp.obj)return sp;for(var n=t.split("."),o=e,i=0;i<n.length;i++){var a=o[n[i]];null!=a&&"object"==typeof a||(o[n[i]]=i==n.length-1?void 0:{}),o=o[n[i]]}return R(e,r)}function E(e,t,r,n,o){var i,a;r=r||"^";var u=l(e.__,"bind"),c=l(u,t);if(n=n||t,c.proppath!==t||c.selector!==r||c.prop!==n){switch(r[0]){case"^":a=j(e,n);break;case"#":case".":case"[":var f=(o||document).querySelector(r);(i=f&&f.reef)||s("unable to locate reef for bind"),a=j(i,n);break;case"$":f=r.split(":")[0];var h=r.substring(6);switch(u[t]={proppath:t,selector:r,prop:n},f){case"$json":return y.call(e,t,h,{sanitize:!0});case"$json-raw":return y.call(e,t,h);case"$html":return x.call(e,t,h)}default:s("unknown data bind: "+t+": "+r)}var p=R(e,t);p.obj||s("data bind not found: "+t);var d=xs.alias(p.obj,p.prop,a.obj,a.prop,(function(t){e.rootEl&&e.rootEl.getRootNode()===document?e.react(t):e.unmount()}));u[t]={proppath:t,selector:r,prop:n,sp:a,unobs:d}}}function N(){f(this,"beforeRender");var e=new Date,t=this.rootEl;if(t&&t.getRootNode()===document){var r=this.__.template;if(r){var n=this.__.fcounter;n&&this.htmlBegin(),n=this.__.fcounter;var o=r.call(this,this.slots)||"";this.__.harr?this.htmlEnd():"string"==typeof o?"done"!==o&&(t.innerHTML=o):(t.innerHTML="",Array.isArray(o)?o.forEach((function(e){t.appendChild(e)})):t.appendChild(o)),t.parentNode.classList.contains("container")&&(t=t),u(t),t.parentNode.classList.contains("container")&&console.log("render",new Date-e)}f(this,"afterRender")}else this.unmount()}function w(){if(0!==this.__.renderflag){var e=function(e){var t=document.activeElement;if(t)for(var r=t.selectionStart,n=t.selectionEnd,o=[];t&&t!==e&&t.parentNode;)o.push((i=t,[].indexOf.call(i.parentNode.childNodes,i))),t=t.parentNode;var i;return function(){if(t){for(t=e;t&&o.length;){var i=o.pop();t=t.childNodes[i]}if(t){t.focus&&t.focus();try{t.selectionStart=r,t.selectionEnd=n}catch(e){}}}}}(this.rootEl);N.call(this),e(),this.__.renderflag=0}}function S(e){switch(e.nodeName){case"TABLE":return e.childNodes&&e.childNodes[0]||e;default:return e}}function O(e){for(var t=0,r=e.length,n=0;n<r;n++){t=(t<<5)-t+e.charCodeAt(n),t|=0}return t}function A(e,t){return e.parentNode.replaceChild(t,e),t}function T(e,r){t.selectNode(e);var n=t.createContextualFragment(r);return"TBODY"===e.nodeName?n.childNodes[0]:n}function R(e,t){"string"==typeof t&&(t=t.split("."));for(var r=t.length,n=0;n<r;n++){var o=t[n],i=e;if((!(e=i[o])||"object"!=typeof e)&&n+1<r)return{last:{obj:i,prop:o}}}return{value:e,obj:i,prop:o}}var L;function C(e){if("object"==typeof e){for(var t in e)switch(typeof e[t]){case"string":case"object":e[t]=e[t]?C(e[t]):e[t]}return e}return(L=L||document.createElement("div")).textContent=e,L.innerHTML}function M(e,t,r){r=r||{},(e=function e(t,r){return"string"!=typeof t?t:e(r||document).querySelector(t)}(e))&&(r.reefEmitRootEl=e),document.dispatchEvent(new CustomEvent(t,{detail:r}))}function k(e){"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?e():document.addEventListener("DOMContentLoaded",e)}g.prototype.unmount=function(){f(this,"umnount");var e=this.__||{};if(xs.unobserve(this.data,e.obsf),e.bind)for(var t in e.bind){var r=e.bind[t];r.obsf&&xs.unobserve(r.sp.obj,r.obsf)}},g.prototype.react=function(e){e.reef=this;var t,r=this.__,n=e.root,o=this.observers,i=r.events,a=r.proprx=r.proprx||(o?b(o):"")+(i?b(i):"");if(a){var s="(:xs:(("+e.path.replace(/\./g,"\\.)|(\\*\\.))*((")+")|(\\*)))\n",l=new RegExp(s,"g"),u=a.match(l);if(u){for(var c=u[0],f=1;f<u.length;f++)u[f].length>c.length&&(c=u[f]);n=c.substring(4,c.length-1)}}var h,p=o&&o[n];if(p)if(v(p))t=p.call(this,e);else if(!e.path&&("set"===e.action||"add"===e.action)){var d=this.dot(p);v(d.value)?d.value.call(this):d.obj[d.prop]=e.value}if(i&&i[n]){var _=r.name+"."+(!0===i[n]?n:i[n]);M(this.rootEl,_,e)}if(e.value!==e.prev){this.mutate&&(h=this.mutate(this,e));var m=r.decorators;this.sym&&("done"===t||"done"===h||m&&(m[n]||m[c])||this.rerender())}},g.prototype.observe=function(e,t){l(this,"observers")[e]=t,this.__.obsrx=null},g.prototype.decorate=function(e,t){l(this,"decorators")[e]=!1!==t&&0!==t},g.prototype.events=function(e,t){l(this.__,"events")[e]=!1!==t&&0!==t&&t,this.__.evrx=null},g.prototype.watch=function(e,t){this.data[e]=t,this.data.__observe__()},g.prototype.bind=function(e,t,r,n){E(this,e,t,r,n)},g.prototype.emit=function(e,t){M(this.rootEl,e,t)},g.prototype.render_=N,g.prototype.render=function(){xs.tick(this.sym+"_rr",this,N)},g.prototype.rerender=function(){this.__.renderflag=(this.__.renderflag||0)+1,xs.tick(this.sym+"_rr",this,w,!0)},g.prototype.htmlBegin=function(e){this.__.harr&&!e||(this.__.hmap={},this.__.hgeneration=-1),this.__.harr=[],this.__.harr.html="",this.__.harr.htmlIdx=0,this.__.harr.wmap=new WeakMap,this.__.hgeneration++,this.__.fcounter=0},g.prototype.htmlUpdate=function(e,t,r){var n=this.__.hmap;if(n){var o=O(r);if((t=null==t?o:t)in n||s("updating non-existent element"),n[t].hsh!==o||e!==n[t].idx){var i=S(this.rootEl),a=n[t].el;a.getAttribute?(n[t].el=A(i.childNodes[e],T(i,r).firstChild),n[t].hsh=o,n[t].idx=e):a.nodeValue!==r&&(a.nodeValue=r)}}},g.prototype.htmlEnd=function(){var e=this.__,t=e.hgeneration,r="",n=e.harr,o=e.hmap;if(n){var i=this.__.fcounter,a=null;if(0===i)return this.htmlBegin(!0),void(this.rootEl.innerHTML="");for(var s in 0===t&&(this.rootEl.innerHTML=""),o){var l=o[s];l.generation!==t&&(l.el&&l.el.parentNode.removeChild(l.el),delete o[s])}var u=S(this.rootEl),c=document.createElement(u.nodeName);n.html&&(c=T(u,n.html),n.html="");for(var f=0,h=0;h<i;h++){var p=(l=n[h]).el,d=l.h;if("number"==typeof d){var v=c.childNodes[l.h-f];(v=A(p,v))!==p&&(l.el=p=v,f++)}else d&&(h>=u.childNodes.length?r+=d:l.el=p=T(u,d).firstChild);l.idx=h,l.h="",p&&(l.el=p,n.wmap.set(p,h),p.parentNode===u&&p.previousSibling===a||(a?u.insertBefore(p,a.nextSibling):u.childNodes&&u.childNodes[0]===p||u.insertBefore(p,u.childNodes&&u.childNodes[0])),a=p)}n.length=i;var _=u.childNodes.length;for(r&&u.insertAdjacentHTML("beforeend",r),(u=S(this.rootEl))&&n.length!==u.childNodes.length&&console.error("must be 1 html() entity for hmtl()"),h=_;h<n.length;h++)n[h].el=u.childNodes[h],n.wmap.set(n[h].el,h);return"done"}},g.prototype.htmlChild=function(e){for(;e.parentNode!==this.rootEl;)e=e.parentNode;return e},g.prototype.htmlToIdx=function(e){for(;e.parentNode!==this.rootEl;)e=e.parentNode;var t=this.__.harr.wmap.get(e);return void 0===t?-1:t},g.prototype.html=function(e,t){this.__.harr||this.htmlBegin();var r,n=this.__,o=n.harr,i=n.hmap,a=n.fcounter++,l=n.hgeneration,u=O(t);if(i[e=null==e?u:e]){if((r=i[e]).generation===l&&s("duplicate html() id"),r.generation=l,o[a]=r,r.hsh===u)return;r.h=o.htmlIdx++,o.html+=t,r.hsh=u}else r={h:t,hsh:u,idx:a,id:e,generation:l,el:null},o.splice(a,0,r),i[e]=r},g.prototype.dot=function(e,t){var r=R(this,e);if(arguments.length>1){if(!r.obj)throw Error("chain path missing");r.obj[r.prop]=t}return r},g.prototype.styleBag=function(e,t){var r=e instanceof Node?e:this.rootEl;r===this.rootEl&&(t=e);var n=O(JSON.stringify(t));if(r.__xs__style!==n){for(var o in t)r.style[o]=t[o];r.__xs__style=n}},e.autorun&&k((function(){u()})),e.use=e.use||g;var B=document.currentScript?function(e,t){return new Function(e,"return `"+t+"`;")}:function(e,t){return t=t.split("\n").join("\\\n").replace(/"/g,'\\"'),new Function(e,'var f=function (_, exp) {return eval(exp)}; f.bind(this); return "'+t+'".replace(/\\${(.*?)}/g, f)')};return{register:function(e,t,r){var n="*"===e[0]?e.substring(1):e;if(r=r||"",t.data=_(t.data,void 0),!i[n])return i[r]||s("Super Reef NOT registered: "+r),i[n]=xs.assign({},i[r],t),i[n].name=n,i[n].super=r,!0;e===n&&s("Reefer already registered: "+n)},mount:p,run:u,template:B,ready:k,emit:M,sanitize:C,styleBag:g.prototype.styleBag,registry:function(e){return e?i[e]:i},find:function(e,t){return(e=this.findAll(e,t))?e[0]:null},findAll:function(e,t){var r=0;if(e=[].slice.call((t||document).querySelectorAll(e)))for(var n=0;n<e.length;n++)e[r]=e[n].reef,r+=e[r]?1:0;return r?(e.length=r,e):null}}},window.reefer=ReeferFactory({autorun:!0})},,function(e,t,r){r(0),e.exports=r(1)}]);
//# sourceMappingURL=reefer-min.js.map