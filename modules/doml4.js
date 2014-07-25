/**
 * DOM Level 4 pollify for hAzzle
 *
 * This pollify only covers the
 *
 * - append
 * - prepend
 * - before
 * - after
 * - replace
 * - remove
 */
(function(window) {

    'use strict';

    var property,

        ElementPrototype = (window.Element || window.Node || window.HTMLElement).prototype,

        properties = [
            'append',
            function append() {
                this.appendChild(applyToFragment(arguments));
            },
            'prepend',
            function prepend() {
                if (this.firstChild) {
                    this.insertBefore(applyToFragment(arguments), this.firstChild);
                } else {
                    this.appendChild(applyToFragment(arguments));
                }
            },
            'before',
            function before() {
                var parentNode = this.parentNode;
                if (parentNode) {
                    parentNode.insertBefore(
                        applyToFragment(arguments), this
                    );
                }
            },
            'after',
            function after() {
                if (this.parentNode) {
                    if (this.nextSibling) {
                        this.parentNode.insertBefore(applyToFragment(arguments), this.nextSibling);
                    } else {
                        this.parentNode.appendChild(applyToFragment(arguments));
                    }
                }
            },
            'replace',
            function replace() {
                this.parentNode &&
                    this.parentNode.replaceChild(applyToFragment(arguments), this);

            },
            'remove',
            function remove() {
                this.parentNode &&
                    this.parentNode.removeChild(this);
            }
        ],
        slice = properties.slice,
        i = properties.length;

    // Loop through
    for (; i; i -= 2) {

        property = properties[i - 2];

        if (!(property in ElementPrototype)) {
            ElementPrototype[property] = properties[i - 1];
        }
    }

    /* ============================ UTILITY METHODS =========================== */

    function textNodeIfString(node) {
        return typeof node === 'string' ?
            window.document.createTextNode(node) : node;
    }

    function applyToFragment(nodes) {

        var fragment = window.document.createDocumentFragment(),
            list = slice.call(nodes),
            i = 0,
            l = nodes.length;

        if (nodes.length === 1) {

            return textNodeIfString(nodes[0]);
        }

        for (; i < l; i++) {

            fragment.appendChild(textNodeIfString(list[i]));
        }

        return fragment;
    }

}(window));