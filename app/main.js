//- - App Head

//Dependencies
var express = require('express'),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session'),
	bodyParser = require('body-parser'),
	socketIo = require('socket.io');

//Global dependencies
	
//App Initialization
app = express();


//App Settings
const KEY = 'express.sid',
	SECRET = 'express';

var cookie = cookieParser(SECRET),
	store = new expressSession.MemoryStore(),
	session = expressSession({secret:SECRET, name:KEY, store: store});
	
//Session
app.use(cookie);
app.use(session);

//Static Path
app.use(express.static(__dirname + '/../public'));
//Body Parser
app.use(bodyParser());

//Global app Values
Game = {
	playerNum : 0,
	Players : {},
	Canvas: {}
};



//- - App Body

//Routing
require('./routes');

//Server Initialization
io = require('socket.io').listen(
	app.listen(3000, function() {
		console.log('Server running.');
	})
);

//Socket.IO authorization flux
io.set('authorization', function(data, accept) {
	//Get the cookie
	cookie(data, {}, function(err) {
		if (!err) {
			//Get the session id being used to sign cookies
			var sessionID = data.signedCookies[KEY];
			
			//Search for cookies signed with session id
			store.get(sessionID, function(err, session) {
				if (err || !session) {
					accept(null, false);
				} else {
					//Set values on session
					data.session = session;
					accept(null, true);
				}
			});
		} else {
			accept(null, false);
		}
	});
});

//Socket.IO socket management
require('./socket');