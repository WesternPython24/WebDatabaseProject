const express = require("express")
const router = express.Router()
const Story = require("../models/story.js")

router.get("/getAllStories", async (req, res) => {
    try {
        const stories = await Story.getAllStories()
        res.json(stories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router



