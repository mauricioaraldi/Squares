App = {
	canvas: {},
	ctx: {},

	Config: {
	},
	
	Keys: {
		left: false,
		up: false,
		right: false,
		down: false,
		space: false
	},
	
	Values: {
		squares: {},
		bullets: []
	},
	
	Utils: {
		/**
		 * @author mauricio.araldi
		 * @since 19/05/2014
		 *
		 * Returns the values of the object
		 *
		 * @parameter Object - The object from which to get values
		 *
		 * @return Array values - The values of the object
		 */
		getValues : function(object) {
			var values = [];
			
			for (var k in object) {
				values.push(object[k]);
			}
			
			return values;
		}
	}
};