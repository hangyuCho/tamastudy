const express = require('express');
const postController = require('../controllers/post.controller');
const { isLoggedIn } = require('./middlewares/auth');
const { getCurrentPost, isPostAuthor } = require('./middlewares/post');
const commentRouters = require('./comment.route');
const categoryRouters = require('./category.route');
const advancedResults = require('./middlewares/advancedResults');
const { findPostList } = require('../services/post.service');

const router = express.Router();

// merge Route
router.use('/category', categoryRouters);
router.use('/:postId/comment', commentRouters);

router.post('/create', isLoggedIn, postController.createPost);
router.get(
  '/all',
  advancedResults(findPostList, [
    { column: 'title', mode: 'like' },
    { column: 'CategoryId', mode: 'normal' },
  ]),
  postController.getPostList
);
router.get('/:postId', getCurrentPost, postController.getPost);
router.put(
  '/:postId/edit',
  isLoggedIn,
  getCurrentPost,
  isPostAuthor,
  postController.editPost
);
router.delete(
  '/:postId/delete',
  isLoggedIn,
  getCurrentPost,
  isPostAuthor,
  postController.deletePost
);
router.patch(
  '/:postId/like',
  isLoggedIn,
  getCurrentPost,
  postController.likePost
);
router.patch(
  '/:postId/unlike',
  isLoggedIn,
  getCurrentPost,
  postController.unLikePost
);

module.exports = router;
