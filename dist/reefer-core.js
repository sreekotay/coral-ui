!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([,function(e,t,r){!function(){var e=null;window.reeferHTML=function(t){var r;(r=t)&&r.constructor&&r.call&&r.apply&&(t=t.toString().split("\n").slice(1,-1).join("\n"));var n=document.currentScript;n||(n=e),n||(n=(n=document.getElementsByTagName("script"))[n.length-1]),e=null;var o=n.reefCB;void 0===o?n.outerHTML=t:o(t),n.parentNode&&n.parentNode.removeChild(n)}}(),ReeferFactory=function(e){e=e||{};var t=document.createRange(),r=0,n={},o=0;const i={"":{template:function(){var e=this.slots||{};if(e.default){if(!this.data.datasrc)return"done";var t,r=this.data,n="datactx"in r?this.dot(r.datactx).value:{},i="datasrc"in r?this.dot(r.datasrc).value:this,a=this.data.genkey,s=i&&e[r.dataslot||"default"]||e.empty&&e.empty.text||{text:"<div> </div>"},l=r.datakey;Array.isArray(i)||(i=[i]),e.header&&this.html(-1,e.header.script?e.header(n):e.header.text);var u=this.__.hmap||{};n.__hmap__=u;for(var c=0;c<i.length;c++){var d=typeof i[c];i[c]&&(t=void 0===l?i[c].__key__:i[c][l]),a&&void 0===t&&"object"===d&&(t=xs.privateprop(i[c],"__key__","k"+o++));var f=s.script?s.script(i[c],c,n):s.text;this.html(t||c,f)}delete n.__hmap__,e.footer&&this.html(-2,e.footer.script?e.footer(n):e.footer.text)}}}};function a(){console.error(arguments)}function s(){throw console.error(arguments),Error("REEF FAULT")}function l(e,t){return e[t]=e[t]||{},e[t]}function u(e){for(var t=e||document,r=[],n=t.querySelectorAll(":not([reef-stage])[reef]"),o=0;o<n.length;o++)if(!n[o].reef){var i=c(n[o],t.reef);d(i,"mount"),i&&i.render_(),r.push(i)}return r}function c(e,t){if(!e)return null;var r=e.getAttribute("reef");try{var n=function(e){for(var t,r=e.attributes,n=0;n<r.length;n++){var o=r[n],i=o.name+"";if(0===i.indexOf("reef-p")){t=t||{};var a=o.value,s=i[6],u=a.split(s+s);a=u[0],u=u[1];var c=i.substring(7),d=f(c,a);try{a=JSON.parse(a)}catch(e){}d?l(t,"bind")[c]=d:l(t,"props")[c]=a,u&&(l(t,"events")[c]=u)}else if(0===i.indexOf("reef@")){var h=i.substring(5);l(t=t||{},"listeners")[h]=o.value}}return t}(e),o=e.cloneNode(!0);if(o&&(n=n||{},o.children))for(var i=0;i<o.children.length;i++){var s=l(n,"slots"),u=o.children[i],c=u.getAttribute,d=c&&c.call(u,"reef-slot")||"default",p=s[d]=s[d]||[];if(p.push(u),p.text=(p.text||"")+(c?u.outerHTML:u.data),"SCRIPT"===u.nodeName&&0===u.type.indexOf("reef-")){try{var v=u.getAttribute("type"),m=v.match(/\(([^)]*)\)/);m=m?m[1]:"";var g=u.innerHTML.trim();if(g)switch(v.split("(")[0].trim()){case"reef-function":u.reefScript=new Function(m,g);break;case"reef-template":u.reefScript=M(m,g);break;default:a("unknown reef slot type")}}catch(e){a("reef-slot script parsing ERROR:",g||u.type,u,e)}"el"in p||(p.el=u),!("script"in p)&&u.reefScript&&(p.script=u.reefScript)}}return h(e,r,n,t)}catch(t){a("Reefer failed to mount: ",r,e,t)}return null}function d(e,t){return e.lifecycle&&e.lifecycle[t]&&e.lifecycle[t].call(e)}function f(e,t){if("~"!==t[0])return!1;var r=t.split("~");return{prop:r[1],selector:r.length<2?"^":r[2]}}function h(t,r,o,a){o=o||{},i[r]||s("Reefer NOT registered: ",r);var l=i[r],u=t.reef=new e.use(t,l,o);if(u.name=r,t.setAttribute("reef-stage","mounted"),u.listeners){var c=u.listeners;for(var d in c){var f=d.split("@"),h=f[0];n[h]||(n[h]=p(h),document.addEventListener(h,n[h],!1)),c[h]=c[d],"stop"===c[f[1]]&&(c[h].reefStop=!0)}u.listeners=null}return u}function p(e){return function(t){for(var r,n,o=t.detail&&t.detail.reefEmitRootEl||t.target,a="reef@"+e,s=[];o;){var l=o.getAttribute&&o.getAttribute(a);l&&(l=l.split("@"),s.push(l));var u=o.reef;if(t.reef||(t.reef=u),u&&s.length)for(var c=0;c<s.length;c++){var d=s[c],f=d[0].trim(),h=(n=void 0,(n=f.match(/\(([^)]*)\)/))&&n[1]||"");if(h){h=h.split(","),f=f.split("(")[0];var p=h.indexOf("$event");p>=0&&(h[p]=t)}var m,g=u.dot(f);if(void 0!==g.value&&(v(g.value)?m=g.value.apply(g.obj,h||[t]):u.dot(f,h[0]),"stop"===m||"stop"===d[1]))return}var _=u&&u.name;if(i[_]&&(r=i[_]).listeners&&r.listeners[e]&&("stop"===r.listeners[e].call(u,t)||r.listeners[e].reefStop))return;o=o.parentNode}}}function v(e){return!!(e&&e.constructor&&e.call&&e.apply)}function m(e,t){if(!Array.isArray(e))return e;for(var r={},n=0;n<e.length;n++)r[e[n]]=arguments.length<=1||t;return r}function g(e,t,r,n){for(var o=0;o<t.length;o++){var i=t[o];void 0!==(i in n?n[i]:r[i])&&(e[i]=xs.clone(r[i],n[i]))}}function _(e,t,n){t=t||{},n=n||{};var o=this.__={};g(o,["template","update","bind"],t,n),g(this,["methods","observers","listeners","mutate","lifecycle"],t,n),"shared"in t&&(this.shared=t.shared),(t.events||n.events)&&(o.events=xs.assign({},m(t.events),n.events)),(t.decorators||n.decorators)&&(o.decorators=xs.assign({},m(t.decorators),m(n.decorators))),(t.slots||n.slots)&&xs.assign(l(this,"slots"),t.slots,n.slots),"super"in t&&(this.super=i[t.super]);var a=this.methods;if(a)for(var s in a)a[s]=v(a[s])?a[s].bind(this):a[s];this.rootEl=e,o.obsf=_.prototype.react.bind(this);var u=this.data=xs.observe({},o.obsf);for(s in xs.assign(u,o.decorators,t.data,n.props),o.bind)N(this,"data."+s,o.bind[s].selector,o.bind[s].prop);return xs.observe(u),this.sym="$"+r++,this}function y(e){var t="";for(var r in e)t+=":xs:"+r+"\n";return t}function b(e,t,r){var n=this,o=(r=r||{}).xhr||new XMLHttpRequest;return o.onerror=function(e){console.log("REEF HTTP LOAD",e),O(n.rootEl,"reefLoadDataFail",{url:t})},o.onload=function(t){if(200===this.status){var r=this.response;try{r=JSON.parse(r)}catch(e){}n.dot(e,r)}else this.status&&o.onerror(t)},o.open(r.method||"GET",t,!0),o.send(null),o}function x(e,t){var r=this;if("loading"!==document.readyState){var n=document.createElement("script");n.src=t,document.getElementsByTagName("head")[0].appendChild(n)}else document.write('<script src="'+t+'"></script'),n=(n=document.getElementsByTagName("script"))[n.length-1];return n.onerror=function(e){console.log("REEF SCRIPT LOAD",e),n.parentNode.removeChild(n),O(r.rootEl,"reefLoadHTMLFail",{url:t})},n.reefCB=function(t){r.dot(e,t)},rf_script=n,n}function E(e,t){var r=t.split(".");if(sp=L(e,r),sp.obj)return sp;for(var n=t.split("."),o=e,i=0;i<n.length;i++){var a=o[n[i]];null!=a&&"object"==typeof a||(o[n[i]]=i==n.length-1?void 0:{}),o=o[n[i]]}return L(e,r)}function N(e,t,r,n,o){var i,a;r=r||"^";var u=l(e.__,"bind"),c=l(u,t);if(n=n||t,c.proppath!==t||c.selector!==r||c.prop!==n){switch(r[0]){case"^":a=E(e,n);break;case"#":case".":case"[":var d=(o||document).querySelector(r);(i=d&&d.reef)||s("unable to locate reef for bind"),a=E(i,n);break;case"$":d=r.substring(1,6);var f=r.substring(6);switch(u[t]={proppath:t,selector:r,prop:n},d){case"json:":return b.call(e,t,f);case"html:":return x.call(e,t,f)}default:s("unknown data bind: "+t+": "+r)}var h=L(e,t);h.obj||s("data bind not found: "+t);var p=xs.alias(h.obj,h.prop,a.obj,a.prop,(function(t){e.rootEl&&e.rootEl.getRootNode()===document?e.react(t):e.unmount()}));u[t]={proppath:t,selector:r,prop:n,sp:a,unobs:p}}}function S(){d(this,"beforeRender");var e=new Date,t=this.rootEl;if(t&&t.getRootNode()===document){var r=this.__.template;if(r){var n=this.__.fcounter;n&&this.htmlBegin(),n=this.__.fcounter;var o=r.call(this,this.slots)||"";this.__.harr?this.htmlEnd():"string"==typeof o?"done"!==o&&(t.innerHTML=o):(t.innerHTML="",Array.isArray(o)?o.forEach((function(e){t.appendChild(e)})):t.appendChild(o)),t.parentNode.classList.contains("container")&&(t=t),u(t),t.parentNode.classList.contains("container")&&console.log("render",new Date-e)}d(this,"afterRender")}else this.unmount()}function w(){if(0!==this.__.renderflag){var e=function(e){var t=document.activeElement;if(t)for(var r=t.selectionStart,n=t.selectionEnd,o=[];t&&t!==e&&t.parentNode;)o.push((i=t,[].indexOf.call(i.parentNode.childNodes,i))),t=t.parentNode;var i;return function(){if(t){for(t=e;t&&o.length;){var i=o.pop();t=t.childNodes[i]}if(t){t.focus&&t.focus();try{t.selectionStart=r,t.selectionEnd=n}catch(e){}}}}}(this.rootEl);S.call(this),e(),this.__.renderflag=0}}function T(e){switch(e.nodeName){case"TABLE":return e.childNodes&&e.childNodes[0]||e;default:return e}}function j(e){for(var t=0,r=e.length,n=0;n<r;n++){t=(t<<5)-t+e.charCodeAt(n),t|=0}return t}function A(e,t){return e.parentNode.replaceChild(t,e),t}function R(e,r){t.selectNode(e);var n=t.createContextualFragment(r);return"TBODY"===e.nodeName?n.childNodes[0]:n}function L(e,t){"string"==typeof t&&(t=t.split("."));for(var r=t.length,n=0;n<r;n++){var o=t[n],i=e;if("object"!=typeof(e=i[o])&&n+1<r)return{last:{obj:i,prop:o}}}return{value:e,obj:i,prop:o}}function O(e,t,r){r=r||{},(e=function e(t,r){return"string"!=typeof t?t:e(r||document).querySelector(t)}(e))&&(r.reefEmitRootEl=e),document.dispatchEvent(new CustomEvent(t,{detail:r}))}function C(e){"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?e():document.addEventListener("DOMContentLoaded",e)}_.prototype.unmount=function(){d(this,"umnount");var e=this.__||{};if(xs.unobserve(this.data,e.obsf),e.bind)for(var t in e.bind){var r=e.bind[t];r.obsf&&xs.unobserve(r.sp.obj,r.obsf)}},_.prototype.react=function(e){e.reef=this;var t,r=this.__,n=e.root,o=this.observers,i=r.events,a=r.proprx=r.proprx||(o?y(o):"")+(i?y(i):"");if(a){var s="(:xs:(("+e.path.replace(/\./g,"\\.)|(\\*\\.))*((")+")|(\\*)))\n",l=new RegExp(s,"g"),u=a.match(l);if(u){for(var c=u[0],d=1;d<u.length;d++)u[d].length>c.length&&(c=u[d]);n=c.substring(4,c.length-1)}}var f,h=o&&o[n];if(h)if(v(h))t=h.call(this,e);else if(!e.path&&("set"===e.action||"add"===e.action)){var p=this.dot(h);v(p.value)?p.value.call(this):p.obj[p.prop]=e.value}if(i&&i[n]){var m=r.name+"."+(!0===i[n]?n:i[n]);O(this.rootEl,m,e)}if(e.value!==e.prev){this.mutate&&(f=this.mutate(this,e));var g=r.decorators;this.sym&&("done"===t||"done"===f||g&&(g[n]||g[c])||this.rerender())}},_.prototype.observe=function(e,t){l(this,"observers")[e]=t,this.__.obsrx=null},_.prototype.decorate=function(e,t){l(this,"decorators")[e]=!1!==t&&0!==t},_.prototype.events=function(e,t){l(this.__,"events")[e]=!1!==t&&0!==t&&t,this.__.evrx=null},_.prototype.watch=function(e,t){this.data[e]=t,this.data.__observe__()},_.prototype.bind=function(e,t,r,n){N(this,e,t,r,n)},_.prototype.emit=function(e,t){O(this.rootEl,e,t)},_.prototype.render_=S,_.prototype.render=function(){xs.tick(this.sym+"_rr",this,S)},_.prototype.rerender=function(){this.__.renderflag=(this.__.renderflag||0)+1,xs.tick(this.sym+"_rr",this,w,!0)},_.prototype.htmlBegin=function(e){this.__.harr&&!e||(this.__.hmap={},this.__.hgeneration=-1),this.__.harr=[],this.__.harr.html="",this.__.harr.htmlIdx=0,this.__.harr.wmap=new WeakMap,this.__.hgeneration++,this.__.fcounter=0},_.prototype.htmlUpdate=function(e,t,r){var n=this.__.hmap;if(n){var o=j(r);if((t=null==t?o:t)in n||s("updating non-existent element"),n[t].hsh!==o||e!==n[t].idx){var i=T(this.rootEl),a=n[t].el;a.getAttribute?(n[t].el=A(i.childNodes[e],R(i,r).firstChild),n[t].hsh=o,n[t].idx=e):a.nodeValue!==r&&(a.nodeValue=r)}}},_.prototype.htmlEnd=function(){var e=this.__,t=e.hgeneration,r="",n=e.harr,o=e.hmap;if(n){var i=this.__.fcounter,a=null;if(0===i)return this.htmlBegin(!0),void(this.rootEl.innerHTML="");for(var s in 0===t&&(this.rootEl.innerHTML=""),o){var l=o[s];l.generation!==t&&(l.el&&l.el.parentNode.removeChild(l.el),delete o[s])}var u=T(this.rootEl),c=document.createElement(u.nodeName);n.html&&(c=R(u,n.html),n.html="");for(var d=0,f=0;f<i;f++){var h=(l=n[f]).el,p=l.h;if("number"==typeof p){var v=c.childNodes[l.h-d];(v=A(h,v))!==h&&(l.el=h=v,d++)}else p&&(f>=u.childNodes.length?r+=p:l.el=h=R(u,p).firstChild);l.idx=f,l.h="",h&&(l.el=h,n.wmap.set(h,f),h.parentNode===u&&h.previousSibling===a||(a?u.insertBefore(h,a.nextSibling):u.childNodes&&u.childNodes[0]===h||u.insertBefore(h,u.childNodes&&u.childNodes[0])),a=h)}n.length=i;var m=u.childNodes.length;for(r&&u.insertAdjacentHTML("beforeend",r),(u=T(this.rootEl))&&n.length!==u.childNodes.length&&console.error("must be 1 html() entity for hmtl()"),f=m;f<n.length;f++)n[f].el=u.childNodes[f],n.wmap.set(n[f].el,f);return"done"}},_.prototype.htmlChild=function(e){for(;e.parentNode!==this.rootEl;)e=e.parentNode;return e},_.prototype.htmlToIdx=function(e){for(;e.parentNode!==this.rootEl;)e=e.parentNode;var t=this.__.harr.wmap.get(e);return void 0===t?-1:t},_.prototype.html=function(e,t){this.__.harr||this.htmlBegin();var r,n=this.__,o=n.harr,i=n.hmap,a=n.fcounter++,l=n.hgeneration,u=j(t);if(i[e=null==e?u:e]){if((r=i[e]).generation===l&&s("duplicate html() id"),r.generation=l,o[a]=r,r.hsh===u)return;r.h=o.htmlIdx++,o.html+=t,r.hsh=u}else r={h:t,hsh:u,idx:a,id:e,generation:l,el:null},o.splice(a,0,r),i[e]=r},_.prototype.dot=function(e,t){var r=L(this,e);if(arguments.length>1){if(!r.obj)throw Error("chain path missing");r.obj[r.prop]=t}return r},_.prototype.styleBag=function(e,t){var r=e instanceof Node?e:this.rootEl;r===this.rootEl&&(t=e);var n=j(JSON.stringify(t));if(r.__xs__style!==n){for(var o in t)r.style[o]=t[o];r.__xs__style=n}},e.autorun&&C((function(){u()})),e.use=e.use||_;var M=document.currentScript?function(e,t){return new Function(e,"return `"+t+"`;")}:function(e,t){return t=t.split("\n").join("\\\n").replace(/"/g,'\\"'),new Function(e,'var f=function (_, exp) {return eval(exp)}; f.bind(this); return "'+t+'".replace(/\\${(.*?)}/g, f)')};return{register:function(e,t,r){var n="*"===e[0]?e.substring(1):e;if(r=r||"",t.data=m(t.data,void 0),!i[n])return i[r]||s("Super Reef NOT registered: "+r),i[n]=xs.assign({},i[r],t),i[n].name=n,i[n].super=r,!0;e===n&&s("Reefer already registered: "+n)},mount:h,run:u,template:M,ready:C,emit:O,styleBag:_.prototype.styleBag,registry:function(e){return e?i[e]:i},find:function(e,t){return(e=this.findAll(e,t))?e[0]:null},findAll:function(e,t){var r=0;if(e=[].slice.call((t||document).querySelectorAll(e)))for(var n=0;n<e.length;n++)e[r]=e[n].reef,r+=e[r]?1:0;return r?(e.length=r,e):null}}},window.reefer=ReeferFactory({autorun:!0})}]);
//# sourceMappingURL=reefer-core.js.map