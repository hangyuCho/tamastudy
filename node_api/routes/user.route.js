const express = require('express');
const userControllers = require('../controllers/user.controller');
const snsAuthControllers = require('../src/controllers/snsAuth.controller');
const { isNotLoggedIn, isLoggedIn } = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', isNotLoggedIn, userControllers.signUp);
router.post('/login', isNotLoggedIn, userControllers.logIn);
router.post('/logout', isLoggedIn, userControllers.logOut);
router.get('/loadme', isLoggedIn, userControllers.loadMe);
router.get('/loaduser/:userId', isLoggedIn, userControllers.loadUser);

router.get('/googleAuth', isNotLoggedIn, snsAuthControllers.googleAuth);
// router.get('/googleCallback', isNotLoggedIn, snsAuthControllers.googleCallback);

module.exports = router;
