import SocketServer from '../app/Shared/Services/SocketServer'
SocketServer.boot()

/**
 * Listen for incoming socket connections
 */

SocketServer.io.on('connection', (socket) => {

  const gameUuid = socket.handshake.query["gameUuid"];
  const room = `${gameUuid}`;
  const rooms = [room];
  socket.join(rooms);


  socket.emit('news', { hello: 'world' })

  socket.on('chat', () => {
    console.log('Hello world')
  })
})
