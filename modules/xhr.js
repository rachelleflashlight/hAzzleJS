// xhr.js
var httpsRe = /^http/,
    rhash = /#.*$/,
    rprotocol = /^\/\//,
    rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    contentType = 'Content-Type',
    head = document.head,
    uniqid = 0,
    lastValue,
    callbackPrefix = hAzzle.expando + hAzzle.getID(true, 'xhr'),
    ajaxLocation = location.href,
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [],

    accepts = {
        '*': 'text/javascript, text/html, application/xml, text/xml, */*',
        'xml': 'application/xml, text/xml',
        'html': 'text/html',
        'text': 'text/plain',
        'json': 'application/json, text/javascript',
    },

    defaultHeaders = {
        'contentType': 'application/x-www-form-urlencoded; charset=UTF-8',
        'requestedWith': 'XMLHttpRequest'
    },

    createXhr = function (options) {
        if (options.crossOrigin === true) {
            var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : null;
            if (xhr && 'withCredentials' in xhr) {
                return xhr;
            } else {
                hAzzle.error('Browser does not support cross-origin requests');
            }
        } else if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else {
            hAzzle.error('This browser does not support XMLHttpRequest.');
        }
    },
    xhrSetup = {
        filter: function (data) {

            return data;
        }
    },

    succeed = function (request) {
        if (httpsRe.test(window.location.protocol)) {
            var state = request.status;
            // normalize IE bug (http://bugs.jquery.com/ticket/1450)     
            return state === 1223 ? 204 : state;
        } else {
            return !!request.response;
        }
    },

    handleReadyState = function (obj, success, error) {
        return function () {
            var xhr = obj.request;
            if (obj.aborted) {
                return error(xhr);
            }
            if (xhr && xhr.readyState === 4) {
                xhr.onreadystatechange = hAzzle.noop;
                if (succeed(xhr)) {
                    success(xhr);
                } else {
                    error(xhr);
                }
            }
        };
    },
    createURL = function (url, str) {
        return url + (/\?/.test(url) ? '&' : '?') + str;
    },

    // JsonP request

    jsonpReq = function (options, fn, err, url) {
        // we can't take ideas from jQuery on this, because jQuery does crazy shit with script elements, e.g.:
        // - fetches local scripts via XHR and evals them
        // - adds and immediately removes script elements from the document
        var jsonPID = hAzzle.getID(true, 'jsp_'),
            cbkey = options.jsonpCallback || 'callback',
            cbval = options.jsonpCallbackName || hAzzle.getcallbackPrefix(jsonPID),
            cbreg = new RegExp('((^|\\?|&)' + cbkey + ')=([^&]+)'),
            match = url.match(cbreg),
            script = window.document.createElement('script'),
            loaded = 0;

        if (match) {
            if (match[3] === '?') {
                url = url.replace(cbreg, '$1=' + cbval); // wildcard callback func name
            } else {
                cbval = match[3]; // provided callback func name
            }
        } else {
            url = createURL(url, cbkey + '=' + cbval); // no callback details, add 'em
        }

        window.cbval = function (data) {
            lastValue = data;
        };

        script.type = 'text/javascript';
        script.src = url;
        script.async = true;
        
        if (typeof script.onreadystatechange !== 'undefined' && !hAzzle.ie === 10) {
            script.event = 'onclick';
            script.htmlFor = script.id = '[[___hAzzle___]]' + jsonPID;
        }

        script.onload = script.onreadystatechange = function () {
            if ((script.readyState && script.readyState !== 'complete' && script.readyState !== 'loaded') || loaded) {
                return false;
            }
            script.onload = script.onreadystatechange = null;

            if (script.onclick) {
                script.onclick();
            }
            // Call the user callback with the last value stored and clean up values and scripts.
            fn(lastValue);
            lastValue = undefined;
            head.removeChild(script);
            loaded = 1;
        };

        // Add the script to the DOM head
        head.appendChild(script);

        // Enable JSONP timeout
        return {
            abort: function () {
                script.onload = script.onreadystatechange = null;
                err({}, 'XHR is aborted: timeout', {});
                lastValue = undefined;
                head.removeChild(script);
                loaded = 1;
            }
        };
    },

    getRequest = function (fn, err) {

        var options = this.options,
            headers = options.headers || {},
            isAFormData = hAzzle.features.formData && (options.data instanceof FormData),
            method = (options.method || /*DEFAULT*/ 'GET').toUpperCase(),

            // Create URL string, and remove hash character, and add protocol if not provided

            url = (((typeof options === 'string' ? options : options.url) || ajaxLocation) + '')
            .replace(rhash, '')
            .replace(rprotocol, ajaxLocParts[1] + '//'),
            data = (options.processData !== false && options.data && typeof options.data !== 'string') ?
            hAzzle.toQueryString(options.data) :
            (options.data || null),
            http, sendWait = false;

        if ((options.type == 'jsonp' || method == 'GET') && data) {
            url = createURL(url, data);
            data = null;
        }

        if (options.type == 'jsonp') {
            return jsonpReq(options, fn, err, url);
        }

        http = createXhr(options);
        http.open(method, url, true);

        // Set headers

        headers.Accept = headers.Accept || accepts[options.type] || accepts['*'];

        if (!options.crossOrigin && !headers.requestedWith) {
            headers.requestedWith = defaultHeaders.requestedWith;
        }

        if (!headers[contentType] && !isAFormData) {
            headers[contentType] = options.contentType ||
                defaultHeaders.contentType;
        }

        hAzzle.each(headers, function (value, key) {
            if (typeof value !== 'undefined') {
                http.setRequestHeader(key, value);
            }
        });

        // Credentials

        if (typeof options.withCredentials !== 'undefined' &&
            typeof http.withCredentials !== 'undefined') {
            http.withCredentials = !!options.withCredentials;
        }

        if (window.XDomainRequest && http instanceof window.XDomainRequest) {
            http.onload = fn;
            http.onerror = err;
            http.onprogress = function () {};
            sendWait = true;
        } else {
            http.onreadystatechange = handleReadyState(this, fn, err);
        }

        if (options.before) {
            options.before(http);
        }

        if (sendWait) {
            setTimeout(function () {
                http.send(data);
            }, 200);
        } else {
            http.send(data);
        }
        return http;
    },

    setType = function (header) {

        // json, javascript, text/plain, text/html, xml
        if (header.match('json')) {
            return 'json';
        }
        if (header.match('javascript')) {
            return 'js';
        }
        if (header.match('text')) {
            return 'html';
        }
        if (header.match('xml')) {
            return 'xml';
        }
    },

    // Prototype

    XHR = function (options, fn) {
        return new XHR.prototype.init(options, fn);
    };

XHR.prototype.constructor = XHR;
XHR.prototype.init = function (options, fn) {

    this.options = options;
    this.fn = fn;
    this.timeout = null;
    this.fullfilled = false;
    this.successHandler = function () {};
    this.fullfillmentHandlers = [];
    this.errorHandlers = [];
    this.completeHandlers = [];
    this.errorMsg = false;
    this.responseArgs = {};

    var self = this,
        complete = function (response) {
            options.timeout && clearTimeout(self.timeout);
            self.timeout = null;
            while (self.completeHandlers.length > 0) {
                self.completeHandlers.shift()(response);
            }
        },

        success = function (xhr) {

            var type = options.type || setType(xhr.getResponseHeader('Content-Type')),
                resp, filteredResponse, r;

            xhr = (type !== 'jsonp') ? self.request : xhr;

            // responseText is the old-school way of retrieving response (supported by IE8 & 9)
            // response/responseType properties were introduced in XHR Level2 spec (supported by IE10)

            resp = ('response' in xhr) ? xhr.response : xhr.responseText;

            // Use global data filter on response text

            filteredResponse = xhrSetup.filter(resp, type);
            r = filteredResponse;

            xhr.responseText = r;

            //jsonxml.js module required

            if (r || r === '') {
                if (type === 'json') {
                    xhr = hAzzle.parseJSON(r);
                } else if (type === 'html') {
                    xhr = r;
                } else if (type === 'xml') {
                    xhr = hAzzle.parseXML(xhr.responseXML);
                }
            }

            self.responseArgs.resp = xhr;
            self.fullfilled = true;
            fn(xhr);
            self.successHandler(xhr);
            while (self.fullfillmentHandlers.length > 0) {
                xhr = self.fullfillmentHandlers.shift()(xhr);
            }

            complete(xhr);
        },

        error = function (resp, msg, t) {
            resp = self.request;
            self.responseArgs.resp = resp;
            self.responseArgs.msg = msg;
            self.responseArgs.t = t;
            self.errorMsg = true;
            while (self.errorHandlers.length > 0) {
                self.errorHandlers.shift()(resp, msg, t);
            }
            complete(resp);
        };


    fn = fn || function () {};

    if (options.timeout) {
        this.timeout = setTimeout(function () {
            self.abort();
        }, options.timeout);
    }

    if (options.success) {
        this.successHandler = function () {
            options.success.apply(options, arguments);
        };
    }

    if (options.error) {
        this.errorHandlers.push(function () {
            options.error.apply(options, arguments);
        });
    }

    if (options.complete) {
        this.completeHandlers.push(function () {
            options.complete.apply(options, arguments);
        });
    }

    this.request = getRequest.call(this, success, error);
};

XHR.prototype.abort = function () {
    this.aborted = true;
    this.request.abort();
};
XHR.prototype.retry = function () {
    this.init(this.options, this.fn);
};
XHR.prototype.then = function (success, fail) {
    success = success || hAzzle.noop;
    fail = fail || hAzzle.noop;
    if (this.fullfilled) {
        this.responseArgs.resp = success(this.responseArgs.resp);
    } else if (this.errorMsg) {
        fail(this.responseArgs.resp, this.responseArgs.msg, this.responseArgs.t);
    } else {
        this.fullfillmentHandlers.push(success);
        this.errorHandlers.push(fail);
    }
    return this;
};
XHR.prototype.always = function (fn) {
    if (this.fullfilled || this.errorMsg) {
        fn(this.responseArgs.resp);
    } else {
        this.completeHandlers.push(fn);
    }
    return this;
};

XHR.prototype.fail = function (fn) {
    if (this.errorMsg) {
        fn(this.responseArgs.resp, this.responseArgs.msg, this.responseArgs.t);
    } else {
        this.errorHandlers.push(fn);
    }
    return this;
};
XHR.prototype.catch = function (fn) {
    return this.fail(fn);
};

XHR.prototype.init.prototype = XHR.prototype;

hAzzle.extend({

    xhr: XHR,

    getcallbackPrefix: function () {
        return callbackPrefix;
    },

    ajaxSetup: function (options) {
        options = options || {};
        var k;
        for (k in options) {
            xhrSetup[k] = options[k];
        }
    }
}, hAzzle);