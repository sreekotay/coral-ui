!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([,function(e,t,r){!function(){var e=null;window.reeferHTML=function(t){var r;(r=t)&&r.constructor&&r.call&&r.apply&&(t=t.toString().split("\n").slice(1,-1).join("\n"));var n=document.currentScript;n||(n=e),n||(n=(n=document.getElementsByTagName("script"))[n.length-1]),e=null;var o=n.reefCB;void 0===o?n.outerHTML=t:o(t),n.parentNode&&n.parentNode.removeChild(n)}}(),ReeferFactory=function(e){e=e||{};var t=document.createRange(),r=0,n={},o=0;const i={"":{template:function(){var e=this.slots||{};if(e.default){if(!this.data.datasrc)return"done";var t,r=this.data,n="datactx"in r?this.dot(r.datactx).value:{},i="datasrc"in r?this.dot(r.datasrc).value:this,a=this.data.genkey,s=i&&e[r.dataslot||"default"]||e.empty&&e.empty.text||{text:"<div> </div>"},l=r.datakey;Array.isArray(i)||(i=[i]),e.header&&this.html(-1,e.header.script?e.header(n):e.header.text);var c=this.__.hmap||{};n.__hmap__=c;for(var u=0;u<i.length;u++){var f=typeof i[u];i[u]&&(t=void 0===l?i[u].__key__:i[u][l]),a&&void 0===t&&"object"===f&&(t=xs.privateprop(i[u],"__key__","k"+o++));var d=s.script?s.script(i[u],u,n):s.text;this.html(t||u,d)}delete n.__hmap__,e.footer&&this.html(-2,e.footer.script?e.footer(n):e.footer.text)}}}};function a(){console.error(arguments)}function s(){throw console.error(arguments),Error("REEF FAULT")}function l(e,t){return e[t]=e[t]||{},e[t]}function c(e){for(var t=e||document,r=[],n=t.querySelectorAll(":not([reef-stage])[reef]"),o=0;o<n.length;o++)if(!n[o].reef){var i=u(n[o],t.reef);f(i,"mount"),i&&i.render_(),r.push(i)}return r}function u(e,t){if(!e)return null;var r=e.getAttribute("reef");try{var n=function(e){for(var t,r=e.attributes,n=0;n<r.length;n++){var o=r[n],i=o.name+"";if(0===i.indexOf("reef-p")){t=t||{};var a=o.value,s=i[6],c=a.split(s+s);a=c[0],c=c[1];var u=i.substring(7),f=d(u,a);try{a=JSON.parse(a)}catch(e){}f?l(t,"bind")[u]=f:l(t,"props")[u]=a,c&&(l(t,"events")[u]=c)}else if(0===i.indexOf("reef@")){var h=i.substring(5);l(t=t||{},"listeners")[h]=o.value}}return t}(e),o=e.cloneNode(!0);if(o&&(n=n||{},o.children))for(var i=0;i<o.children.length;i++){var s=l(n,"slots"),c=o.children[i],u=c.getAttribute,f=u&&u.call(c,"reef-slot")||"default",p=s[f]=s[f]||[];if(p.push(c),p.text=(p.text||"")+(u?c.outerHTML:c.data),"SCRIPT"===c.nodeName&&0===c.type.indexOf("reef-")){try{var v=c.getAttribute("type"),m=v.match(/\(([^)]*)\)/);m=m?m[1]:"";var g=c.innerHTML.trim();if(g)switch(v.split("(")[0].trim()){case"reef-function":c.reefScript=new Function(m,g);break;case"reef-template":c.reefScript=k(m,g);break;default:a("unknown reef slot type")}}catch(e){a("reef-slot script parsing ERROR:",g||c.type,c,e)}"el"in p||(p.el=c),!("script"in p)&&c.reefScript&&(p.script=c.reefScript)}}return h(e,r,n,t)}catch(t){a("Reefer failed to mount: ",r,e,t)}return null}function f(e,t){return e.lifecycle&&e.lifecycle[t]&&e.lifecycle[t].call(e)}function d(e,t){if("~"!==t[0])return!1;var r=t.split("~");return{prop:r[1],selector:r.length<2?"^":r[2]}}function h(t,r,o,a){o=o||{},i[r]||s("Reefer NOT registered: ",r);var l=i[r],c=t.reef=new e.use(t,l,o);if(c.name=r,t.setAttribute("reef-stage","mounted"),c.listeners){var u=c.listeners;for(var f in u){var d=f.split("@"),h=d[0];n[h]||(n[h]=p(h),document.addEventListener(h,n[h],!1)),u[h]=u[f],"stop"===u[d[1]]&&(u[h].reefStop=!0)}c.listeners=null}return c}function p(e){return function(t){for(var r,n,o=t.detail&&t.detail.reefEmitRootEl||t.target,a="reef@"+e,s=[];o;){var l=o.getAttribute&&o.getAttribute(a);l&&(l=l.split("@"),s.push(l));var c=o.reef;if(t.reef||(t.reef=c),c&&s.length)for(var u=0;u<s.length;u++){var f=s[u],d=f[0].trim(),h=(n=void 0,(n=d.match(/\(([^)]*)\)/))&&n[1]||"");if(h){h=h.split(","),d=d.split("(")[0];var p=h.indexOf("$event");p>=0&&(h[p]=t)}var m,g=c.dot(d);if(void 0!==g.value&&(v(g.value)?m=g.value.apply(g.obj,h||[t]):c.dot(d,h[0]),"stop"===m||"stop"===f[1]))return}var _=c&&c.name;if(i[_]&&(r=i[_]).listeners&&r.listeners[e]&&("stop"===r.listeners[e].call(c,t)||r.listeners[e].reefStop))return;o=o.parentNode}}}function v(e){return!!(e&&e.constructor&&e.call&&e.apply)}function m(e,t){if(!Array.isArray(e))return e;for(var r={},n=0;n<e.length;n++)r[e[n]]=arguments.length<=1||t;return r}function g(e,t,r,n){for(var o=0;o<t.length;o++){var i=t[o];void 0!==(i in n?n[i]:r[i])&&(e[i]=xs.clone(r[i],n[i]))}}function _(e,t,n){t=t||{},n=n||{};var o=this.__={};g(o,["template","update","bind"],t,n),g(this,["methods","observers","listeners","mutate","lifecycle"],t,n),"shared"in t&&(this.shared=t.shared),(t.events||n.events)&&(o.events=xs.assign({},m(t.events),n.events)),(t.decorators||n.decorators)&&(o.decorators=xs.assign({},m(t.decorators),m(n.decorators))),(t.slots||n.slots)&&xs.assign(l(this,"slots"),t.slots,n.slots),"super"in t&&(this.super=i[t.super]);var a=this.methods;if(a)for(var s in a)a[s]=v(a[s])?a[s].bind(this):a[s];this.rootEl=e,o.obsf=_.prototype.react.bind(this);var c=this.data=xs.observe({},o.obsf);for(s in xs.assign(c,o.decorators,t.data,n.props),o.bind)N(this,"data."+s,o.bind[s].selector,o.bind[s].prop);return xs.observe(c),this.sym="$"+r++,this}function y(e){var t="";for(var r in e)t+=":xs:"+r+"\n";return t}function b(e,t,r){var n=this,o=(r=r||{}).xhr||new XMLHttpRequest;return o.onerror=function(e){console.log("REEF HTTP LOAD",e),M(n.rootEl,"reefLoadDataFail",{url:t})},o.onload=function(t){if(200===this.status){var i=this.response;try{i=JSON.parse(i)}catch(e){}r.sanitize&&(i=C(i)),n.dot(e,i)}else this.status&&o.onerror(t)},o.open(r.method||"GET",t,!0),o.send(null),o}function x(e,t){var r=this;if("loading"!==document.readyState){var n=document.createElement("script");n.src=t,document.getElementsByTagName("head")[0].appendChild(n)}else document.write('<script src="'+t+'"></script'),n=(n=document.getElementsByTagName("script"))[n.length-1];return n.onerror=function(e){console.log("REEF SCRIPT LOAD",e),n.parentNode.removeChild(n),M(r.rootEl,"reefLoadHTMLFail",{url:t})},n.reefCB=function(t){r.dot(e,t)},rf_script=n,n}function E(e,t){var r=t.split(".");if(sp=R(e,r),sp.obj)return sp;for(var n=t.split("."),o=e,i=0;i<n.length;i++){var a=o[n[i]];null!=a&&"object"==typeof a||(o[n[i]]=i==n.length-1?void 0:{}),o=o[n[i]]}return R(e,r)}function N(e,t,r,n,o){var i,a;r=r||"^";var c=l(e.__,"bind"),u=l(c,t);if(n=n||t,u.proppath!==t||u.selector!==r||u.prop!==n){switch(r[0]){case"^":a=E(e,n);break;case"#":case".":case"[":var f=(o||document).querySelector(r);(i=f&&f.reef)||s("unable to locate reef for bind"),a=E(i,n);break;case"$":f=r.split(":")[0];var d=r.substring(6);switch(c[t]={proppath:t,selector:r,prop:n},f){case"$json":return b.call(e,t,d,{sanitize:!0});case"$json-raw":return b.call(e,t,d);case"$html":return x.call(e,t,d)}default:s("unknown data bind: "+t+": "+r)}var h=R(e,t);h.obj||s("data bind not found: "+t);var p=xs.alias(h.obj,h.prop,a.obj,a.prop,(function(t){e.rootEl&&e.rootEl.getRootNode()===document?e.react(t):e.unmount()}));c[t]={proppath:t,selector:r,prop:n,sp:a,unobs:p}}}function S(){f(this,"beforeRender");var e=new Date,t=this.rootEl;if(t&&t.getRootNode()===document){var r=this.__.template;if(r){var n=this.__.fcounter;n&&this.htmlBegin(),n=this.__.fcounter;var o=r.call(this,this.slots)||"";this.__.harr?this.htmlEnd():"string"==typeof o?"done"!==o&&(t.innerHTML=o):(t.innerHTML="",Array.isArray(o)?o.forEach((function(e){t.appendChild(e)})):t.appendChild(o)),t.parentNode.classList.contains("container")&&(t=t),c(t),t.parentNode.classList.contains("container")&&console.log("render",new Date-e)}f(this,"afterRender")}else this.unmount()}function w(){if(0!==this.__.renderflag){var e=function(e){var t=document.activeElement;if(t)for(var r=t.selectionStart,n=t.selectionEnd,o=[];t&&t!==e&&t.parentNode;)o.push((i=t,[].indexOf.call(i.parentNode.childNodes,i))),t=t.parentNode;var i;return function(){if(t){for(t=e;t&&o.length;){var i=o.pop();t=t.childNodes[i]}if(t){t.focus&&t.focus();try{t.selectionStart=r,t.selectionEnd=n}catch(e){}}}}}(this.rootEl);S.call(this),e(),this.__.renderflag=0}}function j(e){switch(e.nodeName){case"TABLE":return e.childNodes&&e.childNodes[0]||e;default:return e}}function T(e){for(var t=0,r=e.length,n=0;n<r;n++){t=(t<<5)-t+e.charCodeAt(n),t|=0}return t}function A(e,t){return e.parentNode.replaceChild(t,e),t}function L(e,r){t.selectNode(e);var n=t.createContextualFragment(r);return"TBODY"===e.nodeName?n.childNodes[0]:n}function R(e,t){"string"==typeof t&&(t=t.split("."));for(var r=t.length,n=0;n<r;n++){var o=t[n],i=e;if((!(e=i[o])||"object"!=typeof e)&&n+1<r)return{last:{obj:i,prop:o}}}return{value:e,obj:i,prop:o}}var O;function C(e){if("object"==typeof e){for(var t in e)switch(typeof e[t]){case"string":case"object":e[t]=e[t]?C(e[t]):e[t]}return e}return(O=O||document.createElement("div")).textContent=e,O.innerHTML}function M(e,t,r){r=r||{},(e=function e(t,r){return"string"!=typeof t?t:e(r||document).querySelector(t)}(e))&&(r.reefEmitRootEl=e),document.dispatchEvent(new CustomEvent(t,{detail:r}))}function B(e){"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?e():document.addEventListener("DOMContentLoaded",e)}_.prototype.unmount=function(){f(this,"umnount");var e=this.__||{};if(xs.unobserve(this.data,e.obsf),e.bind)for(var t in e.bind){var r=e.bind[t];r.obsf&&xs.unobserve(r.sp.obj,r.obsf)}},_.prototype.react=function(e){e.reef=this;var t,r=this.__,n=e.root,o=this.observers,i=r.events,a=r.proprx=r.proprx||(o?y(o):"")+(i?y(i):"");if(a){var s="(:xs:(("+e.path.replace(/\./g,"\\.)|(\\*\\.))*((")+")|(\\*)))\n",l=new RegExp(s,"g"),c=a.match(l);if(c){for(var u=c[0],f=1;f<c.length;f++)c[f].length>u.length&&(u=c[f]);n=u.substring(4,u.length-1)}}var d,h=o&&o[n];if(h)if(v(h))t=h.call(this,e);else if(!e.path&&("set"===e.action||"add"===e.action)){var p=this.dot(h);v(p.value)?p.value.call(this):p.obj[p.prop]=e.value}if(i&&i[n]){var m=r.name+"."+(!0===i[n]?n:i[n]);M(this.rootEl,m,e)}if(e.value!==e.prev){this.mutate&&(d=this.mutate(this,e));var g=r.decorators;this.sym&&("done"===t||"done"===d||g&&(g[n]||g[u])||this.rerender())}},_.prototype.observe=function(e,t){l(this,"observers")[e]=t,this.__.obsrx=null},_.prototype.decorate=function(e,t){l(this,"decorators")[e]=!1!==t&&0!==t},_.prototype.events=function(e,t){l(this.__,"events")[e]=!1!==t&&0!==t&&t,this.__.evrx=null},_.prototype.watch=function(e,t){this.data[e]=t,this.data.__observe__()},_.prototype.bind=function(e,t,r,n){N(this,e,t,r,n)},_.prototype.emit=function(e,t){M(this.rootEl,e,t)},_.prototype.render_=S,_.prototype.render=function(){xs.tick(this.sym+"_rr",this,S)},_.prototype.rerender=function(){this.__.renderflag=(this.__.renderflag||0)+1,xs.tick(this.sym+"_rr",this,w,!0)},_.prototype.htmlBegin=function(e){this.__.harr&&!e||(this.__.hmap={},this.__.hgeneration=-1),this.__.harr=[],this.__.harr.html="",this.__.harr.htmlIdx=0,this.__.harr.wmap=new WeakMap,this.__.hgeneration++,this.__.fcounter=0},_.prototype.htmlUpdate=function(e,t,r){var n=this.__.hmap;if(n){var o=T(r);if((t=null==t?o:t)in n||s("updating non-existent element"),n[t].hsh!==o||e!==n[t].idx){var i=j(this.rootEl),a=n[t].el;a.getAttribute?(n[t].el=A(i.childNodes[e],L(i,r).firstChild),n[t].hsh=o,n[t].idx=e):a.nodeValue!==r&&(a.nodeValue=r)}}},_.prototype.htmlEnd=function(){var e=this.__,t=e.hgeneration,r="",n=e.harr,o=e.hmap;if(n){var i=this.__.fcounter,a=null;if(0===i)return this.htmlBegin(!0),void(this.rootEl.innerHTML="");for(var s in 0===t&&(this.rootEl.innerHTML=""),o){var l=o[s];l.generation!==t&&(l.el&&l.el.parentNode.removeChild(l.el),delete o[s])}var c=j(this.rootEl),u=document.createElement(c.nodeName);n.html&&(u=L(c,n.html),n.html="");for(var f=0,d=0;d<i;d++){var h=(l=n[d]).el,p=l.h;if("number"==typeof p){var v=u.childNodes[l.h-f];(v=A(h,v))!==h&&(l.el=h=v,f++)}else p&&(d>=c.childNodes.length?r+=p:l.el=h=L(c,p).firstChild);l.idx=d,l.h="",h&&(l.el=h,n.wmap.set(h,d),h.parentNode===c&&h.previousSibling===a||(a?c.insertBefore(h,a.nextSibling):c.childNodes&&c.childNodes[0]===h||c.insertBefore(h,c.childNodes&&c.childNodes[0])),a=h)}n.length=i;var m=c.childNodes.length;for(r&&c.insertAdjacentHTML("beforeend",r),(c=j(this.rootEl))&&n.length!==c.childNodes.length&&console.error("must be 1 html() entity for hmtl()"),d=m;d<n.length;d++)n[d].el=c.childNodes[d],n.wmap.set(n[d].el,d);return"done"}},_.prototype.htmlChild=function(e){for(;e.parentNode!==this.rootEl;)e=e.parentNode;return e},_.prototype.htmlToIdx=function(e){for(;e.parentNode!==this.rootEl;)e=e.parentNode;var t=this.__.harr.wmap.get(e);return void 0===t?-1:t},_.prototype.html=function(e,t){this.__.harr||this.htmlBegin();var r,n=this.__,o=n.harr,i=n.hmap,a=n.fcounter++,l=n.hgeneration,c=T(t);if(i[e=null==e?c:e]){if((r=i[e]).generation===l&&s("duplicate html() id"),r.generation=l,o[a]=r,r.hsh===c)return;r.h=o.htmlIdx++,o.html+=t,r.hsh=c}else r={h:t,hsh:c,idx:a,id:e,generation:l,el:null},o.splice(a,0,r),i[e]=r},_.prototype.dot=function(e,t){var r=R(this,e);if(arguments.length>1){if(!r.obj)throw Error("chain path missing");r.obj[r.prop]=t}return r},_.prototype.styleBag=function(e,t){var r=e instanceof Node?e:this.rootEl;r===this.rootEl&&(t=e);var n=T(JSON.stringify(t));if(r.__xs__style!==n){for(var o in t)r.style[o]=t[o];r.__xs__style=n}},e.autorun&&B((function(){c()})),e.use=e.use||_;var k=document.currentScript?function(e,t){return new Function(e,"return `"+t+"`;")}:function(e,t){return t=t.split("\n").join("\\\n").replace(/"/g,'\\"'),new Function(e,'var f=function (_, exp) {return eval(exp)}; f.bind(this); return "'+t+'".replace(/\\${(.*?)}/g, f)')};return{register:function(e,t,r){var n="*"===e[0]?e.substring(1):e;if(r=r||"",t.data=m(t.data,void 0),!i[n])return i[r]||s("Super Reef NOT registered: "+r),i[n]=xs.assign({},i[r],t),i[n].name=n,i[n].super=r,!0;e===n&&s("Reefer already registered: "+n)},mount:h,run:c,template:k,ready:B,emit:M,sanitize:C,styleBag:_.prototype.styleBag,registry:function(e){return e?i[e]:i},find:function(e,t){return(e=this.findAll(e,t))?e[0]:null},findAll:function(e,t){var r=0;if(e=[].slice.call((t||document).querySelectorAll(e)))for(var n=0;n<e.length;n++)e[r]=e[n].reef,r+=e[r]?1:0;return r?(e.length=r,e):null}}},window.reefer=ReeferFactory({autorun:!0})}]);
//# sourceMappingURL=reefer-core.js.map