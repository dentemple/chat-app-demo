const server = require('server')
const antiSpam = require('socket-anti-spam')
const { get, socket } = server.router

const settings = {
  port: 8080,
  session: {
    httpOnly: false,
    secure: false,
    resave: false,
    saveUninitialized: true,
    maxAge: 10 * 60 * 1000 // 10 minutes
  }
}

server(
  settings,
  success(),
  ctx => view(ctx),
  ctx => spamCheck(ctx),
  socket('message', sendMessage)
)

// ---

function success() {
  console.log('We are rocking on port 8080!')
}

function view(ctx) {
  return 'Websocket server for <a href="https://dentemple.com">https://dentemple.com</a>'
}

function spamCheck(ctx) {
  antiSpam.init({
    banTime: 2,
    kickThreshold: 5,
    kickTimesBeforeBan: 2,
    banning: true,
    heartBeatStale: 30,
    heartBeatCheck: 4,
    io: ctx.io
  })
}

function sendMessage(ctx) {
  console.log(ctx.data)
  ctx.io.emit('message', ctx.data)
}
