// easings.js
var defaultEasing = 'swing',
    supportFloat32Array = 'Float32Array' in window,

    // Default to a pleasant-to-the-eye easeOut (like native animations)
    generateStep = function(steps) {
        return function(p) {
            return Math.round(p * steps) * (1 / steps);
        };
    },

    // Bezier curve function generator. Copyright Gaetan Renaudeau.
    // Modified for use with hAzzle

    generateBezier = function(mX1, mY1, mX2, mY2) {
        var nIterations = 4,
            nMinSlope = 0.001,
            sPrecision = 0.0000001,
            sMaxIterations = 10,
            kSplineTableSize = 11,
            kSampleStepSize = 1.0 / (kSplineTableSize - 1.0),
            i = 0;

        // Must contain four arguments

        if (arguments.length !== 4) {
            return false;
        }

        // Arguments must be numbers.

        for (; i < 4; ++i) {
            if (typeof arguments[i] !== 'number' || isNaN(arguments[i]) || !isFinite(arguments[i])) {
                return false;
            }
        }

        /* X values must be in the [0, 1] range. */
        mX1 = Math.min(mX1, 1);
        mX2 = Math.min(mX2, 1);
        mX1 = Math.max(mX1, 0);
        mX2 = Math.max(mX2, 0);

        var mSampleValues = supportFloat32Array ?
            new Float32Array(kSplineTableSize) :
            new Array(kSplineTableSize),
            A = function(aA1, aA2) {
                return 1.0 - 3.0 * aA2 + 3.0 * aA1;
            },
            B = function(aA1, aA2) {
                return 3.0 * aA2 - 6.0 * aA1;
            },
            C = function(aA1) {
                return 3.0 * aA1;
            },
            calcBezier = function(aT, aA1, aA2) {
                return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
            },
            getSlope = function(aT, aA1, aA2) {
                return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
            },
            newtonRaphsonIterate = function(aX, aGuessT) {
                var i = 0,
                    currentSlope, currentX;
                for (; i < nIterations; ++i) {
                    currentSlope = getSlope(aGuessT, mX1, mX2);

                    if (currentSlope === 0.0) {
                        return aGuessT;
                    }

                    currentX = calcBezier(aGuessT, mX1, mX2) - aX;
                    aGuessT -= currentX / currentSlope;
                }

                return aGuessT;
            },

            calcSampleValues = function() {
                var i = 0;
                for (; i < kSplineTableSize; ++i) {
                    mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
                }
            },

            binarySubdivide = function(aX, aA, aB) {
                var currentX, currentT, i = 0;

                do {
                    currentT = aA + (aB - aA) / 2.0;
                    currentX = calcBezier(currentT, mX1, mX2) - aX;
                    if (currentX > 0.0) {
                        aB = currentT;
                    } else {
                        aA = currentT;
                    }
                } while (Math.abs(currentX) > sPrecision && ++i < sMaxIterations);

                return currentT;
            },

            getTForX = function(aX) {
                var intervalStart = 0.0,
                    currentSample = 1,
                    lastSample = kSplineTableSize - 1;

                for (; currentSample != lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
                    intervalStart += kSampleStepSize;
                }

                --currentSample;

                var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]),
                    guessForT = intervalStart + dist * kSampleStepSize,
                    initialSlope = getSlope(guessForT, mX1, mX2);

                if (initialSlope >= nMinSlope) {
                    return newtonRaphsonIterate(aX, guessForT);
                } else if (initialSlope == 0.0) {
                    return guessForT;
                } else {
                    return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
                }
            },

            _precomputed = false,

            precompute = function() {
                _precomputed = true;
                if (mX1 != mY1 || mX2 != mY2) calcSampleValues();
            },

            f = function(aX) {
                if (!_precomputed) precompute();
                if (mX1 === mY1 && mX2 === mY2) return aX;
                if (aX === 0) return 0;
                if (aX === 1) return 1;

                return calcBezier(getTForX(aX), mY1, mY2);
            };

        f.getControlPoints = function() {
            return [{
                x: mX1,
                y: mY1
            }, {
                x: mX2,
                y: mY2
            }];
        };

        var str = 'generateBezier(' + [mX1, mY1, mX2, mY2] + ')';
        f.toString = function() {
            return str;
        };

        return f;
    },
    generateSpringRK4 = (function() {
        function springAccelerationForState(state) {
            return (-state.tension * state.x) - (state.friction * state.v);
        }

        function springEvaluateStateWithDerivative(initialState, dt, derivative) {
            var state = {
                x: initialState.x + derivative.dx * dt,
                v: initialState.v + derivative.dv * dt,
                tension: initialState.tension,
                friction: initialState.friction
            };

            return {
                dx: state.v,
                dv: springAccelerationForState(state)
            };
        }

        function springIntegrateState(state, dt) {
            var a = {
                    dx: state.v,
                    dv: springAccelerationForState(state)
                },
                b = springEvaluateStateWithDerivative(state, dt * 0.5, a),
                c = springEvaluateStateWithDerivative(state, dt * 0.5, b),
                d = springEvaluateStateWithDerivative(state, dt, c),
                dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx),
                dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);

            state.x = state.x + dxdt * dt;
            state.v = state.v + dvdt * dt;

            return state;
        }

        return function springRK4Factory(tension, friction, duration) {

            var initState = {
                    x: -1,
                    v: 0,
                    tension: null,
                    friction: null
                },
                path = [0],
                time_lapsed = 0,
                tolerance = 1 / 10000,
                DT = 16 / 1000,
                haveDuration, dt, last_state;

            tension = parseFloat(tension) || 500;
            friction = parseFloat(friction) || 20;
            duration = duration || null;

            initState.tension = tension;
            initState.friction = friction;

            haveDuration = duration !== null;

            // Calculate the actual time it takes for this animation to complete with the provided conditions.
            if (haveDuration) {
                // Run the simulation without a duration
                time_lapsed = springRK4Factory(tension, friction);
                // Compute the adjusted time delta
                dt = time_lapsed / duration * DT;
            } else {
                dt = DT;
            }

            while (true) {
                // Next/step function
                last_state = springIntegrateState(last_state || initState, dt);
                // Store the position
                path.push(1 + last_state.x);
                time_lapsed += 16;
                /* If the change threshold is reached, break. */
                if (!(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) {
                    break;
                }
            }
            return !haveDuration ? time_lapsed : function(percentComplete) {
                return path[(percentComplete * (path.length - 1)) | 0];
            };
        };
    }()),

    getEasing = function(value, duration) {
        var easing = value;
        if (typeof value === 'string') {
            if (!easings[value]) {
                easing = false;
            }
        } else if (hAzzle.isArray(value) && value.length === 1) {
            easing = generateStep.apply(null, value);
        } else if (hAzzle.isArray(value) && value.length === 2) {
            easing = generateSpringRK4.apply(null, value.concat([duration]));
        } else if (hAzzle.isArray(value) && value.length === 4) {
            easing = generateBezier.apply(null, value);
        } else {
            easing = false;
        }

        if (easing === false) {
            if (easings[defaultEasing]) {
                easing = defaultEasing;
            } else {
                easing = 'swing';
            }
        }

        return easing;
    },

    // Easings

    easings = {

        sine: function(p) {
            return 1 - Math.cos(p * Math.PI / 2);
        },
        circ: function(p) {
            return 1 - Math.sqrt(1 - p * p);
        },
        back: function(p) {
            return p * p * (3 * p - 2);
        },
        bounce: function(p) {
            var pow2,
                bounce = 4;

            while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
            return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2);
        },

        easeFrom: function(p) {
            return Math.pow(p, 4);
        },

        easeTo: function(p) {
            return Math.pow(p, 0.25);
        },

        elastic: function(p) {
            return -1 * Math.pow(4, -8 * p) * Math.sin((p * 6 - 1) * (2 * Math.PI) / 2) + 1;
        },
        swingFrom: function(p) {
            var s = 1.70158;
            return p * p * ((s + 1) * p - s);
        },

        swingTo: function(p) {
            var s = 1.70158;
            return (p -= 1) * p * ((s + 1) * p + s) + 1;
        },

        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        },

        easeOutStrong: function(p) {
            return (p == 1) ? 1 : 1 - Math.pow(2, -10 * p);
        },

        easeInStrong: function(p) {
            return (p === 0) ? 0 : Math.pow(2, 10 * (p - 1));
        },

        wobble: function(p) {
            return (-Math.cos(p * Math.PI * (9 * p)) / 2) + 0.5;
        },

        sinusoidal: function(p) {
            return (-Math.cos(p * Math.PI) / 2) + 0.5;
        },

        flicker: function(p) {
            p = p + (Math.random() - 0.5) / 5;
            return easings.sinusoidal(p < 0 ? 0 : p > 1 ? 1 : p);
        },
        mirror: function(p) {
            if (p < 0.5) {
                return easings.sinusoidal(p * 2);
            } else {
                return easings.sinusoidal(1 - (p - 0.5) * 2);
            }
        },

        bounceIn: function(p) {
            return 1 - easings.bounceOut(1 - p);
        },
        bounceOut: function(p) {
            if (p < 1 / 2.75) {
                return (7.5625 * p * p);
            } else if (p < 2 / 2.75) {
                return (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
            } else if (p < 2.5 / 2.75) {
                return (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
            } else {
                return (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
            }
        },
        bounceInOut: function(p) {
            if (p < 0.5) return easings.bounceIn(p * 2) * .5;
            return easings.bounceOut(p * 2 - 1) * 0.5 + 0.5;
        },

        sineInOut: function(p) {
            return -0.5 * (Math.cos(Math.PI * p) - 1);
        },

        sineOut: function(p) {
            return Math.sin(p * Math.PI / 2);
        },
        sineIn: function(p) {
            return 1 - Math.cos(p * Math.PI / 2);
        },
        spring: function(p) {
            return 1 - (Math.cos(p * 4.5 * Math.PI) * Math.exp(-p * 6));
        }
    };


hAzzle.each(
    [
        /* CSS3's named easing types. */
        ['ease', [0.25, 0.1, 0.25, 1.0]],
        ['easeIn', [0.42, 0.0, 1.00, 1.0]],
        ['easeOut', [0.00, 0.0, 0.58, 1.0]],
        ['easeInOut', [0.42, 0.0, 0.58, 1.0]],
        /* Robert Penner easing equations. */
        ['easeInSine', [0.47, 0, 0.745, 0.715]],
        ['easeOutSine', [0.39, 0.575, 0.565, 1]],
        ['easeInOutSine', [0.445, 0.05, 0.55, 0.95]],
        ['easeInQuad', [0.55, 0.085, 0.68, 0.53]],
        ['easeOutQuad', [0.25, 0.46, 0.45, 0.94]],
        ['easeInOutQuad', [0.455, 0.03, 0.515, 0.955]],
        ['easeInCubic', [0.55, 0.055, 0.675, 0.19]],
        ['easeOutCubic', [0.215, 0.61, 0.355, 1]],
        ['easeInOutCubic', [0.645, 0.045, 0.355, 1]],
        ['easeInQuart', [0.895, 0.03, 0.685, 0.22]],
        ['easeOutQuart', [0.165, 0.84, 0.44, 1]],
        ['easeInOutQuart', [0.77, 0, 0.175, 1]],
        ['easeInQuint', [0.755, 0.05, 0.855, 0.06]],
        ['easeOutQuint', [0.23, 1, 0.32, 1]],
        ['easeInOutQuint', [0.86, 0, 0.07, 1]],
        ['easeInExpo', [0.95, 0.05, 0.795, 0.035]],
        ['easeOutExpo', [0.19, 1, 0.22, 1]],
        ['easeInOutExpo', [1, 0, 0, 1]],
        ['easeInCirc', [0.6, 0.04, 0.98, 0.335]],
        ['easeOutCirc', [0.075, 0.82, 0.165, 1]],
        ['easeInOutCirc', [0.785, 0.135, 0.15, 0.86]]
    ], function(easingArray) {
        easings[easingArray[0]] = generateBezier.apply(null, easingArray[1]);
    });

// Expose
hAzzle.defaultEasing = defaultEasing;
hAzzle.Easings = easings;