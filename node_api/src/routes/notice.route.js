const express = require('express');
const noticeController = require('../controllers/notice.controller');
const advancedResults = require('./middlewares/advancedResults');
const { findNoticeList } = require('../services/notice.service');
const { isAdmin } = require('./middlewares/auth');
const { isLoggedIn } = require('./middlewares/auth');
const { getCurrentNotice, isNoticeAuthor } = require('./middlewares/notice');

const router = express.Router();

router.post('/create', isLoggedIn, isAdmin, noticeController.createNotice);
router.get(
  '/all',
  advancedResults(findNoticeList, [{ column: 'title', mode: 'like' }]),
  noticeController.getNoticeList
);
router.get('/:noticeId', getCurrentNotice, noticeController.getNotice);
router.put(
  '/:noticeId/edit',
  isLoggedIn,
  isAdmin,
  getCurrentNotice,
  isNoticeAuthor,
  noticeController.editNotice
);
router.delete(
  '/:noticeId/delete',
  isLoggedIn,
  isAdmin,
  getCurrentNotice,
  isNoticeAuthor,
  noticeController.deleteNotice
);

module.exports = router;
