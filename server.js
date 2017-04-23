var http = require('http');
const PORT = process.env.PORT || 8000;
var app = require('./app')

var server = http.createServer(app);
server.listen(PORT);
server.on('listening', function() {
  console.log('server started at ' + PORT);
});  //function to run when starting server
