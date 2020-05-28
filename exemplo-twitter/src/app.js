const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server);

io.on('connection', socket => {
    var Twitter = require('node-tweet-stream')
    , socket = new Twitter({
      consumer_key: '',
      consumer_secret: '',
      token: '',
      token_secret: ''
    })
    socket.track('rato')
    socket.on('tweet', function (tweet) {
      io.emit('tweet', tweet);
    })
    socket.on('error', function (err) {
      console.log('Oh no')
    })
    
});

module.exports = server;

