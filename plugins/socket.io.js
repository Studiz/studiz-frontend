import io from 'socket.io-client'

// const socket = io('http://localhost:9091/')
const socket = io('http://20.2.82.170/', {
  secure: true,
  rejectUnauthorized: false,
  path: "/socket.io/",
  transport: ["websocket"]
})

export default socket
