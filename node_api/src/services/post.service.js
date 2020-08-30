const { User, Category, Post, Comment } = require('../db/models');

module.exports.findPostList = async ({ query }) => {
  return await Post.findAll({
    ...query,
    include: [
      {
        model: User,
        attributes: ['id', 'username'],
      },
      {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      },
      {
        model: Comment,
        attributes: ['id'],
      },
      {
        model: Category,
        attributes: ['id', 'name'],
      },
    ],
  });
};

module.exports.findPostById = async ({ postId }) => {
  const postRecord = await Post.findOne({
    where: {
      id: postId,
    },
    include: [
      {
        model: User,
        attributes: [
          'id',
          'username',
          'email',
          'facebook',
          'twitter',
          'github',
        ],
      },
      {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      },
      {
        model: Category,
        attributes: ['id', 'name'],
      },
    ],
  });
  return { post: postRecord };
};

module.exports.createPost = async ({ UserId, requestBody }) => {
  const postRecord = await Post.create({
    UserId,
    ...requestBody,
  });
  return { post: postRecord };
};

module.exports.updatePostById = async ({ requestBody, id }) => {
  const postRecord = await Post.update(requestBody, {
    where: {
      id,
    },
    logging: true,
  });
  return { post: postRecord };
};
