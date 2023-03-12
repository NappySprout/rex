import express from 'express'
import db from '../../../db/index.js'
const router = express.Router()
// Use routes and middleware
router.get('/',(req,res)=> res.send('view'))

router.get('/posts', async (req,res) => {
  const {group} = req.query
  if (!group) return res.send(await db.select("*").from("posts"))
  else return res.send(await db.select("*").from("posts").where({group}))
})
router.get('/comments', async (req,res) => {
  const {postid} = req.query
  if (!postid) return res.status(404).send("post not found")
  else return res.send(await db.select("*").from("comments").where({postid}))
})
export default router