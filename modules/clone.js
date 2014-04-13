// Support check 
(function () {

    var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input");

    div.appendChild(input);

    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

    div.innerHTML = "<textarea>x</textarea>";

    support.noCloneChecked = !! div.cloneNode(true).lastChild.defaultValue;

}());

var rcheckableType = (/^(?:checkbox|radio)$/i);

/**
 *  TODO!!!
 *
 * - Clone data
 * - deal with the script tags
 */


function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    if ("input" === nodeName && rcheckableType.test(src.type)) dest.checked = src.checked;
    else if ("input" === nodeName || "textarea" === nodeName) dest.defaultValue = src.defaultValue;
};

hAzzle.fn.extend({

    clone: function (deep) {

        var clone,
            storage,
            srcElements, destElements;

        return this.map(function (elem) {

            /* Get all handlers from the original elem before we do a clone job
	
	   NOTE!! This has to be done BEFORE we clone the elem, else
	          hAzzle will be confused and wonder wich of the two
			  'identical' elems to get the handlers and data from
	*/

            var handlers = hAzzle.Events.getHandler(elem, '', null, false),
                l = handlers.length,
                i = 0,
                args, hDlr;

            // Get the data before we clone

            storage = hAzzle(elem).data();

            // Clone the elem

            clone = elem.cloneNode(deep || true);

            // Copy the events from the original to the clone

            for (; i < l; i++) {
                if (handlers[i].original) {

                    args = [clone, handlers[i].type];
                    if (hDlr = handlers[i].handler.__handler) args.push(hDlr.selector);
                    args.push(handlers[i].original);
                    hAzzle.Events.add.apply(null, args);
                }
            }

            // Copy data from the original to the clone

            hAzzle.each(storage, function (key, value) {
                hAzzle.data(clone, key, value);
            });

            // Preserve the rest 

            if (!hAzzle.support.noCloneChecked && (hAzzle.nodeType(1, elem) || hAzzle.nodeType(11, elem)) && !hAzzle.isXML(elem)) {

                destElements = hAzzle.getChildren(clone);
                srcElements = hAzzle.getChildren(elem);

                for (i = 0, l = srcElements.length; i < l; i++) {
                    fixInput(srcElements[i], destElements[i]);
                }
            }

            // Preserve script evaluation history

            destElements = hAzzle.getChildren(clone, "script");

            if (destElements.length > 0) {

                hAzzle.Evaluated(destElements, !hAzzle.contains(elem.ownerDocument, elem) && hAzzle.getChildren(elem, "script"));

            }
            // Return the cloned set
            return clone;
        });
    }
});