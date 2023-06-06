import SocketServer from '../app/Shared/Services/SocketServer'
SocketServer.boot()

/**
 * Listen for incoming socket connections
 */

SocketServer.io.on('connection', (socket) => {
  const gameUuid = socket.handshake.query['gameUuid']
  const user = socket.handshake.query['userId']
  const room = `${gameUuid}`
  const userRoom = `${gameUuid}-${user}`
  const rooms = [room, userRoom]
  socket.join(rooms)

  socket.emit('news', { hello: 'world' })

  socket.on('chat', () => {
    console.log('Hello world')
  })
})
