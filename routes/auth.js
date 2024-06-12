import { Router } from 'express'
import { users } from '../config/data.js'
import userSchema from '../models/userModel.js'
import { createUser, findUser } from '../services/auth.js'
import validate from '../middlewares/validate.js'



const router = Router()

//  REGISTER A NEW USER
router.post('/register', validate, async (req, res) => {
    const user = await findUser(req.body.username)
     
    if (user) {
        return res.status(400).json({ error: 'sorry user already exists' })
    }
    const newUser = await createUser(req.body)
   
    const response = {
        success: true,
        status: 201,
        message: 'user created successfully',
        data: newUser
        
    }
    res.json(response)
})

// LOGIN
router.post('/login', validate, async (req, res) => {
   
    const user = await findUser(req.body.username)
    if (!user) {
        
        return res.status(400).json({ error: 'Sorry user dont exists' })
    
    
    } else if (user.password !== req.body.password) {

        return res.status(400).json({ error: 'The password is incorrect' })
    }
    
    global.user = user
    
    const response = {
        success: true,
        status: 200,
        message: 'user was loged in successfully',
        data: user
        
    }
    res.json(response)

})

router.post('logout', (req,res) => {

    global.user = null
    const response = {
        success : true,
        status : 200,
        message : "User logged out successfully"
    }
    res.json(response)
})
export default router