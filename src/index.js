import app from "./server/app.js";
import dotenv from "dotenv";
import create from "./db/create.js";
import addUser from "./db/add.js";
import db from "./db/index.js"
dotenv.config()
const PORT = 5050

app.listen(PORT, async () => {
  await create()  
  await addUser()
  const res = await db.select('*').from('users')
  console.log(res)
  console.log(`app listening on ${PORT}`)
})