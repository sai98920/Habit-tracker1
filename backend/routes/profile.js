const express = require('express');
const verify = require('../middleware/authMiddleware');
const router = express.Router();


router.get('/profile', verify, (req, res) => {
    res.json({
        message: 'Profile accessed successfully',
        user: req.user
    });
});

module.exports = router;
