const express = require('express');
const router = express.Router();


router.use((error, req, res, next) => {
    const status = error.code
    res.json({ status: status, msg: 'Internal Server error'});
});

router.use((req, res, next) => {
    res.json({ status: 404, msg: 'Page not found'});
});

module.exports = router;