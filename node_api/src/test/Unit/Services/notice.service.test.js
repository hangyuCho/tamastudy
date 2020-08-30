const assert = require('chai').assert;
const expect = require('chai').expect;
const UserService = require('../../../services/user.service');
const NoticeService = require('../../../services/notice.service');
const db = require('../../../db/models');

describe('Notice 서비스 테스트', function () {
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

  it('createNotice', async () => {
    const { notice } = await NoticeService.createNotice({
      requestBody: {
        title: 'test notice',
        desc: 'test notice',
        UserId: 1,
      },
    });
    assert.isNotNull(notice);
  });

  it('editNotice', async () => {
    const { notice: newNotice } = await NoticeService.createNotice({
      requestBody: {
        title: 'test notice',
        desc: 'test notice',
        UserId: 1,
      },
    });
    const { notice } = await NoticeService.updateNoticeById({
      requestBody: {
        title: '[edit]test notice',
        desc: 'test notice',
        UserId: 1,
      },
      noticeId: newNotice.id,
    });
    expect(notice[0]).to.equal(1);
  });

  it('findNoticeById', async () => {
    const { notice: newNotice } = await NoticeService.createNotice({
      requestBody: {
        title: 'test',
        desc: 'test',
      },
      UserId: 1,
    });
    const { notice } = await NoticeService.findNoticeById({
      noticeId: newNotice.id,
    });
    const title = notice.title;
    expect(title).to.equal('test');
  });

  it('findNoticeList', async () => {
    await NoticeService.createNotice({
      requestBody: {
        title: 'test',
        desc: 'test',
      },
      UserId: 1,
    });
    await NoticeService.createNotice({
      requestBody: {
        title: 'test2',
        desc: 'test2',
      },
      UserId: 1,
    });
    const noticeList = await NoticeService.findNoticeList({});
    expect(noticeList.length).to.equal(2);
  });
});
