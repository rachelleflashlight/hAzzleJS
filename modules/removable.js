
// Contains: Empty() and Remove()

   var cahce = [], 
   timeout;

hAzzle.fn.extend({

    /**
     * Remove all child nodes of the set of matched elements from the DOM.
     *
     * @return {Object}
     */

    empty: function () {
       
	   // Remove all data to prevent memory leaks
	   
        return this.removeData().each(function (_, elem) {
         if ( hAzzle.nodeType(1, this)) {
			 
		 // Remove all event handlers
		
		hAzzle.each(elem, function() {
			hAzzle.Events.remove(elem);
		});
			 
		 // Remove any remaining nodes
        
		 this.textContent = "";
		 }
        });
    },
	
	 /**
     *  Remove an element from the DOM
     */

    remove: function () {

		// Discard any data on the element

        return this.removeData().each(function (_, elem) {
			
		// Locate all nodes that belong to this element
		// and add them to the "elems stack"
			
		  var elements = hAzzle(elem).find('*');
		      elements  = elements.add(elem);

	    // Remove all event handlers
		
		hAzzle.each(elements, function() {
			hAzzle.Events.remove(elem);
		});
        
		 var parent = elem.parentNode;
		 
		// Remove all children
		
        if (parent) {
		
		   this.parentNode.removeChild(elem);
		}
        
       })
	   return false;
    }
});



