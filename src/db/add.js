import db from "./index.js"

const addUser = async () => {
  await db('users').insert({name:"bob", password:"hash", salt:"salt"})
  console.log("userAdded")
}

export default addUser
