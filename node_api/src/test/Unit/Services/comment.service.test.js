const assert = require('chai').assert;
const expect = require('chai').expect;
const UserService = require('../../../services/user.service');
const PostService = require('../../../services/post.service');
const CategoryService = require('../../../services/category.service');
const CommentService = require('../../../services/comment.service');
const db = require('../../../db/models');

describe('Comment 서비스 테스트', function () {
  beforeEach(function (done) {
    db.sequelize
      .sync()
      .then(async () => {
        await UserService.createUser({
          requestBody: {
            username: 'test',
            email: 'test@test.com',
            password: '1234',
            role: 'admin',
          },
        });
        await CategoryService.createCategory({
          requestBody: {
            name: 'test',
          },
        });
        await PostService.createPost({
          requestBody: {
            title: 'test',
            desc: 'test desc',
            CategoryId: 1,
            UserId: 1,
          },
        });
        done();
      })
      .catch(console.error);
  });

  afterEach(function (done) {
    db.sequelize
      .sync() // create the database table for our model(s)
      .then(async () => {
        await db.sequelize.drop();
      })
      .then(() => {
        done();
      })
      .catch(console.error);
  });

  it('createComment', async () => {
    const { comment } = await CommentService.createComment({
      requestBody: {
        desc: 'test',
      },
      UserId: 1,
      PostId: 1,
    });
    assert.isNotNull(comment);
  });

  it('findCommentList', async () => {
    await CommentService.createComment({
      requestBody: {
        desc: 'test',
      },
      UserId: 1,
      PostId: 1,
    });
    await CommentService.createComment({
      requestBody: {
        desc: 'test2',
      },
      UserId: 1,
      PostId: 1,
    });
    const { commentList } = await CommentService.findCommentList({
      postId: 1,
    });
    expect(commentList.length).to.equal(2);
  });

  it('editComment', async () => {
    await CommentService.createComment({
      requestBody: {
        desc: 'test',
      },
      UserId: 1,
      PostId: 1,
    });
    const { comment } = await CommentService.updateCommentById({
      requestBody: {
        desc: '[edit]test',
      },
      commentId: 1,
    });
    expect(comment[0]).to.equal(1);
  });
});
