/*!
 * CSS
 */
var numbs = /^([+-])=([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(.*)/i,

    cssCore = {

        directions: ['Top', 'Right', 'Bottom', 'Left'],

        stylePrefixes: ['', 'Moz', 'Webkit', 'O', 'ms', 'Khtml'],

        /**
         * CSS Normal Transforms
         */

        cssNormalTransform: {

            letterSpacing: '0',
            fontWeight: '400'
        },

        has: {

            'api-gCS': !!document.defaultView.getComputedStyle
        }
    },

    getStyles = function(elem) {
        var view = elem.ownerDocument.defaultView;
        return cssCore.has['api-gCS'] ? (view.opener ? view.getComputedStyle(elem, null) :
            window.getComputedStyle(elem, null)) : elem.style;
    };

// Bug detection

hAzzle.assert(function(div) {
    cssCore.has['bug-clearCloneStyle'] = div.style.backgroundClip === "content-box";
});

// Extend the hAzzle Core
hAzzle.extend({

    /**
     * Set / get CSS style
     *
     * @param {Object|string} property
     * @param {string} value
     * @return {hAzzle|string}
     */

    css: function(prop, value) {

        var type = typeof prop,
            i = 0,
            key, l = this.length,
            obj = type === 'string' ? {} : prop,
            el = this[0];

        // If 'prop' are an array

        if (hAzzle.isArray(prop)) {
            var map = {},
                styles = getStyles(el),
                len = prop.length;
            i = 0;

            for (; i < len; i++) {

                map[prop[i]] = curCSS(el, prop[i], styles);
            }
            return map;
        }

        // Both values set, get CSS value

        if (typeof value === 'undefined' && type === 'string') {

            return hAzzle.css(el, prop);
        }

        if (type === 'string') {
            obj[prop] = value;
        }

        for (; i < l; i++) {

            for (key in obj) {

                hAzzle.style(this[i], key, obj[key]);
            }
        }
        return this;
    },

    opacity: function(value) {
        return this.each(function(el) {
            hAzzle.opacity(el, value);
        });
    }

});

// Go globale!

hAzzle.extend({

    // Properties that shouldn't have units behind 

    unitless: {},

    cssHooks: {

        opacity: {
            get: function(el, computed) {

                if (computed) {
                    var ret = curCSS(el, 'opacity');
                    return ret === '' ? '1' : ret;
                }
            }
        }
    },

    cssProps: {

        'float': 'cssFloat'
    },

    /**
     * Set css properties
     *
     * @param {Object} elem
     * @param {String|Object} name
     * @param {String} value
     * @return {String|hAzzle}
     */

    style: function(elem, name, value) {

        if (!elem) {

            return;
        }

        var valid = [3, 8],
            nType = elem.nodeType;

        // Check if we're setting a value

        if (value !== undefined) {

            if (elem && valid[nType]) {

                var type = typeof value,
                    p, hooks, ret, style = elem.style;

                // Camelize the name

                p = hAzzle.camelize(name);

                name = hAzzle.cssProps[p] || (hAzzle.cssProps[p] = vendorPrefixed(style, p));

                // Props to jQuery

                hooks = hAzzle.cssHooks[name] || hAzzle.cssHooks[p];

                // convert relative number strings

                if (type === 'string' && (ret = numbs.exec(value))) {

                    value = hAzzle.units(parseFloat(hAzzle.css(elem, name)), ret[3], elem, name) + (ret[1] + 1) * ret[2];
                    type = 'number';
                }

                // Make sure that null and NaN values aren't set.

                if (value === null || value !== value) {

                    return;
                }

                // If a number was passed in, add 'px' to the (except for certain CSS properties)

                if (type === 'number' && !hAzzle.unitless[name]) {

                    value += ret && ret[3] ? ret[3] : 'px';
                }

                if (!cssCore.has['bug-clearCloneStyle'] && value === '' && name.indexOf('background') === 0) {

                    style[hAzzle.camelize(name)] = 'inherit';
                }

                // If a hook was provided, use that value, otherwise just set the specified value

                if (!hooks || !('set' in hooks) || (value = hooks.set(elem, value)) !== undefined) {
                    style[p] = value;
                }
            }

        } else {

            return elem && elem.style[name];
        }
    },

    /**
     * Set CSS rules on DOM nodes
     *
     * @param {Object} elem
     * @param {String|Object} prop
     * @return {String|Object|Array}
     */

    css: function(elem, prop) {

        var val,
            hooks,
            origName = hAzzle.camelize(prop);

        // If no element, return

        if (!elem) return null;

        hooks = hAzzle.cssHooks[prop] || hAzzle.cssHooks[origName];

        // If a hook was provided get the computed value from there

        if (hooks && 'get' in hooks) {

            val = hooks.get(elem, true);
        }

        // Otherwise, if a way to get the computed value exists, use that

        if (val === undefined) {

            val = curCSS(elem, prop);
        }

        //convert 'normal' to computed value

        if (val === 'normal' && prop in cssCore.cssNormalTransform) {

            val = cssCore.cssNormalTransform[prop];
        }

        return val;
    },

    /**
     * Set opacity
     *
     * @param{Object} elem
     * @param{number} value
     */
    opacity: function(element, value) {

        if (typeof value !== 'number') {
            value = 1;
        }
        if (value == 1 || value === '') {

            value = '';

        } else if (value < 0.00001) {

            value = 0;
        }

        element.style.opacity = value;
    },

    // Quick functions for setting, getting and 
    // erase CSS styles with cssText

    setCSS: function(elem, style) {
        elem.style.cssText = style;
    },

    getCSS: function(elem) {
        return elem.style.cssText;
    },

    eraseCSS: function(elem) {
        elem.style.cssText = '';
    }

}, hAzzle);

/* =========================== PRIVATE FUNCTIONS ========================== */



function vendorPrefixed(style, name) {

    // shortcut for names that are not vendor prefixed
    if (name in style) {
        return name;
    }

    // check for vendor prefixed names
    var capName = name[0].toUpperCase() + name.slice(1),
        origName = name,
        i = cssCore.stylePrefixes.length;

    while (i--) {
        name = cssCore.stylePrefixes[i] + capName;
        if (name in style) {
            return name;
        }
    }

    return origName;
}




function curCSS(elem, prop, computed) {
    var ret;

    computed = computed || getStyles(elem);

    if (computed) {
        ret = computed.getPropertyValue(prop) || computed[prop];
    }

    if (computed && (ret === '' && !hAzzle.contains(elem.ownerDocument, elem))) {

        ret = hAzzle.style(elem, prop);
    }

    return ret !== undefined ?
        ret + '' :
        ret;
}

/* =========================== INTERNAL ========================== */



// Margin and padding cssHooks

hAzzle.each(['margin', 'padding'], function(hook) {
    hAzzle.cssHooks[hook] = {
        get: function(elem) {
            return hAzzle.map(cssCore.directions, function(dir) {
                return hAzzle.css(elem, hook + dir);
            }).join(' ');
        },
        set: function(elem, value) {
            var parts = value.split(/\s/),
                values = {
                    'Top': parts[0],
                    'Right': parts[1] || parts[0],
                    'Bottom': parts[2] || parts[0],
                    'Left': parts[3] || parts[1] || parts[0]
                };
            hAzzle.each(cssCore.directions, function(dir) {
                elem.style[hook + dir] = values[dir];
            });
        }
    };
});

// Unitless properties

hAzzle.each(['lineHeight', 'zoom', 'zIndex', 'opacity', 'boxFlex',
        'WebkitBoxFlex', 'MozBoxFlex',
        'columns', 'counterReset', 'counterIncrement',
        'fontWeight', 'float', 'volume', 'stress',
        'overflow', 'fillOpacity',
        'flexGrow', 'columnCount',
        'flexShrink', 'order',
        'orphans', 'widows',
        'transform', 'transformOrigin',
        'transformStyle', 'perspective',
        'perspectiveOrigin', 'backfaceVisibility'
    ],
    function(name) {
        hAzzle.unitless[name] = true;
    });