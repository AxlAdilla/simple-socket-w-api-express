const { io } = require('socket.io-client')

const client = io('http://localhost:9999')

client.on("connect", () => {
    console.log("socket id " + client.id); // x8WIv7-mJelg7on_ALbx
})

client.on('connectedUsers', function(data) {
    console.log(`connectedUsers`);
    console.log(data)
})

client.emit('hello', 'test')
