/*!
 * hAzzle.js
 * Copyright (c) 2014 Kenny Flashlight
 * Version: 0.2
 * Released under the MIT License.
 *
 * Date: 2014-04-04
 */

(function(y,u){function Z(a){try{a.apply(this,ya)}catch(b){if(null!==$)$[J](this,a)}}function K(a,b){var d=t[c.getUID(a)];return null===b?d:d&&d[b]}function aa(a,b){var d=t[c.getUID(a)];if(null===b)return!1;if(d&&d[b])return!0}function L(a,b){var d=c.getUID(a);b?(d=t[d])&&delete d[b]:t[d]={}}function ba(a){return c.nodeType(1,a)||c.nodeType(9,a)||c.nodeType(11,a)?!0:!1}function za(){var a=document.createElement("div");a.appendChild(this.cloneNode(!0));return a.innerHTML}function M(a,b){return a.replace(m.numbering,
function(a){for(var e=b+1,e=e.toString();e.length<a.length;)e="0"+e;return e})}function ca(a){if(a=a.relatedTarget){var b;if(b=a!==this)if(b="xul"!==a.prefix)if(b=!/document/.test(this.toString())){a:{for(;a=a.parentNode;)if(a===this){a=1;break a}a=0}b=!a}a=b}else a=null===a;return a}function da(a,b,d,e){var c=function(d,c){return b.apply(a,e?r.call(c).concat(e):c)},g=d?function(e){var g=b._RachelleDel?b._RachelleDel.ft(e.target,a):this;if(d.apply(g,arguments))return e&&(e.currentTarget=g),c(e,arguments)}:
function(a){return c(a,arguments)};g._RachelleDel=b._RachelleDel;return g}function D(a,b,d,e,c,g){if(!(this instanceof D))return!1;var k=N[b];"unload"===b&&(d=O(P,a,b,d,e));k&&(k.condition&&(d=da(a,d,k.condition,g)),b=k.base||b);this.element=a;this.type=b;this.original=e;this.namespaces=c;this.eventType=b;this.target=a;this.handler=da(a,d,null,g)}function Q(a,b){var d=v.get(this,b||a.type,null,!1),e=d.length,c=0;a=new R(a,this,!0);b&&(a.type=b);for(;c<e&&!a.isImmediatePropagationStopped();c++)d[c].removed||
d[c].handler.call(this,a)}function O(a,b,d,e,c){return function(){e.apply(this,arguments);a(b,d,c)}}function P(a,b,d,c){b=b&&b.replace(m.nameRegex,"");var f=v.get(a,b,null,!1),g=0,k;b={};for(k=f.length;g<k;g++)d&&f[g].original!==d||!f[g].inNamespaces(c)||(v.del(f[g]),b[f[g].eventType]||(b[f[g].eventType]={t:f[g].eventType,c:f[g].type}));d=s(b);for(c=d.length;c--;)if(!v.has(a,b[d[c]].t,null,!1)&&a[ea])a[ea](b[d[c]].t,Q,!1)}function fa(a,b){function d(b,d){for(var e,h=c.isString(a)?c.select(a,d):a;b&&
b!==d;b=b.parentNode)for(e=h.length;e--;)if(h[e]===b)return b}function e(a){if(!0!==a.target.disabled){var c=d(a.target,this);c&&b.apply(c,arguments)}}e._RachelleDel={ft:d,selector:a};return e}function z(a,b,d){var e=c.isString(b),f;if(e&&0<b.indexOf(" ")){b=b.split(b);for(f=b.length;f--;)z(a,b[f],d);return a}(f=e&&b.replace(m.nameRegex,""))&&N[f]&&(f=N[f].base);if(!b||e){if(b=e&&b.replace(m.namespaceRegex,""))b=b.split(".");P(a,f,d,b)}else if(c.isFunction(b))P(a,null,b);else for(d=s(b),f=d.length;f--;)z(a,
d[f],b[d[f]]);return a}function ga(a,b,d,e,f){var g,k,h,l,q,A;if(a.disabeled&&x[disabeled](a,g)||x.nodeType(a))return!1;if(d===u&&"object"===typeof b)for(g=s(b),h=g.length;h--;)ga.call(this,a,g[h],b[g[h]]);else{c.isFunction(d)?(l=r.call(arguments,3),e=g=d):(g=e,l=r.call(arguments,4),e=fa(d,g));k=b.split(" ");f&&(e=O(z,a,b,e,g));for(h=k.length;h--;)if(A=v.put(q=new D(a,k[h].replace(m.nameRegex,""),e,g,k[h].replace(m.namespaceRegex,"").split("."),l,!1)))a[ha](q.eventType,Q,!1);return a}}function Aa(a,
b){if(!p[a+b]){c.each(a,function(a,d){if(d===b)return b});for(var d=b.charAt(0).toUpperCase()+b.slice(1),e=b,f=ia.length;f--;)b=ia[f]+d,c.each(a,function(a,d){if(d===b)return b});p[a+b]=e}return p[a+b]}function ja(a,b){b=Ba(b);b=ka[b]||(ka[b]=Aa(a.style,b));return a.style.getPropertyValue(b)||y.getComputedStyle(a,null).getPropertyValue(b)}function E(a,b,d){"number"===typeof d&&-1===Ca.indexOf(b)&&(d+="px");a.style[(null===d||""===d?"remove":"set")+"Property"](b,""+d);return a}function la(a){var b=
ja(a,"display");"none"!==b&&c.data(a,"_display",b);E(a,"display","none")}function ma(a){return E(a,"display",c.data(a,"_display")||"block")}function B(a){return c.nodeTypes[3](a)||c.nodeTypes[8](a)?!0:!1}function Ba(a){p[a]||(p[a]=a.replace(/^-ms-/,"ms-").replace(/^.|-./g,function(a,d){return 0===d?a.toLowerCase():a.substr(1).toUpperCase()}));return p[a]}function Da(a,b){var d,e,f=b||!1,g=[],k=encodeURIComponent,h=function(a,b){b=c.isFunction(b)?b():null===b?"":b;g[g.length]=k(a)+"="+k(b)};if(c.isArray(a))for(e=
0;a&&e<a.length;e++)h(a[e].name,a[e].value);else for(e=0;d=s(a)[e];e+=1)S(d,a[d],f,h,a);return g.join("&").replace(/%20/g,"+")}function S(a,b,d,e,f){var g,k=/\[\]$/;if(c.isArray(b))for(f=0;b&&f<b.length;f++)g=b[f],d||k.test(a)?e(a,g):S(a+"["+(c.isObject(g)?f:"")+"]",g,d,e);else if(b&&"[object Object]"===b.toString())for(g in b)f[na](a)&&S(a+"["+g+"]",b[g],d,e);else e(a,b)}function Ea(a){F=a}function Fa(a,b,d){var e=oa++,f=a.jsonpCallback||"callback";a=a.jsonpCallbackName||"hAzzel_"+pa();var g=RegExp("((^|\\?|&)"+
f+")=([^&]+)"),k=d.match(g),h=n[Ga]("script"),l=0;k?"?"===k[3]?d=d.replace(g,"$1="+a):a=k[3]:d=(d+"&"+(f+"="+a)).replace(/[&?]+/,"?");win[a]=Ea;h.type="text/javascript";h.src=d;h.async=!0;c.isDefined(h.onreadystatechange)&&!Ha&&(h.event="onclick",h.htmlFor=h.id="_hAzzel_"+e);h.onload=h.onreadystatechange=function(){if(h.readyState&&"complete"!==h.readyState&&"loaded"!==h.readyState||l)return!1;h.onload=h.onreadystatechange=null;if(h.onclick)h.onclick();b(F);F=u;T.removeChild(h);l=1};T.appendChild(h);
return{abort:function(){h.onload=h.onreadystatechange=null;F=u;T.removeChild(h);l=1}}}if(!y.hAzzle){var n=y.document,ha="addEventListener",ea="removeEventListener",na="hasOwnProperty",Ga="createElement",J="call",qa=n.documentElement||{},U=Array.prototype,ra=Object.prototype,r=U.slice,Ia=U.splice,Ja=U.concat,Ka=ra.toString,pa=Date.now||function(){return(new Date).getTime()},s=Object.keys||function(a){if(a!==Object(a))throw"Syntax error, unrecognized expression: Invalid object";var b=[],d;for(d in a)na[J](a,
d)&&b.push(d);return b},La={current:0,next:function(){return++this.current}},p=[],V=[],m={namespaceRegex:/[^\.]*(?=\..*)\.|.*/,nameRegex:/\..*/,specialSplit:/\s*,\s*|\s+/,operators:/[>+]/g,multiplier:/\*(\d+)$/,id:/#[\w-$]+/g,tagname:/^\w+/,classname:/\.[\w-$]+/g,attributes:/\[([^\]]+)\]/g,values:/([\w-]+)(\s*=\s*(['"]?)([^,\]]+)(\3))?/g,numbering:/[$]+/g,text:/\{(.+)\}/,idClassTagNameExp:/^(?:#([\w-]+)|\.([\w-]+)|(\w+))$/,tagNameAndOrIdAndOrClassExp:/^(\w+)(?:#([\w-]+)|)(?:\.([\w-]+)|)$/},W={tabindex:"tabIndex",
readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},G={1:function(a){if(1===a.nodeType)return!0},2:function(a){if(2===a.nodeType)return!0},3:function(a){if(3===a.nodeType)return!0},4:function(a){if(4===a.nodeType)return!0},6:function(a){if(6===a.nodeType)return!0},8:function(a){if(8===a.nodeType)return!0},9:function(a){if(9===
a.nodeType)return!0},11:function(a){if(11===a.nodeType)return!0}},H=n.createElement("div"),c=function(a,b){return new c.fn.init(a,b)},X=c.support={};X.byAll=!!n.querySelectorAll;X.classList=!!n.createElement("p").classList;c.fn=c.prototype={length:0,init:function(a,b){var d,e;if(a instanceof c)return a;if(c.isString(a)){if(V[a]&&!b){this.elems=d=V[a];for(e=this.length=d.length;e--;)this[e]=d[e];return this}this.elems=V[a]=c.select(a,b)}else{if(c.isFunction(a))return c.ready(a);if(a instanceof Array)this.elems=
c.unique(a.filter(c.isElement));else{if(c.isObject(a))return this.elems=[a],this.length=1,this[0]=a,this;c.isNodeList(a)?this.elems=r.call(a).filter(c.isElement):c.isElement(a)?this.elems=[a]:this.elems=[]}}d=this.elems;for(e=this.length=d.length;e--;)this[e]=d[e];return this},each:function(a,b){return c.each(this,a,b)},find:function(a){if(a){var b;b=1===this.length?"string"!==typeof a?a[0]:c(this.elems[0],a):this.elems.reduce(function(b,e){return b.concat(c.select(a,e))},[]);return c.create(b)}return this},
filter:function(a,b){if("function"===typeof a){var d=a;return c.create(this.elems.filter(function(a,c){return d.call(a,a,c)!==(b||!1)}))}a&&"!"===a[0]&&(a=a.charAttr(1),b=!0);return c.create(this.elems.filter(function(d){return c.matches(d,a)!==(b||!1)}))},contains:function(a){var b;return c.create(this.elems.reduce(function(d,e){b=c.select(a,e);return d.concat(b.length?e:null)},[]))},not:function(a){return this.filter(a,!0)},is:function(a){return 0<this.length&&0<this.filter(a||[]).length},pluck:function(a,
b){b&&c.isNumber(b);return c.pluck(this.elems,a)},put:function(a,b){c.put(this.elems,a,b);return this},get:function(a){return c.isDefined(a)?this.elems[0>a?this.elems.length+a:a]:this.elems},map:function(a){return c(this.elems.map(a))},sort:function(a){return c(this.elems.sort(a))},concat:function(){var a=r.call(arguments).map(function(a){return a instanceof c?a.elements:a});return c(Ja.apply(this.elems,a))},slice:function(a,b){return c(r.call(this.elems,a,b))},splice:function(a,b){return c(Ia.call(this.elems,
a,b))},push:function(a){return c.isElement(a)?(this.elems.push(a),this.length=this.elems.length,this.length-1):-1},indexOf:function(a){return c.indexOf(this.elems,a)},reduce:function(a,b,d,c){return this.elems.reduce(a,b,d,c)},reduceRight:function(a,b,d,c){return this.elems.reduceRight(a,b,d,c)},iterate:function(a,b){return function(d,c,f,g){return this.each(function(){a.call(b,this,d,c,f,g)})}},eq:function(a){return null===a?c():c(this.get(a))}};c.fn.init.prototype=c.fn;c.extend=c.fn.extend=function(){var a=
arguments[0]||{};"object"!==typeof a&&"function"!==typeof a&&(a={});1===arguments.length&&(a=this);for(var b=r.call(arguments),d,c=b.length;c--;){d=b[c];for(var f in d)a[f]!==d[f]&&(a[f]=d[f])}return a};c.extend({each:function(a,b){var d=0,c=a.length;if(a.length===+a.length)for(;d<c&&!1!==b.call(a[d],d,a[d++]););else for(c=s(a),d=c.length;d--&&!1!==b.call(a[c],c,a[c]););return a},type:function(a){return(a=Ka.call(a).match(/\s(\w+)\]$/))&&a[1].toLowerCase()},is:function(a,b){return 0<=c.indexOf(a,
c.type(b))},isElement:function(a){return a&&(G[1](a)||G[9](a))},isNodeList:function(a){return a&&c.is(["nodelist","htmlcollection","htmlformcontrolscollection"],a)},IsNaN:function(a){return!(0>=a)&&!(0<a)},isUndefined:function(a){return"undefined"===typeof a},isDefined:function(a){return"undefined"!==typeof a},isObject:function(a){return null!==a&&"object"==typeof a},isString:function(a){return"string"===typeof a},isNumeric:function(a){return!c.IsNaN(parseFloat(a))&&isFinite(a)},isEmptyObject:function(a){for(var b in a)return!1;
return!0},isFunction:function(a){return"function"===typeof a},isArray:Array.isArray,isArrayLike:function(a){if(null===a||c.isWindow(a))return!1},isWindow:function(a){return null!==a&&a===a.window},isPlainObject:function(a){return c.isObject(a)&&!c.isWindow(a)&&Object.getPrototypeOf(a)===ra},isBoolean:function(a){return"boolean"===typeof a},unique:function(a){return a.filter(function(b,d){return c.indexOf(a,b)===d})},create:function(a,b){return c.isUndefined(b)?c(a):c(a).filter(b)},prefix:function(a,
b){var d,c=a[0].toUpperCase()+a.substring(1),f,g=["moz","webkit","ms","o"];b=b||y;if(d=b[a])return d;for(;(f=g.shift())&&!(d=b[f+c]););return d},matches:function(a,b){var d;if(!a||!c.isElement(a)||!b)return!1;if(b.nodeType)return a===b;if(b instanceof c)return b.elems.some(function(b){return c.matches(a,b)});if(a===n)return!1;if(d=c.prefix("matchesSelector",H))return d.call(a,b);a.parentNode||H.appendChild(a);d=0<=c.indexOf(c.select(b,a.parentNode),a);a.parentNode===H&&H.removeChild(a);return d},
pluck:function(a,b){return a.map(function(a){return a[b]})},containsClass:function(a,b){return X.classList?a.classList.contains(b):c.contains((""+a.className).split(" "),b)},normalizeCtx:function(a){if(!a)return n;if("string"===typeof a)return c.select(a)[0];if(!a.nodeType&&a instanceof Array)return a[0];if(a.nodeType)return a},select:function(a,b){var d,e=[];b=c.normalizeCtx(b);if(d=m.idClassTagNameExp.exec(a))if(a=d[1])e=(e=b.getElementById(a))?[e]:[];else if(a=d[2])e=b.getElementsByClassName(a);
else{if(a=d[3])e=b.getElementsByTagName(a)}else if(d=m.tagNameAndOrIdAndOrClassExp.exec(a)){var f=b.getElementsByTagName(d[1]),g=d[2],k=d[3];c.each(f,function(){(this.id===g||c.containsClass(this,k))&&e.push(this)})}else e=b.querySelectorAll(a);return c.isNodeList(e)?r.call(e):c.isElement(e)?[e]:e},contains:function(a,b){if(b)for(;b=b.parentNode;)if(b===a)return!0;return!1},indexOf:function(a,b){for(var d=0,c;c=a[d];d+=1)if(b===c)return d;return!1},now:pa,nodeType:function(a,b){if(G[a])return G[a](b)},
trim:function(a){return a.trim()},noop:function(){},inArray:function(a,b){return c.inArray(a,b)},getUID:function(a){return a.hAzzle_id||(a.hAzzle_id=La.next())},put:function(a,b,d){return c.each(a,function(c){a[c][b]=d})},merge:function(a,b){for(var d=+b.length,c=0,f=a.length;c<d;c++)a[f++]=b[c];a.length=f;return a},getClosestNode:function(a,b,d,e){do a=a[b];while(a&&(d&&!c.matches(d,a)||!c.isElement(a)));c.isDefined(e)&&null!==a&&c.nodeType(e,a);return a}});var C=[],ya=[],sa=!1,$=null;c.extend({ready:function(a){document.addEventListener("DOMContentLoaded",
function(){sa=!0;for(var a=0,d=C.length;a<d;a+=1)Z(C[a]);C=[]},!0);sa?Z(a):C[C.length]=a}});c.fn.extend({pluckNode:function(a){return this.map(function(b){return c.getClosestNode(b,a)})},closest:function(a){return this.map(function(b){return c.nodeType(1,b)&&c.matches(b,a)?b:c.getClosestNode(b,"parentNode",a,11)})},index:function(a){return a?this.indexOf(c(a)[0]):this.parent().children().indexOf(this[0])||-1},add:function(a,b){var d=a;c.isString(a)&&(d=p[a]?p[a]:p[a]=c(a,b).elems);return this.concat(d)},
parent:function(a){return c(this.pluck("parentNode"),a,11)},parents:function(a){for(var b=[],d=this.elems,e=function(a){if((a=a.parentNode)&&a!==n&&0>b.indexOf(a))return b.push(a),a};0<d.length&&d[0]!==u;)d=d.map(e);return c.create(b,a)},children:function(a){return c.create(this.reduce(function(a,d){var c=r.call(d.children);return a.concat(c)},[]),a)},next:function(){return c.create(this.pluckNode("nextSibling"))},prev:function(){return c.create(this.pluckNode("previousSibling"))},first:function(){return c.create(this.get(0))},
last:function(){return c.create(this.get(-1))},siblings:function(a){var b=[],d,e,f,g;p[a]||(this.each(function(){e=this;d=r.call(e.parentNode.childNodes);f=0;for(g=d.length;f<g;f++)c.isElement(d[f])&&d[f]!==e&&b.push(d[f])}),p[a]=b);return c.create(p[a],a)}});var t={};c.extend({hasData:function(a,b){if(a instanceof c){if(aa(a,b))return!0}else if(aa(c(a)[0],b))return!0;return!1},removeData:function(a,b){if(a instanceof c){if(L(a,b))return!0}else if(L(c(a)[0],b))return!0;return!1},data:function(a,b,
d){c.isDefined(d)?(a=c.getUID(a),(t[a]||(t[a]={}))[b]=d,b=void 0):b=K(a,b);return b}});c.fn.extend({removeData:function(a){this.each(function(){L(this,a)});return this},data:function(a,b){return c.isDefined(b)?(this.each(function(){var d=c.getUID(this);(t[d]||(t[d]={}))[a]=b}),this):1===this.elems.length?K(this.elems[0],a):this.elems.map(function(b){return K(b,a)})}});var Ma={multiple:!0,selected:!0,checked:!0,disabled:!0,readOnly:!0,required:!0,open:!0},Na={input:!0,select:!0,option:!0,textarea:!0,
button:!0,form:!0,details:!0},ta={first:"beforeBegin",middle:"afterBegin",center:"afterBegin",last:"beforeEnd"};c.extend({getValue:function(a){if("SELECT"===a.nodeName&&a.multiple){for(var b,d=a.options,e=a.selectedIndex,f=(a="select-one"===a.type||0>e)?null:[],g=a?e+1:d.length,k=0>e?g:a?e:0;k<g;k++)if(b=d[k],!(!b.selected&&k!==e||b.disabled||b.parentNode.disabled&&c.nodeName(b.parentNode,"optgroup"))){b=c(b).val();if(a)return b;f.push(b)}return f}return a.value},getText:function(a){var b,d="",e=
0;if(!a.nodeType)for(;b=a[e++];)d+=c.getText(b);else if(ba(a)){if(c.isString(a.textContent))return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)d+=c.getText(a)}else if(c.nodeType(3,a)||c.nodeType(4,a))return a.nodeValue;return d}});c.fn.extend({text:function(a,b){return c.isDefined(a)?this.empty().each(function(){ba(this)&&(c.isDefined(HTMLElement)&&HTMLElement.prototype.insertAdjacentText?this.insertAdjacentText(ta[b]?ta[b]:"beforeEnd",a):this.textContent=a)}):c.getText(this)},html:function(a,
b){if(c.isString(a))return this.empty().each(function(){c.nodeType(1,this)&&this.insertAdjacentHTML("beforeend",a||"")});if(c.nodeType(1,this[0]))return this[0].innerHTML},cleanData:function(a){},empty:function(){return this.put("textContent","",1)},clone:function(){return this.map(function(){return this.cloneNode(!0)})},remove:function(){return this.each(function(){this.parentNode&&this.parentNode.removeChild(this)})},val:function(a){return a?this.each(function(b,d){var e;c.nodeType(1,d)&&(e=c.isFunction(a)?
a.call(d,b,c(d).val()):a,null===e?e="":"number"===typeof e&&(e+=""),d.value=e)}):this[0]&&c.getValue(this[0])},attr:function(a,b){if(c.isObject(a))return this.each(function(b,d){c.nodeType(3,d)||c.nodeType(8,d)||c.nodeType(2,d)||c.each(a,function(a,b){d.setAttribute(b,a+"")})});if(c.isUndefined(b)){var d=this[0];if("value"===a&&"input"===d.nodeName.toLowerCase())return c.getValue(d);d=d.getAttribute(a);return null===d?u:d}return this.each(function(){c.nodeType(3,this)||c.nodeType(8,this)||c.nodeType(2,
this)||this.setAttribute(a,b+"")})},removeAttr:function(a){var b,d,e,f,g=a&&a.match(/\S+/g);return this.each(function(){b=this;f=0;if(g&&c.nodeType(1,b))for(;d=g[f++];){e=W[d]||d;var a=b,h=Ma[d.toLowerCase()];h&&Na[a.nodeName]&&h&&(b[e]=!1);b.removeAttribute(d)}})},prop:function(a,b){if("object"===typeof a)return this.each(function(b,e){c.each(a,function(a,b){a=W[a]||a;e[a]=b})});a=W[a]||a;return c.isUndefined(b)?this[0]&&this[0][a]:this.put(a,b)},append:function(a){return this.each(function(){if(c.isString(a))this.insertAdjacentHTML("beforeend",
a);else{if(a instanceof c){if(1===a.length)return this.appendChild(a[0]);var b=this;return c.each(a,function(){b.appendChild(this)})}this.appendChild(a)}})},appendTo:function(a){return this.each(function(){c(selector).append(this)})},prepend:function(a){var b;return this.each(function(){if(c.isString(a))this.insertAdjacentHTML("afterbegin",a);else if(b=this.childNodes[0])this.insertBefore(a,b);else{if(a instanceof c){if(1===a.length)return this.appendChild(a[0]);var d=this;return c.each(a,function(){d.appendChild(this)})}this.appendChild(a)}})},
prependTo:function(a){return this.each(function(){c(selector).prepend(this)})},after:function(a){var b;return this.each(function(){c.isString(a)?this.insertAdjacentHTML("afterend",a):(b=c.getClosestNode(this,"nextSibling"))?a instanceof c?this.parentNode&&this.parentNode.insertBefore(a[0],b):this.parentNode&&this.parentNode.insertBefore(a,b):a instanceof c?this.parentNode&&this.parentNode.appendChild(a[0]):this.parentNode&&this.parentNode.appendChild(a)})},before:function(a){return this.each(function(){c.isString(a)?
this.insertAdjacentHTML("beforebegin",a):a instanceof c?this.parentNode&&this.parentNode.insertBefore(a[0],this):this.parentNode&&this.parentNode.insertBefore(a,this)})}});c.extend({createDOMElem:function(a,b,d,c,f,g){b=document.createElement(b);d&&(b.id=M(d,a));c&&(b.className=M(c,a));f&&b.appendChild(document.createTextNode(f));if(g)for(var k in g)g.hasOwnProperty(k)&&b.setAttribute(k,M(g[k],a));return b},parseHTML:function(a,b){var d=p[a]?p[a]:p[a]=a.split(m.operators).map(J,trim),e=p[b]?p[b]:
p[b]=document.createDocumentFragment(),f,g=[e];c.each(d,function(d,e){var l=e,q=(m.operators.exec(a)||[])[0],A=1,ua,p,va,I,n={};if(f=l.match(m.attributes)){for(var s=f[f.length-1];f=m.values.exec(s);)n[f[1]]=(f[4]||"").replace(/['"]/g,"").trim();l=l.replace(m.attributes,"")}if(f=l.match(m.multiplier))s=+f[1],0<s&&(A=s);if(f=l.match(m.id))p=f[f.length-1].slice(1);ua=(f=l.match(m.tagname))?f[0]:"div";if(f=l.match(m.classname))va=f.map(function(a){return a.slice(1)}).join(" ");if(f=l.match(m.text))I=
f[1],b&&(I=I.replace(/\$(\w+)/g,function(a,d){return b[d]}));c.each(r.call(g,0),function(a,b){for(var d=0;d<A;d++){var e=c.createDOMElem(1<A?d:a,ua,p,va,I,n);"+"===q&&(e._sibling=!0);b.appendChild(e)}});">"===q&&(g=g.reduce(function(a,b,d,c){return a.concat(r.call(b.childNodes,0).filter(function(a){return 1===a.nodeType&&!a._sibling}))},[]))});e.toHTML=za;return e}});document.createElement("p").classList&&function(a){if("Element"in a){a=a.Element.prototype;var b=Object,d=String.prototype.trim,c=function(a){for(var b=
0,b=this.length;b--;)if(b in this&&this[b]===a)return b;return-1},f=function(a,b){this.name=a;this.code=DOMException[a];this.message=b},g=function(a,b){if(""===b)throw new f("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(b))throw new f("INVALID_CHARACTER_ERR","String contains an invalid character");return c.call(a,b)},k=function(a){for(var b=d.call(a.getAttribute("class")||""),b=b?b.split(/\s+/):[],c=b.length;c--;)this.push(b[c]);this._updateClassName=function(){a.setAttribute("class",
this.toString())}},h=k.prototype=[],l=function(){return new k(this)};f.prototype=Error.prototype;h.item=function(a){return this[a]||null};h.contains=function(a){return-1!==g(this,a+"")};h.add=function(){var a=arguments,b=0,d=a.length,c,e=!1;do c=a[b]+"",-1===g(this,c)&&(this.push(c),e=!0);while(++b<d);e&&this._updateClassName()};h.remove=function(){var a=arguments,b=0,d=a.length,c,e=!1;do c=a[b]+"",c=g(this,c),-1!==c&&(this.splice(c,1),e=!0);while(++b<d);e&&this._updateClassName()};h.toggle=function(a,
b){a+="";var d=this.contains(a),c=d?!0!==b&&"remove":!1!==b&&"add";if(c)this[c](a);return!d};h.toString=function(){return this.join(" ")};if(b.defineProperty){h={get:l,enumerable:!0,configurable:!0};try{b.defineProperty(a,"classList",h)}catch(q){-2146823252===q.number&&(h.enumerable=!1,b.defineProperty(a,"classList",h))}}else b.prototype.__defineGetter__&&a.__defineGetter__("classList",l)}}(document);c.extend({removeClass:function(a,b){c.each(a.split(m.specialSplit),function(){b.classList.remove(this)})},
addClass:function(a,b){a&&c.each(a.split(m.specialSplit),function(){b.classList.add(this)})}});c.fn.extend({addClass:function(a){return c.isFunction(a)?this.each(function(b){c(this).addClass(a.call(this,b,this.className))}):this.each(function(){c.addClass(a,this)})},removeClass:function(a){return c.isFunction(a)?this.each(function(b){c(this).removeClass(a.call(this,b,this.className))}):this.each(function(){c.isUndefined(a)?this.className="":c.removeClass(a,this)})},hasClass:function(a){return this[0].classList.contains(a)},
replaceClass:function(a,b){var d,e;return this.each(function(){d=this.className.split(" ");e=!1;for(var f=d.length;f--;)d[f]==a&&(e=!0,d[f]=b);if(!e)return c.addClass(b,this);this.className=d.join(" ")})},tempClass:function(a,b){var d;return this.each(function(){d=this;c.addClass(a,d);setTimeout(function(){c.removeClass(a,d)},b)})},allClass:function(){return this[0].classList},toggleClass:function(a,b){return"boolean"===typeof b&&"string"===typeof a?b?this.addClass(a):this.removeClass(a):c.isFunction(a)?
this.each(function(d){c(this).toggleClass(a.call(this,d,this.className,b),b)}):this.each(function(){this.classList.toggle(a)})}});var x={disabeled:function(a,b){if(a.disabeled&&"click"===b)return!0},nodeType:function(a){if(3===a.nodeType||8===a.nodeType)return!0}},N={mouseenter:{base:"mouseover",condition:ca},mouseleave:{base:"mouseout",condition:ca},mousewheel:{base:/Firefox/.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel"}},w="altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
Y=[{reg:/^key/,fix:function(a,b){b.keyCode=a.keyCode||a.which;return w.concat(["char","charCode","key","keyCode"])}},{reg:/^(?:mouse|contextmenu)|click/,fix:function(a,b){b.rightClick=3===a.which||2===a.button;b.pos={x:0,y:0};if(a.pageX||a.pageY)b.clientX=a.pageX,b.clientY=a.pageY;else if(a.clientX||a.clientY)b.clientX=a.clientX+n.body.scrollLeft+qa.scrollLeft,b.clientY=a.clientY+n.body.scrollTop+qa.scrollTop;return w.concat("button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "))}},
{reg:/mouse.*(wheel|scroll)/i,fix:function(){return"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis".split(" ")}},{reg:/^text/i,fix:function(){return w.concat(["data"])}},{reg:/^touch|^gesture/i,fix:function(){return w.concat(["touches","targetTouches","changedTouches","scale","rotation"])}},{reg:/^message$/i,fix:function(){return w.concat(["data","origin","source"])}},{reg:/^popstate$/i,fix:function(){return w.concat(["state"])}},
{reg:/.*/,fix:function(){return w}}],wa={},R=function(a,b){if(arguments.length&&(this.originalEvent=a=a||((b.ownerDocument||b.document||b).parentWindow||win).event)){var d=a.type,c=a.target,f,g,k;this.target=c&&3===c.nodeType?c.parentNode:c;k=wa[d];if(!k)for(c=0,f=Y.length;c<f;c++)if(Y[c].reg.test(d)){wa[d]=k=Y[c].fix;break}d=k(a,this,d);for(c=d.length;c--;)!((g=d[c])in this)&&g in a&&(this[g]=a[g])}};R.prototype={preventDefault:function(){this.originalEvent.preventDefault?this.originalEvent.preventDefault():
this.originalEvent.returnValue=!1},stopPropagation:function(){this.originalEvent.stopPropagation?this.originalEvent.stopPropagation():this.originalEvent.cancelBubble=!0},stop:function(){this.preventDefault();this.stopPropagation();this.stopped=!0},stopImmediatePropagation:function(){this.originalEvent.stopImmediatePropagation&&this.originalEvent.stopImmediatePropagation();this.isImmediatePropagationStopped=function(){return!0}},isImmediatePropagationStopped:function(){return this.originalEvent.isImmediatePropagationStopped&&
this.originalEvent.isImmediatePropagationStopped()}};D.prototype={inNamespaces:function(a){var b,d,c=0;if(!a)return!0;if(!this.namespaces)return!1;for(b=a.length;b--;)for(d=this.namespaces.length;d--;)a[b]==this.namespaces[d]&&c++;return a.length===c},matches:function(a,b,d){return this.element===a&&(!b||this.original===b)&&(!d||this.handler===d)}};var v=function(){function a(d,c,f,g,k,h){var l=k?"r":"$";if(c&&"*"!==c){k=0;var q=b[l+c],m="*"===d;if(q)for(l=q.length;k<l&&(!m&&!q[k].matches(d,f,g)||
h(q[k],q,k,c));k++);}else for(q in b)q.charAt(0)===l&&a(d,q.substr(1),f,g,k,h)}var b={};return{has:function(a,c,f,g){if(g=b[(g?"r":"$")+c])for(c=g.length;c--;)if(!g[c].root&&g[c].matches(a,f,null))return!0;return!1},get:function(b,c,f,g){var k=[];a(b,c,f,null,g,function(a){k.push(a)});return k},put:function(a){var c=!a.root&&!this.has(a.element,a.type,null,!1),f=(a.root?"r":"$")+a.type;(b[f]||(b[f]=[])).push(a);return c},del:function(d){a(d.element,d.type,null,d.handler,d.root,function(a,d,c){d.splice(c,
1);a.removed=!0;0===d.length&&delete b[(a.root?"r":"$")+a.type];return!1})}}}();c.fn.extend({on:function(a,b,d,e){var f;return this.each(function(){f=this;var g,k,h,l,q,p;if(f.disabeled&&x[disabeled](f,g)||x.nodeType(f))return!1;if(b===u&&"object"===typeof a)for(g=s(a),h=g.length;h--;)ga.call(this,f,g[h],a[g[h]]);else{c.isFunction(b)?(l=r.call(arguments,3),d=g=b):(g=d,l=r.call(arguments,4),d=fa(b,g));k=a.split(" ");e&&(d=O(z,f,a,d,g));for(h=k.length;h--;)if(p=v.put(q=new D(f,k[h].replace(m.nameRegex,
""),d,g,k[h].replace(m.namespaceRegex,"").split("."),l,!1)))f[ha](q.eventType,Q,!1);return f}})},one:function(a,b,d){return this.on(a,b,d,!0)},off:function(a,b){return this.each(function(){z(this,a,b)})}});c.extend({trigger:function(a,b,d){a=c.isString(a)?c.select(a)[0]:a[0];var e=b.split(" "),f,g,k,h,l;if(a.disabeled&&x[disabeled](a,b)||x.nodeType(a))return!1;for(f=e.length;f--;){b=e[f].replace(m.nameRegex,"");if(h=e[f].replace(m.namespaceRegex,""))h=h.split(".");if(h||d)for(l=v.get(a,b,null,!1),
g=new R(null,a),g.type=b,b=d?"apply":"call",d=d?[g].concat(d):g,g=0,k=l.length;g<k;g++){if(l[g].inNamespaces(h))l[g].handler[b](a,d)}else h=n.createEvent("HTMLEvents"),h.initEvent(b,!0,!0,win,1),a.dispatchEvent(h)}return a}});var Ca={columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},ka={"float":"cssFloat"},ia=["Webkit","O","Moz","ms"];c.fn.extend({show:function(){return this.each(function(){ma(this)})},hide:function(){return this.each(function(){la(this)})},
toggle:function(){return this.each(function(){"none"===this.style.display?ma(this):la(this)})},css:function(a,b){return c.isUndefined(b)?c.isString(a)?this[0]&&ja(this[0],a):this.each(function(){var b=this;c.each(a,function(a,c){E(b,a,c)})}):this.each(function(){E(this,a,b)})},resetCSS:function(a){return this.each(function(){if(B(this)){for(var b={},d=0,c;c=s(a)[d];d+=1)b[c]=this.style[c],this.style[c]=a[c];return b}})},setOpacity:function(a){return this.each(function(){B(this)&&(this.style.opacity=
a/100)})},restoreCSS:function(a){return this.each(function(){if(B(this))for(var b=0,c;c=s(a)[b];b+=1)this.style[c]=a[c]})},pageX:function(a){a=this[0];return a.offsetParent?a.offsetLeft+this.pageX(a.offsetParent):a.offsetLeft},pageY:function(a){a=this[0];return a.offsetParent?a.offsetTop+this.pageX(a.offsetParent):a.offsetTop},parentX:function(a){a=this[0];return a.offsetParent===a.parentNode?a.offsetLeft:n.css.pageX(a)-n.pageX(a.parentNode)},parentY:function(a){var b=this[0];return b.offsetParent===
b.parentNode?b.offsetTop:n.pageY(a)-n.pageY(b.parentNode)},setX:function(a){return this.each(function(){B(this)&&(this.style.left=parseNum(a)+"px")})},setY:function(a){return this.each(function(){B(this)&&(this.style.top=parseNum(a)+"px")})}});c.extend({parseJSON:function(a){return JSON.parse(a+"")},parseXML:function(a){var b,c;if(!a||"string"!==typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(e){b=u}return!b||b.getElementsByTagName("parsererror").length?Error("Invalid XML: "+
a):b}});var T=n.head||n.getElementsByTagName("head")[0],oa=0,F,Ha=-1!==c.indexOf(navigator.userAgent,"MSIE 10.0"),oa=0,xa={"*":"*/".concat("*"),text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript",js:"application/javascript, text/javascript"};c.extend({ajax:function(a,b){a=a||{};b=b||function(){};var d,e=a.headers||{},f=s(e),g=-1,k=f.length,h=(a.method||"GET").toLowerCase(),l=c.isString(a)?a:a.url,m=a.type?a.type.toLowerCase():"",p=null,n=!1!==
(a.processData||!0)&&a.data&&!c.isString(a.data)?Da(a.data):a.data||null,r=!1;if(!l)return!1;"jsonp"!==m&&"get"!==h.toLowerCase()||!n||(l=(l+"&"+n).replace(/[&?]+/,"?"),n=null);if("jsonp"===m&&/(=)\?(?=&|$)|\?\?/.test(l))return Fa(a,b,l);if(!0===a.crossOrigin){var t=win.XMLHttpRequest?new XMLHttpRequest:null;if(t&&"withCredentials"in t)d=t;else if(win.xDomainRequest)d=new "XDomainRequest";else throw"Browser does not support cross-origin requests";}d.open(h,l,!1===a.async?!1:!0);e.Accept=e.Accept||
xa[m]||xa["*"];a.crossOrigin||e.requestedWith||(e.requestedWith="XMLHttpRequest");for((a.contentType||a.data&&"get"!==m.toLowerCase())&&d.setRequestHeader("Content-Type",a.contentType||"application/x-www-form-urlencoded");++g<k;)d.setRequestHeader(c.trim(f[g]),e[f[g]]);c.isDefined(a.withCredentials)&&c.isDefined(d.withCredentials)&&(d.withCredentials=!!a.withCredentials);0<a.timeout&&(p=setTimeout(function(){d.abort()},a.timeout));win.XDomainRequest&&d instanceof win.xDomainRequest?(d.onload=b,d.onerror=
err,d.onprogress=function(){},r=!0):d.onreadystatechange=function(){if(4===d.readyState)if(200<=d.status&&300>d.status||304===d.status){var b;d&&("json"===m&&null===(b=JSON.parse(d.responseText))&&(b=d.responseText),b="xml"===m?d.responseXML&&d.responseXML.parseError&&d.responseXML.parseError.errorCode&&d.responseXML.parseError.reason?null:d.responseXML:b||d.responseText);!b&&n&&(b=n);a.success&&a.success(b)}else a.error!==u&&(null!==p&&clearTimeout(p),a.error("error",a,d))};a.before&&a.before(d);
r?setTimeout(function(){d.send(n)},200):d.send(n);return d},getJSON:function(a,b,d,e){c.ajax({url:a,method:"JSON",contentType:"application/json",error:c.isFunction(e)?e:function(a){},data:c.isObject(b)?b:{},success:c.isFunction?d:function(a){}})},get:function(a,b,d,e){c.ajax({url:a,method:"GET",contentType:"",error:c.isFunction(e)?e:function(a){},data:c.isObject(b)?b:{},success:c.isFunction?d:function(a){}})},post:function(a,b,d,e){c.ajax({url:a,method:"POST",contentType:"",error:c.isFunction(e)?
e:function(a){},data:c.isObject(b)?b:{},success:c.isFunction?d:function(a){}})}});y.hAzzle=c}})(window);