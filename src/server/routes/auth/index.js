import express from "express"
import db from "../../../db/index.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post('/signup', async (req,res) => {
  const {name, password} = req.body
  if (!name || !password) return res.status(400).send("missing fields name and password")
  const query = db.select('*').from('users').where({name})
  if ((await query).length > 0) return res.status(409).send("name already exist")
  const hash = bcrypt.hash(password, 10)
  await db.insert({name, password:await hash}).into("users") 
  return res.json(jwt.sign(name, process.env.SECRET))
})

router.post('/login', async (req,res) => {
  const {name, password} = req.body
  if (!name || !password) return res.status(400).send("missing fields name and password")
  const query = await db.select('*').from('users').where({name})
  if (query.length === 0) return res.status(404).send("name do not exist")
  if (!bcrypt.compareSync(password, query[0].password)) return res.status(403).send("incorrect password")   
  return res.json(jwt.sign(query[0].name, process.env.SECRET))
})

export default router
