
import express from "express"
const router = express.Router()
import { createSession, getSession } from "../sessions/session.js"
import * as User from "../models/user.js"




export async function authenticateSession(req, res, next) {
    console.log("COOKIES RECEIVED:", req.cookies);
    
    try{
    const sessionId = req.cookies?.sessionId
    if (!sessionId) {
        return res.status(401).send({ message: 'No session ID provided' })
    }
    const session = await getSession(sessionId)
    if (!session) {
        console.log("Invalid session ID:", sessionId)
        return res.status(401).send({ message: 'Invalid session ID' })
        
    }
    console.log("session user ID:", session.userId)
    req.userId = session.userId    

    next()
    }catch(err){
        res.status(500).send({message: err.message})
    }

}




router






.post('/deleteUser', authenticateSession, async (req, res) => {
    try {
        await User.deleteUser(req.body.userId)
        res.send({ message: 'User deleted successfully' })
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})




.get('/usernameExists/:username', authenticateSession, async (req, res) => {
    try {
        const exists = await User.usernameExists(req.params.username)
        res.send({exists})
    } catch(err) {
        res.status(500).send({message: err.message})
    }       
})


.get('/getUsernameById/:userId', authenticateSession, async (req, res) => {
    try {
        const username = await User.getUsernameById(req.params.userId)
        res.send(username)
    } catch(err) {
        res.status(500).send({message: err.message})
    }
})


.get('/getEmailById/:userId', authenticateSession, async (req, res) => {
    try {
        const email = await User.getEmailById(req.params.userId)
        res.send(email)
    } catch(err) {
        res.status(500).send({message: err.message})
    }
})


.get('/getUserIdByEmail/:email', authenticateSession, async (req, res) => {
    try {
        const userId = await User.getUserIdByEmail(req.params.email)        
        res.send(userId)
    } catch(err) {
        res.status(500).send({message: err.message})
    }
})


.get('/getUserIdByUsername/:username', authenticateSession, async (req, res) => {
    try {
        const userId = await User.getUserIdByUsername(req.params.username)      
        res.send(userId)
    } catch(err) {
        res.status(500).send({message: err.message})
    }
})

.get('/getPasskeyByUsername/:username', authenticateSession, async (req, res) => {
    try {
        const passkey = await User.getPasskeyByUsername(req.params.username)      
        res.send(passkey)
    } catch(err) {
        res.status(500).send({message: err.message})
    }   
})




.post('/changePassword', authenticateSession, async (req, res) => {
    try {
        await User.changePassword(req.body.userId, req.body.newPasskey)
        res.send({message: 'Password changed successfully'})
    } catch(err) {
        res.status(500).send({message: err.message})
    }
})

.post ('/changeUsername', authenticateSession, async (req, res) => {
    try{
        await User.changeUsername(req.body.userId, req.body.newUsername)
        res.send({message: 'Username changed successfully'})
    } catch(err) {
        res.status(500).send({message: err.message})
    }

})

.post('/changeEmail', authenticateSession, async (req, res) => {
    try {
        await User.changeEmail(req.body.userId, req.body.newEmail)         
        res.send({message: 'Email changed successfully'})
    } catch(err) {
        res.status(500).send({message: err.message})
    }
})





.post('/register', async (req, res) => {
    try {
        const user = await User.registerUser(req.body)
        const sessionId = await createSession(user.userId)
        res.cookie('sessionId', sessionId, { httpOnly: true, secure: false})
        res.send(true)
    } catch(err) {
        res.status(500).send({message: err.message})
    }
})





.post('/login', async (req, res) => {
    console.log('Login attempt for username:', req.body.username, 'with password:', req.body.passkey)
    
    try {
        if(await User.loginUser(req.body.username, req.body.passkey)){
            const userId = await User.getUserIdByUsername(req.body.username)


            console.log('Login successful for user ID:', userId)
            


            const sessionId = await createSession(userId)
            res.cookie('sessionId', sessionId, { httpOnly: true, secure: false})
            res.send(true)
        }
        else{
            res.status(401).send({message: 'Invalid username or password'})
        }
        
    } catch(err) {
        return res.status(401).send({message: err.message})
    }

})





export default router
