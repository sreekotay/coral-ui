!function(r){var e={};function t(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return r[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=r,t.c=e,t.d=function(r,e,n){t.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:n})},t.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},t.t=function(r,e){if(1&e&&(r=t(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var o in r)t.d(n,o,function(e){return r[e]}.bind(null,o));return n},t.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(e,"a",e),e},t.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},t.p="",t(t.s=0)}([function(r,e){(function(){function r(t,o,i,a){if(!(t instanceof Node)&&(!t&&this.__xs__&&(t=this),t)){var c=!!t.__xs__;i&&(a=a&&a.concat()||[]).push(i),o=u(o,t,a);var p=n(t);if(!p.skip){var s=p.v;for(var _ in s)_ in t||(delete s[_],f("delete",t,_,null,null));for(_ in t)c&&!(_ in s)&&f("add",t,_,t[_],null),e(t,_,o,a);return Array.isArray(t)&&function(e,t){if(e.__xs__.arrhelpers)return;e.__xs__.arrhelpers=!0;for(var n=function(t){l(e,t,(function(){var e=this,n=e.__xs__;n.pause=!0;var o=Array.prototype[t].apply(e,arguments);return n.pause=!1,v(n.s,e,(function(){r(e)})),f(t,e,arguments,e,null),o}))},o=["pop","push","shift","unshift","splice","reverse","sort"],i=0;i<o.length;i++)n(o[i])}(t),t.__observe__||void 0!==a||void 0!==i||l(t,"__observe__",r),t}}}function e(e,t,o,i){var a=n(e),c=a.v;o!==e&&(o=u(o,e));var l=e[t];if(!(t in c)){c[t]=l;Object.defineProperty(e,t,{get:function(){return c[t]},set:function(n){var u=c[t];return c[t]=n,"object"!=typeof n||null===n||n.__xs__||v(a.s,e,(function(){r(n,o,{o:e,p:t},i)}),!0),f("set",e,t,n,u),n},enumerable:!0,configurable:!0})}"object"==typeof l&&r(l,o,{o:e,p:t},i)}var t=0;function n(r){r.__xs__||l(r,"__xs__",{s:"@"+t++,v:{},h:[]});return r.__xs__}var o,i=0;function u(r,e,t){return r!==e&&r?(r="object"==typeof r?n(r).h:[{rootobj:e,f:r,path:t,s:"#"+i++}],function(r,e,t){if(r===e)return;for(var n=t?void 0:"",o=0;o<e.length;o++){var i=e[o].s;r[i]||(void 0===n&&(n=t.reduce((function(r,e){return r+(r&&".")+e.p}),"")),r[i]=!0,r.push({f:e[o].f,s:e[o].s,path:t,dotpath:n,root:t?t[0].p:void 0}))}}(n(e).h,r,t),e):e}function a(r){if(r===this.obj)return this.prop;for(var e=this.chain,t=0;t<e.length;t++)if(e[t].o===r)return e[t].p;return null}function f(r,e,t,n,o){var i=e.__xs__;if(i&&i.h&&!i.pause)for(var u=i.h,f=0;f<u.length;f++){var c=u[f],l={rootobj:c.rootobj,obj:e,action:r,prop:t,value:n,prev:o,chain:c.path,root:c.root||t,path:c.dotpath?c.dotpath+"."+t:t,find:a};c.f.call(e,l)}}function c(r,e){if(void 0===e)return r;if("object"!=typeof e||null===e)return e;var t=Object.prototype.toString.call(e);if("[object RegExp]"===t||"[object Date]"===t||e instanceof Node)return e;if("[object Array]"===t){"[object Array]"!==Object.prototype.toString.call(r)&&(r=[]);var n=[];for(var o in e)o in r||(n[o]=e[o]);for(o in n)r[o]=n[o];return r}for(var i in"object"!=typeof r&&(r={}),e)r[i]=c(r[i],e[i]);return r}function l(r,e,t,n){return Object.defineProperty(r,e,{value:t,enumerable:!1,configurable:!0,writable:!!n}),t}var p={"@":{}};function s(){o=null;var r=p;p={"@":{}};var e=r["@"];for(var t in r["@"]=null,e)e[t]&&e[t].f.call(e[t].o,e[t].o);for(t in r)r[t]&&r[t].f.call(r[t].o,r[t].o)}function v(r,e,t,n){var i;return i="@"===r[0]?p["@"]:p,o?(r in i||n?i[r]={f:t,o:e}:(t.call(e,e),i[r]=null),!1):(n?i[r]={f:t,o:e}:t.call(e,e),o=setTimeout(s,0),!0)}var _=window.coral=window.coral||{};_.observe=r,_.unobserve=function r(e,t){if(e.__xs__){for(var n=e.__xs__.h,o=n.length-1;o>=0;o--){n[o].f===t&&n.splice(o,1)}for(var i in e)"object"==typeof i&&null!==i&&r(i[e],t)}},_.alias=function(r,e,t,n,o){if(r===t&&e===n)return null;var i=function(t){t.chain&&t.chain.length&&t.chain[0].p===n?(1===t.chain.length&&r[e]!==t.obj&&(r[e]=t.obj),t.chain[0].p=e,o(t),t.chain[0].p=n):t.chain||t.prop!==n||(t.value!==r[e]&&(r[e]=t.value),t.prop=t.path=t.root=e,o(t),t.prop=t.path=t.root=n)};if(t instanceof Node){r[e]=t[n],r.__observer__||_.observe(r);var u=Object.getOwnPropertyDescriptor(r,e);return Object.defineProperty(r,e,{get:function(){return t[n]},set:function(r){return t[n]=r,u.set(r)},enumerable:!0,configurable:!0}),null}n in t||(t[n]=t[n]),_.observe(t,i),r[e]=t[n],_.observe(r);var a=Object.getOwnPropertyDescriptor(t,n),f=a.get,c=a.set;return Object.defineProperty(r,e,{get:f,set:c,enumerable:!0,configurable:!0}),i},_.assign=function(){for(var r=arguments,e=0,t=r[0];++e<r.length;)t=c(t,r[e]);return t},_.clone=function(){for(var r=arguments,e=-1,t={};++e<r.length;)t=c(t,r[e]);return t},_.tick=v,_.dot=function(r,e){"string"==typeof e&&(e=e.split("."));for(var t=e.length,n=0;n<t;n++){var o=e[n],i=r;if((!(r=i[o])||"object"!=typeof r)&&(n+1<t||!(o in i)))return{last:{obj:i,prop:o}}}return{value:r,obj:i,prop:o}},_.privateprop=l}).call(this)}]);
//# sourceMappingURL=coral-observe-min.js.map