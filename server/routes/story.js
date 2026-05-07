import express from "express"
const router = express.Router()
import * as Story from "../models/story.js"
import * as User from "../models/user.js"
import { authenticateSession } from "./user.js"

router


.post('/createStory', authenticateSession, async (req, res) => {
    try {
        const result = await Story.createStory(req.body.title, req.body.isPublic, req.body.userId);
        res.send(result)
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

.get('/getStoryById/:storyId', authenticateSession, async (req, res) => {
    try {
        const story = await Story.getStoryById(req.params.storyId);
        res.send(story)
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

.get('/getAllPublicStories', authenticateSession, async (req, res) => {
    try {
        const stories = await Story.getAllPublicStories();
        res.send(stories)
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

.post('/updateTitle', authenticateSession, async (req, res) => {
    try {
        const result = await Story.updateTitle(req.body.newTitle, req.body.storyId);
        res.send(result)
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
}
)


.post('/updateIsPublic', authenticateSession, async (req, res) => {
    try {
        const result = await Story.updateIsPublic(req.body.isPublic, req.body.storyId);
        res.send(result)
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
}
)


.post ('/addUserToStoryByUserId', authenticateSession, async (req, res) => {
    try {
        const result = await Story.addUserToStoryByUserId(req.body.storyId, req.body.userId, req.body.role);
        res.send(result)
    } catch(err) {
        res.status(500).send({ message: err.message })
    }   
})


.post('/deleteStory', authenticateSession, async (req, res) => {
    try {
        const result = await Story.deleteStory(req.body.storyId);      

        res.send(result)
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})


export default router



