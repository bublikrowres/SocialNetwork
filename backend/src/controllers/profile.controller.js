const express = require('express');
const router = express.Router();
const ProfileCommand = require('../commands/profile.commands')
const isAuth = require('../middlewares/auth.middleware');
const multer = require('multer');

var upload = multer({ dest: 'src/public/uploads/' })

router.get('/:id', isAuth, async(req, res) => {
    const profileCommand = new ProfileCommand();
    const id = req.params.id;
    try {
        const result = await profileCommand.getUser(id);
        res.json(result)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.put('/:id', async(req, res) => {
    const profileCommand = new ProfileCommand();
    const editedUser = req.body;
    try {
        const result = await profileCommand.updateUser(editedUser);
        res.json(result)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.post('/photo', upload.single('file'), async(req, res) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return res.json(error)
    }
    // console.log(file)
    const filename = file.filename;
    const url = 'http://localhost:3000/uploads/' + filename;
    // console.log(url)
    res.json(url)
})


module.exports = router;