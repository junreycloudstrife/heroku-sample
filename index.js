// Express initializes app to be a function handler
// that you can supply to an HTTP server.
var app = require('express')();
var http = require('http').Server(app);

// Initialize a new instance of socket.io by passing
// the http (the HTTP server) object.
var io = require('socket.io')(http);

// We define a route handler / that gets called when
// we hit our website home.
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');    // This code servers the index.html
});

app.get('/index2', function(req, res){           // This is a trial and error part
    res.sendFile(__dirname + '/index2.html');    // This code servers the index.html
});
 
io.on('connection', function(socket){           // Listen on the connection event when a user to access page
    console.log('a user connected')                 // Logs on the terminal
    io.emit('chat message', 'a user connected')     // Send to all client
    socket.on('disconnect', function(){             // Listen on the disconnect event when a user disconnects
        console.log("user disconnected")                // Logs on the terminal
    })

    socket.on('chat message', function(msg){    // Listens on the chat message event for incoming message
        io.emit('chat message', msg);               // Sends to all client the message
        console.log("chat message :" + msg)         // Logs the message to the terminal
    });
});


// http.listen(3000, function(){                     // Make the http server listen on port 3000.
//   console.log('listening on *:3000');
// });

http.listen(process.env.PORT, function(){                     // Make the http server listen on port set for environment.
    console.log('listening on *:' + process.env.PORT);
  });