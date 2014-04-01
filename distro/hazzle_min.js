/*!
 * hAzzle.js
 * Copyright (c) 2014 Kenny Flashlight
 * Version: 0.1.6
 * Released under the MIT License.
 *
 * Date: 2014-04-01
 */

(function(w,u){function W(a){try{a.apply(this,ta)}catch(b){if(null!==X)X[x](this,a)}}function Y(a,b){var c=y[d.getUID(a)];return null==b?c:c&&c[b]}function Z(a,b){var c=y[d.getUID(a)];if(null==b)return!1;if(c&&c[b])return!0}function L(a,b){var c=y[d.getUID(a)];if(!b)return!1;delete c[b]}function $(a){return d.nodeType(1,a)||d.nodeType(9,a)||d.nodeType(11,a)?!0:!1}function ua(){var a=document.createElement("div");a.appendChild(this.cloneNode(!0));return a.innerHTML}function M(a,b){return a.replace(l.numbering,
function(a){for(var e=b+1,e=e.toString();e.length<a.length;)e="0"+e;return e})}function aa(a){if(a=a.relatedTarget){var b;if(b=a!==this)if(b="xul"!==a.prefix)if(b=!/document/.test(this.toString())){a:{for(;a=a.parentNode;)if(a===this){a=1;break a}a=0}b=!a}a=b}else a=null===a;return a}function ba(a,b,c,e){var d=function(c,d){return b.apply(a,e?q.call(d).concat(e):d)},f=c?function(e){var f=b._RachelleDel?b._RachelleDel.ft(e.target,a):this;if(c.apply(f,arguments))return e&&(e.currentTarget=f),d(e,arguments)}:
function(a){return d(a,arguments)};f._RachelleDel=b._RachelleDel;return f}function E(a,b,c,e,d,f){if(!(this instanceof E))return!1;var k=N[b];"unload"===b&&(c=O(P,a,b,c,e));k&&(k.condition&&(c=ba(a,c,k.condition,f)),b=k.base||b);this.element=a;this.type=b;this.original=e;this.namespaces=d;this.eventType=b;this.target=a;this.handler=ba(a,c,null,f)}function Q(a,b){var c=s.get(this,b||a.type,null,!1),e=c.length,d=0;a=new R(a,this,!0);b&&(a.type=b);for(;d<e&&!a.isImmediatePropagationStopped();d++)c[d].removed||
c[d].handler.call(this,a)}function O(a,b,c,e,d){return function(){e.apply(this,arguments);a(b,c,d)}}function P(a,b,c,e){b=b&&b.replace(l.nameRegex,"");var d=s.get(a,b,null,!1),f=0,k;b={};for(k=d.length;f<k;f++)c&&d[f].original!==c||!d[f].inNamespaces(e)||(s.del(d[f]),b[d[f].eventType]||(b[d[f].eventType]={t:d[f].eventType,c:d[f].type}));c=t(b);for(e=c.length;e--;)if(!s.has(a,b[c[e]].t,null,!1)&&a[ca])a[ca](b[c[e]].t,Q,!1)}function da(a,b){function c(b,c){for(var e,h=d.isString(a)?d.select(a,c):a;b&&
b!==c;b=b.parentNode)for(e=h.length;e--;)if(h[e]===b)return b}function e(a){if(!0!==a.target.disabled){var e=c(a.target,this);e&&b.apply(e,arguments)}}e._RachelleDel={ft:c,selector:a};return e}function z(a,b,c){var e=d.isString(b),g;if(e&&0<b.indexOf(" ")){b=b.split(b);for(g=b.length;g--;)z(a,b[g],c);return a}(g=e&&b.replace(l.nameRegex,""))&&N[g]&&(g=N[g].base);if(!b||e){if(b=e&&b.replace(l.namespaceRegex,""))b=b.split(".");P(a,g,c,b)}else if(d.isFunction(b))P(a,null,b);else for(c=t(b),g=c.length;g--;)z(a,
c[g],b[c[g]]);return a}function ea(a,b,c,e,g){var f,k,h,n,A,m;if(a.disabeled&&v[disabeled](a,f)||v.nodeType(a))return!1;if(c===u&&"object"===typeof b)for(f=t(b),h=f.length;h--;)ea.call(this,a,f[h],b[f[h]]);else{d.isFunction(c)?(n=q.call(arguments,3),e=f=c):(f=e,n=q.call(arguments,4),e=da(c,f));k=b.split(" ");g&&(e=O(z,a,b,e,f));for(h=k.length;h--;)if(m=s.put(A=new E(a,k[h].replace(l.nameRegex,""),e,f,k[h].replace(l.namespaceRegex,"").split("."),n,!1)))a[fa](A.eventType,Q,!1);return a}}function va(a,
b){if(!m[a+b]){d.each(a,function(a,c){if(c===b)return b});for(var c=b.charAt(0).toUpperCase()+b.slice(1),e=b,g=ga.length;g--;)b=ga[g]+c,d.each(a,function(a,c){if(c===b)return b});m[a+b]=e}return m[a+b]}function ha(a,b){b=wa(b);b=ia[b]||(ia[b]=va(a.style,b));return a.style.getPropertyValue(b)||w.getComputedStyle(a,null).getPropertyValue(b)}function F(a,b,c){"number"===typeof c&&-1===xa.indexOf(b)&&(c+="px");a.style[(null===c||""===c?"remove":"set")+"Property"](b,""+c);return a}function ja(a){var b=
ha(a,"display");"none"!==b&&d.data(a,"_display",b);F(a,"display","none")}function ka(a){return F(a,"display",d.data(a,"_display")||"block")}function B(a){return d.nodeTypes[3](a)||d.nodeTypes[8](a)?!0:!1}function wa(a){m[a]||(m[a]=a.replace(/^-ms-/,"ms-").replace(/^.|-./g,function(a,c){return 0===c?a.toLowerCase():a.substr(1).toUpperCase()}));return m[a]}function ya(a,b){var c,e,g=b||!1,f=[],k=encodeURIComponent,h=function(a,b){b=d.isFunction(b)?b():null===b?"":b;f[f.length]=k(a)+"="+k(b)};if(d.isArray(a))for(e=
0;a&&e<a.length;e++)h(a[e].name,a[e].value);else for(e=0;c=t(a)[e];e+=1)S(c,a[c],g,h,a);return f.join("&").replace(/%20/g,"+")}function S(a,b,c,e,g){var f,k=/\[\]$/;if(d.isArray(b))for(g=0;b&&g<b.length;g++)f=b[g],c||k.test(a)?e(a,f):S(a+"["+(d.isObject(f)?g:"")+"]",f,c,e);else if(b&&"[object Object]"===b.toString())for(f in b)g[la](a)&&S(a+"["+f+"]",b[f],c,e);else e(a,b)}function za(a){G=a}function Aa(a,b,c){var e=ma++,g=a.jsonpCallback||"callback";a=a.jsonpCallbackName||"hAzzel_"+na();var f=RegExp("((^|\\?|&)"+
g+")=([^&]+)"),k=c.match(f),h=p[Ba]("script"),n=0;k?"?"===k[3]?c=c.replace(f,"$1="+a):a=k[3]:c=(c+"&"+(g+"="+a)).replace(/[&?]+/,"?");win[a]=za;h.type="text/javascript";h.src=c;h.async=!0;d.isDefined(h.onreadystatechange)&&!Ca&&(h.event="onclick",h.htmlFor=h.id="_hAzzel_"+e);h.onload=h.onreadystatechange=function(){if(h.readyState&&"complete"!==h.readyState&&"loaded"!==h.readyState||n)return!1;h.onload=h.onreadystatechange=null;if(h.onclick)h.onclick();b(G);G=u;T.removeChild(h);n=1};T.appendChild(h);
return{abort:function(){h.onload=h.onreadystatechange=null;G=u;T.removeChild(h);n=1}}}if(!w.hAzzle){var p=w.document,fa="addEventListener",ca="removeEventListener",la="hasOwnProperty",Ba="createElement",x="call",oa=p.documentElement||{},H=Array.prototype,pa=Object.prototype,q=H.slice,Da=H.splice,Ea=H.concat,Fa=H.indexOf,Ga=pa.toString,na=Date.now||function(){return(new Date).getTime()},t=Object.keys||function(a){if(a!==Object(a))throw"Syntax error, unrecognized expression: Invalid object";var b=[],
c;for(c in a)la[x](a,c)&&b.push(c);return b},Ha={current:0,next:function(){return++this.current}},m=[],U=[],l={namespaceRegex:/[^\.]*(?=\..*)\.|.*/,nameRegex:/\..*/,specialSplit:/\s*,\s*|\s+/,operators:/[>+]/g,multiplier:/\*(\d+)$/,id:/#[\w-$]+/g,tagname:/^\w+/,classname:/\.[\w-$]+/g,attributes:/\[([^\]]+)\]/g,values:/([\w-]+)(\s*=\s*(['"]?)([^,\]]+)(\3))?/g,numbering:/[$]+/g,text:/\{(.+)\}/,booleans:/^(checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped|noresize|declare|nohref|noshade|truespeed|inert|formnovalidate|allowfullscreen|declare|seamless|sortable|typemustmatch)$/i,
scriptstylelink:/<(?:script|style|link)/i,htmlTags:/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,rtagName:/<([\w:]+)/,idClassTagNameExp:/^(?:#([\w-]+)|\.([\w-]+)|(\w+))$/,tagNameAndOrIdAndOrClassExp:/^(\w+)(?:#([\w-]+)|)(?:\.([\w-]+)|)$/},Ia={"for":"htmlFor","class":"className"},Ja={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>",
"</tr></tbody></table>"],_default:[0,"",""]},C={1:function(a){if(1===a.nodeType)return!0},2:function(a){if(2===a.nodeType)return!0},3:function(a){if(3===a.nodeType)return!0},4:function(a){if(4===a.nodeType)return!0},6:function(a){if(6===a.nodeType)return!0},8:function(a){if(8===a.nodeType)return!0},9:function(a){if(9===a.nodeType)return!0},11:function(a){if(11===a.nodeType)return!0}},I=p.createElement("div"),d=function(a,b){return new d.fn.init(a,b)},J=d.support={};J.byAll=!!p.querySelectorAll;J.classList=
!!p.createElement("p").classList;d.fn=d.prototype={length:0,init:function(a,b){var c,e;if(a instanceof d)return a;if(d.isString(a)){if(U[a]&&!b){this.elems=c=U[a];for(e=this.length=c.length;e--;)this[e]=c[e];return this}this.elems=U[a]=d.select(a,b)}else{if(d.isFunction(a))return d.ready(a);if(a instanceof Array)this.elems=d.unique(a.filter(d.isElement));else{if(d.isObject(a))return this.elems=[a],this.length=1,this[0]=a,this;d.isNodeList(a)?this.elems=q.call(a).filter(d.isElement):d.isElement(a)?
this.elems=[a]:this.elems=[]}}c=this.elems;for(e=this.length=c.length;e--;)this[e]=c[e];return this},each:function(a,b){return d.each(this,a,b)},find:function(a){if(a){var b;b=1===this.length?d(this.elems[0],a):this.elems.reduce(function(b,e){return b.concat(d.select(a,e))},[]);return d.create(b)}return this},filter:function(a,b){if(d.isFunction(a)){var c=a;return d.create(this.elems.filter(function(a,d){return c.call(a,a,d)!==(b||!1)}))}a&&"!"===a[0]&&(a=a.substr(1),b=!0);return d.create(this.elems.filter(function(c){return d.matches(c,
a)!==(b||!1)}))},contains:function(a){var b;return d.create(this.elems.reduce(function(c,e){b=d.select(a,e);return c.concat(b.length?e:null)},[]))},not:function(a){return this.filter(a||[],!0)},is:function(a){return 0<this.length&&0<this.filter(a||[]).length},pluck:function(a,b){b&&d.isNumber(b);return d.pluck(this.elems,a)},put:function(a,b){d.put(this.elems,a,b);return this},get:function(a){return d.isDefined(a)?this.elems[0>a?this.elems.length+a:a]:this.elems},map:function(a){return d(this.elems.map(a))},
sort:function(a){return d(this.elems.sort(a))},concat:function(){var a=q.call(arguments).map(function(a){return a instanceof d?a.elements:a});return d(Ea.apply(this.elems,a))},slice:function(a,b){return d(q.call(this.elems,a,b))},splice:function(a,b){return d(Da.call(this.elems,a,b))},push:function(a){return d.isElement(a)?(this.elems.push(a),this.length=this.elems.length,this.length-1):-1},indexOf:function(a){return this.elems.indexOf(a)},reduce:function(a,b,c,e){return this.elems.reduce(a,b,c,e)},
reduceRight:function(a,b,c,e){return this.elems.reduceRight(a,b,c,e)},iterate:function(a,b){return function(c,e,d,f){return this.each(function(){a.call(b,this,c,e,d,f)})}},eq:function(a){return null===a?d():d(this.get(a))}};d.fn.init.prototype=d.fn;d.extend=d.fn.extend=function(){var a=arguments[0]||{};"object"!==typeof a&&"function"!==typeof a&&(a={});1===arguments.length&&(a=this);for(var b=q.call(arguments),c,e=b.length;e--;){c=b[e];for(var d in c)a[d]!==c[d]&&(a[d]=c[d])}return a};d.extend({each:function(a,
b){var c=0,e=a.length;if(a.length===+a.length)for(;c<e&&!1!==b.call(a[c],c,a[c++]););else for(e=t(a),c=e.length;c--&&!1!==b.call(a[e],e,a[e]););return a},type:function(a){return(a=Ga.call(a).match(/\s(\w+)\]$/))&&a[1].toLowerCase()},is:function(a,b){return 0<=d.indexOf(a,d.type(b))},isElement:function(a){return a&&(C[1](a)||C[9](a))},isNodeList:function(a){return a&&d.is(["nodelist","htmlcollection","htmlformcontrolscollection"],a)},IsNaN:function(a){return!(0>=a)&&!(0<a)},isUndefined:function(a){return"undefined"===
typeof a},isDefined:function(a){return"undefined"!==typeof a},isObject:function(a){return null!==a&&"object"==typeof a},isString:function(a){return"string"===typeof a},isNumeric:function(a){return!d.IsNaN(parseFloat(a))&&isFinite(a)},isEmptyObject:function(a){for(var b in a)return!1;return!0},isFunction:function(a){return"function"===typeof a},isArray:Array.isArray,isArrayLike:function(a){if(null===a||d.isWindow(a))return!1},isWindow:function(a){return null!==a&&a===a.window},isPlainObject:function(a){return d.isObject(a)&&
!d.isWindow(a)&&Object.getPrototypeOf(a)===pa},isBoolean:function(a){return"boolean"===typeof a},unique:function(a){return a.filter(function(b,c){return d.indexOf(a,b)===c})},create:function(a,b){return d.isUndefined(b)?d(a):d(a).filter(b)},prefix:function(a,b){var c,e=a[0].toUpperCase()+a.substring(1),d,f=["moz","webkit","ms","o"];b=b||w;if(c=b[a])return c;for(;(d=f.shift())&&!(c=b[d+e]););return c},matches:function(a,b){var c;if(!a||!d.isElement(a)||!b)return!1;if(b.nodeType)return a===b;if(b instanceof
d)return b.elems.some(function(b){return d.matches(a,b)});if(a===p)return!1;if(c=d.prefix("matchesSelector",I))return c.call(a,b);a.parentNode||I.appendChild(a);c=0<=d.indexOf(d.select(b,a.parentNode),a);a.parentNode===I&&I.removeChild(a);return c},pluck:function(a,b,c){return a.map(function(a){if(c){if(!C[c])return a[b]}else return a[b]})},containsClass:function(a,b){return J.classList?a.classList.contains(b):d.contains((""+a.className).split(" "),b)},normalizeCtx:function(a){if(!a)return p;if("string"===
typeof a)return d.select(a)[0];if(!a.nodeType&&a instanceof Array)return a[0];if(a.nodeType)return a},select:function(a,b){var c,e=[];b=d.normalizeCtx(b);if(c=l.idClassTagNameExp.exec(a))if(a=c[1])e=(e=b.getElementById(a))?[e]:[];else if(a=c[2])e=b.getElementsByClassName(a);else{if(a=c[3])e=b.getElementsByTagName(a)}else if(c=l.tagNameAndOrIdAndOrClassExp.exec(a)){var g=b.getElementsByTagName(c[1]),f=c[2],k=c[3];d.each(g,function(){(this.id===f||d.containsClass(this,k))&&e.push(this)})}else e=b.querySelectorAll(a);
return d.isNodeList(e)?q.call(e):d.isElement(e)?[e]:e},contains:function(a,b){if(b)for(;b=b.parentNode;)if(b===a)return!0;return!1},indexOf:function(a,b){for(var c=0,e;e=a[c];c+=1)if(b===e)return c;return!1},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},now:function(){return na()},nodeType:function(a,b){if(C[a])return C[a](b)},trim:function(a){return String.prototype.trim?a.trim():a.replace(/^\s*/,"").replace(/\s*$/,"")},noop:function(){},inArray:function(a,
b,c){return null===b?-1:Fa.call(b,a,c)},getUID:function(a){return a.hAzzle_id||(a.hAzzle_id=Ha.next())},put:function(a,b,c){return d.each(a,function(e){a[e][b]=c})},merge:function(a,b){for(var c=+b.length,e=0,d=a.length;e<c;e++)a[d++]=b[e];a.length=d;return a},grep:function(a,b,c){for(var e=[],d=0,f=a.length,k=!c;d<f;d++)c=!b(a[d],d),c!==k&&e.push(a[d]);return e}});var D=[],ta=[],x="call",qa=!1,X=null;d.extend({ready:function(a){document.addEventListener("DOMContentLoaded",function(){qa=!0;for(var a=
0,c=D.length;a<c;a+=1)W(D[a]);D=[]},!0);qa?W(a):D[D.length]=a}});d.extend({getClosestNode:function(a,b,c){if(a&&null!==a){do a=a[b];while(a&&(c&&!d.matches(c,a)||!d.isElement(a)));return a}}});d.fn.extend({pluckNode:function(a){if(a)return this.map(function(b){return d.getClosestNode(b,a)})},closest:function(a){return this.map(function(b){return d.matches(b,a)?b:d.getClosestNode(b,"parentNode",a)})},index:function(a){return a?this.indexOf(d(a)[0]):this.parent().children().indexOf(this[0])||-1},add:function(a,
b){var c=a;d.isString(a)&&(c=m[a]?m[a]:m[a]=d(a,b).elems);return this.concat(c)},parent:function(a){return a?d.create(this.pluck("parentNode"),a,11):""},parents:function(a){for(var b=[],c=this.elems,e=function(a){if((a=a.parentNode)&&a!==p&&0>b.indexOf(a))return b.push(a),a};0<c.length&&c[0]!==u;)c=c.map(e);return d.create(b,a)},children:function(a){return d.create(this.reduce(function(a,c){var e=q.call(c.children);return a.concat(e)},[]),a)},next:function(){return d.create(this.pluckNode("nextSibling"))},
prev:function(){return d.create(this.pluckNode("previousSibling"))},first:function(){return d.create(this.get(0))},last:function(){return d.create(this.get(-1))},siblings:function(a){var b=[],c,e,g,f;m[a]||(this.each(function(){e=this;c=q.call(e.parentNode.childNodes);g=0;for(f=c.length;g<f;g++)d.isElement(c[g])&&c[g]!==e&&b.push(c[g])}),m[a]=b);return d.create(m[a],a)}});var y={};d.extend({hasData:function(a,b){if(a instanceof d){if(Z(a,b))return!0}else if(Z(d(a)[0],b))return!0;return!1},removeData:function(a,
b){if(a instanceof d){if(L(a,b))return!0}else if(L(d(a)[0],b))return!0;return!1}});d.fn.extend({removeData:function(a){this.each(function(b,c){L(c,a)});return this},data:function(a,b){return d.isDefined(b)?(this.each(function(c,e){var g=d.getUID(e);(y[g]||(y[g]={}))[a]=b}),this):1===this.elems.length?Y(this.elems[0],a):this.elems.map(function(b){return Y(b,a)})}});d.extend({getAttr:function(a,b){return"value"===b&&"input"==a.nodeName.toLowerCase()?d.getValue(a):a.getAttribute(b)},removeAttr:function(a,
b){var c,e,g=0,f=b&&b.match(/\S+/g);if(f&&d.nodeType(1,a))for(;c=f[g++];)e=Ia[c]||c,l.booleans.test(c)&&(a[e]=!1),a.removeAttribute(c)},getValue:function(a){return a.multiple?d(a).find("option").filter(function(a){return a.selected&&!a.disabled}).pluck("value"):a.value},getText:function(a){var b,c="",e=0;if(!a.nodeType)for(;b=a[e++];)c+=d.getText(b);else if($(a)){if(d.isString(a.textContent))return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=d.getText(a)}else if(d.nodeType(3,a)||d.nodeType(4,
a))return a.nodeValue;return c}});d.fn.extend({text:function(a){return d.isUndefined(a)?d.getText(this):this.empty().each(function(){$(this)&&(this.textContent=a)})},html:function(a){return d.isUndefined(a)&&d.nodeType(11,this[0])?this[0].innerHTML:!d.isString(a)||l.scriptstylelink.test(a)||Ja[(l.rtagName.exec(a)||["",""])[1].toLowerCase()]?this[0]&&this[0].innerHTML:(a=a.replace(l.htmlTags,"<$1></$2>"),this.each(function(b,c){d.nodeType(1,c)&&(c.innerHTML=a||"")}))},empty:function(){var a;this.each(function(b,
c){a=c.getElementsByTagName("*");for(var e=a.length;e--;)a[e].remove()});return this.put("textContent","")},clone:function(){return this.map(function(a,b){return b.cloneNode(!0)})},remove:function(){return this.each(function(a,b){b.parentNode&&b.parentNode.removeChild(b)})},val:function(a){return a?this.each(function(b,c){var e;d.nodeType(1,c)&&(e=d.isFunction(a)?a.call(this,b,d(this).val()):a,null===e?e="":"number"===typeof e&&(e+=""),c.value=e)}):elem&&d.getValue(this[0])},attr:function(a,b){return"object"===
typeof a?this.each(function(b,e){d.nodeType(3,e)||d.nodeType(8,e)||d.nodeType(2,e)||d.each(a,function(a,b){e.setAttribute(b,a+"")})}):"undefined"===typeof b?this[0]&&d.getAttr(this[0],a):this.each(function(c,e){d.nodeType(3,e)||d.nodeType(8,e)||d.nodeType(2,e)||e.setAttribute(a,b+"")})},removeAttr:function(a,b){if(b)return this.each(function(a,e){d.removeAttr(e,b)})},prop:function(a,b){if(d.isObject(a))return this.each(function(b,e){d.nodeType(3,e)||d.nodeType(8,e)||d.nodeType(2,e)||d.each(a,function(a,
b){e[b]=a})});if(d.isUndefined(b))return this[0]&&this[0][a];if(!d.nodeType(3,this[0])||!d.nodeType(8,this[0])||!d.nodeType(2,this[0]))return this.put(a,b)},append:function(a){return this.each(function(b,c){d.isString(a)?c.insertAdjacentHTML("beforeend",a):(d.nodeType(1,c)||d.nodeType(11,c)||d.nodeType(9,c))&&c.appendChild(a)})},prepend:function(a){var b;return this.each(function(c,e){d.isString(a)?e.insertAdjacentHTML("afterbegin",a):(b=e.childNodes[0])?e.insertBefore(a,b):(d.nodeType(1,e)||d.nodeType(11,
e)||d.nodeType(9,e))&&e.appendChild(a)})},after:function(a){var b;return this.each(function(c,e){d.isString(a)?e.insertAdjacentHTML("afterend",a):(b=d.getClosestNode(e,"nextSibling"))?e.parentNode&&e.parentNode.insertBefore(a,b):e.parentNode&&e.parentNode.appendChild(a)})},before:function(a){return this.each(function(b,c){d.isString(a)?c.insertAdjacentHTML("beforebegin",a):c.parentNode&&c.parentNode.insertBefore(a,c)})}});var x=Function.prototype.call,Ka=String.prototype.trim;d.extend({createDOMElem:function(a,
b,c,e,d,f){b=document.createElement(b);c&&(b.id=M(c,a));e&&(b.className=M(e,a));d&&b.appendChild(document.createTextNode(d));if(f)for(var k in f)f.hasOwnProperty(k)&&b.setAttribute(k,M(f[k],a));return b},parseHTML:function(a,b){var c=m[a]?m[a]:m[a]=a.split(l.operators).map(x,Ka),e=m[b]?m[b]:m[b]=document.createDocumentFragment(),g,f=[e];d.each(c,function(c,e){var n=e,A=(l.operators.exec(a)||[])[0],m=1,p,t,u,K,s={};if(g=n.match(l.attributes)){for(var r=g[g.length-1];g=l.values.exec(r);)s[g[1]]=(g[4]||
"").replace(/['"]/g,"").trim();n=n.replace(l.attributes,"")}if(g=n.match(l.multiplier))r=+g[1],0<r&&(m=r);if(g=n.match(l.id))t=g[g.length-1].slice(1);p=(g=n.match(l.tagname))?g[0]:"div";if(g=n.match(l.classname))u=g.map(function(a){return a.slice(1)}).join(" ");if(g=n.match(l.text))K=g[1],b&&(K=K.replace(/\$(\w+)/g,function(a,c){return b[c]}));d.each(q.call(f,0),function(a,b){for(var c=0;c<m;c++){var e=d.createDOMElem(1<m?c:a,p,t,u,K,s);"+"===A&&(e._sibling=!0);b.appendChild(e)}});">"===A&&(f=f.reduce(function(a,
b,c,e){return a.concat(q.call(b.childNodes,0).filter(function(a){return 1===a.nodeType&&!a._sibling}))},[]))});e.toHTML=ua;return e}});d.extend({removeClass:function(a,b){if(classList)d.each(a.split(l.specialSplit),function(a){b.classList.remove(a)});else{for(var c=b.className.split(l.specialSplit),e=[],g=0,f=c.length;g<f;g++)c[g]!==className&&e.push(c[g]);b.className=e.join(" ")}},addClass:function(a,b){a&&(classList?d.each(a.split(l.specialSplit),function(a){b.classList.add(a)}):d.hasClass(className,
b)||(b.className+=(b.className?" ":"")+className))},hasClass:function(a,b){if(a)return J.classList?b.classList.contains(a):RegExp("(^|\\s) "+a+" (\\s|$)").test(b.className)},toggleClass:function(a,b){if(a)if(classList)b.classList.toggle(a);else{for(var c=b.className.split(" "),e=-1,d=c.length;d--;)c[d]===a&&(e=d);0<=e?c.splice(e,1):c.push(a);b.className=c.join(" ")}}});d.fn.extend({addClass:function(a){if(a)return this.each(function(b,c){d.addClass(d.trim(a),c)})},removeClass:function(a){if(a)return this.each(function(b,
c){d.removeClass(d.trim(a),c)})},hasClass:function(a){if(a)return this.each(function(b,c){d.hasClass(d.trim(a),c)})},replaceClass:function(){},matchClass:function(a){return this.each(function(a,c){for(var e=c.className.replace(/^\s+|\s+$/g,"").split(" "),g,f=0,k=e.length;f<k;f++)if(g=e[f],-1!==d.indexOf(g,pattern))return g;return""})},tempClass:function(a,b){return this.each(function(c,e){d.addClass(d.trim(a),e);setTimeout(function(){d.removeClass(a,el)},b)})},allClass:function(){if(classList)return this[0].classList;
throw"Syntax error, missing classList support in your browser";},strClass:function(){if(classList)return el.classList.toString();throw"Syntax error, missing classList support in your browser";},toggleClass:function(a,b){return this.each(function(c,e){if(d.isBoolean(b)&&d.isString(type))return b?d.addClass(a,e):d.removeClass(a,e);d.toggleClass(a,e)})}});var v={disabeled:function(a,b){if(a.disabeled&&"click"===b)return!0},nodeType:function(a){if(3===a.nodeType||8===a.nodeType)return!0}},N={mouseenter:{base:"mouseover",
condition:aa},mouseleave:{base:"mouseout",condition:aa},mousewheel:{base:/Firefox/.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel"}},r="altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),V=[{reg:/^key/,fix:function(a,b){b.keyCode=a.keyCode||a.which;return r.concat(["char","charCode","key","keyCode"])}},{reg:/^(?:mouse|contextmenu)|click/,fix:function(a,b){b.rightClick=3===a.which||2===a.button;b.pos={x:0,y:0};if(a.pageX||
a.pageY)b.clientX=a.pageX,b.clientY=a.pageY;else if(a.clientX||a.clientY)b.clientX=a.clientX+p.body.scrollLeft+oa.scrollLeft,b.clientY=a.clientY+p.body.scrollTop+oa.scrollTop;return r.concat("button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "))}},{reg:/mouse.*(wheel|scroll)/i,fix:function(){return"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis".split(" ")}},{reg:/^text/i,
fix:function(){return r.concat(["data"])}},{reg:/^touch|^gesture/i,fix:function(){return r.concat(["touches","targetTouches","changedTouches","scale","rotation"])}},{reg:/^message$/i,fix:function(){return r.concat(["data","origin","source"])}},{reg:/^popstate$/i,fix:function(){return r.concat(["state"])}},{reg:/.*/,fix:function(){return r}}],ra={},R=function(a,b){if(arguments.length&&(this.originalEvent=a=a||((b.ownerDocument||b.document||b).parentWindow||win).event)){var c=a.type,e=a.target,d,f,
k;this.target=e&&3===e.nodeType?e.parentNode:e;k=ra[c];if(!k)for(e=0,d=V.length;e<d;e++)if(V[e].reg.test(c)){ra[c]=k=V[e].fix;break}c=k(a,this,c);for(e=c.length;e--;)!((f=c[e])in this)&&f in a&&(this[f]=a[f])}};R.prototype={preventDefault:function(){this.originalEvent.preventDefault?this.originalEvent.preventDefault():this.originalEvent.returnValue=!1},stopPropagation:function(){this.originalEvent.stopPropagation?this.originalEvent.stopPropagation():this.originalEvent.cancelBubble=!0},stop:function(){this.preventDefault();
this.stopPropagation();this.stopped=!0},stopImmediatePropagation:function(){this.originalEvent.stopImmediatePropagation&&this.originalEvent.stopImmediatePropagation();this.isImmediatePropagationStopped=function(){return!0}},isImmediatePropagationStopped:function(){return this.originalEvent.isImmediatePropagationStopped&&this.originalEvent.isImmediatePropagationStopped()}};E.prototype={inNamespaces:function(a){var b,c,e=0;if(!a)return!0;if(!this.namespaces)return!1;for(b=a.length;b--;)for(c=this.namespaces.length;c--;)a[b]==
this.namespaces[c]&&e++;return a.length===e},matches:function(a,b,c){return this.element===a&&(!b||this.original===b)&&(!c||this.handler===c)}};var s=function(){function a(c,e,d,f,k,h){var n=k?"r":"$";if(e&&"*"!==e){k=0;var l=b[n+e],m="*"===c;if(l)for(n=l.length;k<n&&(!m&&!l[k].matches(c,d,f)||h(l[k],l,k,e));k++);}else for(l in b)l.charAt(0)===n&&a(c,l.substr(1),d,f,k,h)}var b={};return{has:function(a,d,g,f){if(f=b[(f?"r":"$")+d])for(d=f.length;d--;)if(!f[d].root&&f[d].matches(a,g,null))return!0;
return!1},get:function(b,d,g,f){var k=[];a(b,d,g,null,f,function(a){k.push(a)});return k},put:function(a){var d=!a.root&&!this.has(a.element,a.type,null,!1),g=(a.root?"r":"$")+a.type;(b[g]||(b[g]=[])).push(a);return d},del:function(c){a(c.element,c.type,null,c.handler,c.root,function(a,c,d){c.splice(d,1);a.removed=!0;0===c.length&&delete b[(a.root?"r":"$")+a.type];return!1})}}}();d.fn.extend({on:function(a,b,c,e){var g;return this.each(function(){g=this;var f,k,h,n,m,p;if(g.disabeled&&v[disabeled](g,
f)||v.nodeType(g))return!1;if(b===u&&"object"===typeof a)for(f=t(a),h=f.length;h--;)ea.call(this,g,f[h],a[f[h]]);else{d.isFunction(b)?(n=q.call(arguments,3),c=f=b):(f=c,n=q.call(arguments,4),c=da(b,f));k=a.split(" ");e&&(c=O(z,g,a,c,f));for(h=k.length;h--;)if(p=s.put(m=new E(g,k[h].replace(l.nameRegex,""),c,f,k[h].replace(l.namespaceRegex,"").split("."),n,!1)))g[fa](m.eventType,Q,!1);return g}})},one:function(a,b,c){return this.on(a,b,c,!0)},off:function(a,b){return this.each(function(){z(this,a,
b)})}});d.extend({trigger:function(a,b,c){a=d.isString(a)?d.select(a)[0]:a[0];var e=b.split(" "),g,f,k,h,n;if(a.disabeled&&v[disabeled](a,b)||v.nodeType(a))return!1;for(g=e.length;g--;){b=e[g].replace(l.nameRegex,"");if(h=e[g].replace(l.namespaceRegex,""))h=h.split(".");if(h||c)for(n=s.get(a,b,null,!1),f=new R(null,a),f.type=b,b=c?"apply":"call",c=c?[f].concat(c):f,f=0,k=n.length;f<k;f++){if(n[f].inNamespaces(h))n[f].handler[b](a,c)}else h=p.createEvent("HTMLEvents"),h.initEvent(b,!0,!0,win,1),a.dispatchEvent(h)}return a}});
var xa={columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},ia={"float":"cssFloat"},ga=["Webkit","O","Moz","ms"];d.fn.extend({show:function(){return this.each(function(){ka(this)})},hide:function(){return this.each(function(){ja(this)})},toggle:function(){return this.each(function(){"none"===this.style.display?ka(this):ja(this)})},css:function(a,b){return d.isUndefined(b)?d.isString(a)?this[0]&&ha(this[0],
a):this.each(function(){var b=this;d.each(a,function(a,d){F(b,a,d)})}):this.each(function(){F(this,a,b)})},resetCSS:function(a){return this.each(function(){if(B(this)){for(var b={},c=0,d;d=t(a)[c];c+=1)b[d]=this.style[d],this.style[d]=a[d];return b}})},setOpacity:function(a){return this.each(function(){B(this)&&(this.style.opacity=a/100)})},restoreCSS:function(a){return this.each(function(){if(B(this))for(var b=0,c;c=t(a)[b];b+=1)this.style[c]=a[c]})},pageX:function(a){a=this[0];return a.offsetParent?
a.offsetLeft+this.pageX(a.offsetParent):a.offsetLeft},pageY:function(a){a=this[0];return a.offsetParent?a.offsetTop+this.pageX(a.offsetParent):a.offsetTop},parentX:function(a){a=this[0];return a.offsetParent===a.parentNode?a.offsetLeft:p.css.pageX(a)-p.pageX(a.parentNode)},parentY:function(a){var b=this[0];return b.offsetParent===b.parentNode?b.offsetTop:p.pageY(a)-p.pageY(b.parentNode)},setX:function(a){return this.each(function(){B(this)&&(this.style.left=parseNum(a)+"px")})},setY:function(a){return this.each(function(){B(this)&&
(this.style.top=parseNum(a)+"px")})}});d.extend({parseJSON:function(a){return JSON.parse(a+"")},parseXML:function(a){var b,c;if(!a||"string"!==typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=u}return!b||b.getElementsByTagName("parsererror").length?Error("Invalid XML: "+a):b}});var T=p.head||p.getElementsByTagName("head")[0],ma=0,G,Ca=-1!==d.indexOf(navigator.userAgent,"MSIE 10.0"),ma=0,sa={"*":"*/".concat("*"),text:"text/plain",html:"text/html",xml:"application/xml, text/xml",
json:"application/json, text/javascript",js:"application/javascript, text/javascript"};d.extend({ajax:function(a,b){a=a||{};b=b||function(){};var c,e=a.headers||{},g=t(e),f=-1,k=g.length,h=(a.method||"GET").toLowerCase(),l=d.isString(a)?a:a.url,m=a.type?a.type.toLowerCase():"",p=null,q=!1!==(a.processData||!0)&&a.data&&!d.isString(a.data)?ya(a.data):a.data||null,r=!1;if(!l)return!1;"jsonp"!==m&&"get"!==h.toLowerCase()||!q||(l=(l+"&"+q).replace(/[&?]+/,"?"),q=null);if("jsonp"===m&&/(=)\?(?=&|$)|\?\?/.test(l))return Aa(a,
b,l);if(!0===a.crossOrigin){var s=win.XMLHttpRequest?new XMLHttpRequest:null;if(s&&"withCredentials"in s)c=s;else if(win.xDomainRequest)c=new "XDomainRequest";else throw"Browser does not support cross-origin requests";}c.open(h,l,!1===a.async?!1:!0);e.Accept=e.Accept||sa[m]||sa["*"];a.crossOrigin||e.requestedWith||(e.requestedWith="XMLHttpRequest");for((a.contentType||a.data&&"get"!==m.toLowerCase())&&c.setRequestHeader("Content-Type",a.contentType||"application/x-www-form-urlencoded");++f<k;)c.setRequestHeader(d.trim(g[f]),
e[g[f]]);d.isDefined(a.withCredentials)&&d.isDefined(c.withCredentials)&&(c.withCredentials=!!a.withCredentials);0<a.timeout&&(p=setTimeout(function(){c.abort()},a.timeout));win.XDomainRequest&&c instanceof win.xDomainRequest?(c.onload=b,c.onerror=err,c.onprogress=function(){},r=!0):c.onreadystatechange=function(){if(4===c.readyState)if(200<=c.status&&300>c.status||304===c.status){var b;c&&("json"===m&&null===(b=JSON.parse(c.responseText))&&(b=c.responseText),b="xml"===m?c.responseXML&&c.responseXML.parseError&&
c.responseXML.parseError.errorCode&&c.responseXML.parseError.reason?null:c.responseXML:b||c.responseText);!b&&q&&(b=q);a.success&&a.success(b)}else a.error!==u&&(null!==p&&clearTimeout(p),a.error("error",a,c))};a.before&&a.before(c);r?setTimeout(function(){c.send(q)},200):c.send(q);return c},getJSON:function(a,b,c,e){d.ajax({url:a,method:"JSON",contentType:"application/json",error:d.isFunction(e)?e:function(a){},data:d.isObject(b)?b:{},success:d.isFunction?c:function(a){}})},get:function(a,b,c,e){d.ajax({url:a,
method:"GET",contentType:"",error:d.isFunction(e)?e:function(a){},data:d.isObject(b)?b:{},success:d.isFunction?c:function(a){}})},post:function(a,b,c,e){d.ajax({url:a,method:"POST",contentType:"",error:d.isFunction(e)?e:function(a){},data:d.isObject(b)?b:{},success:d.isFunction?c:function(a){}})}});w.hAzzle=d}})(window);