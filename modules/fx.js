var frame = hAzzle.RAF(),
    relarelativesRegEx = /^(?:([+-])=|)([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))([a-z%]*)$/i,
    fixTick = false, // feature detected below
    dictionary = [],
    rafId;

frame.request(function(timestamp) {
    fixTick = timestamp > 1e12 != frame.perfNow() > 1e12;
});

function Tween(elem, options, prop) {
    return new Tween.prototype.init(elem, options, prop);
}

hAzzle.Tween = Tween;

Tween.prototype = {

    constructor: Tween,

    init: function(elem, options, prop) {

        this.elem = elem;
        this.prop = prop;
        this.currentState = {};
        this.options = options;
        this.easing = options.easing || hAzzle.defaultEasing;

    },

    /**
     * Get current CSS styles for the animated object.
     *
     * The current CSS style are cached on the object, so we
     * only perform DOM querying once when we do a sequence of
     * animations.
     */

    cur: function() {
        var hooks = hAzzle.fxAfter[this.prop];
        return hooks && hooks.get ?
            hooks.get(this) :
            hAzzle.fxAfter._default.get(this);
    },

    run: function(from, to, unit) {

        this.from = from;
        this.unit = unit || this.unit || (hAzzle.unitless[this.prop] ? '' : 'px');
        this.start = frame.perfNow();
        this.pos = 0;
        this.to = to;

        // Set some variabels

        var self = this,
            done = true,
            stop = 0;

        buhi({

            animate: function(currentTime) {

                var i, delta = currentTime - self.start;

                self.currentTime = currentTime;

                if (delta > self.options.duration) {

                    // Save the property state so we know when we have completed 
                    // the animation

                    self.currentState[self.currentState.prop] = true;

                    for (i in self.currentState) {
                        if (self.currentState[i] !== true) {
                            done = false;
                        }
                    }

                    if (done) {
                        self.finished();
                    }

                    return false;
                }

                // Calculate position, and update the CSS properties

                self.calculate(delta);

                return true;
            },

            stop: function(jumpToEnd) {

                stop = 1;

                if (jumpToEnd) {

                    // Only do style update if jumpToEnd 

                    self.pos = to;
                    self.update();

                } else {

                    self.options.complete = null; // remove callback if not jumping to end
                }

                self.finished();
            },

            elem: this.elem
        });
    },

    calculate: function(delta) {

        var v, hooks, from = this.from,
            to = this.to,
            pos = this.pos,
            easing = this.easing,
            duration = this.options.duration;

        // NOTE!! There exist bugs in this calculations for Android 2.3, but
        // hAzzle are not supporting Android 2.x so I'm not going to fix it

        if (typeof from === 'object') {

            // Calculate easing for Object.
            // Note!! This will only run if the 'start' value are a object

            for (v in from) {
                this.pos = {};
                this.pos[v] = (to[v] - from[v]) * hAzzle.easing[easing](delta / duration) + from[v];
            }

        } else {

            hooks = hAzzle.tickHook[this.prop];

            if (hooks) {
                pos = hooks(delta, from, to, easing, duration);
            } else {

                // Do not use Math.max for calculations it's much slower!
                // http://jsperf.com/math-max-vs-comparison/3

                this.pos = (to - from) * hAzzle.easing[easing](delta / duration) + from;
            }
        }
        // Set CSS styles

        this.update();

        //    return pos;
    },

    finished: function() {

        // Set the overflow back to the state the properties 
        // had before animation started

        if (this.options.overflow) {

            var style = this.elem.style,
                options = this.options;

            style.overflow = options.overflow[0];
            style.overflowX = options.overflow[1];
            style.overflowY = options.overflow[2];
        }

        // Execute the complete function

        var complete = this.options.complete;

        if (complete) {
            this.options.complete = false;
            complete.call(this.elem);
        }
    },

    update: function() {

        /**
         * Future plans after animation queue are finished will be
         * to cache the end state of each property on the object
         * so if we have a sequence, it will remember the previous
         * state, so there will be no need for DOM querying
         */

        var hooks = hAzzle.fxAfter[this.prop];

        if (hooks && hooks.set) {
            hooks.set(this);
        } else {
            hAzzle.fxAfter._default.set(this);
        }
    }
};

Tween.prototype.init.prototype = Tween.prototype;

hAzzle.extend({

    /**
     *  Perform a custom animation of a set of CSS properties.
     *
     *  hAzzle( ELEMENT ).animate ( { PROPERTIES}, { SETTINGS}   )
     *
     * Example:
     *
     * hAzzle(div).animate ( { width:200, height:200}, {
     *
     *   easing: 'linear',
     *    duration: 900
     *  })
     *
     * Short hand exist also:
     *
     *  hAzzle( ELEMENT ).animate ( { PROPERTIES}, DURATION, CALLBACK )
     *
     * Example:
     *
     * hAzzle(div).animate ( { width:200, height:200}, 999, function() {
     *
     * console.log('Hello! I'm a callback!' );
     * });
     *
     */

    animate: function(opts, speed, callback) {

        // opts has to be a object, 

        if (typeof opts !== 'object') {
            return false;
        }

        var opt;

        if (typeof speed === 'object') {

            opt = hAzzle.shallowCopy({}, speed);

        } else {

            opt = {};

            // Callback

            opt.duration = typeof speed === 'number' ? speed :
                opt.duration in hAzzle.speeds ?
                // Support for jQuery's named durations
                hAzzle.speeds[opt.duration] : /* Default speed */ hAzzle.defaultDuration;

            // If the user is attempting to set a duration under 100, adjust it back to
            // 100 to avoid bugs that can occur ( 100 is fast enough)

            if (opt.duration < 100) {
                opt.duration = 100;
            }
        }

        opt.duration = (hAzzle.speeds[opt.duration] || opt.duration) || hAzzle.defaultDuration

        return this.each(function(elem) {

            var index, val, anim, hooks, name, style = elem.style,
                parts, display;

            // Height/width overflow pass

            if (elem.nodeType === 1 && ('height' in opts || 'width' in opts)) {

                opt.overflow = [style.overflow, style.overflowX, style.overflowY];

                display = hAzzle.css(elem, 'display');

                // Test default display if display is currently 'none'
                display === 'none' ?
                    (hAzzle.getPrivate(elem, 'olddisplay') || defaultDisplay(elem.nodeName)) : display;

                if (display === 'inline' && hAzzle.css(elem, 'float') === 'none') {

                    style.display = 'inline-block';
                }
            }

            if (opt.overflow) {
                style.overflow = 'hidden';
            }

            for (index in opts) {

                val = opts[index];

                // Auto-set vendor prefixes. 
                // This is cached for better performance

                name = hAzzle.camelize(hAzzle.prefixCheck(index)[0]);

                if (index !== name) {
                    opts[name] = opts[index];
                    delete opts[index];
                }

                if (hAzzle.propertyMap[index]) {
                    val = hAzzle.propertyMap[index](elem, index);
                }

                anim = new Tween(elem, opt, index);

                hooks = hAzzle.fxBefore[index];

                if (hooks) {

                    hooks = hooks(elem, index, val, opts);

                    // Animation are started from inside of this hook 

                    anim.run(anim.cur(), hooks, ' ');

                } else {

                    // Unit Conversion	

                    if ((parts = relarelativesRegEx.exec(val))) {

                        calculateRelatives(elem, parts, index, anim);

                    } else {

                        anim.run(anim.cur(), val, '');
                    }
                }
            }
        });
    },

    stop: function(jumpToEnd) {

        return this.each(function() {

            var timers = dictionary,
                i = timers.length;

            while (i--) {

                if (timers[i].elem === this) {
                    if (jumpToEnd) {

                        // Force the next step to be the last

                        timers[i].stop(true);
                    }

                    timers.splice(i, 1);
                }
            }
        });
    }
});

/* ============================ UTILITY METHODS =========================== */

function raf(timestamp) {
    if (rafId) {
        frame.request(raf);
        render(timestamp);
    }
}

function render(tick) {

    if (fixTick) {
        tick = frame.perfNow();
    }

    var timer, i = 0;

    for (; i < dictionary.length; i++) {

        timer = dictionary[i];

        if (!timer.animate(tick) &&
            dictionary[i] === timer) {

            dictionary.splice(i--, 1);
        }
    }

    if (!dictionary.length) {

        frame.cancel(rafId);

        // Avoid memory leaks

        rafId = null;
    }
}

function calculateRelatives(elem, parts, index, anim) {

    var target = anim.cur(),
        end, start, unit, maxIterations, scale;

    if (parts) {
        end = parseFloat(parts[2]);
        unit = parts[3] || (hAzzle.unitless[index] ? '' : 'px');

        // Starting value computation is required for potential unit mismatches
        start = (hAzzle.unitless[index] || unit !== 'px' && +target) &&
            relarelativesRegEx.exec(hAzzle.css(elem, index)),
            scale = 1, maxIterations = 20;

        // We need to compute starting value
        if (start && start[3] !== unit) {

            unit = unit || start[3];

            // Make sure we update the tween properties later on
            parts = parts || [];

            // Iteratively approximate from a nonzero starting point
            start = +target || 1;

            do {

                scale = scale || '.5';

                // Adjust and apply
                start = start / scale;
                hAzzle.style(elem, index, start + unit);

            } while (
                scale !== (scale = anim.cur() / target) && scale !== 1 && --maxIterations
            );
        }

        if (parts) {

            start = +start || +target || 0;

            // If a +=/-= token was provided, we're doing a relative animation
            end = parts[1] ?
                start + (parts[1] + 1) * parts[2] :
                +parts[2];
        }

        anim.run(start, end, unit);
    }
}

function buhi(callback) {
    dictionary.push(callback);
    if (callback.animate()) {
        if (!rafId) {
            rafId = frame.request(raf);
        }
    } else {
        dictionary.pop();
    }
}

/* ============================ INTERNAL =========================== */

hAzzle.extend({

    // Default duration

    defaultDuration: 500,

    defaultEasing: 'swing',

    propertyMap: {

        display: function(elem, value) {

            // If the element was hidden in the previous call, revert display 
            // to 'auto' prior to reversal so that the element is visible again.

            if ((value = hAzzle.data(elem, 'display')) === 'none') {
                hAzzle.data(elem, 'display', 'auto');
            }

            if (value === 'auto') {
                value = hAzzle.getDisplayType(elem);

            }

            hAzzle.data(elem, 'display', value);

            return value;
        },

        visibility: function(elem, value) {

            // If the element was hidden in the previous call, revert display 
            // to 'auto' prior to reversal so that the element is visible again.

            if ((value = hAzzle.data(elem, 'visibility')) === 'hidden') {
                hAzzle.data(elem, 'visibility', 'visible');

                return value;
            }

            value = value.toString().toLowerCase();

            hAzzle.data(elem, 'display', value);

            return value;
        }
    },

    // Usefull for color animation

    tickHook: {},

    fxBefore: {},

    fxAfter: {

        opacity: {
            set: function(fx) {
                fx.elem.style.opacity = fx.pos;
            }
        },

        _default: {

            /**
             * _default getter / setter default CSS properties. getComputedStyle are
             * cached on the object itself for better performance, so we only
             * queuing the DOM once
             */

            get: function(fx) {

                var result,
                    prop = fx.elem[fx.prop];

                if (prop !== null && (!getStyles(fx.elem) || prop === null)) {
                    return prop;
                }

                result = hAzzle.css(fx.elem, fx.prop, '');

                // Empty strings, null, undefined and 'auto' are converted to 0.
                return !result || result === 'auto' ? 0 : result;
            },

            set: function(fx) {

                if (fx.elem.style &&
                    (fx.elem.style[hAzzle.cssProps[fx.prop]] !== null ||
                        hAzzle.cssHooks[fx.prop])) {
                    hAzzle.style(fx.elem, fx.prop, fx.pos + fx.unit);
                } else {
                    fx.elem[fx.prop] = fx.now;
                }
            }
        }
    },
    speeds: {
        slow: 1500,
        medium: 400,
        fast: 200
    },

}, hAzzle);

hAzzle.fxAfter.scrollTop = hAzzle.fxAfter.scrollLeft = {
    set: function(fx) {
        if (fx.elem.nodeType && fx.elem.parentNode) {
            fx.elem[fx.prop] = fx.pos;
        }
    }
};