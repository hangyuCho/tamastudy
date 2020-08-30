const { Notice, User } = require('../db/models');

module.exports.findNoticeList = async ({ query }) => {
  return await Notice.findAll({
    ...query,
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'email'],
      },
    ],
  });
};

module.exports.findNoticeById = async ({ noticeId }) => {
  const noticeRecord = await Notice.findOne({
    where: {
      id: noticeId,
    },
    include: [
      {
        model: User,
        attributes: [
          'id',
          'username',
          'email',
          'github',
          'facebook',
          'twitter',
        ],
      },
    ],
  });
  return { notice: noticeRecord };
};

module.exports.createNotice = async ({ UserId, requestBody }) => {
  const noticeRecord = await Notice.create({
    UserId,
    ...requestBody,
  });
  return { notice: noticeRecord };
};

module.exports.updateNoticeById = async ({ requestBody, noticeId }) => {
  const noticeRecord = await Notice.update(requestBody, {
    where: {
      id: noticeId,
    },
    logging: true,
  });
  return { notice: noticeRecord };
};
