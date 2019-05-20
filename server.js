var server     = require('http').createServer(),
    io         = require('socket.io')(server),
    winston    = require('winston'),
    port       = 1337;

var logger = winston.createLogger({
        transports: [
                new winston.transports.Console(),
                new winston.transports.File({filename: 'logs/access.log', level: 'info'}),
				new winston.transports.File({filename: 'logs/errors.log', level: 'error'})
        ]
    });
	
// Logger config
logger.info('SocketIO > listening on http://localhost:' + port);

io.on('connection', function (socket){

    logger.info('SocketIO > Connected socket ID : 	' + socket.id);
	
	//socket.on('room', function(group) {
        //socket.join(group);
    //});

    socket.on('broadcast', function (message) {

		io.emit('broadcast', message);
        logger.info('SocketIO emit to Client :' + JSON.stringify(message));
    });

    socket.on('disconnect', function () {
		
        logger.info('SocketIO > Disconnected socket ' + socket.id);
		
    });
});

/*
io.on('connection', function (socket){
	
    var nb = 0;

    logger.info('SocketIO > Connected socket ' + socket.id);

    socket.on('broadcast', function (message) {
		
        ++nb;
        logger.info('ElephantIO broadcast > ' + JSON.stringify(message));

        // send to all connected clients
        io.sockets.emit("broadcast", message);
    });

    socket.on('disconnect', function () {
		
        logger.info('SocketIO : Received ' + nb + ' messages');
        logger.info('SocketIO > Disconnected socket ' + socket.id);
    });
});
*/

server.listen(port);
