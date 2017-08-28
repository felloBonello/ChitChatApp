/**
 * Created by jwb19 on 2017-03-07.
 */
const port = process.env.PORT || 3020

const express = require('express')
const http = require('http')

const socket = require('./routes.js')

const app = express()
var server = http.createServer(app)

app.use(express.static('public'))

var io = require('socket.io').listen(server);
io.sockets.on('connection', socket);

server.listen(port, () => {
    console.log(`starting on port ${port}`)
})

