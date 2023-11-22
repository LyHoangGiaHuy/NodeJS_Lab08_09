const express = require('express');
const router = express.Router();


router.use((error, req, res, next) => {
    const status = 500
    const msg = 'Internal Server Error'
    res.status(500).json({ status: status, msg: msg});
});

router.use((req, res, next) => {
    res.json({ status: 404, msg: 'Page not found'});
});

module.exports = router;