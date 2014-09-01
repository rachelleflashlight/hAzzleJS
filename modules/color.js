// color.js

var aabbcc = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/,
    abc = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/,
    rgb = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
    rgba = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/;


/**
 * Check whether the browser supports RGBA color mode.
 *
 * Author Mehdi Kabab <http://pioupioum.fr>
 * @return {boolean} True if the browser support RGBA. False otherwise.
 */
 
function isRGBACapable() {
    var $script = hAzzle('script:first'),
        color = $script.css('color'),
        result = false;
    if (/^rgba/.test(color)) {
        result = true;
    } else {
        try {
            result = (color != $script.css('color', 'rgba(0, 0, 0, 0.5)').css('color'));
            $script.css('color', color);
        } catch (e) {}
    }

    return result;
}

hAzzle.features.rgba = isRGBACapable()


// Color codes - can be extended with plug-ins

var colors = hAzzle.colors = {
    'aqua': [0, 255, 255, 1],
    'azure': [240, 255, 255, 1],
    'beige': [245, 245, 220, 1],
    'black': [0, 0, 0, 1],
    'blue': [0, 0, 255, 1],
    'blanchedalmond': [255, 235, 205],
    'blueviolet': [138, 43, 226],
    'brown': [165, 42, 42, 1],
    'cyan': [0, 255, 255, 1],
    'darkblue': [0, 0, 139, 1],
    'darkcyan': [0, 139, 139, 1],
    'darkgrey': [169, 169, 169, 1],
    'darkgreen': [0, 100, 0, 1],
    'darkkhaki': [189, 183, 107, 1],
    'darkmagenta': [139, 0, 139, 1],
    'darkolivegreen': [85, 107, 47, 1],
    'darkorange': [255, 140, 0, 1],
    'darkorchid': [153, 50, 204, 1],
    'darkred': [139, 0, 0, 1],
    'darksalmon': [233, 150, 122, 1],
    'darkviolet': [148, 0, 211, 1],
    'fuchsia': [255, 0, 255, 1],
    'gold': [255, 215, 0, 1],
    'ghostwhite': [248, 248, 255],
    'green': [0, 128, 0, 1],
    'indigo': [75, 0, 130, 1],
    'khaki': [240, 230, 140, 1],
    'lightblue': [173, 216, 230, 1],
    'lightcyan': [224, 255, 255, 1],
    'lightgreen': [144, 238, 144, 1],
    'lightgrey': [211, 211, 211, 1],
    'lightpink': [255, 182, 193, 1],
    'lightyellow': [255, 255, 224, 1],
    'lime': [0, 255, 0, 1],
    'magenta': [255, 0, 255, 1],
    'maroon': [128, 0, 0, 1],
    'navy': [0, 0, 128, 1],
    'olive': [128, 128, 0, 1],
    'orange': [255, 165, 0, 1],
    'pink': [255, 192, 203, 1],
    'purple': [128, 0, 128, 1],
    'violet': [128, 0, 128, 1],
    'red': [255, 0, 0, 1],
    'silver': [192, 192, 192, 1],
    'white': [255, 255, 255, 1],
    'yellow': [255, 255, 0, 1],
    'transparent': [255, 255, 255, 0]
};

// Parse an CSS-syntax color. Outputs an array [r, g, b]

hAzzle.parseColor = function(color) {

    var match;

    // Match #aabbcc
    if ((match = aabbcc.exec(color))) {

        return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16), 1];
    }

    // Match #abc
    if ((match = abc.exec(color))) {

        return [parseInt(match[1], 16) * 17, parseInt(match[2], 16) * 17, parseInt(match[3], 16) * 17, 1];
    }

    // Match rgb(n, n, n)
    if ((match = rgb.exec(color))) {

        return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), 1];
    }

    // Match rgb(n, n, n, n)

    if ((match = rgba.exec(color))) {

        return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10), parseFloat(match[4])];

        // No browser returns rgb(n%, n%, n%), so no reason to support this format.
    }
    return colors[color];
}

// Calculate an in-between color. Returns "#aabbcc"-like string.

function calculateColor(begin, end, pos) {

    var color = 'rgb' + (hAzzle.features.rgba ? 'a' : '') + '(' + parseInt((begin[0] + pos * (end[0] - begin[0])), 10) + ',' + parseInt((begin[1] + pos * (end[1] - begin[1])), 10) + ',' + parseInt((begin[2] + pos * (end[2] - begin[2])), 10);
    if (hAzzle.features.rgba) {
        color += ',' + (begin && end ? parseFloat(begin[3] + pos * (end[3] - begin[3])) : 1);
    }
    color += ')';
    return color;
}