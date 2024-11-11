import express from 'express'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server)

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(join(__dirname, 'static')))

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'static/html/index.html'))
})

// Websocket
io.on('connection', (socket) => {
    io.emit('i am connected', `Se conecto: ${socket.id}`) // Emitimos a todos los clientes
    // socket.emit('i am connected', `Se conecto: ${socket.id}`) // Emitimos a un solo cliente
    // socket.broadcast.emit('i am connected', `Se conecto: ${socket.id}`) // Emitimos a todos menos al cliente emisor
    socket.on('create message', (msg) => {
        io.emit('create message', `${socket.id}: ${msg}`)
    })
    socket.on('disconnect', () => {
        io.emit('i am disconnected', `Se desconecto: ${socket.id}`)
    })
})

server.listen(3000, () => {
    console.log('------------------------------> Server running on port 3000')
})