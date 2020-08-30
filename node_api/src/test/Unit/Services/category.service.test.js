const assert = require('chai').assert;
const expect = require('chai').expect;
const UserService = require('../../../services/user.service');
const CategoryService = require('../../../services/category.service');
const db = require('../../../db/models');

describe('Openchat 서비스 테스트', function () {
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

  it('createCategory', async () => {
    const { category } = await CategoryService.createCategory({
      requestBody: {
        name: 'test',
        UserId: 1,
      },
    });
    assert.isNotNull(category);
  });

  it('findCategoryById', async () => {
    const { category: newCategory } = await CategoryService.createCategory({
      requestBody: {
        name: 'test',
        UserId: 1,
      },
    });
    const { category } = await CategoryService.findCategoryById({
      categoryId: newCategory.id,
    });
    const name = category.name;
    expect(name).to.equal('test');
  });

  it('findOpenchatList', async () => {
    await CategoryService.createCategory({
      requestBody: {
        name: 'test1',
      },
      UserId: 1,
    });
    await CategoryService.createCategory({
      requestBody: {
        name: 'test2',
      },
      UserId: 1,
    });
    const { categoryList } = await CategoryService.findCategoryList({});
    expect(categoryList.length).to.equal(2);
  });
});
