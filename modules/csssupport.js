/**
 * hAzzle cssSupport checks if the browsers supports different
 * CSS properties e.g. transform and transitions
 *
 * Natively hAzzle have build-in support for
 * this properties:
 *
 * - transform
 * - transformOrigin
 * - transformStyle
 * - perspective
 * - perspectiveOrigin
 * - backfaceVisibility
 * - transition
 * - animation
 * - textShadow
 * - linearGradient
 * - radialGradient
 * - columnCount
 * - boxSizing (boolean: true / false)
 * - boxShadow
 * - borderImage
 * - boxReflect (boolean: true / false)
 
 *
 * There also exist cssHooks for all
 * CSS properties listed here.
 *
 * cssSupport are plugin-friendly and can
 * be extended.
 *
 */
var div = document.createElement('div'),
    divStyle = div.style,
    hcS = hAzzle.cssSupport,
    hcH = hAzzle.cssHooks,

    transformProperties = [
        'oTransform',
        'msTransform',
        'webkitTransform',
        'MozTransform'
    ],
    transitionProps = [
        'Property',
        'Duration',
        'TimingFunction'
    ],

    prefixes = [
        "O",
        "ms",
        "Webkit",
        "Moz"
    ],

    i = transformProperties.length,

    property,


    // prefix-less property

    _transform = "transform",
    _transformOrigin = "transformOrigin",
    supportProperty,
    rWhitespace = /\s/,
    rLinear = /^(.*?)linear-gradient(.*?)$/i,
    rRadial = /^(.*?)radial-gradient(.*?)$/i,
    rLinearSettings = /^(.*?)(:?linear-gradient)(\()(.*)(\))(.*?)$/i,
    rRadialSettings = /^(.*?)(:?radial-gradient)(\()(.*?)(\))(.*?)$/i,
    rSupportLinearW3C = /(^|\s)linear-gradient/,
    rSupportLinearMoz = /(^|\s)-moz-linear-gradient/,
    rSupportLinearWebkit = /(^|\s)-webkit-linear-gradient/,
    rSupportLinearOpera = /(^|\s)-o-linear-gradient/,
    rSupportRadialW3C = /(^|\s)radial-gradient/,
    rSupportRadialMoz = /(^|\s)-moz-radial-gradient/,
    rSupportRadialWebkit = /(^|\s)-webkit-radial-gradient/,
    rSupportRadialOpera = /(^|\s)-o-radial-gradient/,
    rWhitespace = /\s/,

    rParenWhitespace = /\)\s/,
    cssProps = 'background backgroundImage listStyleImage',
    cssLinear = 'background:-moz-linear-gradient(red, blue);background:-webkit-linear-gradient(red, blue);background:-o-linear-gradient(red, blue);background:-ms-linear-gradient(red, blue);background:linear-gradient(red, blue);',

    cssRadial = 'background-image: -moz-radial-gradient(circle, orange, red);background-image: -webkit-radial-gradient(circle, orange, red);background-image: -o-radial-gradient(circle,red, blue);background-image: radial-gradient(circle, orange, red);',
    cssPropsArray = cssProps.split(rWhitespace),

    column = 'Column',
    columnProps = 'Span Count Gap Width RuleColor RuleStyle RuleWidth'.split(rWhitespace),
    columnPrefix = divStyle.WebkitColumnGap === '' ? 'Webkit' : (divStyle.MozColumnGap === '' ? 'Moz' : ''),

    getCssProperty = function (columnPrefix, columnProps) {
        return columnPrefix + ((columnPrefix === '') ? column.toLowerCase() : column) + columnProps;

    },
    properties = [
        "transform",
        "transformOrigin",
        "transformStyle",
        "perspective",
        "perspectiveOrigin",
        "backfaceVisibility"
    ],
    prefix,
    property,
    x = prefixes.length,
    j = prefixes.length;

function leadingUppercase(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
}

// Find the right prefix

while (j--) {
    if (prefixes[j] + leadingUppercase(properties[0]) in divStyle) {
        prefix = prefixes[j];
        continue;
    }
}

// Build cssHooks for each property

while (x--) {
    property = prefix + leadingUppercase(properties[x]);

    if (property in divStyle) {

        // px isn't the default unit of this property

        hAzzle.unitless[properties[x]] = true;

        // populate cssProps

        hAzzle.cssProps[properties[x]] = property;

        // MozTranform requires a complete hook because "px" is required in translate
        property === "MozTransform" && (hAzzle.cssHooks[properties[x]] = {
            get: function (elem, computed) {
                return (computed ?
                    // remove "px" from the computed matrix
                    hAzzle.getStyle(elem, property).split("px").join("") :
                    elem.style[property]
                );
            },
            set: function (elem, value) {
                // add "px" to matrixes
                /matrix\([^)p]*\)/.test(value) && (
                    value = value.replace(/matrix((?:[^,]*,){4})([^,]*),([^)]*)/, "matrix$1$2px,$3px")
                );
                elem.style[property] = value;
            }
        });
    }
}


// Textshadow check

hcS.textShadow = (divStyle.textShadow === '');

// test different vendor prefixes of this property
while (i--) {
    if (transformProperties[i] in divStyle) {
        hcS[_transform] = supportProperty = transformProperties[i];
        hcS[_transformOrigin] = supportProperty + "Origin";
        continue;
    }
}


hcS.columnCount =
    divStyle.MozColumnCount === '' ? 'MozColumnCount' :
    (divStyle.msColumnCount === '' ? 'msColumnCount' :
    (divStyle.WebkitColumnCount === '' ? 'WebkitColumnCount' :
        (divStyle.OColumnCount === '' ? 'OColumnCount' :
            (divStyle.columnCount === '' ? false :
                false))));

hcS.transition =
    divStyle.MozTransition === '' ? 'MozTransition' :
    (divStyle.msTransition === '' ? 'msTransition' :
    (divStyle.WebkitTransition === '' ? 'WebkitTransition' :
        (divStyle.OTransition === '' ? 'OTransition' :
            (divStyle.transition === '' ? 'Transition' :
                false))));


/*
 * Mehran!!
 *
 * There are no cssHooks for this properties. You
 * have to develop that !!
 */

hcS.animation =
    divStyle.MozAnimation === '' ? 'MozAnimation' :
    (divStyle.msAnimation === '' ? 'msAnimation' :
    (divStyle.WebkitAnimation === '' ? 'WebkitAnimation' :
        (divStyle.OAnimation === '' ? 'OAnimation' :
            (divStyle.animation === '' ? false :
                false))));

hcS.boxSizing =
    divStyle.MozBoxSizing === '' ? 'MozBoxSizing' :
    (divStyle.msBoxSizing === '' ? 'msBoxSizing' :
    (divStyle.WebkitBoxSizing === '' ? 'WebkitBoxSizing' :
        (divStyle.OBoxSizing === '' ? 'OBoxSizing' :
            (divStyle.boxSizing === '' ? 'boxSizing' :
                false))));

hcS.boxShadow =
    divStyle.MozBoxShadow === '' ? '-moz-box-shadow' :
    (divStyle.msBoxShadow === '' ? '-ms-box-shadow' :
    (divStyle.WebkitBoxShadow === '' ? '-webkit-box-shadow' :
        (divStyle.OBoxShadow === '' ? '-o-box-shadow' :
            (divStyle.boxShadow === '' ? 'box-shadow' :
                false))));

hcS.boxReflect =
    divStyle.boxReflect === '' ? 'boxReflect' :
    (divStyle.MozBoxReflect === '' ? 'MozBoxReflect' :
    (divStyle.WebkitBoxReflect === '' ? 'WebkitBoxReflect' :
        (divStyle.OBoxReflect === '' ? 'OBoxReflect' : false)));


hcS.borderImage =
    divStyle.borderImage === '' ? 'borderImage' :
    (divStyle.msBorderImage === '' ? 'msBorderImage' :
    (divStyle.MozBorderImage === '' ? 'MozBorderImage' :
        (divStyle.WebkitBorderImage === '' ? 'webkitBorderImage' :
            (divStyle.OBorderImage === '' ? 'OBorderImage' : false))));

divStyle.cssText = cssLinear;

hcS.linearGradient =
    rSupportLinearW3C.test(divStyle.backgroundImage) ? 'linear-gradient' :
    (rSupportLinearMoz.test(divStyle.backgroundImage) ? '-moz-linear-gradient' :
    (rSupportLinearWebkit.test(divStyle.backgroundImage) ? '-webkit-linear-gradient' :
        (rSupportLinearOpera.test(divStyle.backgroundImage) ? '-o-linear-gradient' :
            false)));

divStyle.cssText = cssRadial;

hcS.radialGradient =
    rSupportRadialW3C.test(divStyle.backgroundImage) ? 'radial-gradient' :
    (rSupportRadialMoz.test(divStyle.backgroundImage) ? '-moz-radial-gradient' :
    (rSupportRadialWebkit.test(divStyle.backgroundImage) ? '-webkit-radial-gradient' :
        (rSupportRadialOpera.test(divStyle.backgroundImage) ? '-o-radial-gradient' :
            false)));


// prevent IE memory leak
div = divStyle = null;

// Skip 'px' on transform property

hAzzle.unitless[_transform] = hAzzle.unitless[_transformOrigin] = true;

// Add to cssProps

if (supportProperty && supportProperty !== _transform) {
    hAzzle.cssProps[_transform] = supportProperty;
    hAzzle.cssProps[_transformOrigin] = supportProperty + "Origin";
}

/**
 * Add CSS transitions to cssHooks
 *
 * Note!! This one can also be without vendor prefix
 *
 */

if (hcS.transition) {
    hcH.transition = {
        get: function (elem) {
            return hAzzle.map(transitionProps, function (transitionProps) {
                return hAzzle.getStyle(elem, hAzzle.cssProps.transition + transitionProps);
            }).join(" ");
        },
        set: function (elem, value) {
            elem.style[hcS.transition] = value;
        }
    };

    hAzzle.each(transitionProps, function (transitionProps) {
        hcH["transition" + transitionProps] = {
            get: function (elem) {
                return hAzzle.getStyle(elem, hcS.transition + transitionProps);
            },
            set: function (elem, value) {
                elem.style[hcS.transition + transitionProps] = value;
            }
        };
    });

}
/**
 * Add gradient to cssHooks
 */


function linearSettings(value) {
    var parts = rLinearSettings.exec(value);
    value = value.replace(new RegExp(parts[2], 'g'), hcS.linearGradient);
    return value;
}

function radialSettings(value) {
    var parts = rRadialSettings.exec(value);
    value = value.replace(new RegExp(parts[2], 'g'), hcS.radialGradient);
    return value;
}


if (hcS.linearGradient && hcS.linearGradient !== "linear-gradient") {

    hAzzle.each(cssPropsArray, function (cssProps) {

        hcH[cssProps] = {

            set: function (elem, value) {

                if (rLinear.test(value)) {
                    elem.style[cssProps] = linearSettings(value);
                } else if (rRadial.test(value)) {
                    elem.style[cssProps] = radialSettings(value);
                } else {
                    elem.style[cssProps] = value;
                }
            }
        };

    });

}
if (hcS.columnCount) {

    hAzzle.each(columnProps, function (columnProps) {


        hcH['column' + columnProps] = {
            get: function (elem) {
                return hAzzle.getStyle(elem, getCssProperty(columnPrefix, columnProps));
            },
            set: function (elem, value) {
                elem.style[getCssProperty(columnPrefix, columnProps)] = value;
            }
        };

    });
}

if (hcS.boxSizing) {

    hcH.boxSizing = {
        get: function (elem) {
            return hAzzle.getStyle(elem, hcS.boxSizing);
        },
        set: function (elem, value) {
            elem.style[hcS.boxSizing] = value;
        }
    };
}


function insert_into(string, value, index) {
    var parts = string.split(rWhitespace);
    parts[index] = value;
    return parts.join(" ");
}

if (hcS.boxShadow) {

    hAzzle.cssProps.boxShadow = hcS.boxShadow;

    hcH.boxShadow = {
        get: function (elem) {
            return hAzzle.getStyle(elem, hcS.boxShadow);
        },
        set: function (elem, value) {
            elem.style[hcS.boxShadow] = value;
        }
    };

    hcH.boxShadowColor = {
        get: function (elem) {
            return hAzzle.getStyle(elem, hcS.boxShadow).split(rParenWhitespace)[0] + ')';
        },
        set: function (elem, value) {
            elem.style[hcS.boxShadow] = value + " " + hAzzle.getStyle(elem, hcS.boxShadow).split(rParenWhitespace)[1];
        }
    };

    hcH.boxShadowBlur = {
        get: function (elem) {
            return hAzzle.getStyle(elem, hcS.boxShadow).split(rWhitespace)[5];
        },
        set: function (elem, value) {
            elem.style[hcS.boxShadow] = insert_into(hAzzle.getStyle(elem, hcS.boxShadow), value, 5);
        }
    };

    hcH.boxShadowSpread = {
        get: function (elem) {
            return hAzzle.getStyle(elem, hcS.boxShadow).split(rWhitespace)[6];
        },
        set: function (elem, value) {
            elem.style[hcS.boxShadow] = insert_into(hAzzle.getStyle(elem, hcS.boxShadow), value, 6);
        }
    };

    hcH.boxShadowX = {
        get: function (elem) {
            return hAzzle.getStyle(elem, hcS.boxShadow).split(rWhitespace)[3];
        },
        set: function (elem, value) {
            elem.style[hcS.boxShadow] = insert_into(hAzzle.getStyle(elem, hcS.boxShadow), value, 3);
        }
    };

    hcH.boxShadowY = {
        get: function (elem) {
            return hAzzle.getStyle(elem, hcS.boxShadow).split(rWhitespace)[4];
        },
        set: function (elem, value) {
            elem.style[hcS.boxShadow] = insert_into(hAzzle.getStyle(elem, hcS.boxShadow), value, 4);
        }
    };


}

if (hcS.borderImage) {
    hcH.borderImage = {
        get: function (elem) {
            return hAzzle.getStyle(elem, hcS.borderImage);
        },
        set: function (elem, value) {
            elem.style[hcS.borderImage] = value;
        }
    };
}

if (hcS.boxReflect) {
    hcH.boxReflect = {
        get: function (elem) {
            return hAzzle.getStyle(elem, hcS.boxReflect);
        },
        set: function (elem, value) {
            elem.style[hcS.boxReflect] = value;
        }
    };
}