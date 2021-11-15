const { io } = require('socket.io-client')

const client = io('http://localhost:3000', {
    auth: {
        name: 'Socket-?'
    }
})

client.on('error', (...args) => console.log(args))

client.on('message', (...args) => console.log(args))

client.on('sockets update', (...args) => console.log(args))

client.on("connect", () => {
    client.emit('get all sockets')
})
