const express = require('express');
const router = express.Router();
const PostCommand = require('../commands/wall.commands');
const isAuth = require('../middlewares/auth.middleware');

router.get('/', isAuth, async(req, res) => {
    const postCommand = new PostCommand();
    try {
        const posts = await postCommand.allPosts();
        res.json(posts);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.post('/', isAuth, async(req, res) => {
    const postCommand = new PostCommand();
    const post = req.body;
    try {
        const result = await postCommand.createPost(post, req.user);
        res.json(result);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.get('/:id', isAuth, async(req, res) => {
    const postCommand = new PostCommand();
    const postID = req.params.id;
    try {
        const result = await postCommand.viewPost(postID);
        res.json({ result });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.put('/:id', isAuth, async(req, res) => {
    const postCommand = new PostCommand();
    const postID = req.params.id;
    const editedPost = req.body;
    try {
        const result = await postCommand.updatePost(postID, editedPost);
        res.json({ post: result });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }

});

router.delete('/:id', isAuth, async(req, res) => {
    const postCommand = new PostCommand();
    const postID = req.params.id;
    try {
        const result = await postCommand.deletePost(postID);
        res.json({ result })
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.post('/like', isAuth, async(req, res) => {
    const postCommand = new PostCommand();
    const request = req.body;
    try {
        const result = await postCommand.likePost(request);
        res.json(result)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})
router.post('/comment', isAuth, async(req, res) => {
    const postCommand = new PostCommand();
    const postID = req.body.postID;
    try {
        const result = await postCommand.getComments(postID);
        res.json(result)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.post('/comment/new', isAuth, async(req, res) => {
    const postCommand = new PostCommand();
    const request = req.body;
    // console.log(req.body);
    try {
        const result = await postCommand.createComment(request);
        res.json(result);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

module.exports = router;