// setters.js
hAzzle.define('Setters', function() {

    var _util = hAzzle.require('Util'),
        _core = hAzzle.require('Core'),
        _types = hAzzle.require('Types'),
        _has = hAzzle.require('has'),
        _strings = hAzzle.require('Strings'),
        _concat = Array.prototype.concat,
        SVGAttributes = 'width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2',
        whiteSpace = /\S+/g,
        wreturn = /\r/g,
        wrapBrackets = /^[\[\s]+|\s+|[\]\s]+$/g, // replace whitespace, trim [] brackets
        arrWhitespace = /\s*[\s\,]+\s*/,
        escapeDots = /\\*\./g, // find periods w/ and w/o preceding backslashes
        boolElemArray = ('input select option textarea button form details').split(' '),
        boolAttrArray = ('multiple selected checked disabled readonly required ' +
            'async autofocus compact nowrap declare noshade hreflang onload src' +
            'noresize defaultChecked autoplay controls defer autocomplete ' +
            'hidden tabindex readonly type accesskey dropzone spellcheck ismap loop scoped open').split(' '),
        boolAttr = {}, // Boolean attributes
        boolElem = {}, // Boolean elements

        propMap = {
            // properties renamed to avoid clashes with reserved words  
            'class': 'className',
            'for': 'htmlFor'
        },
        forcePropNames = {
            innerHTML: 1,
            textContent: 1,
            className: 1,
            htmlFor: _has.has('ie'),
            value: 1
        },
        attrHooks = {
            get: {},
            set: {}
        },
        propHooks = {
            get: {},
            set: {}
        },
        nodeHooks = {
            get: {},
            set: {}
        },
        boolHooks = {
            get: {},
            set: {}
        },
        valHooks = {
            get: {},
            set: {}
        },

        SVGAttribute = function(prop) {

            if (_has.ie || (_has.has('android') && !_has.has('chrome'))) {
                SVGAttributes += '|transform';
            }

            return new RegExp('^(' + SVGAttributes + ')$', 'i').test(prop);
        },

        getElem = function(elem) {
            if (elem instanceof hAzzle) {
                return elem.elements;
            }
            return elem;

        },

        // Get names on the boolean attributes

        getBooleanAttrName = function(elem, name) {
            // check dom last since we will most likely fail on name
            var booleanAttr = boolAttr[name.toLowerCase()];
            // booleanAttr is here twice to minimize DOM access
            return booleanAttr && boolElem[elem.nodeName] && booleanAttr;
        },

        // Removes an attribute from an HTML element.

        removeAttr = function(elem, value) {

            elem = getElem(elem);

            var name, propName,
                i = 0,
                keys = typeof value === 'string' ? value.match(whiteSpace) : _concat(value),
                l = keys.length;

            for (; i < l; i++) {

                name = keys[i];

                // Get the properties

                propName = propMap[name] || name;

                if (getBooleanAttrName(elem, name)) {
                    elem[propName] = false;
                } else {
                    elem.removeAttribute(name);
                }
            }
        },

        // Toggle attributes        

        toggleAttr = function(elem, attr, force) {

            elem = getElem(elem);

            typeof force == 'boolean' || (force = null == Attr(elem, attr) === false);

            var opposite = !force;

            force ? Attr(elem, attr, '') : removeAttr(elem, attr);

            return elem[attr] === opposite ? elem[attr] = force : force;

        },

        // Convert list of attr names or data- keys into a selector.

        toAttrSelector = function(list, prefix, join) {
            var l, s, i = 0,
                j = 0,
                emp = '',
                arr = [];
            prefix = true === prefix;
            list = typeof list == 'string' ? list.split(arrWhitespace) : typeof list == 'number' ? '' + list : list;
            for (l = list.length; i < l;) {
                s = list[i++];
                s = prefix ? _strings.hyphenate(s) : s.replace(wrapBrackets, emp);
                s && (arr[j++] = s);
            }
            // Escape periods to allow atts like `[data-the.wh_o]`
            // @link api.jquery.com/category/selectors/
            // @link stackoverflow.com/q/13283699/770127
            return false === join ? arr : j ? '[' + arr.join('],[').replace(escapeDots, '\\\\.') + ']' : emp;
        },

        // get/set attribute

        Attr = function(elem, name, value) {

            elem = getElem(elem);

            var nodeType = elem ? elem.nodeType : undefined,
                hooks, ret, notxml, forceProp = forcePropNames[name];

            if (!nodeType || nodeType === 3 || nodeType === 8 || nodeType === 2) {
                return '';
            }
            // don't get/set attributes on text, comment and attribute nodes


            // Fallback to prop when attributes are not supported
            if (typeof elem.getAttribute === 'undefined') {
                return Prop(elem, name, value);
            }

            notxml = nodeType !== 1 || !_core.isXML(elem);

            if (notxml) {

                name = name.toLowerCase();
                hooks = (attrHooks[value === 'undefined' ? 'get' : 'set'][name] || null) ||
                    getBooleanAttrName(elem, name) ?
                    boolHooks[value === 'undefined' ?
                        'get' : 'set'][name] : nodeHooks[value === 'undefined' ? 'get' : 'set'][name];
            }

            // getAttribute

            if (value === undefined) {

                if (hooks && (ret = hooks.get(elem, name))) {
                    if (ret !== null) {
                        return ret;
                    }
                }
                if (name == 'textContent') {
                    return Prop(elem, name);
                }
                ret = elem.getAttribute(name, 2);
                // Non-existent attributes return null, we normalize to undefined
                return ret == null ?
                    undefined :
                    ret;
            }

            // setAttribute          

            if (!value) {
                removeAttr(elem, name);
            } else if (hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                return ret;
            } else {
                if (forceProp || typeof value == 'boolean' || _types.isFunction(value)) {
                    return Prop(elem, name, value);
                }
                elem.setAttribute(name, value + '');
            }
        },

        Prop = function(elem, name, value) {

            elem = getElem(elem);

            var nodeType = elem ? elem.nodeType : undefined,
                hook, ret;

            if (!nodeType || nodeType === 3 || nodeType === 8 || nodeType === 2) {
                return '';
            }
            if (nodeType !== 1 || _core.isHTML) {

                // Fix name and attach hooks
                name = propMap[name] || name;
                hook = value === 'undefined' ? propHooks.get[name] : propHooks.set[name];
            }

            if (typeof value !== 'undefined') {

                return hook && (ret = hook.set(elem, value, name)) !== undefined ?
                    ret :
                    (elem[name] = value);

            } else {

                return hook && (ret = hook(elem, name)) !== null ?
                    ret :
                    elem[name];
            }
        };

    this.val = function(value) {

        var hooks, ret, isFunction,
            elem = this.elements[0];

        if (!arguments.length) {
            if (elem) {
                hooks = valHooks.get[elem.type] ||
                    valHooks.get[elem.nodeName.toLowerCase()];

                if (hooks) {
                    return hooks(elem, 'value');
                }

                ret = elem.value;

                return typeof ret === 'string' ?
                    // Handle most common string cases
                    ret.replace(wreturn, '') :
                    // Handle cases where value is null/undef or number
                    ret == null ? '' : ret;
            }

            return;
        }

        isFunction = _types.isFunction(value);

        return this.each(function(elem, index) {
            var val;

            if (elem.nodeType !== 1) {
                return;
            }

            if (isFunction) {
                val = value.call(elem, index, hAzzle(elem).val());
            } else {
                val = value;
            }

            // Treat null/undefined as ''; convert numbers to string
            if (val == null) {
                val = '';

            } else if (typeof val === 'number') {
                val += '';

            } else if (_types.isArray(val)) {
                val = _util.map(val, function(value) {
                    return value == null ? '' : value + '';
                });
            }

            hooks = valHooks.set[elem.type] || valHooks.set[elem.nodeName.toLowerCase()];

            // If set returns undefined, fall back to normal setting
            if (!hooks || hooks(elem, val, 'value') === undefined) {
                elem.value = val;
            }
        });
    };

    this.hasAttr = function(name) {
        return name && typeof this.attr(name) !== 'undefined';
    };

    // Toggle properties on DOM elements

    this.toggleProp = function(prop) {
        return this.each(function(elem) {
            return elem.prop(prop, !elem.prop(prop));
        });
    };

    this.prop = function(name, value) {
        var elem = this.elements;
        if (typeof name === 'object') {
            return this.each(function(elem) {
                _util.each(name, function(value, key) {
                    Prop(elem, key, value);
                });
            });
        }

        if (typeof value === 'undefined') {
            return Prop(elem[0], name);
        }

        this.each(elem, function(elem) {
            Prop(elem, name, value);

        });
    };

    // Toggle properties on DOM elements

    this.toggleProp = function(prop) {
        return this.each(function(elem) {
            return elem.prop(prop, !elem.prop(prop));
        });
    };

    this.removeProp = function(name) {
        return this.each(function() {
            delete this[propMap[name] || name];
        });
    };

    this.removeAttr = function(value) {
        return this.each(function(elem) {
            removeAttr(elem, value);
        });
    };

    this.attr = function(name, value) {

        var elem = this.elements;

        if (typeof name === 'object') {
            return this.each(function(elem) {
                _util.each(name, function(value, key) {
                    Attr(elem, key, value);
                });
            });
        }
        return typeof value === 'undefined' ?
            Attr(elem[0], name) :
            this.each(function(elem) {
                Attr(elem, name, value);
            });
    };

    //  Check if  element has an attribute

    this.hasAttr = function(name) {
        return name && typeof this.attr(name) !== 'undefined';
    };

    _util.each(boolAttrArray, function(prop) {
        boolAttr[boolAttrArray[prop]] = boolAttrArray[prop];
    });

    _util.each(boolElemArray, function(prop) {
        boolElem[prop.toUpperCase()] = true;
    });

    // Populate propMap - all properties written as camelCase
    _util.each(['cellPadding', 'cellSpacing', 'maxLength', 'rowSpan',
        'colSpan', 'useMap', 'frameBorder', 'contentEditable', 'textContent', 'valueType',
        'tabIndex', 'readOnly', 'type', 'accessKey', 'tabIndex', 'dropZone', 'spellCheck',
        'hrefLang', 'isMap', 'srcDoc', 'mediaGroup', 'autoComplete', 'noValidate',
        'radioGroup'
    ], function(prop) {

        propMap[prop.toLowerCase()] = prop;
    });

    return {
        attrHooks: attrHooks,
        propHooks: propHooks,
        boolHooks: boolHooks,
        nodeHooks: nodeHooks,
        valHooks: valHooks,
        propMap: propMap,
        boolAttr: boolAttr,
        boolElem: boolElem,
        attr: Attr,
        prop: Prop,
        removeAttr: removeAttr,
        toggleAttr: toggleAttr,
        toAttrSelector: toAttrSelector,
        getBooleanAttrName: getBooleanAttrName,
        SVGAttribute: SVGAttribute
    };
});