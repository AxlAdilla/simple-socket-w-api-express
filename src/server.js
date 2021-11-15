const { Server } = require('socket.io')

const server = new Server(3000)

server.on('connection', (socket) => {
    socket.username = socket.handshake.auth.name

    socket.on('global message', (message) => {
        server.emit('message', {
            socketId: socket.id,
            socketName: socket.username,
            data: message.content
        })
    })

    socket.on('direct message', (message) => {
        socket.broadcast.to(message.target).emit('message', {
            socketId: socket.id,
            socketName: socket.username,
            data: message.content
        })
    })

    socket.on('get all sockets', () => {
        const response = []

        for (const data of server.sockets.sockets.values()) {
            response.push({
                socketId: data.id,
                socketName: data.username,
            })
        }

        socket.emit('sockets update', response)
    })

    socket.on('disconnect', () => {
        console.log(`loss of connection with ${socket.username} (${socket.id})`)

        console.log(server.sockets.sockets.values())
    })

    console.log(`connection established with ${socket.username} (${socket.id})`)
})

console.log('starting listening on port 3000')
