import io from 'socket.io-client'

// const socket = io('http://localhost:9091/')
const socket = io('http://20.239.140.141:5003/wsapp')
// const socket = io(process.env.webSocket)
// const socket = io('https://www.studiz.games/studiz')

export default socket
