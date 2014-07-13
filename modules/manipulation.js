/*!
 * Manipulation
 */

var win = this,
    doc = win.document,
    rnoInnerhtml = /<(?:script|style|link)/i,
    uniqueTags = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    specialTags = /^(select|fieldset|table|tbody|tfoot|td|tr|colgroup)$/i,
    rreturn = /\r/g,
    ssv = /\S+/g,

    // Boolean attributes

    boolAttr = {},

    // Boolean elements

    boolElem = {},

    domCore = {

        has: {}

    };
	
	// Bug detection

(function () {
    var input = doc.createElement("input"),
        select = doc.createElement("select"),
        opt = select.appendChild(doc.createElement("option"));

    input.type = "checkbox";

    // Support: iOS<=5.1, Android<=4.2+
    // Default value for a checkbox should be "on"
    domCore.has['bug-checkbox'] = input.value !== "";

    // Support: IE<=11+
    // Must access selectedIndex to make default options select
    domCore.has['bug-optSelected'] = opt.selected;

    // Support: IE<=11+
    // An input loses its value after becoming a radio
    input = doc.createElement("input");
    input.value = "t";
    input.type = "radio";
    domCore.has['bug-radioValue'] = input.value === "t";
})();



hAzzle.extend({

    /**
     * Get / set attribute value
     *
     * @param {String} name
     * @param {String|Object} value

     *
     * @return {Object|String}
     */

    attr: function (name, value) {
        return hAzzle.setter(this, hAzzle.attr, name, value, true);
    },

    /**
     * Remove a given attribute from an element
     *
     * @param {String} value
     * @return {hAzzle}
     */

    removeAttr: function (value) {
        return this.each(function (el) {
            hAzzle.removeAttr(el, value);
        });
    },

    /**
     * Check if an element have an attribute
     *
     * @param{String} name
     * @return {Boolean}
     */

    hasAttr: function (name) {
        return name && typeof this.attr(name) !== 'undefined';
    },

    /**
     * Toggle attributes
     *
     * @param{String} attr
     * @param{Boolean} toggle
     * @return {hAzzle}
     */

    toggleAttr: function (attr, toggle) {

        var self = this,
            args = arguments.length;

        // Do nothing if no params provided: (ie fail safely)
        if (args === 0) {

            return self;

            // When toggle arg not provided, add attribute where not present, remove it where prosent:

        } else if (args === 1) {

            return self.each(function (el) {

                hAzzle(el)[hAzzle(el).attr(attr) ? 'removeAttr' : 'addAttr'](attr, attr);
            });

            // Otherwise when both attr & toggle arguments have been provided:
        } else {

            // When toggle is a function, apply it to each element:

            if (typeof toggle === 'function') {

                return self.each(function (el) {

                    hAzzle(el)[toggle.call(el) ? 'addAttr' : 'removeAttr'](attr, attr);

                });

                // Or add attr if toggle is true, remove attr if toggle is false:
            } else {

                return self[toggle ? 'addAttr' : 'removeAttr'](attr, attr);
            }
        }
    },

    /**
     * Read or set properties of DOM elements
     *
     * @param {String/Object} name
     * @param {String/Null} value
     * @return {hAzzle}
     */

    prop: function (name, value) {
        return hAzzle.setter(this, hAzzle.prop, name, value, true);
    },

    /**
     * Toggle properties on DOM elements
     */

    toggleProp: function (prop) {
        return this.each(function (el) {
            return el.prop(prop, !el.prop(prop));
        });
    },

    /*
     * Remove properties from DOM elements
     *
     * @param {String} name
     * @return {hAzzle}
     */

    removeProp: function (prop) {
        return this.each(function () {
            delete this[hAzzle.propFix[prop] || prop];
        });
    },

    /**
     * Get value for input/select elements
     * Set value for input/select elements
     *
     * @param {String} value
     * @return {Object|String}
     */

    val: function (value) {

        var hooks, ret,
            elem = this[0];

        if (!arguments.length) {

            if (elem) {

                hooks = hAzzle.valHooks[elem.type] || hAzzle.valHooks[elem.nodeName.toLowerCase()];

                if (hooks && 'get' in hooks && (ret = hooks.get(elem, 'value')) !== undefined) {

                    return ret;
                }

                ret = elem.value;

                return typeof ret === 'string' ? ret.replace(rreturn, '') : ret === null ? '' : ret;
            }

            return;
        }

        return this.each(function (el, i) {

            var val;

            if (el.nodeType !== 1) {
                return;
            }

            if (typeof value === 'function') {

                val = value.call(el, i, hAzzle(el).val());

            } else {

                val = value;
            }

            // Treat null/undefined as ""; convert numbers to string

            if (val === null) {

                val = '';

            } else if (typeof val === 'number') {

                val += '';

            } else if (hAzzle.isArray(val)) {

                val = hAzzle.map(val, function (value) {

                    return value === null ? '' : value + '';
                });
            }

            hooks = hAzzle.valHooks[el.type] || hAzzle.valHooks[el.nodeName.toLowerCase()];

            // If set returns undefined, fall back to normal setting

            if (!hooks || !('set' in hooks) || hooks.set(el, val, 'value') === undefined) {
                el.value = val;
            }
        });
    },

    /**
     * Get html from element.
     * Set html to element.
     *
     * @param {String} html
     * @return {hAzzle|string}
     *
     */

    html: function (value) {

        var el = this[0] || {},
            append = function (el, i) {
                hAzzle.each(hAzzle.stabilizeHTML(value, i), function (node) {
                    el.appendChild(node);
                });
            };

        if (value === undefined && el.nodeType === 1) {

            return el.innerHTML;
        }

        // check if the value are an 'function'

        if (typeof value === 'function') {

            return this.each(function (el, i) {
                var self = hAzzle(el);
                // Call the same function again
                self.html(value.call(el, i, self.html()));
            });
        }

        return this.empty().each(function (el, i) {

            if (typeof value === 'string' && !specialTags.test(el.tagName) &&
                !rnoInnerhtml.test(el.tagName)) {

                value = value.replace(uniqueTags, '<$1></$2>');

                try {

                    if (el.nodeType === 1) {

                        el.innerHTML = value;
                    }

                    el = 0;

                } catch (e) {}

            } else {

                append(el, i);
            }
        });
    },

    /**
     * Get text for the first element in the collection
     * Set text for every element in the collection
     *
     * hAzzle('div').text() => div text
     *
     * @param {String} value
     * @return {hAzzle|String}
     */

    text: function (value) {
        return typeof value === 'function' ?
            this.each(function (el, i) {
                var self = hAzzle(el);
                self.text(value.call(el, i, self.text()));
            }) :
            value === undefined ? hAzzle.getText(this) :
            this.empty().each(function () {
                if (this.nodeType === 1 || this.nodeType === 9 || this.nodeType === 11) {
                    this.textContent = value;
                }
            });
    },

});


// Extend the globale hAzzle Object

hAzzle.extend({

    propHooks: {

        tabIndex: {
            get: function (elem) {
                return elem.hasAttribute('tabindex') ||
                    /^(?:input|select|textarea|button)$/i.test(elem.nodeName) ||
                    elem.href ? elem.tabIndex : -1;
            }
        }
    },

    propFix: {
        'for': 'htmlFor',
        'class': 'className'
    },

    nodeHook: {


    },

    boolHook: {

        set: function (elem, value, name) {
            if (value === false) {
                // Remove boolean attributes when set to false
                hAzzle.removeAttr(elem, name);
            } else {
                elem.setAttribute(name, name);
            }
            return name;
        }

    },

    valHooks: {
        option: {
            get: function (elem) {

                var val = elem.getAttribute(name, 2);

                return val !== null ?
                    val :
                    hAzzle.trim(hAzzle.getText(elem));
            }
        },
        select: {
            get: function (elem) {

                // selectbox has special case

                var option,
                    options = elem.options,
                    index = elem.selectedIndex,
                    one = elem.type === 'select-one' || index < 0,
                    values = one ? null : [],
                    value,
                    max = one ? index + 1 : options.length,
                    i = index < 0 ?
                    max :
                    one ? index : 0;

                for (; i < max; i++) {

                    option = options[i];

                    if ((option.selected || i === index) &&
                        option.getAttribute('disabled') === null &&
                        (!option.parentNode.disabled || !hAzzle.nodeName(option.parentNode, "optgroup"))) {

                        // Get the specific value for the option

                        value = hAzzle(option).val();

                        // We don't need an array for one selects

                        if (one) {

                            return value;
                        }

                        // Multi-Selects return an array
                        values.push(value);
                    }
                }
                return values;
            },

            set: function (elem, value) {

                var optionSet, option,
                    options = elem.options,
                    values = hAzzle.makeArray(value),
                    i = options.length;

                while (i--) {

                    option = options[i];

                    if ((option.selected = hAzzle.indexOf(option.value, values) >= 0)) {

                        optionSet = true;
                    }
                }

                // Force browsers to behave consistently when non-matching value is set
                if (!optionSet) {

                    elem.selectedIndex = -1;
                }
                return values;
            }
        }
    },

    attrHooks: {

        type: {
            set: function (elem, value) {

                if (!domCore.has['bug-radioValue'] && value === 'radio' &&
                    hAzzle.nodeName(elem, 'input')) {

                    var val = elem.value;

                    elem.setAttribute('type', value);

                    if (val) {

                        elem.value = val;
                    }

                    return value;
                }
            }
        }

    },

    removeAttr: function (el, value) {

        var name, propName, i = 0,
            attrNames = typeof value == 'string' ? value.match(ssv) : [].concat(value),
            l = attrNames.length;

        for (; i < l; i++) {

            name = attrNames[i];

            propName = hAzzle.propFix[name] || name;

            if (getBooleanAttrName(el, name)) {

                el[propName] = false;

            } else {

                el.removeAttribute(name);
            }
        }
    },

    attr: function (elem, name, value) {

        var hooks, ret,
            valid = [2, 3, 8],
            nType = elem.nodeType;

        if (elem && (valid[nType])) {

            // Fallback to prop when attributes are not supported
            if (typeof elem.getAttribute === undefined) {
                return hAzzle.prop(elem, name, value);
            }

            if (nType !== 1 || hAzzle.documentIsHTML) {

                name = name.toLowerCase();

                hooks = hAzzle.attrHooks[name] ||
                    getBooleanAttrName(elem, name) ? hAzzle.boolHook : hAzzle.nodeHook;
            }

            if (value !== undefined) {

                if (value === null) {

                    hAzzle.removeAttr(elem, name);

                } else {

                    if (hooks && 'set' in hooks) {

                        ret = hooks.set(elem, value, name);

                        if (ret) {

                            return ret;
                        }
                    }

                    elem.setAttribute(name, value + '');
                    return value;
                }

            } else {

                if (hooks && 'get' in hooks) {
                    ret = hooks.get(elem, name);
                    if (ret !== null) {
                        return ret;
                    }
                }
                ret = elem.getAttribute(name, 2);

                return ret === null ?
                    undefined :
                    ret;

            }
        }
    },

    // Props to jQuery

    prop: function (elem, name, value) {

        var ret, hooks,
            nType = elem.nodeType;

        // don't get/set properties on text, comment and attribute nodes
        if (!elem || nType === 2 || nType === 3 || nType === 8) {
            return;
        }

        if (nType !== 1 || hAzzle.documentIsHTML) {

            // Fix name and attach hooks
            name = hAzzle.propFix[name] || name;
            hooks = hAzzle.propHooks[name];
        }

        if (typeof value !== 'undefined') {

            return hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined ?
                ret :
                (elem[name] = value);

        } else {

            return hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null ?
                ret :
                elem[name];
        }
    },

    anyAttr: function (elem, fn, scope) {

        var a, ela = elem.attributes,
            l = ela && ela.length,
            i = 0;

        if (typeof fn !== 'function') {
            return +l || 0;
        }

        scope = scope || elem;

        while (i < l) {
            if (fn.call(scope, (a = ela[i++]).value, a.name, a)) {
                return i;
            }
        }
        return 0;
    }

}, hAzzle);

/* =========================== PRIVATE FUNCTIONS ========================== */

// Get names on the boolean attributes

function getBooleanAttrName(element, name) {
    // check dom last since we will most likely fail on name
    var booleanAttr = boolAttr[name.toLowerCase()];
    // booleanAttr is here twice to minimize DOM access
    return booleanAttr && boolElem[element.nodeName] && booleanAttr;
}




/* =========================== INTERNAL ========================== */

// Support: IE9+

if (!domCore.has['bug-optSelected']) {
    hAzzle.propHooks.selected = {
        get: function (elem) {
            var parent = elem.parentNode;
            if (parent && parent.parentNode) {
                parent.parentNode.selectedIndex;
            }
            return null;
        }
    };
}

// Radios and checkboxes setter

hAzzle.each(['radio', 'checkbox'], function () {
    hAzzle.valHooks[this] = {
        set: function (elem, value) {
           if (hAzzle.isArray(value)) {
			var val = hAzzle(elem).val(),
                checked = hAzzle.indexOf( val, value ) >= 0 ;
			// Set the value
				elem.checked = checked;
			return;
            }
        }
    };
});

// Boolean attributes and elements

hAzzle.each(('multiple selected checked disabled readOnly required async autofocus ' +
    'autoplay controls defer hidden ismap loop scoped open').split(' '), function (value) {
    boolAttr[value] = value;
});

hAzzle.each('input select option textarea button form details'.split(' '), function (value) {
    boolElem[value.toUpperCase()] = true;
});
