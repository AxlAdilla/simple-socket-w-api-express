const { json, raw, text, urlencoded } = require('body-parser');
const bodyParser = require('body-parser');
express = require('express')
cors = require('cors')

const app = express();
app.use(cors())
app.use(json({limit: '5mb'}));
app.use(raw({limit: '5mb'}));
app.use(text({limit: '5mb'}));
app.use(urlencoded({
	extended: true,
	limit: '5mb'
}));

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
const port = 9998

app.get('/', (req, res) => {
  res.json({
    "message" : "hello world"
  })
})

app.post('/', (req, res) => {
  userId = req.body.user_id
  io.sockets.emit('connectedUsers', {
    "data" : userId
  })
  res.json({
    "data" : userId
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

server.listen(9999);

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log(`loss of connection with (${socket.id})`)
    })

    socket.on('hello', function(data) {
        console.log(data)
        console.log(`Hello from Client`);
        io.sockets.emit('hello', 'hello back')
    })

    console.log(`connection established with (${socket.id})`)
})