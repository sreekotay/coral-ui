!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([,function(e,t){var r;(r=window.coral=window.coral||{}).ui=r.ui||{},r.ui.clientSideInclude=function(e){var t;(t=e)&&t.constructor&&t.call&&t.apply&&(e=e.toString().split("\n").slice(1,-1).join("\n"));var r=document.currentScript||window.rf_script;r||(r=(r=document.getElementsByTagName("script"))[r.length-1]),window.rf_script&&(window.rf_script=null);var n=r.reefCB;void 0===n?r.outerHTML=e:n(e),r.parentNode&&r.parentNode.removeChild(r)},window.reefer=function(e){e=e||{};var t=window.xs,r=document.createRange(),n=0,o={},i=0;const a={"":{template:function(){var e=this.data,r=this.slots||{},n=r[e.dataslot||"default"];if(!n)return"done";if(!this.data.datasrc)return"done";var o,a="datactx"in e?this.dot(e.datactx).value:{},s="datasrc"in e?this.dot(e.datasrc).value:this,l=this.data.genkey,u=s&&n||r.empty&&r.empty.text||{text:"<div> </div>"},c=e.datakey;Array.isArray(s)||(s=[s]),r.header&&this.html(-1,r.header.script?r.header(a):r.header.text);var d=this.__.hmap||{};a.__hmap__=d;for(var f=0;f<s.length;f++){var h=typeof s[f];s[f]&&(o=void 0===c?s[f].__key__:s[f][c]),l&&void 0===o&&"object"===h&&(o=t.privateprop(s[f],"__key__","k"+i++));var p=u.script?u.script(s[f],f,a):u.text;this.html(o||f,p)}delete a.__hmap__,r.footer&&this.html(-2,r.footer.script?r.footer(a):r.footer.text)}}};function s(){console.error(arguments)}function l(){throw console.error(arguments),Error("REEF FAULT")}function u(e,t){return e[t]=e[t]||{},e[t]}function c(e){for(var t=e||document,r=[],n=t.querySelectorAll(":not([reef-stage])[reef]"),o=0;o<n.length;o++)if(!n[o].reef){var i=f(n[o],t.reef);h(i,"mount"),i&&i.render_(),r.push(i)}return r}function d(e,t){try{var r=t.getAttribute("type"),n=r.match(/\(([^)]*)\)/);n=n?n[1]:"";var o=t.innerHTML.trim(),i=e.props=e.props||{};if(o)switch(r.split("(")[0].trim()){case"reef-function":t.reefScript=new Function(n,o);break;case"reef-template":t.reefScript=F(n,o);break;default:var a=r.split("reef-p-")[1];if(a){try{o=JSON.parse(o)}catch(e){}return i[a.trim()]=o,!0}s("unknown reef slot type")}}catch(e){s("reef-slot script parsing ERROR:",o||t.type,t,e)}}function f(e,t){if(!e)return null;var r=e.getAttribute("reef");try{var n=function(e){for(var t,r=e.attributes,n=0;n<r.length;n++){var o=r[n],i=o.name+"";if(0===i.indexOf("reef-p")){t=t||{};var a=o.value,s=i[6],l=a.split(s+s);a=l[0],l=l[1];var c=i.substring(7),d=p(c,a);try{a=JSON.parse(a)}catch(e){}d?u(t,"bind")[c]=d:u(t,"props")[c]=a,l&&(u(t,"events")[c]=l)}else if(0===i.indexOf("reef.")){var f=i.substring(5);u(t=t||{},"listeners")[f]=o.value}}return t}(e),o=e.cloneNode(!0);if(o&&(n=n||{},o.children))for(var i=0;i<o.children.length;i++){var a=u(n,"slots"),l=o.children[i],c=l.getAttribute,f=c&&c.call(l,"reef-slot")||"default";if("SCRIPT"!==l.nodeName||0!==l.type.indexOf("reef-")||!d(n,l)){var h=a[f]=a[f]||[];h.push(l),h.text=(h.text||"")+(c?l.outerHTML:l.data),"el"in h||(h.el=l),!("script"in h)&&l.reefScript&&(h.script=l.reefScript)}}return v(e,r,n,t)}catch(t){s("Reefer failed to mount: ",r,e,t)}return null}function h(e,t){return e.lifecycle&&e.lifecycle[t]&&e.lifecycle[t].call(e)}function p(e,t){if("~"!==t[0])return!1;var r=t.split("~");return{prop:r[1],selector:r.length<2?"^":r[2]}}function v(t,r,n,i){n=n||{},a[r]||l("Reefer NOT registered: ",r);var s=a[r],u=t.reef=new e.use(t,s,n);if(u.name=r,t.setAttribute("reef-stage","mounted"),u.listeners){var c=u.listeners;for(var d in c){var f=d.split("@"),h=f[0];o[h]||(o[h]=m(h),document.addEventListener(h,o[h],!1)),c[h]=c[d],"stop"===c[f[1]]&&(c[h].reefStop=!0)}u.listeners=null}return u}function m(e){return function(t){for(var r,n,o=t.detail&&t.detail.reefEmitRootEl||t.target,i="reef."+e,s=[];o;){if(o.getAttribute){var l=o.getAttribute(i);l||(l=o.getAttribute(i+"@stop"))&&(l.stop=!0),l&&s.push(l.trim());var u=o.reef;if(t.reef||(t.reef=u),u&&s.length)for(var c=0;c<s.length;c++){var d=s[c],f=d,h=(n=void 0,(n=f.match(/\(([^)]*)\)/))&&n[1]||"");if(h){h=h.split(","),f=f.split("(")[0];var p=h.indexOf("$event");p>=0&&(h[p]=t)}var v,m=u.dot(f);if(void 0!==m.value&&(g(m.value)?v=m.value.apply(m.obj,h||[t]):u.dot(f,h[0]),"stop"===v||d.stop))return}var _=u&&u.name;if(a[_]&&(r=a[_]).listeners&&r.listeners[e]&&("stop"===r.listeners[e].call(u,t)||r.listeners[e].reefStop))return}o=o.parentNode}}}function g(e){return!!(e&&e.constructor&&e.call&&e.apply)}function _(e,t){if(!Array.isArray(e))return e;for(var r={},n=0;n<e.length;n++)r[e[n]]=arguments.length<=1||t;return r}function y(e,r,n,o){for(var i=0;i<r.length;i++){var a=r[i];void 0!==(a in o?o[a]:n[a])&&(e[a]=t.clone(n[a],o[a]))}}function b(e,r,o){r=r||{},o=o||{};var i=this.__={};y(i,["template","update","bind"],r,o),y(this,["methods","observers","listeners","mutate","lifecycle"],r,o),"shared"in r&&(this.shared=r.shared),(r.events||o.events)&&(i.events=t.assign({},_(r.events),o.events)),(r.decorators||o.decorators)&&(i.decorators=t.assign({},_(r.decorators),_(o.decorators))),(r.slots||o.slots)&&t.assign(u(this,"slots"),r.slots,o.slots),"super"in r&&(this.super=a[r.super]);var s=this.methods;if(s)for(var l in s)s[l]=g(s[l])?s[l].bind(this):s[l];this.rootEl=e,i.obsf=b.prototype.react.bind(this);var c=this.data=t.observe({},i.obsf);for(l in t.assign(c,i.decorators,r.data,o.props),i.bind)S(this,"data."+l,i.bind[l].selector,i.bind[l].prop);return t.observe(c),this.sym="$"+n++,this}function N(e){var t="";for(var r in e)t+=":xs:"+r+"\n";return t}function E(e,t,r){var n=this,o=(r=r||{}).xhr||new XMLHttpRequest;return o.onerror=function(e){console.log("REEF HTTP LOAD",e),B(n.rootEl,"reefLoadDataFail",{url:t})},o.onload=function(t){if(200===this.status){var i=this.response;try{i=JSON.parse(i)}catch(e){}r.sanitize&&(i=k(i)),n.dot(e,i)}else this.status&&o.onerror(t)},o.open(r.method||"GET",t,!0),o.send(null),o}function w(e,t){var r=this;if("loading"!==document.readyState){var n=document.createElement("script");n.src=t,document.getElementsByTagName("head")[0].appendChild(n)}else document.write('<script src="'+t+'"></script'),n=(n=document.getElementsByTagName("script"))[n.length-1];return n.onerror=function(e){console.log("REEF SCRIPT LOAD",e),n.parentNode.removeChild(n),B(r.rootEl,"reefLoadHTMLFail",{url:t})},n.reefCB=function(t){r.dot(e,t)},document.currentScript||(window.rf_script=n),n}function x(e,t){var r=t.split("."),n=R(e,r);if(n.obj)return n;for(var o=t.split("."),i=e,a=0;a<o.length;a++){var s=i[o[a]];null!=s&&"object"==typeof s||(i[o[a]]=a==o.length-1?void 0:{}),i=i[o[a]]}return R(e,r)}function S(e,r,o,i,a){var s,c;o=o||"^";var d=u(e.__,"bind"),f=u(d,r);if(i=i||r,f.proppath!==r||f.selector!==o||f.prop!==i){switch(o[0]){case"^":c=x(e,i);break;case"#":case".":case"[":var h=(a||document).querySelector(o);(s=h&&h.reef)||l("unable to locate reef for bind"),c=x(s,i);break;default:var p=o.split("$");switch(d[r]={proppath:r,selector:o,prop:i},p[1]){case"data":case"html":case"json-raw":E.call(e,r,p[2]);break;case"json":E.call(e,r,p[2],{sanitize:!0});break;case"jsonp":p[2]=function(e,t,r){if(e.indexOf("{JSONP}")<0)return e;var o="jsonp_rf_"+n++;return window[o]=function(e){t.dot(r,e),delete window[o]},e.replace("{JSONP}",o)}(p[2],e,r);case"js":w.call(e,r,p[2]);break;default:l("unknown data bind: "+r+": "+o)}if(c=x(e,i),i===r)return}var v=x(e,r);v.obj||l("data bind not found: "+r);var m=t.alias(v.obj,v.prop,c.obj,c.prop,(function(t){e.rootEl&&e.rootEl.getRootNode()===document?e.react(t):e.unmount()}));d[r]={proppath:r,selector:o,prop:i,sp:c,unobs:m}}}function j(){h(this,"beforeRender");var e=new Date,t=this.rootEl;if(t&&t.getRootNode()===document){var r=this.__.template;if(r){var n=this.__.fcounter;n&&this.htmlBegin(),n=this.__.fcounter;var o=r.call(this,this.slots)||"";this.__.harr?this.htmlEnd():"string"==typeof o?"done"!==o&&(t.innerHTML=o):(t.innerHTML="",Array.isArray(o)?o.forEach((function(e){t.appendChild(e)})):t.appendChild(o)),t.parentNode.classList.contains("container")&&(t=t),c(t),t.parentNode.classList.contains("container")&&console.log("render",new Date-e)}h(this,"afterRender")}else this.unmount()}function T(){if(0!==this.__.renderflag){var e=function(e){var t=document.activeElement;if(t)for(var r=t.selectionStart,n=t.selectionEnd,o=[];t&&t!==e&&t.parentNode;)o.push((i=t,[].indexOf.call(i.parentNode.childNodes,i))),t=t.parentNode;var i;return function(){if(t){for(t=e;t&&o.length;){var i=o.pop();t=t.childNodes[i]}if(t){t.focus&&t.focus();try{t.selectionStart=r,t.selectionEnd=n}catch(e){}}}}}(this.rootEl);j.call(this),e(),this.__.renderflag=0}}function A(e){switch(e.nodeName){case"TABLE":return e.childNodes&&e.childNodes[0]||e;default:return e}}function O(e){for(var t=0,r=e.length,n=0;n<r;n++)t=31*t+e.charCodeAt(n),t&=t;return t}function C(e,t){return e.nodeName===t.nodeName&&function e(t,r){if(3===t.nodeType&&3===r.nodeType)return t.nodeValue=r.nodeValue,!0;if(t.nodeName!==r.nodeName||!function(e,t){try{for(var r,n={},o=t.attributes,i=o.length,a=0;a<i;a++)n[(r=o[a]).name]=!0,e.getAttribute(r.name)!==r.value&&e.setAttribute(r.name,r.value);var s=e.attributes,l=s.length;if(l===i)return!0;for(a=0;a<l;a++)n[(r=s[a]).name]||e.removeAttribute(r.name)}catch(e){return!0}}(t,r))return!1;if(t.childNodes.length||r.childNodes.length){for(var n,o=t.childNodes,i=r.childNodes,a=n=Math.min(o.length,i.length);--n>=0;){var s=o[n],l=i[n];3!==s.nodeType||3!==l.nodeType?s.isEqualNode(l)||s.nodeName===l.nodeName&&e(s,l)||t.replaceChild(l,s):s.nodeValue!==l.nodeValue&&(s.nodeValue=l.nodeValue)}for(;a<o.length;)t.removeChild(o[a++]);for(;a<i.length;)t.appendChild(i[a++])}return!0}(e,t)?e:(e.parentNode.replaceChild(t,e),t)}function L(e,t){r.selectNode(e);var n=r.createContextualFragment(t);return"TBODY"===e.nodeName?n.childNodes[0]:n}function R(e,t){"string"==typeof t&&(t=t.split("."));for(var r=t.length,n=0;n<r;n++){var o=t[n],i=e;if((!(e=i[o])||"object"!=typeof e)&&(n+1<r||!(o in i)))return{last:{obj:i,prop:o}}}return{value:e,obj:i,prop:o}}var M;function k(e){if("object"==typeof e){for(var t in e)switch(typeof e[t]){case"string":case"object":e[t]=e[t]?k(e[t]):e[t]}return e}return(M=M||document.createElement("div")).textContent=e,M.innerHTML}function B(e,t,r){r=r||{},(e=function e(t,r){return"string"!=typeof t?t:e(r||document).querySelector(t)}(e))&&(r.reefEmitRootEl=e),document.dispatchEvent(new CustomEvent(t,{detail:r}))}function H(e){"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?e():document.addEventListener("DOMContentLoaded",e)}b.prototype.unmount=function(){h(this,"umnount");var e=this.__||{};if(t.unobserve(this.data,e.obsf),e.bind)for(var r in e.bind){var n=e.bind[r];n.obsf&&t.unobserve(n.sp.obj,n.obsf)}},b.prototype.react=function(e){e.reef=this;var t,r=this.__,n=e.root,o=this.observers,i=r.events,a=r.proprx=r.proprx||(o?N(o):"")+(i?N(i):"");if(a){var s="(:xs:(("+e.path.replace(/\./g,"\\.)|(\\*\\.))*((")+")|(\\*)))\n",l=new RegExp(s,"g"),u=a.match(l);if(u){for(var c=u[0],d=1;d<u.length;d++)u[d].length>c.length&&(c=u[d]);n=c.substring(4,c.length-1)}}var f,h=o&&o[n];if(h)if(g(h))t=h.call(this,e);else if(!e.path&&("set"===e.action||"add"===e.action)){var p=this.dot(h);g(p.value)?p.value.call(this):p.obj[p.prop]=e.value}if(i&&i[n]){var v=r.name+"."+(!0===i[n]?n:i[n]);B(this.rootEl,v,e)}if(e.value!==e.prev){this.mutate&&(f=this.mutate(this,e));var m=r.decorators;this.sym&&("done"===t||"done"===f||m&&(m[n]||m[c])||this.rerender())}},b.prototype.observe=function(e,t){u(this,"observers")[e]=t,this.__.obsrx=null},b.prototype.decorate=function(e,t){u(this,"decorators")[e]=!1!==t&&0!==t},b.prototype.events=function(e,t){u(this.__,"events")[e]=!1!==t&&0!==t&&t,this.__.evrx=null},b.prototype.watch=function(e,t){this.data[e]=t,this.data.__observe__()},b.prototype.bind=function(e,t,r,n){S(this,e,t,r,n)},b.prototype.emit=function(e,t){B(this.rootEl,e,t)},b.prototype.render_=j,b.prototype.render=function(){t.tick(this.sym+"_rr",this,j)},b.prototype.rerender=function(){this.__.renderflag=(this.__.renderflag||0)+1,t.tick(this.sym+"_rr",this,T,!0)},b.prototype.htmlBegin=function(e){this.__.harr&&!e||(this.__.hmap={},this.__.hgeneration=-1),this.__.harr=[],this.__.harr.html="",this.__.harr.htmlIdx=0,this.__.harr.wmap=new WeakMap,this.__.hgeneration++,this.__.fcounter=0},b.prototype.htmlUpdate=function(e,t,r){var n=this.__.hmap;if(n){var o=O(r);if((t=null==t?o:t)in n||l("updating non-existent element"),n[t].hsh!==o||e!==n[t].idx){var i=A(this.rootEl),a=n[t].el;a.getAttribute?(n[t].el=C(i.childNodes[e],L(i,r).firstChild),n[t].hsh=o,n[t].idx=e):a.nodeValue!==r&&(a.nodeValue=r)}}},b.prototype.htmlEnd=function(){var e=this.__,t=e.hgeneration,r="",n=e.harr,o=e.hmap;if(n){var i=this.__.fcounter,a=null;if(0===i)return this.htmlBegin(!0),void(this.rootEl.innerHTML="");for(var s in 0===t&&(this.rootEl.innerHTML=""),o){var l=o[s];l.generation!==t&&(l.el&&l.el.parentNode.removeChild(l.el),delete o[s])}var u=A(this.rootEl),c=document.createElement(u.nodeName);n.html&&(c=L(u,n.html),n.html="");for(var d=0,f=0;f<i;f++){var h=(l=n[f]).el,p=l.h;if("number"==typeof p){var v=c.childNodes[l.h-d];(v=C(h,v))!==h&&(l.el=h=v,d++)}else p&&(f>=u.childNodes.length?r+=p:l.el=h=L(u,p).firstChild);l.idx=f,l.h="",h&&(l.el=h,n.wmap.set(h,f),h.parentNode===u&&h.previousSibling===a||(a?u.insertBefore(h,a.nextSibling):u.childNodes&&u.childNodes[0]===h||u.insertBefore(h,u.childNodes&&u.childNodes[0])),a=h)}n.length=i;var m=u.childNodes.length;for(r&&u.insertAdjacentHTML("beforeend",r),(u=A(this.rootEl))&&n.length!==u.childNodes.length&&console.error("inconsistent count - must be 1 html() entity for hmtl()"),f=m;f<n.length;f++)n[f].el=u.childNodes[f],n.wmap.set(n[f].el,f);return"done"}},b.prototype.htmlFromIdx=function(e){return A(this.rootEl).childNodes[e]},b.prototype.htmlChild=function(e){for(;e.parentNode!==this.rootEl;)e=e.parentNode;return e},b.prototype.htmlToIdx=function(e){for(;e.parentNode!==this.rootEl;)e=e.parentNode;var t=this.__.harr.wmap.get(e);return void 0===t?-1:t},b.prototype.html=function(e,t){this.__.harr||this.htmlBegin();var r,n=this.__,o=n.harr,i=n.hmap,a=n.fcounter++,s=n.hgeneration,u=O(t);if(i[e=null==e?u:e]){if((r=i[e]).generation===s&&l("duplicate html() id"),r.generation=s,o[a]=r,r.hsh===u)return;r.h=o.htmlIdx++,o.html+=t,r.hsh=u}else r={h:t,hsh:u,idx:a,id:e,generation:s,el:null},o.splice(a,0,r),i[e]=r},b.prototype.dot=function(e,t){var r=R(this,e);if(arguments.length>1){if(!r.obj)throw Error("chain path missing");r.obj[r.prop]=t}return r},b.prototype.styleBag=function(e,t){var r=e instanceof Node?e:this.rootEl;r===this.rootEl&&(t=e);var n=O(JSON.stringify(t));if(r.__xs__style!==n){for(var o in t)r.style[o]=t[o];r.__xs__style=n}},e.autorun&&H((function(){c()})),e.use=e.use||b;var F=document.currentScript?function(e,t){return new Function(e,"return `"+t+"`;")}:function(e,t){return t=t.split("\n").join("\\\n").replace(/"/g,'\\"'),new Function(e,'var f=function (_, exp) {return eval(exp)}; f.bind(this); return "'+t+'".replace(/\\${(.*?)}/g, f)')};return{register:function(e,r,n){var o="*"===e[0]?e.substring(1):e;if(n=n||"",r.data=_(r.data,void 0),!a[o])return a[n]||l("Super Reef NOT registered: "+n),a[o]=t.assign({},a[n],r),a[o].name=o,a[o].super=n,!0;e===o&&l("Reefer already registered: "+o)},mount:v,run:c,template:F,ready:H,emit:B,sanitize:k,styleBag:b.prototype.styleBag,registry:function(e){return e?a[e]:a},find:function(e,t){return(e=this.findAll(e,t))?e[0]:null},findAll:function(e,t){var r=0;if(e=[].slice.call((t||document).querySelectorAll(e)))for(var n=0;n<e.length;n++)e[r]=e[n].reef,r+=e[r]?1:0;return r?(e.length=r,e):null}}}({autorun:!0})}]);
//# sourceMappingURL=reefer-core.js.map