$(function() {
	var canvas = $('canvas')[0];
		
	//Sets canvas size
	canvas.height = 500;
	canvas.width = 500;
	
	//Adjust App variables
	App.canvas = canvas;
	App.ctx = canvas.getContext('2d');
	
	//Adds the stage to the page
	$('body').append(canvas);
	
	//Start ticking
	setInterval(tick, 10);
});

/**
 * @author mauricio.araldi
 * @since 10/11/2014
 *
 * Ticks the game
 */
function tick() {
	App.ctx.clearRect(0, 0, App.canvas.width, App.canvas.height);
	drawSquares();
	movePlayer();
	moveBullets();
	playerShoot();
}

/**
 * @author mauricio.araldi
 * @since 10/11/2014
 *
 * Draw the squares on the screen.
 */
function drawSquares() {
	var squares = App.Utils.getValues(App.Values.squares),
		i = squares.length;
		
	while (i--) {
		var square = squares[i];
		
		App.ctx.fillStyle = square.color;
		App.ctx.fillRect( square.posX, square.posY, square.size, square.size );
	}
}

/**
 * @author mauricio.araldi
 * @since 11/11/2014
 *
 * Draw the bullets on the screen
 */
function moveBullets() {
	var i = App.Values.bullets.length;
		
	while (i--) {
		var bullet = App.Values.bullets[i];
		
		App.ctx.fillStyle = bullet.color;
		App.ctx.fillRect( bullet.posX, bullet.posY, bullet.size, bullet.size );
		
		switch (bullet.direction) {
			case 'up':
				bullet.posY -= bullet.speed;
				
				if (bullet.posY <= 0) {
					App.Values.bullets = App.Values.bullets.slice(0, i).concat( App.Values.bullets.slice(i+1) );
				}
				
				break
				
			case 'right':
				bullet.posX += bullet.speed;
				
				if (bullet.posX >= App.canvas.width) {
					App.Values.bullets = App.Values.bullets.slice(0, i).concat( App.Values.bullets.slice(i+1) );
				}
				
				break
				
			case 'down':
				bullet.posY += bullet.speed;
				
				if (bullet.posY >= App.canvas.height) {
					App.Values.bullets = App.Values.bullets.slice(0, i).concat( App.Values.bullets.slice(i+1) );
				}
				
				break
				
			case 'left':
				bullet.posX -= bullet.speed;
				
				if (bullet.posX <= 0) {
					App.Values.bullets = App.Values.bullets.slice(0, i).concat( App.Values.bullets.slice(i+1) );
				}
				
				break
		}
	}
}

/**
 * @author mauricio.araldi
 * @since 10/11/2014
 *
 * Verifies if the player is moving
 */
function movePlayer() {
	//LEFT
	if (App.Keys.left) {
		App.Socket.move('left');
	} 
	
	//UP
	if (App.Keys.up) {
		App.Socket.move('up');
	}
	
	//RIGHT
	if (App.Keys.right) {
		App.Socket.move('right');
	}

	//DOWN
	if (App.Keys.down) {
		App.Socket.move('down');
	}
}

/**
 * @author mauricio.araldi
 * @since 11/11/2014
 *
 * Verifies if the player is shooting
 */
function playerShoot() {
	//SPACE
	if (App.Keys.space) {
		App.Socket.shoot();
	} 
}