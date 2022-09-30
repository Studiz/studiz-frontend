import io from 'socket.io-client'

// const socket = io('http://localhost:9091/')
const socket = io(process.env.webSocket)

export default socket
