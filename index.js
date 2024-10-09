const express  = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const app = express()
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

// Allow larger request bodies (e.g., increase to 10MB)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json())
app.use(cookieParser())

app.use("/api", router)
const PORT = 8080 || process.env.PORT


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Connect to DB`)
    console.log(`Server is running on port ${PORT}`)
  })
}).catch(err => {
  console.error('Failed to connect to DB', err)
})