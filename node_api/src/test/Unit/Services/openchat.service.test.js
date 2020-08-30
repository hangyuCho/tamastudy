const assert = require('chai').assert;
const expect = require('chai').expect;
const UserService = require('../../../services/user.service');
const CategoryService = require('../../../services/category.service');
const OpenchatService = require('../../../services/openchat.service');
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

  it('createOpenchat', async () => {
    const { openchat } = await OpenchatService.createOpenchat({
      requestBody: {
        title: 'test openchat',
        desc: 'test openchat',
        CategoryId: 1,
        UserId: 1,
      },
    });
    assert.isNotNull(openchat);
  });

  it('findOpenchatById', async () => {
    const { openchat: newOpenchat } = await OpenchatService.createOpenchat({
      requestBody: {
        title: 'test',
        desc: 'test',
        CategoryId: 1,
      },
      UserId: 1,
    });
    const { openchat } = await OpenchatService.findOpenchatById({
      openchatId: newOpenchat.id,
    });
    const title = openchat.title;
    expect(title).to.equal('test');
  });

  it('findOpenchatList', async () => {
    await OpenchatService.createOpenchat({
      requestBody: {
        title: 'test',
        desc: 'test',
        CategoryId: 1,
      },
      UserId: 1,
    });
    await OpenchatService.createOpenchat({
      requestBody: {
        title: 'test2',
        desc: 'test2',
        CategoryId: 1,
      },
      UserId: 1,
    });
    const { openchatList } = await OpenchatService.findOpenchatList({});
    expect(openchatList.length).to.equal(2);
  });
});
