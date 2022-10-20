import io from 'socket.io-client'

// const socket = io('http://localhost:9091/')
const socket = io('https://www.studiz.games/', {
  secure: true,
  rejectUnauthorized: false,
  path: "/socket.io/",
  transport: ["websocket"]
})

export default socket
