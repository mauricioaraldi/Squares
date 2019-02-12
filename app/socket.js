module.exports = (function() {
	io.sockets.on('connection', function(socket) {
		var session = socket.request.session,
			playerId = session.player.id;
		
		console.log('Player connected');
		
		io.sockets.emit('drawPlayers', {players: Game.Players});
		
		socket.on('move', function(data) {
			var player = session.player;
			
			switch (data.direction) {
				case 'up':
					player.posY -= player.speed;
					
					//Limit verification
					if (player.posY <= 0) {
						player.posY = 0;
					}
					
					player.direction = 'up';
					
					break
				
				case 'right':
					player.posX += player.speed;
					
					//Limit verification
					if ( (player.posX + player.size) >=  500 ) {
						player.posX = 500 - player.size;
					}
					
					player.direction = 'right';
					
					break
					
				case 'down':
					player.posY += player.speed;
					
					//Limit verification
					if ( (player.posY + player.size) >=  500 ) {
						player.posY = 500 - player.size;
					}
					
					player.direction = 'down';
					
					break
					
				case 'left':
					player.posX -= player.speed;
					
					// Limit verification
					if (player.posX <= 0) {
						player.posX = 0;
					}
					
					player.direction = 'left';
					
					break
			}
			
			Game.Players[session.player.id] = session.player;
			
			io.sockets.emit('drawPlayers', {players: Game.Players});
		});
		
		socket.on('shoot', function(data) {
			var player = session.player,
				bullet = {
					color: player.color, 
					size: player.size / 2, 
					posX: player.posX, 
					posY: player.posY, 
					speed: player.speed * 2, 
					direction: player.direction
				};
			
			io.sockets.emit('shoot', {bullet: bullet});
		});
	});
})();