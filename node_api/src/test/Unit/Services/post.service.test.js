const assert = require('chai').assert;
const expect = require('chai').expect;
const UserService = require('../../../services/user.service');
const CategoryService = require('../../../services/category.service');
const PostService = require('../../../services/post.service');
const db = require('../../../db/models');

describe('Post 서비스 테스트', function () {
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

  it('createPost', async () => {
    const { post } = await PostService.createPost({
      requestBody: {
        title: 'test post',
        desc: 'test post',
        CategoryId: 1,
        UserId: 1,
      },
    });
    assert.isNotNull(post);
  });

  it('editPost', async () => {
    const { post: newPost } = await PostService.createPost({
      requestBody: {
        title: 'test post',
        desc: 'test post',
        CategoryId: 1,
        UserId: 1,
      },
    });
    const { post } = await PostService.updatePostById({
      requestBody: {
        title: '[edit]test post',
      },
      id: newPost.id,
    });
    expect(post[0]).to.equal(1);
  });

  it('findPostById', async () => {
    const { post: newPost } = await PostService.createPost({
      requestBody: {
        title: 'test',
        desc: 'test',
        CategoryId: 1,
      },
      UserId: 1,
    });
    const { post } = await PostService.findPostById({
      postId: newPost.id,
    });
    const title = post.title;
    expect(title).to.equal('test');
  });

  it('findPostList', async () => {
    await PostService.createPost({
      requestBody: {
        title: 'test',
        desc: 'test',
        CategoryId: 1,
      },
      UserId: 1,
    });
    await PostService.createPost({
      requestBody: {
        title: 'test2',
        desc: 'test2',
        CategoryId: 1,
      },
      UserId: 1,
    });
    const postList = await PostService.findPostList({});
    expect(postList.length).to.equal(2);
  });
});
