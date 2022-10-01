import io from 'socket.io-client'

// const socket = io('http://localhost:9091/')
// const socket = io(process.env.webSocket)
const socket = io('https://www.studiz.games/wsapp')

export default socket
