const server = require('server')
const antiSpam = require('socket-anti-spam')
const { get, socket } = server.router

const sendMessage = ctx => {
  console.log(ctx.data)
  ctx.io.emit('message', ctx.data)
}

server(
  { port: 8080 },
  console.log('We are rocking on port 8080!'),
  ctx => {
    return 'Websocket server for <a href="https://dentemple.com">https://dentemple.com</a>'
  },
  ctx =>
    antiSpam.init({
      banTime: 2,
      kickThreshold: 5,
      kickTimesBeforeBan: 2,
      banning: true,
      heartBeatStale: 30,
      heartBeatCheck: 4,
      io: ctx.io
    }),
  socket('message', sendMessage)
)
