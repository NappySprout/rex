import db from "./index.js"
const create = async () => {
  await db.schema.dropTableIfExists('users')
  await db.schema.dropTableIfExists('groups')
  await db.schema.dropTableIfExists('posts')
  await db.schema.dropTableIfExists('comments')
  
  
  
  
  
  await db.schema.createTable('users', (table) => {
    table.string('name').primary()
    table.string("password").notNullable()
    table.string("salt").notNullable()
  })
  await db.schema.createTable('groups', (table) => {
    table.string('name').primary()
    table.string("description").notNullable()
    table.string("author").references("users.name").onDelete("cascade").onUpdate("cascade").notNullable()
  })

  await db.schema.createTable('posts', (table) => {
    table.increments('id').primary()
    table.string("title").notNullable()
    table.string("content").notNullable()
    table.string("author").references("users.name").onDelete("cascade").onUpdate("cascade").notNullable()
  })
  await db.schema.createTable('comments', (table) => {
    table.increments('id').primary()
    table.string("content").notNullable()
    table.string("author").references("users.name").onDelete("cascade").onUpdate("cascade").notNullable()
    table.string("postid").references("posts.id").onDelete("cascade").onUpdate("cascade").notNullable()
  })
} 
export default create
