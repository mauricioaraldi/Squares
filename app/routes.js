//Dependencies
var fs = require('fs'),
	Square = require('./Square');

//Self executable
module.exports = (function() {
	//Main
	app.get('/', function(req, res) {
		var destinyPath = 'stage.html',
			html;
		
		try {
			html = fs.readFileSync(__dirname + '/../public/' + destinyPath);
		} catch (err) {
			console.log('Error loading file');
			console.log(err);
			html = 'ERROR. Verify console for more information.';
		}
		
		var id = ++Game.playerNum;
		var color = getRandomColor();
		
		//Creates the player and set its values
		//Square(id, color, size, posX, posY, speed)
		var square = new Square(id, color, 10, 10, 10, 2, null);
		
		//Adds to session and server
		req.session.player = square;
		Game.Players[id] = square;
		
		res.writeHead(200, {
			"Content-Type" : 'text/html'
		});
		
		res.write(html);
		res.end();
	});
})();

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split(''),
		color = '#';
	
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	
	return color;
}