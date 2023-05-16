import SocketServer from '../app/Shared/Services/SocketServer'
SocketServer.boot()

/**
 * Listen for incoming socket connections
 */

SocketServer.io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' })

  socket.on('chat', () => {
    console.log('Hello world')
  })
})
