const express = require('express');
const router = express.Router();
const WallCommand = require('../commands/wall.commands');
const isAuth = require('../middlewares/auth.middleware');

router.get('/', async(req, res) => {
    const wallCommand = new WallCommand();
    try {
        const posts = await wallCommand.allPosts();
        res.json(posts);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.post('/new', async(req, res) => {
    const wallCommand = new WallCommand();
    const post = req.body;
    try {
        const result = await wallCommand.createPost(post);
        res.json(result);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.post('/show', async(req, res) => {
    const wallCommand = new WallCommand();
    const postID = req.body.id;
    console.log(postID)
    try {
        const result = await wallCommand.viewPost(postID);
        res.json({ result });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.put('/update', async(req, res) => {
    const wallCommand = new WallCommand();
    const postID = req.body.id;
    const editedPost = req.body.editedPost;
    try {
        const result = await wallCommand.updatePost(postID, editedPost);
        res.json({ 'new post': result });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }

});

router.delete('/delete', async(req, res) => {
    const wallCommand = new WallCommand();
    // wtf is query???????????????????????????
    console.log(req.query.id);
    console.log(req.body);
    const postID = req.query.id;
    try {
        const result = await wallCommand.deletePost(postID);
        res.json({ result })
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;