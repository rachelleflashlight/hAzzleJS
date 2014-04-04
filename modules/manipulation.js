var

// Get the properties right

propMap = {
    'tabindex': 'tabIndex',
    'readonly': 'readOnly',
    'for': 'htmlFor',
    'class': 'className',
    'maxlength': 'maxLength',
    'cellspacing': 'cellSpacing',
    'cellpadding': 'cellPadding',
    'rowspan': 'rowSpan',
    'colspan': 'colSpan',
    'usemap': 'useMap',
    'frameborder': 'frameBorder',
    'contenteditable': 'contentEditable'
},

    // Boolean attributes and elements

    boolean_attr = {
        'multiple': true,
        'selected': true,
        'checked': true,
        'disabled': true,
        'readOnly': true,
        'required': true,
        'open': true
    },

    boolean_elements = {
        'input': true,
        'select': true,
        'option': true,
        'textarea': true,
        'button': true,
        'form': true,
        'details': true
    },

    /**
     * Direction for where to insert the text
     */

    direction = {
        'first': 'beforeBegin', // Beginning of the sentence
        'middle': 'afterBegin', // Middle of the sentence
        'center': 'afterBegin', // Middle of the sentence
        'last': 'beforeEnd' // End of the sentence
    };

function getBooleanAttrName(element, name) {
    // check dom last since we will most likely fail on name
    var booleanAttr = boolean_attr[name.toLowerCase()];
    // booleanAttr is here twice to minimize DOM access
    return booleanAttr && boolean_elements[element.nodeName] && booleanAttr;
}

function NodeMatching(elem) {
    return hAzzle.nodeType(1, elem) || hAzzle.nodeType(9, elem) || hAzzle.nodeType(11, elem) ? true : false;
}

// Global

hAzzle.extend({

    getValue: function (elem) {

        if (elem.nodeName === 'SELECT' && elem.multiple) {

            var option,
                options = elem.options,
                index = elem.selectedIndex,
                one = elem.type === "select-one" || index < 0,
                values = one ? null : [],
                value,
                max = one ? index + 1 : options.length,
                i = index < 0 ?
                    max :
                    one ? index : 0;

            for (; i < max; i++) {

                option = options[i];

                if ((option.selected || i === index) && !option.disabled &&
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
        }

        // Return normal value

        return elem.value;
    },


    /**
     * Get text
     */

    getText: function (elem) {
        var node, ret = "",
            i = 0;

        if (!elem.nodeType) {
            // If no nodeType, this is expected to be an array
            for (; node = elem[i++];) ret += hAzzle.getText(node);

        } else if (NodeMatching(elem)) {

            if (hAzzle.isString(elem.textContent)) return elem.textContent;
            for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += hAzzle.getText(elem);

        } else if (hAzzle.nodeType(3, elem) || hAzzle.nodeType(4, elem)) {
            return elem.nodeValue;
        }
        return ret;
    },

    prop: function (elem, name, value) {
        // don't get/set properties on text, comment and attribute nodes
        if (!(hAzzle.nodeType(2, elem) || hAzzle.nodeType(3, elem) || hAzzle.nodeType(8, elem))) {
            return name = propMap[name] || name, value !== undefined ? elem[name] = value : elem[name];
        }
    },

    attr: function (elem, name, value) {

        if (hAzzle.nodeType(2, elem) || hAzzle.nodeType(3, elem) || hAzzle.nodeType(8, elem)) {
            return;
        }

        // Fallback to prop when attributes are not supported
        if (typeof elem.getAttribute === typeof undefined) {
            return hAzzle.prop(elem, name, value);
        }

        if (hAzzle.isUndefined(value)) {

            if (name === 'value' && elem.nodeName.toLowerCase() === 'input') {
                return hAzzle.getValue(elem);
            }

            var ret = elem.getAttribute(name);

            // Non-existent attributes return null, we normalize to undefined
            return ret === null ?
                undefined :
                ret;
        }

        return elem.setAttribute(name, value + "");
    }

});


// Core

hAzzle.fn.extend({

    /**
     * Get text for the first element in the collection
     * Set text for every element in the collection
     *
     * hAzzle('div').text() => div text
     *
     * @param {String} value
     * @param {String} dir
     * @return {Object|String}
     *
     * NOTE!!
     *
     *  insertAdjacentText is faster then textContent, but not supported by Firefox, so we have to check for that.
     *
     * 'dir' let user choose where to insert the text - start- center - end of a sentence. This is NOT WORKING in
     *	Firefox because of the missing feature. Need to fix this ASAP!!
     */

    text: function (value, dir) {
        return hAzzle.isUndefined(value) ?
            hAzzle.getText(this) :
            this.empty().each(function () {
                if (NodeMatching(this)) {
                    if (hAzzle.isDefined(HTMLElement) && HTMLElement.prototype.insertAdjacentText) {
                        this.insertAdjacentText(direction[dir] ? direction[dir] : 'beforeEnd', value);
                    } else {
                        this.textContent = value;
                    }
                }
            });
    },

    /**
     * Get html from element.
     * Set html to element.
     *
     * @param {String} value
     * @param {String} dir
     * @return {Object|String}
     */

    html: function (value, dir) {
        if (hAzzle.isString(value)) {
            return this.empty().each(function () {
                // Remove element nodes and prevent memory leaks
                if (hAzzle.nodeType(1, this)) {
                    // TODO !!Need to clean the data
                    this.insertAdjacentHTML('beforeend', value || '');
                }
            });
        }

        // Return innerHTML only from the first elem in the collection

        if (hAzzle.nodeType(1, this[0])) {
            return this[0].innerHTML;
        }
    },

    cleanData: function (elems) {
        // TODO!!!

        // Remove all data attached to the element
        // Remove all events attached to the element
    },


    /**
     * Remove all childNodes from an element
     *
     * @return {Object}
     */

    empty: function () {
        //       return this.cleanData.put('textContent', '', /* Notetype 1*/ 1);
        return this.put('textContent', '', /* Notetype 1*/ 1);
    },


    /**
     * Create a deep copy of the element and it's children
     *
     * TODO!!
     *
     *  - Use documentfrag
     *  - Clone data
     *  - Clone events
     */

    clone: function () {
        return this.map(function () {
            return this.cloneNode(true);
        });
    },

    /**
     *  Remove an element from the DOM
     *
     * TODO!!
     *
     *  - Remove events
     *  - Remove data
     */

    remove: function () {
        return this.each(function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
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

        if (!value) {

            return this[0] && hAzzle.getValue(this[0]);
        }

        return this.each(function (index, elem) {
            var val;

            if (!hAzzle.nodeType(1, elem)) {
                return;
            }

            if (hAzzle.isFunction(value)) {
                val = value.call(elem, index, hAzzle(elem).val());
            } else {
                val = value;
            }

            if (val === null) {

                val = "";

            } else if (typeof val === "number") {
                val += "";
            }

            elem.value = val;
        });
    },

    /**
     * Get attribute from element
     * Set attribute to element collection
     *
     * @param {String} name
     * @param {String|Object} value
     *
     * @return {Object|String}
     */

    attr: function (name, value) {
        return hAzzle.isObject(name) ? this.each(function (index, element) {
            hAzzle.each(name, function (key, value) {
                hAzzle.attr(element, key, value);
            });
        }) : hAzzle.isUndefined(value) ? hAzzle.attr(this[0], name) : this.length === 1 ? hAzzle.attr(this[0], name, value) : this.each(function () {
            return hAzzle.attr(this, name, value);
        })
    },

    /**
     * Remove a given attribute from an element
     *
     * @param {String} value
     *
     * @return {Object}
     */

    removeAttr: function (value) {
        var elem, name, propName, i, attrNames = value && value.match((/\S+/g));
        return this.each(function () {
            elem = this;
            i = 0;

            if (attrNames && hAzzle.nodeType(1, elem)) {
                while ((name = attrNames[i++])) {
                    propName = propMap[name] || name;
                    if (getBooleanAttrName(elem, name)) {
                        elem[propName] = false;
                    }
                    elem.removeAttribute(name);
                }
            }
        });
    },

    /**
     * Read or set properties of DOM elements
     *
     * @param {String/Object}
     * @param {String/Null}
     *
     * @return {Object}
     */
    prop: function (name, value) {
        return hAzzle.isObject(name) ? this.each(function (value, element) {
            hAzzle.each(name, function (key, value) {
                hAzzle.prop(element, key, value);
            });
        }) : hAzzle.isUndefined(value) ? this[0] && this[0][propMap[name] || name] : hAzzle.prop(element, key, value);
    },


    /**
     * Append node to one or more elements.
     *
     * @param {Object|String} html
     * @return {Object}
     *
     */

    append: function (html) {
        return this.each(function () {
            if (hAzzle.isString(html)) {
                this.insertAdjacentHTML('beforeend', html);
            } else {
                if (html instanceof hAzzle) {

                    if (html.length === 1) {
                        return this.appendChild(html[0]);
                    }

                    var _this = this;
                    return hAzzle.each(html, function () {
                        _this.appendChild(this);
                    });
                }

                this.appendChild(html);
            }
        });
    },

    /**
     * Append the current element to another
     *
     * @param {Object|String} sel
     * @return {Object}
     */

    appendTo: function (sel) {
        return this.each(function () {
            hAzzle(selector).append(this);
        });
    },

    /**
     * Prepend node to element.
     *
     * @param {Object|String} html
     * @return {Object}
     *
     */

    prepend: function (html) {
        var first;
        return this.each(function () {
            if (hAzzle.isString(html)) {
                this.insertAdjacentHTML('afterbegin', html);
            } else if (first = this.childNodes[0]) {
                this.insertBefore(html, first);
            } else {
                if (html instanceof hAzzle) {

                    if (html.length === 1) {
                        return this.appendChild(html[0]);
                    }

                    var _this = this;
                    return hAzzle.each(html, function () {
                        _this.appendChild(this);
                    });
                }
                this.appendChild(html);
            }
        });
    },

    /**
     * Prepend the current element to another.
     *
     * @param {Object|String} sel
     * @return {Object}
     */

    prependTo: function (sel) {
        return this.each(function () {
            hAzzle(selector).prepend(this);
        });
    },

    /**
     * Add node after element.
     *
     * @param {Object|String} html
     * @return {Object}
     */

    after: function (html) {
        var next;
        return this.each(function () {
            if (hAzzle.isString(html)) {
                this.insertAdjacentHTML('afterend', html);
            } else if (next = hAzzle.getClosestNode(this, 'nextSibling')) {

                if (html instanceof hAzzle) {
                    if (this.parentNode) this.parentNode.insertBefore(html[0], next);
                } else {
                    if (this.parentNode) this.parentNode.insertBefore(html, next);
                }
            } else {
                if (html instanceof hAzzle) {
                    if (this.parentNode) this.parentNode.appendChild(html[0]);
                } else {
                    if (this.parentNode) this.parentNode.appendChild(html);
                }
            }
        });
    },

    /**
     * Add node before element.
     *
     * @param {Object|String} html
     * @return {Object}
     */

    before: function (html) {
        return this.each(function () {
            if (hAzzle.isString(html)) {
                this.insertAdjacentHTML('beforebegin', html);
            } else {
                if (html instanceof hAzzle) {
                    if (this.parentNode) this.parentNode.insertBefore(html[0], this);
                } else {
                    if (this.parentNode) this.parentNode.insertBefore(html, this);
                }
            }
        });
    }

});