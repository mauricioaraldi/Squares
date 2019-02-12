;(function ( $, window ) {

	/**
	 * This module controls socket interactions
	 *
	 * @author mauricio.araldi
	 * @since 10/11/2014
	 */
	App.Socket = (function() {
		var socket = io.connect('http://192.168.100.56:3000');
	
		/**
		 * Default function with all event bindings related to this module
		 *
		 * @author mauricio.araldi
		 * @since 10/11/2014
		 */
		function bindEvents() {
			/**
			 * Draws something in canvas
			 *
			 * @author mauricio.araldi
			 * @since 11/11/2014
			 */
			socket.on('drawPlayers', function(data) {
				App.Values.squares = data.players;
			});
			
			socket.on('shoot', function(data) {
				App.Values.bullets.push(data.bullet);
			});
		}
		
		/**
		 * Default function that runs as soon as the page is loaded
		 * and events are binded (see bindEvents())
		 *
		 * @author mauricio.araldi
		 * @since 10/11/2014
		 */
		function init() {
		}
		
		function move(direction) {
			socket.emit('move', {direction: direction});
		};
		
		function shoot() {
			socket.emit('shoot', {});
		}
		
		return {
			bindEvents : bindEvents,
			init : init,
			move: move,
			shoot: shoot
		}
	
	})();

	// DOM Ready -- Initialize the module
	$(function() {
		App.Socket.init();
		App.Socket.bindEvents();
	});

})( jQuery, window );