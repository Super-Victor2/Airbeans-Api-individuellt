import nedb from 'nedb-promises'
import { nanoid } from 'nanoid'
import {users} from '../config/data.js'


const database = new nedb({filename: 'register.db', autoload: true})

// Add new user
 async function createUser(user){
  const newUserId = nanoid(5)
  const newUser = {...user, userId: newUserId}
   const newInsertedUser = await database.insert(newUser)
   return newInsertedUser
 }

 const findUser = async (username) =>{
    console.log(username)
  const user = await database.findOne({username : username})
    console.log(user)
    return user
 }

 const findUserById = async (userId) =>{
  const user = await database.findOne({_id : userId})
  return user
}

export { createUser, findUser, findUserById }