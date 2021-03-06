// strings.js
hAzzle.define('Strings', function() {
    var
    // Save a reference to some core methods

        nTrim = String.prototype.trim,

        // Support: Android<4.1

        nNTrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        // Hyphenate RegExp

        sHyphenate = /[A-Z]/g,

        // Capitalize RegExp

        sCapitalize = /\b[a-z]/g,

        // UnescapeHTML RegExp

        unEscapeFirst = /^#x([\da-fA-F]+)$/,

        // UnescapeHTML RegExp

        unEscapeLast = /^#(\d+)$/,

        // escapeHTML regExp

        escHTML = /[&<>"']/g,

        // isBlank regExp 
        iBlank = /^\s*$/,

        // stripTags regExp

        sTags = /<\/?[^>]+>/g,

        // escapeRegExp regExp

        eRegExp = /([.*+?^=!:${}()|[\]\/\\])/g,

        // Microsoft RegExp

        msPrefix = /^-ms-/,

        // camlize RegExp

        dashAlpha = /-([\da-z])/gi,

        // manualLowercase regExp

        capitalizedChars = /[A-Z]/g,

        // manualUppercase regExp

        nonCapitalizedChars = /[a-z]/g,

        // Cache array for hAzzle.camelize()

        camelCache = [],

        escapeChars = {
            lt: '<',
            gt: '>',
            quot: '"',
            apos: "'",
            amp: '&'
        },

        reversedEscapeChars = {},

        // Used by capitalize as callback to replace()

        fcapitalize = function(letter) {
            return letter.toUpperCase();
        },

        // Used by camelize as callback to replace()

        fcamelize = function(all, letter) {
            return letter.toUpperCase();
        },
        // Used by hyphenate as callback to replace()

        fhyphenate = function(letter) {
            return ('-' + letter.charAt(0).toLowerCase());
        },

        // Converts the specified string to lowercase.

        lowercase = function(str) {
            return typeof str === 'string' ? str.toLowerCase() : str;
        },
        // Converts the specified string to uppercase
        uppercase = function(str) {
            return typeof str === 'string' ? str.toUpperCase() : str;
        },
        manualLowercase = function(str) {
            /* jshint bitwise: false */
            return typeof str === 'string' ? str.replace(capitalizedChars, function(ch) {
                return String.fromCharCode(ch.charCodeAt(0) | 32);
            }) : str;
        },
        manualUppercase = function(str) {
            /* jshint bitwise: false */
            return typeof str === 'string' ? str.replace(nonCapitalizedChars, function(ch) {
                return String.fromCharCode(ch.charCodeAt(0) & ~32);
            }) : str;
        },

        capitalize = function(str) {
            return str ? str.replace(sCapitalize, fcapitalize) : str;
        },

        // Convert a string from camel case to 'CSS case', where word boundaries are
        // described by hyphens ('-') and all characters are lower-case.
        // e.g. boxSizing -> box-sizing

        hyphenate = function(str) {
            if (typeof str === 'string') {
                return str ? str.replace(sHyphenate, fhyphenate) : str;
            } else {
                str = typeof str === 'number' ? '' + str : '';
            }
            return str ? ('data-' + str.toLowerCase()) : str;
        },

        // Convert a string to camel case notation.
        // Support: IE9-11+
        camelize = function(str) {
            if (str && typeof str === 'string') {

                return camelCache[str] ? camelCache[str] :
                    // Remove data- prefix and convert remaining dashed string to camelCase
                    camelCache[str] = str.replace(msPrefix, "ms-").replace(dashAlpha, fcamelize); // -a to A
            }
            // Deal with 'number' and 'boolean'
            return typeof str === 'number' || typeof str === 'boolean' ? '' + str : str;
        },

        // Remove leading and trailing whitespaces of the specified string.

        trim = function(str) {
            return str == null ? '' : nTrim ? (typeof str === 'string' ? str.trim() : str) :
                // Any idiots still using Android 4.1 ?
                (str + '').replace(nNTrim, '');
        },
        // Check if a string is blank
        isBlank = function(str) {
            if (!str) {
                str = '';
            }
            return (iBlank).test(str);
        },

        // Strip tags
        stripTags = function(str) {
            if (!str) {
                return '';
            }
            return String(str).replace(sTags, '');
        },

        // Convert a stringified primitive into its correct type.
        parse = function(str) {
            var n; // undefined, or becomes number
            return typeof str !== 'string' ||
                !str ? str : str === 'false' ? false : str === 'true' ? true : str === 'null' ? null : str === 'undefined' ||
                (n = (+str)) || n === 0 || str === 'NaN' ? n : str;
        },

        contains = function(str, needle) {
            return str.indexOf(needle) >= 0;
        },

        count = function(string, needle) {
            var count = 0,
                pos = string.indexOf(needle);

            while (pos >= 0) {
                count += 1;
                pos = string.indexOf(needle, pos + 1);
            }

            return count;
        },

        truncate = function(str, length, truncateStr) {
            if (!str) {
                return '';
            }
            str = String(str);
            truncateStr = truncateStr || '...';
            length = ~~length;
            return str.length > length ? str.slice(0, length) + truncateStr : str;
        },
        escapeRegExp = function(str) {
            if (!str == null) {
                return '';
            }
            return String(str).replace(eRegExp, '\\$1');
        },
        escapeHTML = function(str) {
            return str.replace(escHTML, function(m) {
                return '&' + reversedEscapeChars[m] + ';';
            });
        },
        unescapeHTML = function(str) {
            return str.replace(/\&([^;]+);/g, function(entity, entityCode) {
                var m;
                if (entityCode in escapeChars) {
                    return escapeChars[entityCode];
                } else if ((m = entityCode.match(unEscapeFirst))) {
                    return String.fromCharCode(parseInt(m[1], 16));
                } else if ((m = entityCode.match(unEscapeLast))) {
                    return String.fromCharCode(~~m[1]);
                } else {
                    return entity;
                }
            });
        };

    // Credit: AngularJS    
    // String#toLowerCase and String#toUpperCase don't produce correct results in browsers with Turkish
    // locale, for this reason we need to detect this case and redefine lowercase/uppercase methods
    // with correct but slower alternatives.

    if ('i' !== 'I'.toLowerCase()) {
        lowercase = manualLowercase;
        uppercase = manualUppercase;
    }

    for (var key in escapeChars) {
        reversedEscapeChars[escapeChars[key]] = key;
    }
    reversedEscapeChars["'"] = '#39';

    // Exporting

    return {

        capitalize: capitalize,
        hyphenate: hyphenate,
        camelize: camelize,
        trim: trim,
        lowercase: lowercase,
        uppcase: uppercase,
        manualLowercase: manualLowercase,
        manualUppercase: manualUppercase,
        parse: parse,
        count: count,
        contains: contains,
        isBlank: isBlank,
        stripTags: stripTags,
        escapeHTML: escapeHTML,
        unescapeHTML: unescapeHTML,
        escapeRegExp: escapeRegExp,
        truncate: truncate
    };
});