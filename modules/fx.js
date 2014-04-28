/**
 *
 * Animation engine for hAzzle
 *
 * IMPORTANT TODO!!!
 * ==================
 *
 * - Add 'window.performance'
 * - clean up the animation frame code
 * - Make sure the iOS6 bug are solved
 * - Add animation queue
 *
 ****/
;
(function ($) {

    var win = window,
        doc = win.document,

        cache = {},

        /**
         * Regular expressions used to parse a CSS color declaration and extract the rgb values
         */
        hex6 = (/^#(\w{2})(\w{2})(\w{2})$/),
        hex3 = (/^#(\w{1})(\w{1})(\w{1})$/),
        rgb = (/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/),

        rgbOhex = /^rgb\(|#/,

        relVal = /^([+\-])=([\d\.]+)/,

        // RAF

        nativeRequestAnimationFrame,
        nativeCancelAnimationFrame;

    // Grab the native request and cancel functions.

    (function () {

        var top;

        // Test if we are within a foreign domain. Use raf from the top if possible.
        try {
            // Accessing .name will throw SecurityError within a foreign domain.
            window.top.name;
            top = window.top;
        } catch (e) {
            top = window;
        }

        nativeRequestAnimationFrame = top.requestAnimationFrame;
        nativeCancelAnimationFrame = top.cancelAnimationFrame || top.cancelRequestAnimationFrame;

        // Grab the native implementation.
        if (!nativeRequestAnimationFrame) {
            nativeRequestAnimationFrame = hAzzle.support.nativeRequestAnimationFrame = $.prefix('RequestAnimationFrame');
            nativeCancelAnimationFrame = hAzzle.support.nativeCancelAnimationFrame = $.prefix('CancelAnimationFrame') || $.prefix('CancelRequestAnimationFrame');
        }

        nativeRequestAnimationFrame && nativeRequestAnimationFrame(function () {

            $.FX.hasNative = true;
        });
    }());

    /**
     * Constructor - initiate with the new operator
     * @param {Element/String} el The element or the id of the element to which the animation(s) will be performed against
     * @param {Object} attributes Object containing all the attributes to be animated and the values
     * @param {Number} duration How long should the animation take in seconds (optional)
     * @param {String} transition Name of the method in charge of the transitional easing of the element (optional)
     * @param {Function} callback The function to be executed after the animation is complete (optional)
     */

    $.FX = function (el, options) {

        var fx = this;

        fx.el = el;
        fx.attributes = options;
        fx.callback = function () {};
        fx.duration = 0.7;
        fx.transition = $.transitions[options.transition || 'easeInOut'];

        /**
         * TODO!! Fix this mess !! :)
         */

        for (var k in options) {

            if (k === 'callback') {
                fx.callback = options.callback;
                delete k['callback']
            }
            if (k === 'duration') {

                fx.duration = options.duration;
                delete k['duration']
            }

            if (k === 'transition') {
                fx.transition = $.transitions[options.transition];
                delete k['transition']
            }

        }

        fx.animating = false;

        /**
         * The object that holds the CSS unit for each attribute
         * @type Object
         */
        fx.units = {};

        /**
         * The object to carry the current values for each frame
         * @type Object
         */
        fx.frame = {};

        /**
         * The object containing all the ending values for each attribute
         * @type Object
         */
        fx.endAttr = {};

        /**
         * The object containing all the starting values for each attribute
         * @type Object
         */
        fx.startAttr = {};
    }

    $.FX.prototype = {

        /**
         * start the animation
         */
        start: function () {
            var fx = this,
                run;
            fx.getAttributes();
            fx.duration = fx.duration * 1000;
            fx.time = $.now();
            fx.animating = true;

            fx.timer = run = function () {
                var time = $.now();
                if (time < (fx.time + fx.duration)) {
                    fx.elapsed = time - fx.time;
                    fx.setCurrentFrame();
                    nativeRequestAnimationFrame(run);
                } else {
                    fx.frame = fx.endAttr;
                    fx.complete();
                }
                fx.setAttributes();
            };

            if ($.FX.hasNative) {
                return nativeRequestAnimationFrame(run);
            }
            run();

        },

        /**
         * stop the animation
         */
        stop: function (finish) {
            if (finish) {
                this.frame = this.endAttr;
                this.setAttributes();
            }
            this.complete();
        },

        /**
         * Is this instance currently animating
         * @return {Boolean} True if the element is in transition false if it is not
         */
        isAnimating: function () {
            return this.animating;
        },

        /**
         * Perform a transitional ease to keep the animation smooth
         * @param {Number} start The starting value for the attribute
         * @param {Number} end The ending value for the attribute
         * @return {Number} Calculated percentage for the frame of the attribute
         */
        ease: function (start, end) {
            return this.transition(this.elapsed, start, end - start, this.duration);
        },

        /**
         * Complete the animation by clearing the interval and nulling out the timer,
         * set the animating property to false, and execute the callback
         */

        complete: function () {

            nativeCancelAnimationFrame(this.timer);
            this.timer = null;
            this.animating = false;
            this.callback.call(this);
        },

        /**
         * Set the current frame for each attribute by calculating the ease and setting the new value
         */
        setCurrentFrame: function () {

            var start, end;

            for (var attr in this.startAttr) {
                start = this.startAttr[attr];
                end = this.endAttr[attr];
                if ($.isArray(start)) {
                    this.frame[attr] = [];
                    for (var i = 0, len = start.length; i < len; i++) {
                        this.frame[attr][i] = this.ease(start[i], end[i]);
                    }
                } else {
                    this.frame[attr] = this.ease(start, end);
                }
            }
        },

        /**
         * Get all starting and ending values for each attribute
         */
        getAttributes: function () {
            var attr,
                attributes = this.attributes,
                el = this.el;

            for (attr in attributes) {

                var v = getStyle(el, attr),
                    tmp = attributes[attr];
                attr = toCamelCase(attr);
                if (typeof tmp == 'string' &&
                    rgbOhex.test(tmp) &&
                    !rgbOhex.test(v)) {
                    delete attributes[attr]; // remove key :(
                    continue; // cannot animate colors like 'orange' or 'transparent'
                    // only #xxx, #xxxxxx, rgb(n,n,n)
                }

                this.endAttr[attr] = typeof tmp == 'string' && rgbOhex.test(tmp) ?
                    parseColor(tmp) :
                    by(tmp, parseFloat(v));


                this.startAttr[attr] = typeof tmp == 'string' && tmp.charAt(0) == '#' ?
                    parseColor(v) :
                    parseFloat(v);
            }
        },

        /**
         * Set the current value for each attribute for every frame
         */

        setAttributes: function () {
            var attr, frame, el = this.el;

            for (attr in this.frame) {
                frame = this.frame[attr];


                $.style(el, attr, frame);
                $.style(el, attr, 'rgb(' + Math.floor(frame[0]) + ',' + Math.floor(frame[1]) + ',' + Math.floor(frame[2]) + ')');
            }
        }
    };

    function by(val, start, m, r, i) {
        return (m = relVal.exec(val)) ?
            (i = parseFloat(m[2])) && (start + (m[1] == '+' ? 1 : -1) * i) :
            parseFloat(val);
    }

    /**
     * Get a style of an element
     * @param {Element} el The element for the style to be retrieved from
     * @param {String} prop The property or style that is to be found
     * @return {Number} The value of the property
     */

    function getStyle(el, property) {
        property = toCamelCase(property);
        var value = null,
            computed = doc.defaultView.getComputedStyle(el, '');
        computed && (value = computed[property]);
        return el.style[property] || value;
    }

    $.FX.hasNative = false;

    /**
     * Add the getStyle method to the FX namespace to allow for external use,
     * primarily the Node plugin
     */
    $.FX.getStyle = getStyle;

    /**
     * Convert a CSS property to camel case (font-size to fontSize)
     * @param {String} str The property that requires conversion to camel case
     * @return {String} The camel cased property string
     */
    function toCamelCase(s) {

        return s.replace(/-(.)/g, function (m, m1) {
            return m1.toUpperCase();
        });
    }

    /**
     * parse a color to be handled by the animation, supports hex and rgb (#FFFFFF, #FFF, rgb(255, 0, 0))
     * @param {String} str The string value of an elements color
     * @return {Array} The rgb values of the color contained in an array
     */
    function parseColor(str) {
        if (str in cache) {
            return cache[str];
        }
        var color = str.match(hex6);
        if (color && color.length == 4) {
            return cache[str] = [parseInt(color[1], 16), parseInt(color[2], 16), parseInt(color[3], 16)];
        }
        color = str.match(rgb);
        if (color && color.length == 4) {
            return cache[str] = [parseInt(color[1], 10), parseInt(color[2], 10), parseInt(color[3], 10)];
        }
        color = str.match(hex3);
        if (color && color.length == 4) {
            return cache[str] = [parseInt(color[1] + color[1], 16), parseInt(color[2] + color[2], 16), parseInt(color[3] + color[3], 16)];
        }
    }

    $.FX.hasNative = false;

    $.extend($.fn, {

        fadeOut: function (options, callback) {

            if (typeof options === 'number') {

                options = {

                    'duration': options,
                    'opacity': 0
                }
            }

            options = options || {};
            options['opacity'] = 0;
            options.callback = callback || function () {};


            this.each(function () {

                new $.FX(
                    this, options
                ).start();

            });
        },

        fadeIn: function (options, callback) {

            if (typeof options === 'number') {

                options = {

                    'duration': options,
                    'opacity': 1
                }
            }

            options = options || {};
            options['opacity'] = 1;
            options.callback = callback || function () {};


            this.each(function () {

                new $.FX(
                    this, options
                ).start();

            });
        },

        animate: function (options) {

            options = options || {};

            return this.each(function () {
                new $.FX(this, options).start();
            });
        }
    });

})(hAzzle);