// url: ehttp://caniuse.com/getcomputedstyle
var cHeightWidth = /^(height|width)$/i,
    cWidthHeight = /^(width|height)$/,
    cToprbLeft = /^(top|right|bottom|left)$/i,
    cTopLeft = /top|left/i,
    computedValues = function(elem) {

        if (elem && elem !== window) {

            if (elem.ownerDocument !== undefined) {
                var view = elem.ownerDocument.defaultView;
            }
            return view && hAzzle.cssCore.has['api-gCS'] ? (view.opener ? view.getComputedStyle(elem, null) :
                window.getComputedStyle(elem, null)) : elem.style;
        }
        return null;
    },
    getStyles = function(elem) {

        var computed;

        // We save the computedStyle on the object to avoid stressing the DOM

        if (hAzzle.data(elem, 'CSS') === undefined) {
            console.log('not cached')
            return computedValues(elem);

            /* If the computedStyle object has yet to be cached, do so now. */
        } else if (!hAzzle.data(elem, 'CSS').computedStyle) {
            console.log('caching just NOW')
            computed = hAzzle.data(elem, 'CSS').computedStyle = computedValues(elem);

            // If computedStyle is cached, use it.

        } else {
            // console.log('data cached')
            computed = hAzzle.data(elem, 'CSS').computedStyle;
        }

        return computed;
    },

    curCSS = hAzzle.curCSS = function(elem, prop, force, extra) {

    var computedValue = 0,
        toggleDisplay = false;


    function revertDisplay() {
        if (toggleDisplay) {
            setCSS(elem, 'display', 'none');
        }
    }

    if (cWidthHeight.test(prop) && getCSS(elem, 'display') === 0) {

        toggleDisplay = true;
        setCSS(elem, 'display', hAzzle.getDisplayType(elem));
    }

    if (!force) {

        if (prop === 'height' &&
            getCSS(elem, 'boxSizing').toString().toLowerCase() !== 'border-box') {

            var contentBoxHeight = elem.offsetHeight -
                (parseFloat(getCSS(elem, 'borderTopWidth')) || 0) -
                (parseFloat(getCSS(elem, 'borderBottomWidth')) || 0) -
                (parseFloat(getCSS(elem, 'paddingTop')) || 0) -
                (parseFloat(getCSS(elem, 'paddingBottom')) || 0);
            revertDisplay();

            return contentBoxHeight;

        } else if (prop === 'width' &&
            getCSS(elem, 'boxSizing').toString().toLowerCase() !== 'border-box') {

            var contentBoxWidth = elem.offsetWidth -
                (parseFloat(getCSS(elem, 'borderLeftWidth')) || 0) -
                (parseFloat(getCSS(elem, 'borderRightWidth')) || 0) -
                (parseFloat(getCSS(elem, 'paddingLeft')) || 0) -
                (parseFloat(getCSS(elem, 'paddingRight')) || 0);

            revertDisplay();

            return contentBoxWidth;
        }
    }

    var computedStyle = getStyles(elem);

    // IE and Firefox do not return a value for the generic borderColor -- they only return individual values for each border side's color.
    // As a polyfill for querying individual border side colors, just return the top border's color.

    if ((hAzzle.ie || hAzzle.isFirefox) && prop === 'borderColor') {
        prop = 'borderTopColor';
    }

    if (hAzzle.ie === 9 && prop === 'filter') {
        computedValue = computedStyle.getPropertyValue(prop);
    } else {

        computedValue = computedStyle[prop];
    }

    if (computedValue === '' || computedValue === null) {
        computedValue = elem.style[prop];
    }

    revertDisplay();

    if (computedValue === 'auto' && cToprbLeft.test(prop)) {

        var position = curCSS(elem, 'position');

        if (position === 'fixed' || (position === 'absolute' && cTopLeft.test(prop))) {
            computedValue = hAzzle(elem).position()[prop] + 'px';
        }
    }
    
     if (extra === '' || extra) { 
            num = parseFloat(computedValue);
            
            alert(computedValue)
            
            return extra === true || hAzzle.isNumeric(num) ? num || 0 : computedValue;
        }
    
    return computedValue;
};