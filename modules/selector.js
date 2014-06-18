/*!
 * Selector
 */

var
win = this,
  doc = win.document,
  html = win.document.documentElement;


hAzzle.extend({

  matches: function (selector, context) {

    return selector === '*' || hAzzle.matchesSelector(context, selector);

  },
  select: function (selector, context, results, seed) {
    var match,
      bool, // Boolean for filter function
      elem, m, nodeType,
      i = 0;

    results = results || [];
    context = context || doc;

    // Bad and quick fix

    if (selector === "window") return [win];

    // Same basic safeguard as Sizzle
    if (!selector || typeof selector !== "string") {

      return results;
    }

    // Early return if context is not an element or document
    if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {

      return [];
    }

    if (!seed) {

      // Shortcuts

      if ((match = /^(?:#([\w-]+)|\.([\w-]+)|(\w+))$/.exec(selector))) {

        // #id
        if ((m = match[1])) {

          elem = context.getElementById(m);

          if (elem && elem.parentNode) {

            if (elem.id === m) {
              results.push(elem);
              return results;
            }
          } else {
            return results;
          }

          // .class	

        } else if ((m = match[2])) {

          push.apply(results, context.getElementsByClassName(m));
          return results;

          // tag

        } else if ((m = match[3])) {

          push.apply(results, context.getElementsByTagName(selector));
          return results;
        }
      }

      // Everything else

     try {
		results = context.querySelectorAll(selector); 
		 } catch(e) {}
	  

      // Seed

    } else {

        var i = 0,
		    l = seed.length;
		
		for (; i < l; i++) { 
        if (hAzzle.matchesSelector(seed[i], selector) ) {
          results.push(seed[i]);
        }
	   }
    }

    return slice.call(results);


  }
}, hAzzle);