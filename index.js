var http = require('http'),
   fs = require('fs'),
   // NEVER use a Sync function except at start-up!
   index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.end(index);
});

// app.listen(3000);
app.listen(process.env.PORT);