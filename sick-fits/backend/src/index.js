const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
require("dotenv").config({ path: "variables.env" })
const createServer = require("./createServer")
const db = require("./db")

const server = createServer()

server.express.use(cookieParser())
// TODO use express middleware to populate current user

// decode JWT so we can get user ID on each request

server.express.use((req, res, next) => {
  const { token } = req.cookies
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    // put the userId onto the req for future requests to acess
    req.userId = userId
  }
  next()
})

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now runnning on port http://localhost:${deets.port}`)
  }
)
