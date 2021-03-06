// style.js
hAzzle.define('Style', function() {

    var _util = hAzzle.require('Util'),
        _types = hAzzle.require('Types'),
        _units = hAzzle.require('Units'),
        _strings = hAzzle.require('Strings'),
        _curcss = hAzzle.require('curCSS'),

        _unitlessProps = ('zoom box-flex columns counter-reset volume stress overflow flex-grow ' +
            'column-count flex-shrink flex-height order orphans widows rotate3d flipped ' +
            'transform ms-flex-order transform-origin perspective transform-style ' +
            'ms-flex-negative ms-flex-positive transform-origin perspective ' +
            'perspective-origin backface-visibility scale scale-x scale-y scale-z ' +
            'scale3d reflect-x-y reflect-z reflect-y reflect ' +
            'background-color border-bottom-color border-left-color border-right-color border-top-color ' +
            'color column-rule-color outline-color text-decoration-color text-emphasis-color ' +
            'alpha z-index font-weight opacity red green blue').split(' '),

        _sNumbs = /^([+-])=([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(.*)/i,

        // _vPrix regEx

        _prReg = /^\w/

    // Used by vendorPrefixes as callback to replace()

    _vPrix = function(match) {
            return match.toUpperCase();
        },

        _vendors = ['', 'Webkit', 'Moz', 'ms', 'O'],

        _prefixElement = document.createElement('div'),

        _prefixCache = {},

        cssProps = {
            'float': 'cssFloat'
        },

        unitless = {},

        cssHooks = {
            get: {},
            set: {}
        },

        vendorPrefixes = function(prop) {
            if (_prefixCache[prop]) {
                return [_prefixCache[prop], true];
            } else {

                var i = 0,
                    _vendorsLength = _vendors.length,
                    propertyPrefixed;

                for (; i < _vendorsLength; i++) {

                    if (i === 0) {
                        propertyPrefixed = prop;
                    } else {
                        propertyPrefixed = _vendors[i] + prop.replace(_prReg, _vPrix);
                    }

                    if (typeof _prefixElement.style[propertyPrefixed] === 'string') {
                        _prefixCache[prop] = propertyPrefixed;
                        return [propertyPrefixed, true];
                    }
                }
                return [prop, false];
            }
        },

        // getCSS

        getCSS = function(elem, name) {

            var val, hooks, computed, style,
                origName = _strings.camelize(name),
                p = vendorPrefixes(origName);


            // Make sure that we're working with the right name

            name = cssProps[origName] ||
                (p[1] ? cssProps[origName] = p[0] : name);

            style = elem.style;

            // Try prefixed name followed by the unprefixed name
            hooks = cssHooks.get[name] || cssHooks.get[origName];

            // If a hook was provided get the computed value from there
            val = hooks ? hooks(elem, true) : val;

            if (!computed && val === undefined) {
                style = _curcss.styles(elem);
                val = hooks ? hooks(elem, true) : style[name];
                computed = true;
            }

            return val;
        },

        // setCSS        

        setCSS = function(elem, name, value) {

            if (elem && (elem.nodeType !== 3 || elem.nodeType !== 8)) { // Text or Comment

                var ret, style, hook, type, action, origName = _strings.camelize(name);

                name = cssProps[origName] || (cssProps[origName] = vendorPrefixes(name)[0]);

                style = elem.style;
                if (!style) {
                    return;
                }
                if (value !== undefined) {

                    type = typeof value;

                    hook = cssHooks.set[name];


                    // Convert '+=' or '-=' to relative numbers, and
                    // and convert all unit types to PX (e.g. 10em will become 160px)

                    if (type === 'string' && (ret = _sNumbs.exec(value))) {
                        value = _units.units(_curcss.css(elem, name), ret[3], elem, name) + (ret[1] + 1) * ret[2];
                        type = 'number';
                    }

                    // If a number was passed in, add 'px' (except for certain CSS properties)

                    if (type === 'number' && !unitless[name]) {
                        value += ret && ret[3] ? ret[3] : 'px';
                    }

                    // If null and NaN values, remove / don't set current style

                    if (value === null || value === '') {
                        action = 'remove';
                    } else {
                        action = 'set';
                    }

                    // Set values through cssHooks if defined

                    if (hook) {
                        hook(elem, name, value);
                    } else {
                        // CSSStyleDeclaration 
                        style[action + 'Property'](name, '' + value);
                    }

                } else {
                    hook = cssHooks.get[name];

                    if (cssHooks.get[name] && (ret = cssHooks.get[name](elem, false))) {
                        return ret;
                    }

                    return style[name];
                }
            }
        };

    this.css = function(name, value) {

        var node = this.elements;

        // jQuery method

        if (_types.isArray(name)) {

            var map = {},
                i = name.length;

            while (i--) {
                map[name[i]] = getCSS(node[0], name[i], false);
            }

            return map;
        }

        if (value === undefined) {

            if (typeof name === 'string') {
                return node[0] && getCSS(node[0], name);
            }

            // Object

            return this.each(function(elem) {
                _util.each(name, function(value, prop) {
                    setCSS(elem, prop, value);
                });
            });
        }

        // Set style
        return this.each(function(elem) {
            setCSS(elem, name, value);
        });
    };

    // Populate the unitless properties list

    _util.each(_unitlessProps, function(prop) {
        unitless[_strings.camelize(prop)] = true;
    });

    return {
        cssHooks: cssHooks,
        cssProps: cssProps,
        unitless: unitless,
        getCSS: getCSS,
        setCSS: setCSS
    };
});