!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([,function(t,e){var r;window.coral.ui=function(t){t=t||{};var e=window.coral,r=document.createRange(),n=0,o={},i=0;const a={"":{update:function(){var t=this.state,r=this.slots||{},n=r[t.dataslot||"default"];if(!n)return"done";if(!t.datasrc)return"done";var o,a="datactx"in t?this.dot(t.datactx).value:{},s="datasrc"in t?this.dot(t.datasrc).value:this,l=t.genkey,c=s&&n||r.empty&&r.empty.text||{text:"<div> </div>"},u=t.datakey;Array.isArray(s)||(s=[s]),r.header&&this.html(-1,r.header.script?r.header(a):r.header.text);var d=this.__.hmap||{};a.__hmap__=d;for(var h=0;h<s.length;h++){var f=typeof s[h];s[h]&&(o=void 0===u?s[h].__key__:s[h][u]),l&&void 0===o&&"object"===f&&(o=e.privateprop(s[h],"__key__","k"+i++));var p=c.script?c.script(s[h],h,a):c.text;this.html(o||h,p)}delete a.__hmap__,r.footer&&this.html(-2,r.footer.script?r.footer(a):r.footer.text)}}};function s(){console.error(arguments)}function l(){throw console.error(arguments),Error("CORAL FAULT")}function c(t,e){return t[e]=t[e]||{},t[e]}function u(t){for(var e=t||document,r=[],n=e.querySelectorAll(":not([coral-stage])[coral]"),o=0;o<n.length;o++)if(!n[o].coral){var i=h(n[o],e.coral);f(i,"mount"),i&&i.render_(),r.push(i)}return r}function d(t,e){try{var r=e.getAttribute("type"),n=r.match(/\(([^)]*)\)/);n=n?n[1]:"";var o=e.innerHTML.trim(),i=t.props=t.props||{};if(o)switch(r.split("(")[0].trim()){case"coral-method":c(t,"methods")[e.getAttribute("name")||"default"]=new Function(n,o);break;case"coral-observer":c(t,"observers")[e.getAttribute("name")||"default"]=new Function(n,o);break;case"coral-function":e.coralScript=new Function(n,o);break;case"coral-template":e.coralScript=I(n,o);break;default:var a=r.split("coral-s-")[1];if(a){try{o=JSON.parse(o)}catch(t){}return i[a.trim()]=o,!0}s("unknown coral slot type",r)}}catch(t){s("coral-slot script parsing ERROR:",o||e.type,e,t)}}function h(t,e){if(!t)return null;var r=t.getAttribute("coral");try{var n=function(t){for(var e,r=t.attributes,n=0;n<r.length;n++){var o=r[n],i=o.name+"";if(0===i.indexOf("coral-s")){e=e||{};var a=o.value,s=i[7],l=a.split(s+s);a=l[0],l=l[1];var u=i.substring(8),d=p(u,a);try{a=JSON.parse(a)}catch(t){}d?c(e,"bind")[u]=d:c(e,"props")[u]=a,l&&(c(e,"events")[u]=l)}else if(0===i.indexOf("coral-on-")){var h=i.substring(9);c(e=e||{},"listeners")[h]=o.value}}return e}(t),o=t.cloneNode(!0);if(o&&(n=n||{},o.children))for(var i=0;i<o.children.length;i++){var a=c(n,"slots"),l=o.children[i],u=l.getAttribute,h=u&&u.call(l,"coral-slot")||"default";if("SCRIPT"!==l.nodeName||0!==l.type.indexOf("coral-")||!d(n,l)){var f=a[h]=a[h]||[];f.push(l),f.text=(f.text||"")+(u?l.outerHTML:l.state),"el"in f||(f.el=l),!("script"in f)&&l.coralScript&&(f.script=l.coralScript)}}return v(t,r,n,e)}catch(e){s("UI failed to mount: ",r,t,e)}return null}function f(t,e){return t.lifecycle&&t.lifecycle[e]&&t.lifecycle[e].call(t)}function p(t,e){if("~"!==e[0])return!1;var r=e.split("~");return{prop:r[1],selector:r.length<2?"^":r[2]}}function v(e,r,n,i){n=n||{},a[r]||l("UI NOT registered: ",r);var s=a[r],c=new t.use(e,s,n);if(c.name=r,e.setAttribute("coral-stage","mounted"),c.listeners){var u=[],d=c.listeners;for(var h in d){u.push(h);var f=h.split("."),p=f[0];o[p]||(o[p]=m(p),document.addEventListener(p,o[p],!1)),d[p]=d[h],"stop"===d[f[1]]&&(d[p].coralStop=!0)}c.listeners=u}return c}function m(t){return function(e){for(var r,n,o=e.detail&&e.detail.coralEmitRootEl||e.target,i="coral-on-"+t,s=[];o;){if(o.getAttribute){var l=o.getAttribute(i);l||(l=o.getAttribute(i+".stop"))&&(l.stop=!0),l&&s.push(l.trim());var c=o.coral;if(e.coral||(e.coral=c),c&&s.length)for(var u=0;u<s.length;u++){var d=s[u],h=d,f=(n=void 0,(n=h.match(/\(([^)]*)\)/))&&n[1]||"");if(f){f=f.split(","),h=h.split("(")[0];var p=f.indexOf("$event");p>=0&&(f[p]=e)}var v,m=c.dot(h);if(void 0!==m.value&&(g(m.value)?v=m.value.apply(m.obj,f||[e]):c.dot(h,f[0]),"stop"===v||d.stop))return}var _=c&&c.name;if(a[_]&&(r=a[_]).listeners&&r.listeners[t]&&("stop"===r.listeners[t].call(c,e)||r.listeners[t].coralStop))return}o=o.parentNode}}}function g(t){return!!(t&&t.constructor&&t.call&&t.apply)}function _(t,e){if(!Array.isArray(t))return t;for(var r={},n=0;n<t.length;n++)r[t[n]]=arguments.length<=1||e;return r}function b(t,r,n,o){for(var i=0;i<r.length;i++){var a=r[i];void 0!==(a in o?o[a]:n[a])&&(t[a]=e.clone(n[a],o[a]))}}function y(t,r,o){r=r||{},o=o||{};var i=this.__={};b(i,["update","update","bind"],r,o),b(this,["methods","observers","listeners","mutate","lifecycle"],r,o),"shared"in r&&(this.shared=r.shared),(r.events||o.events)&&(i.events=e.assign({},_(r.events),o.events)),(r.decorators||o.decorators)&&(i.decorators=e.assign({},_(r.decorators),_(o.decorators))),(r.slots||o.slots)&&e.assign(c(this,"slots"),r.slots,o.slots),"super"in r&&(this.super=a[r.super]);var s=this.methods;if(s)for(var l in s)s[l]=g(s[l])?s[l].bind(this):s[l];this.rootEl=t,t.coral=this,i.obsf=y.prototype.react.bind(this);var u=this.state=e.observe({},i.obsf);for(l in e.assign(u,i.decorators,r.state,o.props),i.bind)S(this,"state."+l,i.bind[l].selector,i.bind[l].prop);return e.observe(u),this.sym="$"+n++,this}function N(t){var e="";for(var r in t)e+=":xs:"+r+"\n";return e}function w(t,e,r){var n=this,o=(r=r||{}).xhr||new XMLHttpRequest;return o.onerror=function(t){console.log("CORAL HTTP LOAD",t),B(n.rootEl,"coralLoadDataFail",{url:e})},o.onload=function(e){if(200===this.status){var i=this.response;try{i=JSON.parse(i)}catch(t){}r.sanitize&&(i=R(i)),n.dot(t,i)}else this.status&&o.onerror(e)},o.open(r.method||"GET",e,!0),o.send(null),o}function E(t,e){var r=this;if("loading"!==document.readyState){var n=document.createElement("script");n.src=e,document.getElementsByTagName("head")[0].appendChild(n)}else document.write('<script src="'+e+'"></script'),n=(n=document.getElementsByTagName("script"))[n.length-1];return n.onerror=function(t){console.log("CORAL SCRIPT LOAD",t),n.parentNode.removeChild(n),B(r.rootEl,"coralLoadHTMLFail",{url:e})},n.coralCB=function(e){r.dot(t,e)},document.currentScript||(window.rf_script=n),n}function x(t,r){var n=r.split("."),o=e.dot(t,n);if(o.obj)return o;for(var i=n,a=t,s=0;s<i.length;s++){var l=a[i[s]];null!=l&&"object"==typeof l||(a[i[s]]=s==i.length-1?void 0:{}),a=a[i[s]]}return e.dot(t,n)}function S(t,r,o,i,a){var s,u;o=o||"^";var d=c(t.__,"bind"),h=c(d,r);if(i=i||r,h.proppath!==r||h.selector!==o||h.prop!==i){switch(o[0]){case"^":(s=function(t,e){for(var r=t&&t.rootEl;t&&r;){if(0==e--)return t;do{r=r.parentNode}while(r&&!r.coral);t=r.coral}return null}(t,0|o.substring(1)))||l("unable to find parent to state bind",t,r),u=x(s,i);break;case"#":case".":case"[":var f=(a||document).querySelector(o);(s=f&&f.coral)||l("unable to locate coral for bind"),u=x(s,i);break;default:var p=o.split("$");switch(d[r]={proppath:r,selector:o,prop:i},p[1]){case"data":case"html":case"json-raw":w.call(t,r,p[2]);break;case"json":w.call(t,r,p[2],{sanitize:!0});break;case"jsonp":p[2]=function(t,e,r){if(t.indexOf("{JSONP}")<0)return t;var o="jsonp_rf_"+n++;return window[o]=function(t){e.dot(r,t),delete window[o]},t.replace("{JSONP}",o)}(p[2],t,r);case"js":E.call(t,r,p[2]);break;default:l("unknown data bind: "+r+": "+o)}if(u=x(t,i),i===r)return}var v=x(t,r);v.obj||l("state bind not found: "+r);var m=e.alias(v.obj,v.prop,u.obj,u.prop,(function(e){t.rootEl&&t.rootEl.getRootNode()===document?t.react(e):t.unmount()}));d[r]={proppath:r,selector:o,prop:i,sp:u,unobs:m}}}function A(){f(this,"beforeRender");var t=new Date,e=this.rootEl;if(e&&e.getRootNode()===document){var r=this.__.update;if(r){var n=this.__.fcounter;n&&this.htmlBegin(),n=this.__.fcounter;var o=r.call(this,this.slots)||"";this.__.harr?this.htmlEnd():"string"==typeof o?"done"!==o&&(e.innerHTML=o):(e.innerHTML="",Array.isArray(o)?o.forEach((function(t){e.appendChild(t)})):e.appendChild(o)),e.parentNode.classList.contains("container")&&(e=e),u(e),e.parentNode.classList.contains("container")&&console.log("render",new Date-t)}f(this,"afterRender")}else this.unmount()}function T(){if(0!==this.__.renderflag){var t=function(t){var e=document.activeElement;if(e)for(var r=e.selectionStart,n=e.selectionEnd,o=[];e&&e!==t&&e.parentNode;)o.push((i=e,[].indexOf.call(i.parentNode.childNodes,i))),e=e.parentNode;var i;return function(){if(e){for(e=t;e&&o.length;){var i=o.pop();e=e.childNodes[i]}if(e){e.focus&&e.focus();try{e.selectionStart=r,e.selectionEnd=n}catch(t){}}}}}(this.rootEl);A.call(this),t(),this.__.renderflag=0}}function O(t){switch(t.nodeName){case"TABLE":return t.childNodes&&t.childNodes[0]||t;default:return t}}function j(t){for(var e=0,r=t.length,n=0;n<r;n++)e=31*e+t.charCodeAt(n),e&=e;return e}y.prototype.unmount=function(){f(this,"umnount");var t=this.__||{};if(e.unobserve(this.state,t.obsf),t.bind)for(var r in t.bind){var n=t.bind[r];n.obsf&&e.unobserve(n.sp.obj,n.obsf)}},y.prototype.react=function(t){t.coral=this;var e,r=this.__,n=t.root,o=this.observers,i=r.events,a=r.proprx=r.proprx||(o?N(o):"")+(i?N(i):"");if(a){var s="(:xs:(("+t.path.replace(/\./g,"\\.)|(\\*\\.))*((")+")|(\\*)))\n",l=new RegExp(s,"g"),c=a.match(l);if(c){for(var u=c[0],d=1;d<c.length;d++)c[d].length>u.length&&(u=c[d]);n=u.substring(4,u.length-1)}}var h,f=o&&o[n];if(f)if(g(f))e=f.call(this,t);else if(!t.path&&("set"===t.action||"add"===t.action)){var p=this.dot(f);g(p.value)?p.value.call(this):p.obj[p.prop]=t.value}if(i&&i[n]){var v=r.name+"."+(!0===i[n]?n:i[n]);B(this.rootEl,v,t)}if(t.value!==t.prev){this.mutate&&(h=this.mutate(this,t));var m=r.decorators;this.sym&&("done"===e||"done"===h||m&&(m[n]||m[u])||this.rerender())}},y.prototype.observe=function(t,e){c(this,"observers")[t]=e,this.__.obsrx=null},y.prototype.decorate=function(t,e){c(this,"decorators")[t]=!1!==e&&0!==e},y.prototype.events=function(t,e){c(this.__,"events")[t]=!1!==e&&0!==e&&e,this.__.evrx=null},y.prototype.watch=function(t,e){this.state[t]=e,this.state.__observe__()},y.prototype.bind=function(t,e,r,n){S(this,t,e,r,n)},y.prototype.emit=function(t,e){B(this.rootEl,t,e)},y.prototype.render_=A,y.prototype.render=function(){e.tick(this.sym+"_rr",this,A)},y.prototype.rerender=function(){this.__.renderflag=(this.__.renderflag||0)+1,e.tick(this.sym+"_rr",this,T,!0)},y.prototype.htmlBegin=function(t){this.__.harr&&!t||(this.__.hmap={},this.__.hgeneration=-1),this.__.harr=[],this.__.harr.html="",this.__.harr.htmlIdx=0,this.__.harr.wmap=new WeakMap,this.__.hgeneration++,this.__.fcounter=0};const C={INPUT:!0,TEXTAREA:!0};function L(t,e){if(3===t.nodeType&&3===e.nodeType)return t.nodeValue=e.nodeValue,t;if(t.nodeName!==e.nodeName||!function(t,e){var r,n={},o=e.attributes,i=o.length;C[t.nodeName]&&t.value!==e.value&&(t.value=e.value);for(var a=0;a<i;a++)n[(r=o[a]).name]=!0,t.getAttribute(r.name)!==r.value&&t.setAttribute(r.name,r.value);var s=t.attributes,l=s.length;if(l===i)return!0;for(a=0;a<l;a++)n[(r=s[a]).name]||t.removeAttribute(r.name);return!0}(t,e))return t.parentNode.replaceChild(e,t),e;var r=t.childNodes,n=e.childNodes;if(r.length||n.length){for(var o,i=o=Math.min(r.length,n.length);i<r.length;)t.removeChild(r[o]);for(;i<n.length;)t.appendChild(n[o]);for(;--o>=0;){var a=r[o],s=n[o];3!==a.nodeType||3!==s.nodeType?a.isEqualNode(s)||a.nodeName===s.nodeName&&L(a,s)||t.replaceChild(s,a):a.nodeValue!==s.nodeValue&&(a.nodeValue=s.nodeValue)}}return t}function k(t,e){r.selectNode(t);var n=r.createContextualFragment(e);return"TBODY"===t.nodeName?n.childNodes[0]:n}var M;function R(t){if("object"==typeof t){for(var e in t)switch(typeof t[e]){case"string":case"object":t[e]=t[e]?R(t[e]):t[e]}return t}return(M=M||document.createElement("div")).textContent=t,M.innerHTML}function B(t,e,r){r=r||{},(t=function t(e,r){return"string"!=typeof e?e:t(r||document).querySelector(e)}(t))&&(r.coralEmitRootEl=t),document.dispatchEvent(new CustomEvent(e,{detail:r}))}function H(t){"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?t():document.addEventListener("DOMContentLoaded",t)}y.prototype.htmlUpdate=function(t,e,r){var n=this.__.hmap;if(n){var o=j(r);if((e=null==e?o:e)in n||l("updating non-existent element"),n[e].hsh!==o||t!==n[e].idx){var i=O(this.rootEl),a=n[e].el;a.getAttribute?(n[e].el=L(i.childNodes[t],k(i,r).firstChild),n[e].hsh=o,n[e].idx=t):a.nodeValue!==r&&(a.nodeValue=r)}}},y.prototype.htmlEnd=function(){var t=this.__,e=t.hgeneration,r="",n=t.harr,o=t.hmap;if(n){var i=this.__.fcounter,a=null;if(0===i)return this.htmlBegin(!0),void(this.rootEl.innerHTML="");for(var s in 0===e&&(this.rootEl.innerHTML=""),o){var l=o[s];l.generation!==e&&(l.el&&l.el.parentNode.removeChild(l.el),delete o[s])}var c=O(this.rootEl),u=document.createElement(c.nodeName);n.html&&(u=k(c,n.html),n.html="");for(var d=0,h=0;h<i;h++){var f=(l=n[h]).el,p=l.h;if("number"==typeof p){var v=u.childNodes[l.h-d];(v=L(f,v))!==f&&(l.el=f=v,d++)}else p&&(h>=c.childNodes.length?r+=p:l.el=f=k(c,p).firstChild);l.idx=h,l.h="",f&&(l.el=f,n.wmap.set(f,h),f.parentNode===c&&f.previousSibling===a||(a?c.insertBefore(f,a.nextSibling):c.childNodes&&c.childNodes[0]===f||c.insertBefore(f,c.childNodes&&c.childNodes[0])),a=f)}n.length=i;var m=c.childNodes.length;for(r&&c.insertAdjacentHTML("beforeend",r),(c=O(this.rootEl))&&n.length!==c.childNodes.length&&console.error("inconsistent count - must be 1 html() entity for hmtl()"),h=m;h<n.length;h++)n[h].el=c.childNodes[h],n.wmap.set(n[h].el,h);return"done"}},y.prototype.htmlFromIdx=function(t){return O(this.rootEl).childNodes[t]},y.prototype.htmlChild=function(t){for(;t.parentNode!==this.rootEl;)t=t.parentNode;return t},y.prototype.htmlToIdx=function(t){for(;t.parentNode!==this.rootEl;)t=t.parentNode;var e=this.__.harr.wmap.get(t);return void 0===e?-1:e},y.prototype.html=function(t,e){this.__.harr||this.htmlBegin();var r,n=this.__,o=n.harr,i=n.hmap,a=n.fcounter++,s=n.hgeneration,c=j(e);if(i[t=null==t?c:t]){if((r=i[t]).generation===s&&l("duplicate html() id"),r.generation=s,o[a]=r,r.hsh===c)return;r.h=o.htmlIdx++,o.html+=e,r.hsh=c}else r={h:e,hsh:c,idx:a,id:t,generation:s,el:null},o.splice(a,0,r),i[t]=r},y.prototype.dot=function(t,r){var n=e.dot(this,t);if(arguments.length>1){if(!n.obj)throw Error("chain path missing");n.obj[n.prop]=r}return n},y.prototype.styleBag=function(t,e){var r=t instanceof Node?t:this.rootEl;r===this.rootEl&&(e=t);var n=j(JSON.stringify(e));if(r.__xs__style!==n){for(var o in e)r.style[o]=e[o];r.__xs__style=n}},t.autorun&&H((function(){u()})),t.use=t.use||y;var I=document.currentScript?function(t,e){return new Function(t,"return `"+e+"`;")}:function(t,e){return e=e.split("\n").join("\\\n").replace(/"/g,'\\"'),new Function(t,'var f=function (_, exp) {return eval(exp)}; f.bind(this); return "'+e+'".replace(/\\${(.*?)}/g, f)')};return{register:function(t,r,n){var o="*"===t[0]?t.substring(1):t;if(n=n||"",r.state=_(r.state,void 0),!a[o])return a[n]||l("Super Coral NOT registered: "+n),a[o]=e.assign({},a[n],r),a[o].name=o,a[o].super=n,!0;t===o&&l("UI already registered: "+o)},mount:v,run:u,template:I,ready:H,emit:B,sanitize:R,styleBag:y.prototype.styleBag,registry:function(t){return t?a[t]:a},find:function(t,e){return(t=this.findAll(t,e))?t[0]:null},findAll:function(t,e){var r=0;if(t=[].slice.call((e||document).querySelectorAll(t)))for(var n=0;n<t.length;n++)t[r]=t[n].coral,r+=t[r]?1:0;return r?(t.length=r,t):null}}}({autorun:!0}),(r=window.coral=window.coral||{}).ui=r.ui||{},r.ui.clientSideInclude=function(t){var e;(e=t)&&e.constructor&&e.call&&e.apply&&(t=t.toString().split("\n").slice(1,-1).join("\n"));var r=document.currentScript||window.rf_script;r||(r=(r=document.getElementsByTagName("script"))[r.length-1]),window.rf_script&&(window.rf_script=null);var n=r.coralCB;void 0===n?r.outerHTML=t:n(t),r.parentNode&&r.parentNode.removeChild(r)}}]);
//# sourceMappingURL=coral-ui-core.js.map