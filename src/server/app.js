import express from "express"
import auth from "./routes/auth/index.js"
import api from "./routes/api/index.js"
import view from "./routes/view/index.js"
import cors from "cors"
const app = express()
//middleware
app.use(cors())
app.use(express.json())
app.use('/auth', auth)
app.use('/api', api)
app.use('/view', view)

app.get('/',(req,res) => {
  res.send("hello_world")
  
})

export default app;
