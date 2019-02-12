/**
 * @author mauricio.araldi
 * @since 19/05/2014
 *
 * Controls pressed keys
 */
$(document).on('keydown', function(ev) {
	if (ev.which == 37) { //LEFT
		ev.preventDefault();
		App.Keys.left = true;
	} else if (ev.which == 38) { //UP
		ev.preventDefault();
		App.Keys.up = true;
	} else if (ev.which == 39) { //RIGHT
		ev.preventDefault();
		App.Keys.right = true;
	} else if (ev.which == 40) { //DOWN
		ev.preventDefault();
		App.Keys.down = true;
	} else if (ev.which == 32) { //SPACE
		ev.preventDefault();
		App.Keys.space = true;
	}
});

/**
 * @author mauricio.araldi
 * @since 19/05/2014
 *
 * Controls released keys
 */
$(document).on('keyup', function(ev) {
	if (ev.which == 37) { //LEFT
		ev.preventDefault();
		App.Keys.left = false;
	} else if (ev.which == 38) { //UP
		ev.preventDefault();
		App.Keys.up = false;
	} else if (ev.which == 39) { //RIGHT
		ev.preventDefault();
		App.Keys.right = false;
	} else if (ev.which == 40) { //DOWN
		ev.preventDefault();
		App.Keys.down = false;
	} else if (ev.which == 32) { //SPACE
		ev.preventDefault();
		App.Keys.space = false;
	}
});