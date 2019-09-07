const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    res.json({
        userId: req.params.id
    });
});

module.exports = router;