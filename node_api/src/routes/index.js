const express = require('express');
const userRouters = require('./user.route');
const postRouters = require('./post.route');
const noticeRouters = require('./notice.route');
const openchatRouters = require('./openchat.route');

const router = express.Router();

router.use('/api/user', userRouters);
router.use('/api/post', postRouters);
router.use('/api/notice', noticeRouters);
router.use('/api/openchat', openchatRouters);

module.exports = router;
