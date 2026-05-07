import express from "express"
const router = express.Router()
import * as StoryUser from "../models/storyUser.js"
import * as User from "../models/user.js"
import { authenticateSession } from "./user.js"

router

.post('/addUserToStory', authenticateSession, async (req, res) => {
    try {
        const result = await StoryUser.addUserToStory(req.body.storyId, req.body.userId, req.body.role);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


.get('/getUsersByStoryId', authenticateSession, async (req, res) => {
    try {
        const result = await StoryUser.getUsersByStoryId(req.body.storyId);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
})

.get('/getStoriesByUserId', authenticateSession, async (req, res) => {
    try {
        const result = await StoryUser.getStoriesByUserId(req.body.userId);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

.get('/getUserRoleInStory', authenticateSession, async (req, res) => {
    try {
        const result = await StoryUser.getUserRoleInStory(req.body.storyId, req.body.userId);   
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

.post('/changeUserRole', authenticateSession, async (req, res) => {
    try {
        const result = await StoryUser.changeUserRole(req.body.storyId, req.body.userId, req.body.newRole);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

.post('/removeUserFromStory', authenticateSession, async (req, res) => {
    try {
        const result = await StoryUser.removeUserFromStory(req.body.storyId, req.body.userId);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router