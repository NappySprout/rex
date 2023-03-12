import express from "express"
import {BearerParser} from "bearer-token-parser"
import db from "../../../db/index.js"
import jwt from "jsonwebtoken"
const router = express.Router()

router.use(async (req,res,next) => {
  const token = BearerParser.parseBearerToken(req.headers)
  if (!token) return res.status(403).send("invalid Bearer token")
  try{ 
    const name = jwt.verify(token, process.env.SECRET) 
    const query = await db.select('*').from('users').where({name})
    if (query.length == 0) return res.status(404).send("user not found")
    req.user = query[0]
  }
  catch(err){ return res.status(403).send("token is invalid") }
  next()
})

router.get('/',(req,res) => res.send('api'))
router.post('/group',async (req,res) => {
  const { user:{name:author} , body:{name, description} } = req
  if (!name || !description) return res.status(400).send("missing fields name or description")
  try { await db.insert({author, name, description}).into("groups") }
  catch { return res.status(404).send("missing description or name exist") }
  return res.send("OK")
})
router.post('/post',async (req,res) => {
  const { user:{name:author} , body:{title, content, group} } = req
  if (!title || !content || !group) return res.status(400).send("missing fields title, content, group")
  try { await db.insert({title, content, group, author}).into("posts") }
  catch { return res.status(404).send("unknown error in post") }
  return res.send("OK")
})
router.post('/comment',async (req,res) => {
  const { user:{name:author} , body:{content, postid} } = req
  if (!content || !postid) return res.status(400).send("missing fields content, postid")
  try { await db.insert({content, postid, author}).into("comments") }
  catch { return res.status(404).send("unknown error in comment") }
  return res.send("OK")
})

export default router
