const express = require('express');
const openchatController = require('../controllers/openchat.controller');
const { isLoggedIn, isAdmin } = require('./middlewares/auth');

const router = express.Router();

router.get('/all', openchatController.getOpenchatList);
router.get('/:openchatId', openchatController.getOpenchat);
router.post('/create', isLoggedIn, isAdmin, openchatController.createOpenchat);
router.put(
  '/:openchatId/edit',
  isLoggedIn,
  isAdmin,
  openchatController.editOpenchat
);
router.delete(
  '/:openchatId/delete',
  isLoggedIn,
  isAdmin,
  openchatController.deleteOpenchat
);

module.exports = router;
